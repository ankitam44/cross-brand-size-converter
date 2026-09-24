export default function Nav({ screen, onChange }) {
  return (
    <nav className="flex gap-2 rounded-full bg-zinc-100 p-1 dark:bg-zinc-800/60">
      <NavButton active={screen !== "coverage"} onClick={() => onChange("lookup")}>
        Lookup
      </NavButton>
      <NavButton active={screen === "coverage"} onClick={() => onChange("coverage")}>
        Coverage
      </NavButton>
    </nav>
  );
}

function NavButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition active:scale-[0.98] ${
        active
          ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-900 dark:text-zinc-50"
          : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
      }`}
    >
      {children}
    </button>
  );
}
