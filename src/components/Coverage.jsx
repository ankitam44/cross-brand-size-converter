import { TShirt, Pants, ArrowLeft } from "@phosphor-icons/react";
import { getCoverage } from "../lib/coverage.js";

const CATEGORY_ICON = { tops: TShirt, bottoms: Pants };

export default function Coverage({ onBack }) {
  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-900/5 sm:p-8 dark:bg-zinc-900 dark:ring-white/10">
      <div>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">What we cover today</h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">More brands added over time.</p>
      </div>

      {getCoverage().map(({ category, brands }) => {
        const Icon = CATEGORY_ICON[category];
        return (
          <div key={category}>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium capitalize text-zinc-700 dark:text-zinc-300">
              <Icon size={16} weight="fill" />
              {category}
            </div>
            <div className="flex flex-wrap gap-2">
              {brands.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-zinc-200 px-3 py-1 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        );
      })}

      <button
        type="button"
        onClick={onBack}
        className="flex w-fit items-center gap-2 rounded-full border border-zinc-200 px-5 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 active:scale-[0.98] dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        <ArrowLeft size={16} weight="bold" />
        Back to lookup
      </button>
    </div>
  );
}
