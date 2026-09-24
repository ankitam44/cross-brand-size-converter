import { CheckCircle, WarningCircle, ArrowCounterClockwise } from "@phosphor-icons/react";

export default function Result({ sourceBrand, sourceSize, targetBrand, result, onNewLookup }) {
  const isClose = result.confidence === "close match";
  const Icon = isClose ? CheckCircle : WarningCircle;

  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-900/5 sm:p-8 dark:bg-zinc-900 dark:ring-white/10">
      <div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {sourceBrand} {sourceSize} converts to
        </p>
        <p className="mt-1 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {targetBrand} <span className="text-accent-600 dark:text-accent-500">{result.targetSize}</span>
        </p>
      </div>

      <div
        className={`flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ${
          isClose
            ? "bg-close-50 text-close-700 dark:bg-close-600/15 dark:text-close-600"
            : "bg-uncertain-50 text-uncertain-700 dark:bg-uncertain-600/15 dark:text-uncertain-600"
        }`}
      >
        <Icon size={16} weight="fill" />
        {isClose ? "Close match" : "Uncertain"}
      </div>

      <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{result.caveat}</p>

      <button
        type="button"
        onClick={onNewLookup}
        className="flex items-center justify-center gap-2 rounded-full border border-zinc-200 px-5 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 active:scale-[0.98] dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        <ArrowCounterClockwise size={16} weight="bold" />
        New lookup
      </button>
    </div>
  );
}
