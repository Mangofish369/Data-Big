'use client'
import { useState } from "react";
import Input, { PredictResult } from "@/app/components/input";
import References from "./components/references";
import Instructions from "./components/instructions";
import Knowledge_library from "./components/knowledge_library";
import Methodology from "./components/methodology";
type CodeDef = {
  code: string;
  label: string;
  factors: string[];
  description: string;
};

const CODE_DEFS: CodeDef[] = [
  {
    code: "01",
    label: "Disproportionate Wealth",
    factors: ["income", "sales", "avg_amount", "max_amount"],
    description: "Customer's declared income or revenue is inconsistent with their transaction amounts.",
  },
  {
    code: "02",
    label: "Excessive Spending",
    factors: ["total_amount", "num_debit", "num_credit"],
    description: "Customer's total spending or credit/debit activity is disproportionate to expected profile.",
  },
  {
    code: "03",
    label: "Unusual Transaction Frequency",
    factors: ["num_transactions", "num_abm", "num_wire", "num_eft", "num_emt", "num_westernunion", "num_card", "num_cheque"],
    description: "Customer shows abnormally high transaction frequency across one or more payment methods.",
  },
];

function getCode(explanation: string): string {
  const lower = explanation.toLowerCase();
  for (const def of CODE_DEFS) {
    if (def.factors.some(f => lower.includes(f))) return def.code;
  }
  return "??";
}

