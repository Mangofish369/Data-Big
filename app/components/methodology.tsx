import React from "react"

export default function Methodology2() {
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
                <NavLink href="#methodology">1. Methodology</NavLink>
                <NavLink href="#dual-methodology-hypothesis-testing--machine-learning">2. Dual Methodology</NavLink>
                <NavLink href="#machine-learning-models">3. Machine Learning Models</NavLink>
                <NavLink href="#performance-summary">4. Performance Summary</NavLink>
                <NavLink href="#design-decisions-dependencies-and-assumptions">5. Design Decisions</NavLink>
                <NavLink href="#limitations-and-future-work">6. Limitations & Future Work</NavLink>
              </nav>
            </div>
          </aside>

          {/* Main */}
          <main className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-10 space-y-20">
              <Methodology />
              <DualMethodology />
              <MachineLearningModels />
              <PerformanceSummary />
              <DesignDecisions />
              <Limitations />
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

function DualMethodology() {
  return (
    <Section
      id="dual-methodology-hypothesis-testing--machine-learning"
      title="Dual Methodology: Hypothesis Testing + Machine Learning"
    >
      <div className="space-y-16 text-sm leading-6 text-gray-700">

        {/* Why Both Approaches */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Why We Use Both Approaches
          </h3>

          <div className="grid md:grid-cols-2 gap-8">

            {/* Hypothesis Testing */}
            <div className="border rounded-xl p-6 bg-white shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-4">
                Hypothesis Testing (Rule-Based Detection)
              </h4>

              <p className="font-medium text-gray-900 mb-2">Strengths</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Grounded in regulatory guidance (FINTRAC, FinCEN)</li>
                <li>Statistically validated with interpretable p-values</li>
                <li>Clear, explainable rules for investigators</li>
                <li>Effective with limited training data</li>
                <li>Directly testable against compliance requirements</li>
              </ul>

              <p className="font-medium text-gray-900 mb-2">Limitations</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-600">
                <li>Univariate (assumes feature independence)</li>
                <li>May miss non-linear interactions</li>
                <li>Limited discovery of novel patterns</li>
                <li>Rigid thresholds</li>
              </ul>
            </div>

            {/* Machine Learning */}
            <div className="border rounded-xl p-6 bg-white shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-4">
                Machine Learning (Pattern Discovery)
              </h4>

              <p className="font-medium text-gray-900 mb-2">Strengths</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Discovers feature interactions</li>
                <li>Learns non-linear relationships</li>
                <li>Improves with additional data</li>
                <li>Identifies novel laundering techniques</li>
                <li>Probability-based risk scoring</li>
              </ul>

              <p className="font-medium text-gray-900 mb-2">Limitations</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-600">
                <li>Requires sufficient labeled data (n=10 constraint)</li>
                <li>Less interpretable (black box risk)</li>
                <li>Overfitting risk</li>
                <li>Sensitive to class imbalance (1% suspicious)</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Integrated Solution */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Our Integrated Solution
          </h3>

          <div className="space-y-8">

            <div className="border rounded-lg p-6 bg-gray-50">
              <h4 className="font-semibold text-gray-900 mb-2">
                Phase 1: Hypothesis-Driven Feature Validation
              </h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Test 29 hypotheses on labeled data</li>
                <li>Identify statistically significant patterns (p &lt; 0.05)</li>
                <li>Validate against regulatory guidance</li>
                <li>Establish baseline detection performance (70% recall)</li>
              </ul>
            </div>

            <div className="border rounded-lg p-6 bg-gray-50">
              <h4 className="font-semibold text-gray-900 mb-2">
                Phase 2: Machine Learning with Comprehensive Features
              </h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Train models using validated + exploratory features</li>
                <li>Discover feature interactions</li>
                <li>Learn patterns not individually significant</li>
                <li>Generate probability-based risk scores</li>
              </ul>
            </div>

            <div className="border rounded-lg p-6 bg-gray-50">
              <h4 className="font-semibold text-gray-900 mb-2">
                Phase 3: Cross-Validation and Reconciliation
              </h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Compare ML predictions vs hypothesis flags</li>
                <li>Analyze feature importance alignment</li>
                <li>Investigate discrepancies</li>
                <li>Build multi-method confidence</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Feature Tiering */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Feature Tiering Strategy
          </h3>

          <div className="space-y-8">

            {/* Tier 1 */}
            <div className="border rounded-lg p-6 bg-green-50">
              <h4 className="font-semibold text-gray-900 mb-3">
                Tier 1: Validated Hypothesis Features (High Confidence)
              </h4>
              <ul className="list-disc pl-6 space-y-1">
                <li><code>flag_structuring</code> (p=0.0081)</li>
                <li><code>income_mismatch_ratio</code> (p=0.0001)</li>
                <li><code>flag_student_mule</code></li>
                <li><code>flag_unemployed_income</code></li>
                <li><code>flag_shell_company</code></li>
              </ul>
              <p className="mt-3 text-gray-700">
                Used for direct alerts AND ML features.
              </p>
            </div>

            {/* Tier 2 */}
            <div className="border rounded-lg p-6 bg-yellow-50">
              <h4 className="font-semibold text-gray-900 mb-3">
                Tier 2: Exploratory Features (Model Discovery)
              </h4>
              <ul className="list-disc pl-6 space-y-1">
                <li><code>num_transactions</code> (p=0.68)</li>
                <li><code>total_amount</code> (p=0.06)</li>
                <li><code>std_amount</code> (p=0.69)</li>
                <li>Transaction channel counts</li>
              </ul>
              <p className="mt-3 text-gray-700">
                Used in ML only, not as standalone rules.
              </p>
            </div>

            {/* Tier 3 */}
            <div className="border rounded-lg p-6 bg-blue-50">
              <h4 className="font-semibold text-gray-900 mb-3">
                Tier 3: Supporting Features
              </h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Debit/credit ratios</li>
                <li>Channel diversity measures</li>
                <li>Temporal patterns</li>
                <li>Geographic patterns</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Validation Framework */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Validation Framework
          </h3>

          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-900">
                <tr>
                  <th className="px-4 py-2 text-left">Scenario</th>
                  <th className="px-4 py-2 text-left">Interpretation</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-2 font-medium">ML + Hypothesis</td>
                  <td className="px-4 py-2">High confidence detection</td>
                  <td className="px-4 py-2">Prioritize investigation</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">ML only</td>
                  <td className="px-4 py-2">Novel pattern / potential false positive</td>
                  <td className="px-4 py-2">Manual review</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Hypothesis only</td>
                  <td className="px-4 py-2">Known pattern missed by model</td>
                  <td className="px-4 py-2">Review model training</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">No flags</td>
                  <td className="px-4 py-2">Low risk</td>
                  <td className="px-4 py-2">Standard monitoring</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Data Limitations */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Acknowledging Data Limitations
          </h3>

          <div className="bg-red-50 border rounded-lg p-6">
            <p className="mb-3">
              Dataset contains 10 suspicious customers out of 1,000 (1% positive class).
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>May reflect specific investigation contexts</li>
              <li>Potential labeling errors or biases</li>
              <li>Not full laundering spectrum</li>
              <li>Insufficient for definitive conclusions</li>
            </ul>

            <p className="mt-4 font-medium text-gray-900">
              Our Response: Use triangulation to balance domain expertise and empirical discovery.
            </p>
          </div>
        </div>

      </div>
    </Section>
  )
}


function DesignDecisions() {
  return (
    <Section
      id="design-decisions-dependencies-and-assumptions"
      title="Design Decisions, Dependencies, and Assumptions"
    >
      <div className="space-y-12 text-sm leading-6 text-gray-700">

        {/* Design Decisions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Design Decisions
          </h3>

          {/* Statistical Testing */}
          <div className="mb-8">
            <h4 className="font-medium text-gray-900 mb-3">
              Statistical Testing Approach
            </h4>

            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Fisher’s Exact Test</strong> for categorical data</li>
              <li><strong>Mann-Whitney U Test</strong> for continuous data</li>
              <li><strong>Significance threshold:</strong> p &lt; 0.05</li>
              <li>
                Appropriate for small sample size (n=10 suspicious) and
                non-normal financial distributions
              </li>
            </ul>
          </div>

          {/* Threshold Selection */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">
              Threshold Selection
            </h4>

            <div className="overflow-x-auto border rounded-lg">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-900">
                  <tr>
                    <th className="px-4 py-2 text-left">Hypothesis</th>
                    <th className="px-4 py-2 text-left">Threshold</th>
                    <th className="px-4 py-2 text-left">Rationale</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-4 py-2">Structuring</td>
                    <td className="px-4 py-2">$9,000 – $10,000</td>
                    <td className="px-4 py-2">Regulatory threshold minus buffer</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Student money mules</td>
                    <td className="px-4 py-2">&gt;$20,000</td>
                    <td className="px-4 py-2">Based on dataset median analysis</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Income mismatch</td>
                    <td className="px-4 py-2">&gt;100x ratio</td>
                    <td className="px-4 py-2">Derived from 4,360x observed</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Unemployed with income</td>
                    <td className="px-4 py-2">Income &gt; $0</td>
                    <td className="px-4 py-2">Logical contradiction</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Shell companies</td>
                    <td className="px-4 py-2">&gt;$500,000 sales/employee</td>
                    <td className="px-4 py-2">Industry benchmarking</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Feature Engineering */}
          <div className="mt-8">
            <h4 className="font-medium text-gray-900 mb-3">
              Feature Engineering
            </h4>

            <ul className="list-disc pl-6 space-y-2">
              <li>Unified amount column from 7 transaction types</li>
              <li>Unified datetime column from 7 transaction types</li>
              <li>Aggregated to customer level for hypothesis testing</li>
              <li>Preserved transaction-level detail for temporal analysis</li>
            </ul>
          </div>
        </div>

        {/* Dependencies */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Dependencies
          </h3>

          {/* Required Data Columns */}
          <div className="mb-8">
            <h4 className="font-medium text-gray-900 mb-3">
              Required Data Columns
            </h4>

            <p className="font-medium text-gray-900">Transaction Level</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>customer_id</li>
              <li>Amount columns (7 types)</li>
              <li>Datetime columns (7 types)</li>
              <li>Transaction type flags (7 types)</li>
            </ul>

            <p className="font-medium text-gray-900">Customer Level</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>occupation_code / occupation_title</li>
              <li>income</li>
              <li>birth_date</li>
            </ul>

            <p className="font-medium text-gray-900">Business Level</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>business_sales</li>
              <li>business_employee_count</li>
            </ul>

            <p className="font-medium text-gray-900">Labels</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>label (0=normal, 1=suspicious)</li>
            </ul>
          </div>

          {/* Software Dependencies */}
          <div className="mb-8">
            <h4 className="font-medium text-gray-900 mb-3">
              Software Dependencies
            </h4>

            <div className="bg-gray-50 border rounded-lg p-4 font-mono text-xs">
              Python 3.12+ <br />
              pandas 2.0+ <br />
              numpy 1.24+ <br />
              scipy 1.10+ (statistical tests)
            </div>
          </div>

          {/* Data Quality Requirements */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">
              Data Quality Requirements
            </h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>≥95% transactions with valid amount and datetime</li>
              <li>Occupation data for ≥50% of customers</li>
              <li>Income data for ≥35% of customers</li>
              <li>Business data available for business customers</li>
            </ul>
          </div>
        </div>

        {/* Assumptions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Assumptions
          </h3>

          <div className="space-y-8">

            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Statistical Assumptions
              </h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>10 suspicious customers represent broader behavior</li>
                <li>Normal customers (n=963) form legitimate baseline</li>
                <li>Independent observations (no networks assumed)</li>
                <li>Labels assumed accurate</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Business Assumptions
              </h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Students should not transact &gt;$20,000 in 3 months</li>
                <li>Unemployed should not report employment income</li>
                <li>Sales per employee &lt;$500,000 for legitimate firms</li>
                <li>Transactions just below $10,000 imply structuring intent</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Data Assumptions
              </h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Data window (Nov 2024 – Jan 2025) is representative</li>
                <li>Missing data assumed random (MCAR)</li>
                <li>Currency assumed CAD</li>
                <li>Occupation codes standardized and accurate</li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </Section>
  )
}

function Methodology() {
  return (
    <Section id="methodology" title="Methodology">
      <div className="space-y-12 text-sm leading-6 text-gray-700">

        {/* Hypothesis Development Process */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Hypothesis Development Process
          </h3>

          <div className="space-y-6">

            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Step 1: Literature Review
              </h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Reviewed FINTRAC operational alerts and ML indicators</li>
                <li>Reviewed FinCEN advisory documents (BCS alerts, CMLN guidance)</li>
                <li>Identified 29 potential detection patterns</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Step 2: Hypothesis Formulation
              </h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Theory:</strong> Why pattern indicates money laundering</li>
                <li><strong>Test:</strong> Measurable detection question</li>
                <li><strong>Validation:</strong> Statistical or operational proof</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Step 3: Implementation
              </h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Created unified data features</li>
                <li>Aggregated transactions to customer level</li>
                <li>Applied detection logic</li>
                <li>Calculated performance metrics</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Step 4: Statistical Validation
              </h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Selected appropriate test (Fisher's Exact / Mann-Whitney U)</li>
                <li>Compared suspicious vs normal customers</li>
                <li>Calculated p-values and effect sizes</li>
                <li>Significance threshold α = 0.05</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Validated Hypotheses */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Validated Hypotheses
          </h3>

          {/* Hypothesis 5 */}
          <div className="mb-8">
            <h4 className="font-medium text-gray-900 mb-3">
              Hypothesis 5: Structuring
            </h4>

            <div className="overflow-x-auto border rounded-lg mb-4">
              <table className="min-w-full text-sm">
                <tbody className="divide-y">
                  <tr>
                    <td className="px-4 py-2 font-medium">Theory</td>
                    <td className="px-4 py-2">Avoid $10K reporting threshold</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Test</td>
                    <td className="px-4 py-2">Transactions in $9K–$10K range</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Validation</td>
                    <td className="px-4 py-2">Fisher’s Exact Test (p=0.0081)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Result</td>
                    <td className="px-4 py-2">20% recall, 14.3% precision, 19.8x odds</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Status</td>
                    <td className="px-4 py-2 text-green-600 font-semibold">
                      STATISTICALLY SUPPORTED
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul className="list-disc pl-6 space-y-1">
              <li>2/10 suspicious structure</li>
              <li>12/963 normal structure (1.2%)</li>
              <li>19.8x more likely if suspicious</li>
            </ul>
          </div>

          {/* Hypothesis 13 */}
          <div className="mb-8">
            <h4 className="font-medium text-gray-900 mb-3">
              Hypothesis 13: Income Mismatch
            </h4>

            <div className="overflow-x-auto border rounded-lg mb-4">
              <table className="min-w-full text-sm">
                <tbody className="divide-y">
                  <tr>
                    <td className="px-4 py-2 font-medium">Theory</td>
                    <td className="px-4 py-2">Transactions exceed legitimate income</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Test</td>
                    <td className="px-4 py-2">Transaction-to-income ratio</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Validation</td>
                    <td className="px-4 py-2">Mann-Whitney U (p=0.0001)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Result</td>
                    <td className="px-4 py-2">40% recall (2/2 income cases)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Status</td>
                    <td className="px-4 py-2 text-green-600 font-semibold">
                      STATISTICALLY SUPPORTED
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Operationally Validated */}
          <div className="space-y-8">

            <div>
              <h4 className="font-medium text-gray-900 mb-3">
                Hypothesis 15: Student Money Mules
              </h4>
              <p>80% recall among students (4/5), 40% overall.</p>
              <p className="text-blue-600 font-medium mt-1">
                OPERATIONALLY VALIDATED
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">
                Hypothesis 16: Unemployed with Income
              </h4>
              <p>40% recall (4/10). Logical inconsistency indicator.</p>
              <p className="text-blue-600 font-medium mt-1">
                OPERATIONALLY VALIDATED
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">
                Hypothesis 17: Shell Companies
              </h4>
              <p>10% recall (1/10). Flagged 236 businesses.</p>
              <p className="text-blue-600 font-medium mt-1">
                OPERATIONALLY VALIDATED
              </p>
            </div>

          </div>
        </div>

        {/* Failed Hypotheses */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Failed Hypotheses (Not Supported)
          </h3>

          <div className="overflow-x-auto border rounded-lg mb-4">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-900">
                <tr>
                  <th className="px-4 py-2 text-left">Hypothesis</th>
                  <th className="px-4 py-2 text-left">p-value</th>
                  <th className="px-4 py-2 text-left">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr><td className="px-4 py-2">H1 High Volume</td><td className="px-4 py-2">0.68</td><td className="px-4 py-2">Not supported</td></tr>
                <tr><td className="px-4 py-2">H2 Large Amounts</td><td className="px-4 py-2">0.15</td><td className="px-4 py-2">Not supported</td></tr>
                <tr><td className="px-4 py-2">H3 Total Value</td><td className="px-4 py-2">0.06</td><td className="px-4 py-2">Borderline</td></tr>
                <tr><td className="px-4 py-2">H4 Round Numbers</td><td className="px-4 py-2">0.77</td><td className="px-4 py-2">Not supported</td></tr>
                <tr><td className="px-4 py-2">H6 Variance</td><td className="px-4 py-2">0.69</td><td className="px-4 py-2">Not supported</td></tr>
                <tr><td className="px-4 py-2">H7 High-Risk Merchants</td><td className="px-4 py-2">1.0</td><td className="px-4 py-2">Not supported</td></tr>
                <tr><td className="px-4 py-2">H8 E-commerce</td><td className="px-4 py-2">1.0</td><td className="px-4 py-2">Not supported</td></tr>
                <tr><td className="px-4 py-2">H9 Cash Withdrawals</td><td className="px-4 py-2">1.0</td><td className="px-4 py-2">Not supported</td></tr>
                <tr><td className="px-4 py-2">H10 Geographic Risk</td><td className="px-4 py-2">&gt;0.05</td><td className="px-4 py-2">Not supported</td></tr>
                <tr><td className="px-4 py-2">H11 Timing</td><td className="px-4 py-2">0.93</td><td className="px-4 py-2">Not supported</td></tr>
                <tr><td className="px-4 py-2">H12 Velocity</td><td className="px-4 py-2">0.19</td><td className="px-4 py-2">Not supported</td></tr>
                <tr><td className="px-4 py-2">H14 Diversity</td><td className="px-4 py-2">&gt;0.05</td><td className="px-4 py-2">Not supported</td></tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gray-50 border rounded-lg p-4">
            <p className="font-medium text-gray-900 mb-1">Key Finding</p>
            <p>
              Traditional AML indicators (volume, timing, geography) failed completely.
              Sophisticated actors avoid obvious patterns.
            </p>
          </div>
        </div>

      </div>
    </Section>
  )
}

function PerformanceSummary() {
  return (
    <Section id="performance-summary" title="Performance Summary">
      <div className="space-y-12 text-sm leading-6 text-gray-700">

        {/* Detection Coverage */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Detection Coverage
          </h3>

          <div className="overflow-x-auto border rounded-lg mb-8">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-900">
                <tr>
                  <th className="px-4 py-2 text-left">Metric</th>
                  <th className="px-4 py-2 text-left">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-2">Total suspicious customers</td>
                  <td className="px-4 py-2">10</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Caught by at least 1 hypothesis</td>
                  <td className="px-4 py-2">7</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Overall recall</td>
                  <td className="px-4 py-2 font-medium text-green-600">70%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Precision</td>
                  <td className="px-4 py-2">Varies (14.3% – 40%)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* By Hypothesis */}
          <h4 className="font-medium text-gray-900 mb-3">By Hypothesis</h4>

          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-900">
                <tr>
                  <th className="px-4 py-2 text-left">Hypothesis</th>
                  <th className="px-4 py-2 text-left">Recall</th>
                  <th className="px-4 py-2 text-left">Customers Caught</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-2">H5: Structuring</td>
                  <td className="px-4 py-2">20%</td>
                  <td className="px-4 py-2">2 / 10</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">H13: Income Mismatch</td>
                  <td className="px-4 py-2">20%</td>
                  <td className="px-4 py-2">2 / 10 (income data limited)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">H15: Student Mules</td>
                  <td className="px-4 py-2">40%</td>
                  <td className="px-4 py-2">4 / 10 (80% of students)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">H16: Unemployed Income</td>
                  <td className="px-4 py-2">40%</td>
                  <td className="px-4 py-2">4 / 10</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">H17: Shell Companies</td>
                  <td className="px-4 py-2">10%</td>
                  <td className="px-4 py-2">1 / 10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Customers Caught */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Customers Caught (7 / 10)
          </h3>

          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-900">
                <tr>
                  <th className="px-4 py-2 text-left">Customer ID</th>
                  <th className="px-4 py-2 text-left">Flags</th>
                  <th className="px-4 py-2 text-left">Hypotheses Triggered</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-2 font-mono">SYNID0100957188</td>
                  <td className="px-4 py-2">1</td>
                  <td className="px-4 py-2">Unemployed with income</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">SYNID0101421130</td>
                  <td className="px-4 py-2">1</td>
                  <td className="px-4 py-2">Unemployed with income</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">SYNID0105593361</td>
                  <td className="px-4 py-2">2</td>
                  <td className="px-4 py-2">Student mule + Unemployed</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">SYNID0107334515</td>
                  <td className="px-4 py-2">1</td>
                  <td className="px-4 py-2">Student mule</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">SYNID0107464935</td>
                  <td className="px-4 py-2">2</td>
                  <td className="px-4 py-2">Student mule + Unemployed</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">SYNID0107832828</td>
                  <td className="px-4 py-2">1</td>
                  <td className="px-4 py-2">Student mule</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">SYNID0200755995</td>
                  <td className="px-4 py-2">1</td>
                  <td className="px-4 py-2">Shell company</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Missed Customers */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Missed Customers (3 / 10)
          </h3>

          <div className="overflow-x-auto border rounded-lg mb-4">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-900">
                <tr>
                  <th className="px-4 py-2 text-left">Customer ID</th>
                  <th className="px-4 py-2 text-left">Why Missed</th>
                  <th className="px-4 py-2 text-left">Pattern</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-2 font-mono">SYNID0200187014</td>
                  <td className="px-4 py-2">Missing business data</td>
                  <td className="px-4 py-2">Lawyer, 1 employee, zero transactions</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">SYNID0200496670</td>
                  <td className="px-4 py-2">Missing business data</td>
                  <td className="px-4 py-2">Real estate, unreported sales</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">SYNID0200755574</td>
                  <td className="px-4 py-2">Missing business data</td>
                  <td className="px-4 py-2">Holding company, unreported employees</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gray-50 border rounded-lg p-4">
            <p className="font-medium text-gray-900 mb-1">Common Pattern</p>
            <p>
              All three missed customers are businesses with missing financial
              data (sales/employees), preventing detection via business-based rules.
            </p>
          </div>
        </div>

      </div>
    </Section>
  )
}

function MachineLearningModels() {
  return (
    <Section id="machine-learning-models" title="Machine Learning Models">
      <div className="space-y-12 text-sm leading-6 text-gray-700">

        {/* Overview */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Overview</h3>
          <p>
            In addition to rule-based detection using validated hypotheses, we
            developed machine learning models to discover feature combinations
            and patterns not captured by univariate statistical tests.
          </p>
        </div>

        {/* Model Architecture */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Model Architecture
          </h3>

          <div className="bg-gray-50 border rounded-lg p-4 mb-4">
            <p><strong>Algorithm:</strong> Logistic Regression with L2 regularization</p>
          </div>

          <h4 className="font-medium text-gray-900 mb-2">Rationale</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Interpretable coefficients (feature importance)</li>
            <li>Probability outputs enable risk scoring</li>
            <li>Works well with limited labeled data</li>
            <li>Regularization prevents overfitting</li>
            <li>Fast training and prediction</li>
          </ul>

          <p className="mt-4">
            <strong>Preprocessing:</strong> StandardScaler normalization applied
            to all features to ensure equal contribution regardless of scale.
          </p>
        </div>

        {/* Feature Set */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Feature Set
          </h3>

          <div className="space-y-4">
            <div>
              <p className="font-medium text-gray-900">
                Tier 1 Features (5)
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>flag_structuring</li>
                <li>income_mismatch_ratio</li>
                <li>flag_student_mule</li>
                <li>flag_unemployed_income</li>
                <li>flag_shell_company</li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900">
                Tier 2 Features (14)
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>num_transactions, total_amount, avg_amount, max_amount, std_amount</li>
                <li>num_debit, num_credit</li>
                <li>num_abm, num_card, num_cheque, num_eft, num_emt, num_westernunion, num_wire</li>
              </ul>
            </div>

            <div>
              <p><strong>Tier 3:</strong> Supporting contextual features (as available)</p>
              <p><strong>Total Features:</strong> 19+ depending on availability</p>
            </div>
          </div>
        </div>

        {/* Training Approach */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Training Approach
          </h3>

          <CodeBlock>
{`# Train/test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=21
)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train model
model = LogisticRegression(random_state=0)
model.fit(X_train_scaled, y_train)`}
          </CodeBlock>
        </div>

        {/* Handling Class Imbalance */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Handling Class Imbalance
          </h3>

          <ul className="list-disc pl-6 space-y-2">
            <li>Class weighting for positive class</li>
            <li>Threshold tuning (0.5 → 0.1)</li>
            <li>Precision-recall focused evaluation</li>
            <li>Stratified cross-validation</li>
          </ul>

          <p className="mt-4 text-gray-600">
            SMOTE considered but not used due to risk of unrealistic synthetic laundering patterns.
          </p>
        </div>

        {/* Model Performance */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Model Performance
          </h3>

          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-900">
                <tr>
                  <th className="px-4 py-2 text-left">Method</th>
                  <th className="px-4 py-2 text-left">Precision</th>
                  <th className="px-4 py-2 text-left">Recall</th>
                  <th className="px-4 py-2 text-left">F1</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-2">Rule-based</td>
                  <td className="px-4 py-2">14.3%</td>
                  <td className="px-4 py-2">70%</td>
                  <td className="px-4 py-2">0.24</td>
                  <td className="px-4 py-2">Validated</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">ML Model</td>
                  <td className="px-4 py-2">TBD</td>
                  <td className="px-4 py-2">TBD</td>
                  <td className="px-4 py-2">TBD</td>
                  <td className="px-4 py-2">In Progress</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Ensemble</td>
                  <td className="px-4 py-2">TBD</td>
                  <td className="px-4 py-2">TBD</td>
                  <td className="px-4 py-2">TBD</td>
                  <td className="px-4 py-2">Proposed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Probability Thresholding */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Probability Thresholding
          </h3>

          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Default:</strong> 0.5</li>
            <li><strong>Adjusted:</strong> 0.1 (increase recall)</li>
          </ul>

          <div className="mt-4 bg-gray-50 border rounded-lg p-4">
            <p className="font-medium text-gray-900 mb-2">Risk Score Interpretation</p>
            <ul className="space-y-1">
              <li>0.0 – 0.1: Very Low</li>
              <li>0.1 – 0.3: Low (Review)</li>
              <li>0.3 – 0.5: Medium</li>
              <li>0.5 – 0.7: High</li>
              <li>0.7 – 1.0: Very High</li>
            </ul>
          </div>
        </div>

        {/* Ensemble Approach */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Ensemble Approach (Proposed)
          </h3>

          <CodeBlock>
{`rule_score = (
    flag_structuring * 2 +
    flag_student_mule * 2 +
    flag_unemployed_income * 3 +
    (income_mismatch_ratio > 100) * 3 +
    flag_shell_company * 2
)

ml_score = model.predict_proba(X_scaled)[:, 1] * 10
final_score = (0.6 * rule_score) + (0.4 * ml_score)
high_risk = final_score >= 4`}
          </CodeBlock>

          <p className="mt-4">
            <strong>Weighting:</strong> 60% rule-based, 40% ML-based.  
            Threshold = 4 to balance precision and recall.
          </p>

          <p className="mt-2 text-gray-600">
            Ensemble system proposed but not yet implemented.
          </p>
        </div>

      </div>
    </Section>
  )
}

function Limitations() {
  return (
    <Section
      id="limitations-and-future-work"
      title="Limitations and Future Work"
    >
      <div className="space-y-12 text-sm leading-6 text-gray-700">

        {/* Current Limitations */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Current Limitations
          </h3>

          {/* Data Limitations */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-2">
              Data Limitations
            </h4>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Small suspicious sample:</strong> Only 10 labeled suspicious customers limits statistical power and generalization.</li>
              <li><strong>Manual labeling:</strong> Labels may contain errors, biases, or reflect specific investigation contexts.</li>
              <li><strong>Limited time period:</strong> 3-month window may not capture seasonal or long-term patterns.</li>
              <li><strong>Missing data:</strong> Income (35%), occupation (50%), business data only for business customers.</li>
              <li><strong>Class imbalance:</strong> 1% positive class (10/1,000) challenges both statistical testing and ML training.</li>
            </ul>
          </div>

          {/* Hypothesis Testing Limitations */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-2">
              Hypothesis Testing Limitations
            </h4>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Univariate tests:</strong> Evaluate features independently, missing interactions.</li>
              <li><strong>Small sample bias:</strong> n=10 suspicious limits statistical power.</li>
              <li><strong>Static thresholds:</strong> Fixed cutoffs ($9K–$10K, $20K, $500K) may not adapt.</li>
              <li><strong>No network analysis:</strong> Cannot detect coordinated activity.</li>
              <li><strong>Temporal blind spots:</strong> Does not analyze behavioral change over time.</li>
            </ul>
          </div>

          {/* ML Limitations */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-2">
              Machine Learning Limitations
            </h4>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Risk of overfitting:</strong> Limited positive examples increase overfitting risk.</li>
              <li><strong>Label dependency:</strong> Model quality bounded by label accuracy.</li>
              <li><strong>Interpretability:</strong> Logistic regression partially interpretable; interactions harder to explain.</li>
              <li><strong>Missing features:</strong> Tier 1 features unavailable for some customers.</li>
              <li><strong>Threshold selection:</strong> 0.1 probability threshold chosen experimentally.</li>
            </ul>
          </div>

          {/* Integration Limitations */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              Integration Limitations
            </h4>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Reconciliation framework:</strong> Manual ML vs hypothesis disagreement review.</li>
              <li><strong>Feature correlation:</strong> Tier 2 features correlated (num_transactions, total_amount).</li>
              <li><strong>Missing validation:</strong> Need more labeled data to validate dual approach.</li>
            </ul>
          </div>
        </div>

        {/* Recommended Extensions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recommended Extensions
          </h3>

          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-2">
              Immediate Priorities
            </h4>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Expand labeled dataset.</li>
              <li>Comprehensive ML evaluation (precision, recall, F1, AUC).</li>
              <li>SMOTE experimentation.</li>
              <li>Feature importance validation.</li>
              <li>Threshold optimization using precision-recall curves.</li>
            </ol>
          </div>

          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-2">
              Medium-term Enhancements
            </h4>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Advanced ML models (Random Forest, XGBoost, Neural Networks).</li>
              <li>Temporal behavioral features.</li>
              <li>Network analysis for coordinated activity.</li>
              <li>External data integration (sanctions, PEP, adverse media).</li>
              <li>Automated reconciliation framework.</li>
            </ol>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              Long-term Vision
            </h4>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Online learning with continuous model updates.</li>
              <li>Ensemble methods (rules + ML models).</li>
              <li>Explainable AI (SHAP, LIME).</li>
              <li>Active learning prioritization.</li>
              <li>Regulatory alignment with evolving guidance.</li>
              <li>Benford’s Law integration.</li>
              <li>Federated cross-institutional learning.</li>
            </ol>
          </div>
        </div>

        {/* Validation Roadmap */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Validation Roadmap
          </h3>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Acquire additional labeled ground truth.</li>
            <li>Temporal validation on new periods.</li>
            <li>Cross-validation experiments (rules vs ML vs ensemble).</li>
            <li>Expert AML review of 100 flagged cases.</li>
            <li>Regulatory audit review.</li>
          </ol>
        </div>

        {/* Known Issues */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Known Issues
          </h3>

          <div className="bg-gray-50 border rounded-lg p-4 mb-6">
            <h4 className="font-medium text-gray-900 mb-2">
              Issue 1: Cheque Transaction Data Quality
            </h4>
            <p>
              27 normal customers excluded due to missing cheque datetime unification.
              All 10 suspicious customers included.
            </p>
            <p className="mt-2">
              <strong>Impact:</strong> Minimal on results but limits coverage.
            </p>
            <p>
              <strong>Fix:</strong> Debug column merge logic in consolidation script.
            </p>
          </div>

          <div className="bg-gray-50 border rounded-lg p-4 mb-6">
            <h4 className="font-medium text-gray-900 mb-2">
              Issue 2: Missing Business Data
            </h4>
            <p>
              3 of 10 suspicious customers could not be caught by business rules due to missing sales/employee data.
            </p>
            <p className="mt-2">
              <strong>Impact:</strong> Limits recall of business-based detection.
            </p>
            <p>
              <strong>Fix:</strong> Acquire complete business data or develop alternative detection.
            </p>
          </div>

          <div className="bg-gray-50 border rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">
              Issue 3: Tier 2 Feature Justification
            </h4>
            <p>
              ML models use features that failed statistical significance tests.
            </p>
            <p className="mt-2">
              <strong>Impact:</strong> Potential credibility concerns.
            </p>
            <p>
              <strong>Fix:</strong> Add documentation clarifying hypothesis vs ML methodology differences.
            </p>
          </div>
        </div>

      </div>
    </Section>
  )
}