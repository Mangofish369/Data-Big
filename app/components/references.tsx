import React from "react"

export default function References() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="mx-auto max-w-7xl px-6 py-16">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            AML Knowledge Library
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Documentation of Money Laundering Detection Methods
          </p>
          <p className="text-sm text-slate-500 mt-1">
            Validated Hypothesis Testing Framework
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-4">
                Table of Contents
              </h2>
              <nav className="space-y-3 text-sm">
                <NavLink href="#data-sources">1. Data Sources</NavLink>
                <NavLink href="#appendix">2. Appendix</NavLink>
              </nav>
            </div>
          </aside>

          {/* Main */}
          <main className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-10 space-y-20">
              <DataSources />
              <Appendix/>
            </div>
          </main>

        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------- */
/* ----------------- Reusable Components ------------- */
/* -------------------------------------------------- */

function NavLink({ href, children }: any) {
  return (
    <a href={href} className="block hover:text-blue-600 transition">
      {children}
    </a>
  )
}

function Section({ id, title, children }: any) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-3xl font-bold text-slate-900 mb-8">
        {title}
      </h2>
      <div className="space-y-6 leading-relaxed text-slate-700">
        {children}
      </div>
    </section>
  )
}

function Table({ headers, rows }: any) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-slate-200 text-sm">
        <thead className="bg-slate-100">
          <tr>
            {headers.map((h: string, i: number) => (
              <th key={i} className="border px-4 py-2 text-left font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row: any, i: number) => (
            <tr key={i} className="odd:bg-white even:bg-slate-50">
              {row.map((cell: any, j: number) => (
                <td key={j} className="border px-4 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CodeBlock({ children }: any) {
  return (
    <pre className="bg-slate-900 text-slate-100 text-sm rounded-lg p-6 overflow-x-auto">
      <code>{children}</code>
    </pre>
  )
}

function MethodCard({ title, strengths, limitations }: any) {
  return (
    <div className="rounded-xl border border-slate-200 p-6 bg-slate-50">
      <h4 className="text-lg font-semibold text-slate-900 mb-6">{title}</h4>

      <div className="space-y-6">
        <div>
          <h5 className="text-sm font-semibold uppercase text-emerald-600 mb-3">
            Strengths
          </h5>
          <ul className="space-y-2">
            {strengths.map((s: string, i: number) => (
              <li key={i}>• {s}</li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="text-sm font-semibold uppercase text-rose-600 mb-3">
            Limitations
          </h5>
          <ul className="space-y-2">
            {limitations.map((l: string, i: number) => (
              <li key={i}>• {l}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------- */
/* ----------------- Sections ------------------------ */
/* -------------------------------------------------- */

function DataSources() {
  return (
    <Section id="data-sources" title="Data Sources">
      <div className="space-y-10 text-sm leading-6 text-gray-700">

        {/* Primary Data */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Primary Data
          </h3>

          <div className="bg-gray-50 rounded-lg p-4 border mb-4">
            <p className="font-mono text-xs text-gray-600">
              Files: [abm.csv, card.csv, cheque.csv, eft.csv, emt.csv, eft.csv, westernunion.csv, wire.csv, kyc_individual, kyc_smallbusiness, kyc_industry_codes, kyc_occupation_codes]
            </p>
          </div>

          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Rows:</strong> 5,933,310 transactions</li>
            <li><strong>Customers:</strong> 61,410 unique</li>
            <li><strong>Time Period:</strong> November 2024 – January 2025</li>
            <li><strong>Source:</strong> Consolidated from multiple transaction systems</li>
          </ul>

          <div className="mt-4">
            <h4 className="font-medium text-gray-900 mb-2">Structure</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Transaction types: Card, ABM, Cheque, EFT, EMT, Western Union, Wire
              </li>
              <li>
                Customer profiles: Individual and small business KYC data
              </li>
              <li>
                Labels: 1,000 labeled customers (10 suspicious, 990 normal)
              </li>
            </ul>
          </div>
        </div>

        {/* Data Preparation */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Data Preparation
          </h3>

          <h4 className="font-medium text-gray-900 mb-2">Cleaning Steps</h4>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Removed duplicate rows</li>
            <li>Unified 7 amount columns into single amount field</li>
            <li>Unified 7 datetime columns into single datetime field</li>
            <li>Converted data types (amounts to float, dates to datetime)</li>
            <li>Created 17 derived risk indicator columns</li>
            <li>Retained 95.4% of original data (5.66M valid transactions)</li>
          </ol>

          <div className="mt-4">
            <h4 className="font-medium text-gray-900 mb-2">Quality Metrics</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Amount availability: 99.5% (5,903,333 of 5,933,310)</li>
              <li>Datetime availability: 95.3% (5,657,829 of 5,933,310)</li>
              <li>Complete records (amount AND datetime): 95.3%</li>
            </ul>
          </div>
        </div>

        {/* Label Data */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Labeled Data
          </h3>

          <div className="bg-gray-50 rounded-lg p-4 border mb-4">
            <p className="font-mono text-xs text-gray-600">
              File: label.csv
            </p>
          </div>

          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Total labeled:</strong> 1,000 customers</li>
            <li><strong>Suspicious:</strong> 10 customers (1%)</li>
            <li><strong>Normal:</strong> 990 customers (99%)</li>
            <li><strong>Coverage:</strong> 1.6% of total customer base</li>
          </ul>

          <div className="mt-4">
            <h4 className="font-medium text-gray-900 mb-2">Label Validation</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Manual review confirmed all 10 suspicious customers show unusual patterns
              </li>
              <li>
                27 labeled customers excluded due to missing transaction data
              </li>
              <li>
                All 10 suspicious customers included in final analysis (100% coverage)
              </li>
            </ul>
          </div>
        </div>

        {/* External Reference Sources */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            External Reference Sources
          </h3>

          <h4 className="font-medium text-gray-900 mb-2">Regulatory Guidance</h4>
<ul className="list-disc pl-6 space-y-2 break-words">
  <li>
    <a
      href="https://fintrac-canafe.canada.ca/guidance-directives/transaction-operation/indicators-indicateurs/fin_mltf-eng"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:text-blue-800 underline"
    >
      FINTRAC ML/TF Indicators (Financial Entities)
    </a>
  </li>
  <li>
    <a
      href="https://fintrac-canafe.canada.ca/intel/operation/oai-ml-eng"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:text-blue-800 underline"
    >
      FINTRAC Operational Alert (Money Laundering)
    </a>
  </li>
  <li>
    <a
      href="https://fintrac-canafe.canada.ca/intel/operation/oai-hts-2021-eng"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:text-blue-800 underline"
    >
      FINTRAC Operational Alert (Human Trafficking & Smuggling)
    </a>
  </li>
  <li>
    <a
      href="https://www.fincen.gov/system/files/shared/BCS-Alert-FINAL-508C.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:text-blue-800 underline"
    >
      FinCEN Advisory on Border Cash Smuggling
    </a>
  </li>
  <li>
    <a
      href="https://www.fincen.gov/resources/advisories/fincen-advisory-fin-2025-a003"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:text-blue-800 underline"
    >
      FinCEN Advisory FIN-2025-A003
    </a>
  </li>
</ul>
          <div className="mt-4">
            <h4 className="font-medium text-gray-900 mb-2">
              Specific Indicator Alignments
            </h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Structuring (H5):</strong> Transactions structured to avoid reporting thresholds
              </li>
              <li>
                <strong>Income Mismatch (H13):</strong> Transactions inconsistent with client profile
              </li>
              <li>
                <strong>Student Money Mules (H15):</strong> Large transfers involving students with third-party patterns
              </li>
              <li>
                <strong>Unemployed with Income (H16):</strong> Income inconsistent with reported occupation
              </li>
              <li>
                <strong>Shell Companies (H17):</strong> Business structure does not match business activity
              </li>
            </ul>
          </div>

          <div className="mt-4">
            <h4 className="font-medium text-gray-900 mb-2">
              Tested but Not Supported
            </h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Online gambling indicators (H7), p = 1.0 (not significant)
              </li>
            </ul>
          </div>
        </div>

      </div>
    </Section>
  )
}

function Appendix() {
  return (
    <Section id="appendix" title="Appendix">
      <h3 className="text-lg font-semibold mt-4 mb-2">A. Complete Hypothesis List</h3>

      <h4 className="font-semibold mt-2">Hypotheses 1-6: Traditional AML Methods</h4>
      <ol className="list-decimal pl-6 space-y-1">
        <li>High Transaction Volume: Do suspicious customers have more transactions?</li>
        <li>Large Transaction Amounts: Do suspicious customers make larger transactions?</li>
        <li>Total Transaction Value: Do suspicious customers move more total money?</li>
        <li>Round Number Abuse: Do suspicious customers use round numbers ($100, $500, $1000)?</li>
        <li>Structuring: Do suspicious customers avoid $10K reporting threshold?</li>
        <li>Erratic Patterns: Do suspicious customers have higher variance in amounts?</li>
      </ol>

      <h4 className="font-semibold mt-2">Hypotheses 7-14: Enhanced AML Methods</h4>
      <ol start={7} className="list-decimal pl-6 space-y-1">
        <li>High-Risk Merchant Categories: Use of gambling, crypto, money transfer merchants</li>
        <li>E-Commerce Preference: More online/card-not-present transactions</li>
        <li>Cash Withdrawal Patterns: Higher percentage of cash withdrawals from ATMs</li>
        <li>Geographic Risk: Transactions in FATF blacklist/greylist countries</li>
        <li>Unusual Timing Patterns: More weekend or late-night (10pm-6am) transactions</li>
        <li>Transaction Velocity Spikes: Erratic weekly transaction patterns</li>
        <li>Income Mismatch: Transaction volume exceeds legitimate income</li>
        <li>Transaction Type Diversity: Use of many different transaction types (layering)</li>
      </ol>

      <h4 className="font-semibold mt-2">Hypotheses 15-19: Occupation & Business-Based Methods</h4>
      <ol start={15} className="list-decimal pl-6 space-y-1">
        <li>Student Money Mules: Students with unusually high transaction volumes</li>
        <li>Unemployed with Income: Unemployed customers reporting income</li>
        <li>Shell Company Indicators: Businesses with suspicious sales-to-employee ratios</li>
        <li>Zero Business Transactions: Businesses with no business activity but high personal spending</li>
        <li>Exact Round Large Amounts: Frequent use of exact $10K, $20K, $50K, $100K amounts</li>
      </ol>

      <h4 className="font-semibold mt-2">Hypotheses 20-29: Regulatory-Based Methods (Pending)</h4>
      <ol start={20} className="list-decimal pl-6 space-y-1">
        <li>Rapid Movement of Funds: Short time between receiving and spending</li>
        <li>Third-Party Transactions: High diversity of transaction counterparties</li>
        <li>Account Activity Inconsistent with Business: Patterns don't match industry</li>
        <li>Sudden Change in Patterns: Dramatic changes in volume or type over time</li>
        <li>Structuring Over Time: Multiple near-threshold transactions in 30-day windows</li>
        <li>Round-Trip Transactions: Money sent out and received back</li>
        <li>Unusual Transaction Locations: Transactions outside home province/city</li>
        <li>Inconsistent Customer Profile: Mismatched demographic data</li>
        <li>Money Services Business Usage: High usage of wire, Western Union, EMT</li>
        <li>Personal vs Business Mismatch: Personal spending exceeds business sales</li>
      </ol>

      <h3 className="text-lg font-semibold mt-4 mb-2">B. Statistical Test Comparison</h3>
      <Table
        headers={["Test", "Use Case", "Data Type", "Example"]}
        rows={[
          ["Fisher's Exact", "Comparing proportions", "Categorical (yes/no)", "Does structuring happen more often?"],
          ["Mann-Whitney U", "Comparing distributions", "Continuous (amounts)", "Are transaction amounts higher?"],
          ["Chi-Square", "Comparing distributions", "Categorical (multiple)", "Distribution across merchant types"],
          ["t-test", "Comparing means", "Continuous (normal)", "Rarely used (financial data not normal)"],
        ]}
      />
      <p className="mt-2 text-sm text-gray-600">
        Why Mann-Whitney U for financial data: Handles skewed distributions, robust to outliers, works with small sample sizes, no normality assumptions.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2">C. Code Repository Structure</h3>
      <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`/aml-detection/
├── README.md                                    # This file
├── scripts/
│   ├── aml_hypothesis_validation.py            # Hypotheses 1-6
│   ├── aml_enhanced_hypotheses_v2.py           # Hypotheses 7-14
│   ├── occupation_business_hypotheses_with_stats.py  # Hypotheses 15-19
│   └── regulatory_hypotheses.py                # Hypotheses 24-29
├── data/
│   ├── master_data.csv                         # Transaction data
│   └── label.csv                               # Customer labels
└── outputs/
    ├── hypothesis_results.csv                  # All test results
    └── flagged_customers.csv                   # High-risk customers`}
      </pre>

      <h3 className="text-lg font-semibold mt-4 mb-2">D. Data Dictionary</h3>

      <h4 className="font-semibold mt-2">Transaction Columns</h4>
      <Table
        headers={["Column", "Type", "Description"]}
        rows={[
          ["transaction_id", "String", "Unique transaction identifier"],
          ["customer_id", "String", "Unique customer identifier"],
          ["card_amount", "Float", "Card transaction amount in CAD"],
          ["abm_amount", "Float", "ATM transaction amount in CAD"],
          ["cheque_amount", "Float", "Cheque transaction amount in CAD"],
          ["card_datetime", "Datetime", "Card transaction timestamp"],
          ["from_card", "Boolean", "True if card transaction"],
          ["card_merchant_category", "String", "Merchant category code"],
          ["card_ecommerce_indicator", "Boolean", "True if e-commerce transaction"],
        ]}
      />

      <h4 className="font-semibold mt-2">Customer Columns</h4>
      <Table
        headers={["Column", "Type", "Description"]}
        rows={[
          ["customer_id", "String", "Unique customer identifier"],
          ["customer_occupation_code", "String", "Occupation code"],
          ["customer_occupation_title", "String", "Occupation title (readable)"],
          ["customer_income", "Float", "Annual income in CAD"],
          ["customer_birth_date", "Date", "Date of birth"],
          ["customer_onboard_date", "Date", "Account opening date"],
        ]}
      />

      <h4 className="font-semibold mt-2">Business Columns</h4>
      <Table
        headers={["Column", "Type", "Description"]}
        rows={[
          ["business_sales", "Float", "Annual sales in CAD"],
          ["business_employee_count", "Integer", "Number of employees"],
          ["business_industry_code", "String", "Industry classification code"],
          ["from_kyc_smallbusiness", "Boolean", "True if business customer"],
        ]}
      />

      <h4 className="font-semibold mt-2">Label Column</h4>
      <Table
        headers={["Column", "Type", "Description"]}
        rows={[
          ["label", "Integer", "0=normal, 1=suspicious"],
        ]}
      />

      <h3 className="text-lg font-semibold mt-4 mb-2">Contact & Contributions</h3>
      <p>
        <strong>Document Version:</strong> 1.0<br />
        <strong>Last Updated:</strong> December 2024<br />
        <strong>Maintained by:</strong> AML Detection Research Team
      </p>
      <p className="mt-2">For questions, suggestions, or to report issues, please contact the research team.</p>

      <h3 className="text-lg font-semibold mt-4 mb-2">License</h3>
      <p>This documentation is proprietary and confidential. Unauthorized distribution is prohibited.</p>
    </Section>
  )
}