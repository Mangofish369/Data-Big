from __future__ import annotations

import os
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import roc_auc_score, average_precision_score, confusion_matrix, classification_report
from xgboost import XGBClassifier

from backend.bracket import (
    wage_high, wage_up_mid, wage_mid, wage_low_mid, wage_low,
    rev_very_high, rev_high, rev_med,
)

_HERE = os.path.dirname(__file__)
LABELS_PATH = os.path.join(_HERE, "data", "labels.csv")

REQUIRED_COLS = {"customer_id", "amount_cad", "debit_credit", "transaction_datetime"}
HIGH_RISK_THRESHOLD = 0.9


def test_model(
    kyc_people_df: pd.DataFrame,
    kyc_business_df: pd.DataFrame,
    transaction_dfs: dict[str, pd.DataFrame],
) -> tuple[list[dict], list[dict]]:
    labeled_df = get_labeled()

    transactions_long = get_transactions_long(transaction_dfs)
    person_and_business_df = get_person_and_business_df(transactions_long, transaction_dfs.keys())

    business_ids = set(kyc_business_df["customer_id"])
    customer_id = set(kyc_people_df["customer_id"])
    person_and_business_df["customer_type"] = np.where(
        person_and_business_df.index.isin(business_ids),
        "business",
        np.where(person_and_business_df.index.isin(customer_id), "person", "unknown"),
    )

    person_df = person_and_business_df[person_and_business_df["customer_type"] == "person"].copy()
    business_df = person_and_business_df[person_and_business_df["customer_type"] == "business"].copy()

    person_df = fill_people(person_df, kyc_people_df)
    business_df = fill_business(business_df, kyc_business_df)

    people_output = train(
        full_df=person_df,
        labeled_df=labeled_df,
        drop_cols=["customer_type", "occupation_code"],
        lr_seed=0,
        split_seed=24,
    )
    business_output = train(
        full_df=business_df,
        labeled_df=labeled_df,
        drop_cols=["customer_type", "industry_code"],
        lr_seed=12,
        split_seed=24,
    )

    return people_output, business_output


def get_labeled() -> pd.DataFrame:
    if not os.path.exists(LABELS_PATH):
        print(LABELS_PATH)
        raise FileNotFoundError
    return pd.read_csv(LABELS_PATH)


def normalize_df(name: str, df: pd.DataFrame) -> pd.DataFrame:
    missing = REQUIRED_COLS - set(df.columns)
    if missing:
        raise ValueError(f"Transaction file '{name}' is missing columns: {missing}. Found: {list(df.columns)}")
    
    subset = df[list(REQUIRED_COLS)].copy()
    subset = subset.rename(columns={"transaction_datetime": "date"})
    subset["transaction_method"] = name
    subset = subset.dropna(subset=["amount_cad"])
    subset["date"] = (
        pd.to_datetime(subset["date"], utc=True, errors="coerce")
          .dt.tz_convert("America/Toronto")
          .dt.tz_localize(None)
    )
    return subset


def get_transactions_long(transaction_dfs: dict[str, pd.DataFrame]) -> pd.DataFrame:
    frames = [normalize_df(name, df) for name, df in transaction_dfs.items()]
    return pd.concat(frames, ignore_index=True)


def get_person_and_business_df(
    transactions_long: pd.DataFrame,
    tx_types: "Iterable[str]",
) -> pd.DataFrame:
    person_and_business_df = transactions_long.groupby("customer_id").agg(
        num_transactions=("amount_cad", "count"),
        total_amount=("amount_cad", "sum"),
        avg_amount=("amount_cad", "mean"),
        max_amount=("amount_cad", "max"),
        std_amount=("amount_cad", "std"),
        num_debit=("debit_credit", lambda x: (x == "debit").sum()),
        num_credit=("debit_credit", lambda x: (x == "credit").sum()),
    )

    for tx_type in tx_types:
        col = f"num_{tx_type}"
        person_and_business_df[col] = transactions_long.groupby("customer_id")["transaction_method"].apply(
            lambda x, t=tx_type: (x == t).sum()
        )

    return person_and_business_df


