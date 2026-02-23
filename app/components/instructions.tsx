export default function Instructions() {
  return (
    <div className="min-h-screen bg-slate-999 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-slate-900 text-slate-200 rounded-3xl shadow-2xl p-10">
        
        <h1 className="text-3xl font-semibold text-white">
          AML Checker – How to Use
        </h1>

        {/* File Requirements */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-medium mb-4 text-slate-100">
            File Requirements
          </h2>

          <ul className="space-y-2 text-slate-300">
            <li><span className="font-semibold text-white">1</span> kyc_individual.csv file</li>
            <li><span className="font-semibold text-white">1</span> kyc_business.csv file</li>
            <li><span className="font-semibold text-white">2 or more</span> transaction.csv files</li>
          </ul>
        </div>

        {/* Required Columns */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-medium mb-6 text-slate-100">
            Required Columns
          </h2>

          <p className="text-slate-400 mb-8">
            All CSV files must contain the specified columns exactly as shown below.
          </p>

          <FileTable
            title="KYC_INDIVIDUAL.csv"
            columns={["customer_id", "occupation_code", "income"]}
          />

          <FileTable
            title="KYC_BUSINESS.csv"
            columns={["customer_id", "industry_code", "sales"]}
          />

          <FileTable
            title="TRANSACTION.csv"
            columns={[
              "customer_id",
              "amount_cad",
              "debit_credit",
              "transaction_datetime",
            ]}
          />
        </div>
      </div>
    </div>
  );
}

type FileTableProps = {
  title: string;
  columns: string[];
};

function FileTable({ title, columns }: FileTableProps) {
  return (
    <div className="mb-10">
      <h3 className="text-md font-semibold text-slate-300 mb-3">
        {title}
      </h3>

      <div className="overflow-hidden rounded-lg border border-slate-700">
        <table className="w-full text-sm">
          <thead className="bg-slate-700 text-slate-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium">
                Column Name
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {columns.map((col) => (
              <tr
                key={col}
                className="hover:bg-slate-700/50 transition-colors"
              >
                <td className="px-4 py-3 text-slate-300">
                  {col}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}