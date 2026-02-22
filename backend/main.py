from fastapi import FastAPI, UploadFile, File, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import pandas as pd
import shutil
import io
import os


from .model import test_model

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "data", "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)



@app.post("/predict")
async def predict(request: Request):
    form = await request.form()
    print("FORM FIELDS:", {k: type(v).__name__ for k, v in form.multi_items()})

    def save(upload: UploadFile) -> pd.DataFrame:
        path = os.path.join(UPLOAD_DIR, upload.filename)
        with open(path, "wb") as f:
            shutil.copyfileobj(upload.file, f)
        return pd.read_csv(path)

    kyc_individual    = form.get("kyc_individual")
    kyc_smallbusiness = form.get("kyc_smallbusiness")

    if not hasattr(kyc_individual, "read") or not hasattr(kyc_smallbusiness, "read"):
        raise HTTPException(status_code=400, detail="kyc_individual and kyc_smallbusiness are required.")

    try:
        kyc_people_df   = save(kyc_individual)
        kyc_business_df = save(kyc_smallbusiness)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to process KYC files: {e}")

    reserved = {"kyc_individual", "kyc_smallbusiness"}
    transaction_dfs: dict[str, pd.DataFrame] = {}
    for field_name, field_value in form.multi_items():
        if field_name in reserved or not hasattr(field_value, "read"):
            continue
        try:
            transaction_dfs[field_name] = save(field_value)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Failed to process '{field_name}': {e}")

    if not transaction_dfs:
        raise HTTPException(status_code=400, detail="At least one transaction file must be provided.")

    try:
        people_output, business_output = test_model(
            kyc_people_df=kyc_people_df,
            kyc_business_df=kyc_business_df,
            transaction_dfs=transaction_dfs,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ded: {e}")

    return JSONResponse(content={"people": people_output, "businesses": business_output})
