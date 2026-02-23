'use client'
import { useState, useCallback, useRef } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type FileState = {
  kyc_individual: File | null;
  kyc_smallbusiness: File | null;
  transactions: Record<string, File>;
};

export type PredictResult = {
  people: Record<string, unknown>[];
  businesses: Record<string, unknown>[];
} | null;

type Props = {
  onResult: (result: PredictResult) => void;
};

function KycDropZone({ label, value, onChange }: {
  label: string; value: File | null; onChange: (file: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  return (
    <div
      onDragOver={e => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={e => { e.preventDefault(); setOver(false); const file = e.dataTransfer.files[0]; if (file) onChange(file); }}
      onClick={() => inputRef.current?.click()}
      className={`flex-1 flex flex-col items-center justify-center gap-1 min-h-24 rounded-lg border border-dashed cursor-pointer transition-colors text-center p-4
        ${over ? "border-blue-400 bg-blue-950/20" : value ? "border-green-700 bg-green-950/30" : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"}`}
    >
      <input ref={inputRef} type="file" accept=".csv" className="hidden" onChange={e => e.target.files?.[0] && onChange(e.target.files[0])} />
      <span className="text-lg">{value ? "✓" : "⬆"}</span>
      <span className="text-xs text-zinc-500 tracking-widest uppercase">{label}</span>
      {value
        ? <span className="text-xs text-green-400 break-all">{value.name}</span>
        : <span className="text-xs text-zinc-600">drag & drop or click</span>}
    </div>
  );
}

function TransactionDropZone({ files, onChange }: {
  files: Record<string, File>; onChange: (files: Record<string, File>) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const addFiles = useCallback((fileList: FileList | File[]) => {
    const next = { ...files };
    Array.from(fileList).forEach(f => { next[f.name.replace(/\.csv$/i, "").toLowerCase()] = f; });
    onChange(next);
  }, [files, onChange]);

  return (
    <div className="flex flex-col gap-3">
      <div
        onDragOver={e => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={e => { e.preventDefault(); setOver(false); addFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        className={`rounded-lg border border-dashed cursor-pointer transition-colors p-8 text-center
          ${over ? "border-blue-400 bg-blue-950/20" : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"}`}
      >
        <input ref={inputRef} type="file" accept=".csv" multiple className="hidden" onChange={e => e.target.files && addFiles(e.target.files)} />
        <div className="text-2xl mb-2">📂</div>
        <p className="text-sm text-zinc-500">drag & drop or select files</p>
        <p className="text-xs text-zinc-600 mt-1">e.g. abm.csv, wire.csv</p>
      </div>
      {Object.keys(files).length > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(files).map(([method, file]) => (
            <span key={method} className="flex items-center gap-2 bg-green-950/40 border border-green-800 rounded-full px-3 py-1 text-xs text-green-400">
              <span className="text-zinc-500">{method}</span>
              {file.name}
              <button onClick={e => { e.stopPropagation(); const n = { ...files }; delete n[method]; onChange(n); }} className="text-zinc-600 hover:text-zinc-400">✕</button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Input({ onResult }: Props) {
  const [files, setFiles] = useState<FileState>({
    kyc_individual: null,
    kyc_smallbusiness: null,
    transactions: {},
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const canPredict =
    !!files.kyc_individual &&
    !!files.kyc_smallbusiness &&
    Object.keys(files.transactions).length > 0;

  async function predict() {
    setLoading(true);
    setError(null);

    const form = new FormData();
    form.append("kyc_individual",    files.kyc_individual!);
    form.append("kyc_smallbusiness", files.kyc_smallbusiness!);
    Object.entries(files.transactions).forEach(([method, file]) => form.append(method, file));

    try {
      const res  = await fetch(`${API_URL}/predict`, { method: "POST", body: form });
      const json = await res.json();
      if (!res.ok) throw new Error(json.detail ?? `HTTP ${res.status}`);
      onResult(json);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <section className="mb-6">
        <p className="text-xs text-zinc-500 tracking-widest uppercase mb-3">KYC Files</p>
        <div className="flex gap-3">
          <KycDropZone label="KYC_INDIVIDUAL"  value={files.kyc_individual}    onChange={v => setFiles(f => ({ ...f, kyc_individual: v }))} />
          <KycDropZone label="KYC_BUSINESS"    value={files.kyc_smallbusiness} onChange={v => setFiles(f => ({ ...f, kyc_smallbusiness: v }))} />
        </div>
      </section>

      <section className="mb-8">
        <p className="text-xs text-zinc-500 tracking-widest uppercase mb-3">Transaction Files</p>
        <TransactionDropZone files={files.transactions} onChange={t => setFiles(f => ({ ...f, transactions: t }))} />
      </section>

      <button
        onClick={predict}
        disabled={!canPredict || loading}
        className="w-full py-3 rounded-lg text-sm font-medium tracking-wide transition-colors bg-green-700 hover:bg-green-600 text-white disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed"
      >
        {loading ? "Running prediction…" : "Predict →"}
      </button>

      {loading && (
        <div className="mt-4 h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full bg-green-600 rounded-full animate-pulse w-full" />
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-950/40 border border-red-800 rounded-lg text-sm text-red-400">{error}</div>
      )}
    </div>
  );
}