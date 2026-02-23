import React from "react"

export default function KnowledgeLibraryPage() {
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
                <NavLink href="#executive-summary">1. Executive Summary</NavLink>
                <NavLink href="#how-it-can-be-used">2. How It Can Be Used</NavLink>
                <NavLink href="#usage-examples">3. Usage Examples</NavLink>
              </nav>
            </div>
          </aside>

          {/* Main */}
          <main className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-10 space-y-20">

              <ExecutiveSummary />
              <HowItCanBeUsed />
              <UsageExamples/>

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

function ExecutiveSummary() {
  return (
    <Section id="executive-summary" title="Executive Summary">
      <p className="mb-4">
        This AML Knowledge Library documents a <strong>dual methodology</strong> 
        for money laundering detection combining hypothesis-driven validation with 
        machine learning discovery. We tested <strong>29 hypotheses</strong> derived 
        from regulatory guidance on <strong>5.9 million transactions</strong> and 
        <strong> 10 labeled suspicious customers</strong>, then built machine learning 
        models using comprehensive feature sets to discover patterns beyond individual 
        hypothesis tests.
      </p>

      <h3 className="text-lg font-semibold mb-2">Methodological Approach</h3>
      <ul className="list-disc pl-6 space-y-1 mb-4">
        <li>
          <strong>Phase 1:</strong> Hypothesis testing identified 3 statistically validated 
          patterns and 3 operationally effective patterns
        </li>
        <li>
          <strong>Phase 2:</strong> Machine learning models trained on full feature sets 
          to discover feature interactions and non-linear patterns
        </li>
        <li>
          <strong>Phase 3:</strong> Cross-validation between rule-based and ML-based 
          detections to build confidence despite limited labeled data
        </li>
      </ul>

      <h3 className="text-lg font-semibold mb-2">Key Findings</h3>
      <ul className="list-disc pl-6 space-y-1 mb-4">
        <li><strong>Validated Features:</strong> Structuring (p=0.0081), income mismatch (p=0.0001), occupation anomalies (students, unemployed)</li>
        <li><strong>Rule-Based Detection:</strong> 70% recall using hypothesis-based flags</li>
        <li><strong>ML Approach:</strong> Discovers feature combinations and interactions not captured by univariate tests</li>
        <li><strong>Combined Strategy:</strong> Triangulation approach treats hypotheses as domain-validated guardrails while ML explores pattern discovery</li>
      </ul>

      <p className="text-sm text-gray-600">
        <strong>Important Caveat:</strong> Our labeled dataset (n=10 suspicious, n=990 normal) 
        is manually curated and should be interpreted as directional rather than definitive. 
        We intentionally use both hypothesis-driven and data-driven approaches to mitigate 
        the limitations of small sample size and potential labeling biases.
      </p>
    </Section>
  )
}

function HowItCanBeUsed() {
  return (
    <Section id="how-it-can-be-used" title="How It Can Be Used">
      <div className="space-y-12 text-gray-700">

        {/* For Modeling Experts */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            For Modeling Experts
          </h3>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Feature Engineering:</strong> Use the 6 validated indicators as model features</li>
            <li><strong>Model Training:</strong> Apply detection thresholds as training labels</li>
            <li><strong>Performance Benchmarking:</strong> Compare new models against 70% baseline recall</li>
            <li><strong>Feature Importance:</strong> Prioritize structuring, income mismatch, and occupation-based features</li>
          </ul>
        </div>

        {/* For AML Investigators */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            For AML Investigators
          </h3>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Case Prioritization:</strong> Focus on customers flagged by multiple indicators</li>
            <li><strong>Investigation Guidelines:</strong> Use hypothesis descriptions as red flag checklists</li>
            <li><strong>False Positive Reduction:</strong> 14.3% precision on structuring vs 1–5% industry standard</li>
            <li><strong>Manual Review Criteria:</strong> Examples of suspicious student and unemployed patterns</li>
          </ul>
        </div>

        {/* For Other User Groups */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            For Other User Groups
          </h3>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Compliance Officers:</strong> Regulatory alignment with FINTRAC and FinCEN guidance</li>
            <li><strong>Risk Managers:</strong> Quantified risk scores based on statistical significance</li>
            <li><strong>Data Scientists:</strong> Replicable methodology for testing new hypotheses</li>
            <li><strong>Auditors:</strong> Documented validation process with statistical rigor</li>
          </ul>
        </div>

      </div>
    </Section>
  )
}


function UsageExamples() {
  return (
    <Section id="usage-examples" title="Usage and Examples">
      <div className="space-y-12 text-gray-700">

        {/* For Modeling Experts */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            For Modeling Experts
          </h3>

          <h4 className="text-md font-medium mb-2">Feature Engineering Example</h4>
          <CodeBlock>
{`import pandas as pd

# Load and prepare data
df = pd.read_csv('master_data.csv')

# Create detection features
df['flag_structuring'] = df['amount_abs'].between(9000, 10000)
df['flag_student_mule'] = (
    df['occupation_code'].str.contains('STUDENT') & 
    (df['total_amount'] > 20000)
)
df['flag_unemployed_income'] = (
    df['occupation_code'].str.contains('UNEMPLOY') & 
    (df['income'] > 0)
)
df['income_mismatch_ratio'] = df['total_amount'] / df['income']
df['flag_shell_company'] = (
    (df['business_sales'] / df['business_employees']) > 500000
)

# Calculate risk score
df['risk_score'] = (
    df['flag_structuring'] * 2 +
    df['flag_student_mule'] * 2 +
    df['flag_unemployed_income'] * 3 +
    (df['income_mismatch_ratio'] > 100) * 3 +
    df['flag_shell_company'] * 2
)

# Flag high-risk customers
high_risk = df[df['risk_score'] >= 4]`}
          </CodeBlock>
        </div>

        {/* For AML Investigators */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            For AML Investigators
          </h3>

          <h4 className="text-md font-medium mb-2">Investigation Checklist</h4>
          <ol className="list-decimal pl-6 space-y-1">
            <li><strong>Check structuring:</strong> Any transactions $9K-$10K?</li>
            <li><strong>Check occupation:</strong> Student or unemployed?</li>
            <li><strong>Check income mismatch:</strong> Transactions much greater than income?</li>
            <li><strong>Check business profile:</strong> Sales-per-employee ratio extreme?</li>
            <li><strong>Review transaction types:</strong> Diversity pattern?</li>
          </ol>

          <h4 className="text-md font-medium mt-4 mb-2">Priority Levels</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>3+ flags:</strong> Immediate investigation (highest precision)</li>
            <li><strong>2 flags:</strong> High priority review</li>
            <li><strong>1 flag:</strong> Standard monitoring</li>
          </ul>
        </div>

      </div>
    </Section>
  )
}