function FlaggedTable({ result, onCodeClick }: { result: PredictResult; onCodeClick: (code: string) => void }) {
  if (!result) return null;

  const flagged = [
    ...result.people.filter(r => r.prediction === 1),
    ...result.businesses.filter(r => r.prediction === 1),
  ];

  if (flagged.length === 0) return (
    <div className="flex items-center justify-center h-32 text-zinc-600 text-sm border border-zinc-800 rounded-lg">
      No flagged customers
    </div>
  );

  function downloadCSV() {
    const baseHeaders = Object.keys(flagged[0]).filter(k => k !== "explanation");
    const headers = [...baseHeaders, "code"];
    const rows = [
      headers,
      ...flagged.map(r => [
        ...baseHeaders.map(h => String(r[h] ?? "")),
        getCode(String(r.explanation ?? "")),
      ]),
    ];
    const csv = rows.map(r => r.map(v => `"${v.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "flagged_customers.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <p className="text-xs text-zinc-500 tracking-widest uppercase">
          Flagged Customers
          <span className="ml-2 bg-red-900/60 text-red-400 px-1.5 py-0.5 rounded-full">{flagged.length}</span>
        </p>
        <button onClick={downloadCSV} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-xs text-zinc-300 transition-colors">
          ↓ Download CSV
        </button>
      </div>
      <div className="overflow-y-auto max-h-[60vh] rounded-lg border border-zinc-800">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-zinc-900 border-b border-zinc-800">
            <tr>
              <th className="text-left px-4 py-3 text-xs text-zinc-500 tracking-widest uppercase font-normal">Customer ID</th>
              <th className="text-left px-4 py-3 text-xs text-zinc-500 tracking-widest uppercase font-normal">Code</th>
              <th className="text-left px-4 py-3 text-xs text-zinc-500 tracking-widest uppercase font-normal">Probability</th>
            </tr>
          </thead>
          <tbody>
            {flagged.map((r, i) => {
              const code = getCode(String(r.explanation ?? ""));
              return (
                <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-zinc-200">{String(r["customer_id"] ?? "—")}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onCodeClick(code)}
                      className="bg-red-950/50 border border-red-900 text-red-400 text-xs px-2 py-0.5 rounded font-mono hover:bg-red-900/50 transition-colors cursor-pointer"
                    >
                      {code}
                    </button>
                  </td>
                  <td className="px-4 py-3 font-mono text-amber-400">
                    {truncateDecimals(Number(r.probabilities ?? 0), 3)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function truncateDecimals(num: number, decimals: number): string {
  const factor = Math.pow(10, decimals);
  const truncated = Math.floor(num * factor) / factor;
  return truncated.toFixed(decimals);
}

function CodesTable({ search, onSearchChange }: { search: string; onSearchChange: (v: string) => void }) {
  const filtered = CODE_DEFS.filter(def =>
    search === "" || def.code.includes(search) || def.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        placeholder="Search by code or label…"
        className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-500"
      />
      <div className="rounded-lg border border-zinc-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900 border-b border-zinc-800">
            <tr>
              <th className="text-left px-4 py-3 text-xs text-zinc-500 tracking-widest uppercase font-normal w-16">Code</th>
              <th className="text-left px-4 py-3 text-xs text-zinc-500 tracking-widest uppercase font-normal w-48">Label</th>
              <th className="text-left px-4 py-3 text-xs text-zinc-500 tracking-widest uppercase font-normal">Factors</th>
              <th className="text-left px-4 py-3 text-xs text-zinc-500 tracking-widest uppercase font-normal">Description</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(def => (
              <tr key={def.code} className="border-b border-zinc-800/50">
                <td className="px-4 py-4">
                  <span className="bg-red-950/50 border border-red-900 text-red-400 text-xs px-2 py-0.5 rounded font-mono">{def.code}</span>
                </td>
                <td className="px-4 py-4 text-zinc-300 font-medium">{def.label}</td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-1">
                    {def.factors.map(f => (
                      <span key={f} className="bg-zinc-800 text-zinc-400 text-xs px-1.5 py-0.5 rounded font-mono">{f}</span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4 text-zinc-400 text-xs">{def.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type Tab = "checker" | "flagged" | "codes" | "references" | "instructions" | "knowledge_library" | "methodology";

export default function Home() {
  const [tab, setTab] = useState<Tab>("checker");
  const [result, setResult] = useState<PredictResult>(null);
  const [codeSearch, setCodeSearch] = useState("");

  const done = result !== null;

  function handleResult(r: PredictResult) {
    setResult(r);
    setTab("flagged");
  }

  function handleCodeClick(code: string) {
    setCodeSearch(code);
    setTab("codes");
  }

  const flaggedCount = result
    ? [...result.people, ...result.businesses].filter(r => r.prediction === 1).length
    : null;

  const tabs: { id: Tab; label: string; onlyAfter?: boolean }[] = [
    { id: "instructions", label: "AML Checker File Instructions" },
    { id: "checker", label: done ? "Again" : "AML Checker" },
    { id: "flagged", label: "Flagged", onlyAfter: true },
    { id: "codes", label: "Codes", onlyAfter: true },
    { id: "knowledge_library", label: "AML Knowledge Library" },
    { id: "methodology", label: "Our Methodology" },
    { id: "references", label: "References and Appendix" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="border-b border-zinc-800 px-8">
        <div className="absolute flex-col items-center gap-3 shrink-0 p-4">
          <img src="/fraud.png" alt="logo" className="h-30 w-30 object-contain" />
          <span className="text-xl font-semibold text-zinc-100">FraudWatch</span>
        </div>
        <div className="flex max-w-2xl mx-auto">
          {tabs.filter(t => !t.onlyAfter || done).map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-4 text-sm transition-colors border-b-2 -mb-px ${tab === t.id ? "border-zinc-100 text-zinc-100" : "border-transparent text-zinc-500 hover:text-zinc-300"
                }`}
            >
              {t.label}
              {t.id === "flagged" && flaggedCount !== null && (
                <span className="ml-2 bg-red-900/60 text-red-400 text-xs px-1.5 py-0.5 rounded-full">{flaggedCount}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {tab === "knowledge_library" || tab === "references" || tab === "methodology" ? (
        // Full-width container for Knowledge Library + References
        <div className="w-full max-w-screen-2xl mx-auto px-8 py-10">
          {tab === "knowledge_library" && <Knowledge_library />}
          {tab === "references" && <References />}
          {tab === "methodology" && <Methodology />}
        </div>
      ) : (
        // Standard width container for other tabs
        <div className="max-w-2xl mx-auto px-8 py-10 flex flex-col gap-8">
          {tab === "checker" && <Input onResult={handleResult} />}
          {tab === "flagged" && <FlaggedTable result={result} onCodeClick={handleCodeClick} />}
          {tab === "codes" && (
            <CodesTable search={codeSearch} onSearchChange={setCodeSearch} />
          )}
          {tab === "instructions" && <Instructions />}
        </div>
      )}
    </div>
  );
}