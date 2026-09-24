import { ArrowRight, TShirt, Pants, X } from "@phosphor-icons/react";
import { BRANDS, CATEGORIES, SIZE_SCALE } from "../lib/convert.js";

const CATEGORY_ICON = { tops: TShirt, bottoms: Pants };

export default function Lookup({
  sourceBrand,
  setSourceBrand,
  sourceSize,
  setSourceSize,
  category,
  setCategory,
  targetBrand,
  setTargetBrand,
  savedSize,
  onClearSaved,
  onSubmit,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-900/5 sm:p-8 dark:bg-zinc-900 dark:ring-white/10"
    >
      {savedSize && (
        <div className="flex items-center justify-between gap-3 rounded-xl bg-accent-50 px-4 py-2.5 text-sm text-accent-700 dark:bg-accent-500/10 dark:text-accent-500">
          <span>
            Using your saved size: <strong className="font-semibold">{savedSize.brand} {savedSize.size}</strong>
          </span>
          <button
            type="button"
            onClick={onClearSaved}
            className="flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-accent-700 transition hover:bg-accent-500/10 active:scale-[0.98] dark:text-accent-500"
          >
            <X size={12} weight="bold" />
            Clear
          </button>
        </div>
      )}

      <Field label="I know my size in">
        <select value={sourceBrand} onChange={(e) => setSourceBrand(e.target.value)}>
          {BRANDS.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </Field>

      <Field label="My size there is">
        <select value={sourceSize} onChange={(e) => setSourceSize(e.target.value)}>
          {SIZE_SCALE.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </Field>

      <div>
        <span className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Category</span>
        <div className="grid grid-cols-2 gap-2">
          {CATEGORIES.map((c) => {
            const Icon = CATEGORY_ICON[c];
            const active = category === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium capitalize transition active:scale-[0.98] ${
                  active
                    ? "border-accent-500 bg-accent-50 text-accent-700 dark:border-accent-500 dark:bg-accent-500/10 dark:text-accent-500"
                    : "border-zinc-200 text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600"
                }`}
              >
                <Icon size={18} weight={active ? "fill" : "regular"} />
                {c}
              </button>
            );
          })}
        </div>
      </div>

      <Field label="I want my size in">
        <select value={targetBrand} onChange={(e) => setTargetBrand(e.target.value)}>
          {BRANDS.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </Field>

      <button
        type="submit"
        className="mt-2 flex items-center justify-center gap-2 rounded-full bg-accent-600 px-5 py-3 text-base font-medium text-white transition hover:bg-accent-700 active:scale-[0.98]"
      >
        Convert
        <ArrowRight size={18} weight="bold" />
      </button>
    </form>
  );
}

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
      {label}
      <div className="relative">{children}</div>
    </label>
  );
}