def fill_people(person_df: pd.DataFrame, kyc_people_df: pd.DataFrame) -> pd.DataFrame:
    df = person_df.join(
        kyc_people_df[["customer_id", "occupation_code", "income"]]
            .astype({"customer_id": str})
            .set_index("customer_id"),
        how="left",
    )

    no_data = (df["occupation_code"].isna() | (df["occupation_code"] == "OTHER")) & df["income"].isna()
    self_employed = (df["occupation_code"] == "SELF_EMPLOYED") & df["income"].isna()
    df = df.loc[~no_data & ~self_employed].copy()

    mask_student    = df["occupation_code"] == "STUDENT"
    mask_retired    = df["occupation_code"] == "RETIRED"
    mask_unemployed = df["occupation_code"] == "UNEMPLOYED"
    mask_low        = df["occupation_code"].isin(wage_low)
    mask_wage_low_mid = df["occupation_code"].isin(wage_low_mid)
    mask_wage_mid   = df["occupation_code"].isin(wage_mid)
    mask_wage_up_mid = df["occupation_code"].isin(wage_up_mid)
    mask_wage_high  = df["occupation_code"].isin(wage_high)

    df.loc[mask_student,     "income"] = 27000
    df.loc[mask_retired,     "income"] = 55000
    df.loc[mask_unemployed,  "income"] = 0
    df.loc[mask_low,         "income"] = 35000  + np.random.randint(-10000,  10000,  size=mask_low.sum())
    df.loc[mask_wage_low_mid,"income"] = 45000  + np.random.randint(-15000,  15000,  size=mask_wage_low_mid.sum())
    df.loc[mask_wage_mid,    "income"] = 80000  + np.random.randint(-20000,  20000,  size=mask_wage_mid.sum())
    df.loc[mask_wage_up_mid, "income"] = 125000 + np.random.randint(-25000,  25000,  size=mask_wage_up_mid.sum())
    df.loc[mask_wage_high,   "income"] = 250000 + np.random.randint(-100000, 100000, size=mask_wage_high.sum())

    return df


def fill_business(business_df: pd.DataFrame, kyc_business_df: pd.DataFrame) -> pd.DataFrame:
    df = business_df.join(
        kyc_business_df[["customer_id", "industry_code", "sales"]]
            .astype({"customer_id": str})
            .set_index("customer_id"),
        how="left",
    )

    no_data = (df["industry_code"].isna() | (df["industry_code"] == "Other")) & df["sales"].isna()
    df = df.loc[~no_data].copy()

    mask_rev_med       = df["industry_code"].isin(rev_med)
    mask_rev_high      = df["industry_code"].isin(rev_high)
    mask_rev_very_high = df["industry_code"].isin(rev_very_high)

    df.loc[mask_rev_med,       "sales"] = 125000  + np.random.randint(-75000,   75000,   size=mask_rev_med.sum())
    df.loc[mask_rev_high,      "sales"] = 600000  + np.random.randint(-400000,  400000,  size=mask_rev_high.sum())
    df.loc[mask_rev_very_high, "sales"] = 2000000 + np.random.randint(-1000000, 1000000, size=mask_rev_very_high.sum())

    return df


def evaluate_prob_model(name: str, model, X_te, y_te, threshold: float = 0.5) -> np.ndarray:
    """Print evaluation metrics and return predicted probabilities."""
    proba = model.predict_proba(X_te)[:, 1]
    pred  = (proba >= threshold).astype(int)

    print(f"\n===== {name} (threshold={threshold}) =====")
    print("ROC-AUC :", roc_auc_score(y_te, proba))
    print("PR-AUC  :", average_precision_score(y_te, proba))
    print("Confusion matrix:\n", confusion_matrix(y_te, pred))
    print(classification_report(y_te, pred, digits=3))
    return proba


def generate_explanation(row: pd.Series) -> str:
    if row["probabilities"] >= 0.5:
        return "Risk increased by: " + ", ".join(row["top_pos"]) + "."
    return "Risk decreased by: " + ", ".join(row["top_neg"]) + "."


def train(
    full_df: pd.DataFrame,
    labeled_df: pd.DataFrame,
    drop_cols: list[str],
    lr_seed: int = 0,
    split_seed: int = 24,
) -> list[dict]:

    # ── Prepare labeled subset ────────────────────────────────────────────────
    labeled = full_df[full_df.index.isin(labeled_df["customer_id"].astype(str))].copy()
    labeled["std_amount"] = labeled["std_amount"].fillna(0)

    label_map = labeled_df.set_index(labeled_df["customer_id"].astype(str))["label"]
    labeled["label"] = labeled.index.map(label_map)

    X = labeled.drop(columns=drop_cols + ["label"])
    Y = labeled["label"]

    X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.3, random_state=split_seed)

    # ── Logistic Regression (requires scaling) ────────────────────────────────
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled  = scaler.transform(X_test)

    log_reg = LogisticRegression(random_state=lr_seed).fit(X_train_scaled, y_train)

    train_acc = float(log_reg.score(X_train_scaled, y_train))
    test_acc  = float(log_reg.score(X_test_scaled,  y_test))

    evaluate_prob_model("Logistic Regression", log_reg, X_test_scaled, y_test, threshold=0.5)

    # ── Random Forest ─────────────────────────────────────────────────────────
    rf = RandomForestClassifier(
        n_estimators=500,
        min_samples_leaf=5,
        class_weight="balanced",
        n_jobs=-1,
        random_state=split_seed,
    )
    rf.fit(X_train, y_train)
    evaluate_prob_model("Random Forest", rf, X_test, y_test, threshold=0.5)

    # ── XGBoost ───────────────────────────────────────────────────────────────
    pos = int((y_train == 1).sum())
    neg = int((y_train == 0).sum())
    scale_pos_weight = neg / max(pos, 1)

    xgb = XGBClassifier(
        n_estimators=600,
        learning_rate=0.05,
        max_depth=4,
        subsample=0.8,
        colsample_bytree=0.8,
        reg_lambda=1.0,
        objective="binary:logistic",
        eval_metric="aucpr",
        scale_pos_weight=scale_pos_weight,
        n_jobs=-1,
        random_state=split_seed,
    )
    xgb.fit(X_train, y_train)
    evaluate_prob_model("XGBoost", xgb, X_test, y_test, threshold=0.5)

    # ── Score full population ─────────────────────────────────────────────────
    X_unlabeled = full_df.drop(columns=drop_cols).copy()
    X_unlabeled["std_amount"] = X_unlabeled["std_amount"].fillna(0)

    X_scaled = scaler.transform(X_unlabeled)

    log_probs = log_reg.predict_proba(X_scaled)[:, 1]
    rf_probs  = rf.predict_proba(X_unlabeled)[:, 1]
    xgb_probs = xgb.predict_proba(X_unlabeled)[:, 1]

    # Ensemble: mean probability across all three models
    ensemble_probs = (log_probs + rf_probs + xgb_probs) / 3.0

    # Consensus flags at HIGH_RISK_THRESHOLD
    log_flags = (log_probs  >= HIGH_RISK_THRESHOLD).astype(int)
    rf_flags  = (rf_probs   >= HIGH_RISK_THRESHOLD).astype(int)
    xgb_flags = (xgb_probs  >= HIGH_RISK_THRESHOLD).astype(int)
    vote_sum  = log_flags + rf_flags + xgb_flags

    # Final prediction: flagged if at least 2-of-3 models agree
    final_predictions = (vote_sum >= 2).astype(int)

    # ── Feature explanations (Logistic Regression coefficients) ───────────────
    contributions = X_scaled * log_reg.coef_[0]
    contrib_df = pd.DataFrame(contributions, columns=X_unlabeled.columns, index=X_unlabeled.index)

    explanations_df = pd.DataFrame(
        {
            "top_pos": contrib_df.apply(lambda r: r.nlargest(3).index.tolist(),  axis=1),
            "top_neg": contrib_df.apply(lambda r: r.nsmallest(3).index.tolist(), axis=1),
            "probabilities": ensemble_probs,
        },
        index=X_unlabeled.index,
    )
    explanations_df["explanation"] = explanations_df.apply(generate_explanation, axis=1)

    # ── Assemble output ───────────────────────────────────────────────────────
    out = X_unlabeled.copy()
    out["customer_id"]   = out.index
    out["prediction"]    = final_predictions
    out["probabilities"] = ensemble_probs          # ensemble mean
    out["log_prob"]      = log_probs
    out["rf_prob"]       = rf_probs
    out["xgb_prob"]      = xgb_probs
    out["vote_sum"]      = vote_sum                # how many models flagged (0-3)
    out["explanation"]   = explanations_df["explanation"].values
    out["train_accuracy"] = train_acc
    out["test_accuracy"]  = test_acc

    return out.where(pd.notnull(out), None).to_dict(orient="records")