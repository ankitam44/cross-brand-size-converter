import { useState, useEffect } from "react";
import { BRANDS, CATEGORIES, SIZE_SCALE, convertSize } from "./lib/convert.js";
import { saveMySize, loadMySize, clearMySize } from "./lib/storage.js";
import { getCoverage } from "./lib/coverage.js";

export default function App() {
  const [screen, setScreen] = useState("lookup"); // lookup | result | coverage
  const [sourceBrand, setSourceBrand] = useState(BRANDS[0]);
  const [sourceSize, setSourceSize] = useState("M");
  const [category, setCategory] = useState("tops");
  const [targetBrand, setTargetBrand] = useState(BRANDS[1]);
  const [result, setResult] = useState(null);
  const [savedSize, setSavedSize] = useState(null);

  useEffect(() => {
    const saved = loadMySize();
    if (saved) {
      setSavedSize(saved);
      setSourceBrand(saved.brand);
      setSourceSize(saved.size);
    }
  }, []);

  function handleConvert(e) {
    e.preventDefault();
    const r = convertSize(sourceBrand, sourceSize, category, targetBrand);
    setResult(r);
    setScreen("result");
  }

  function handleSaveMySize() {
    saveMySize(sourceBrand, sourceSize);
    setSavedSize({ brand: sourceBrand, size: sourceSize });
  }

  function handleClearSaved() {
    clearMySize();
    setSavedSize(null);
  }

  return (
    <div className="app">
      <header>
        <h1>Cross-brand size converter</h1>
        <nav>
          <button onClick={() => setScreen("lookup")} disabled={screen === "lookup"}>
            Lookup
          </button>
          <button onClick={() => setScreen("coverage")} disabled={screen === "coverage"}>
            Coverage
          </button>
        </nav>
      </header>

      {screen === "lookup" && (
        <form className="lookup" onSubmit={handleConvert}>
          {savedSize && (
            <p className="saved-note">
              Using your saved size: {savedSize.brand} {savedSize.size}.{" "}
              <button type="button" onClick={handleClearSaved}>
                Not you? Clear
              </button>
            </p>
          )}
          <label>
            I know my size in
            <select value={sourceBrand} onChange={(e) => setSourceBrand(e.target.value)}>
              {BRANDS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </label>
          <label>
            My size there is
            <select value={sourceSize} onChange={(e) => setSourceSize(e.target.value)}>
              {SIZE_SCALE.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label>
            Category
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label>
            I want my size in
            <select value={targetBrand} onChange={(e) => setTargetBrand(e.target.value)}>
              {BRANDS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Convert</button>
        </form>
      )}

      {screen === "result" && result && (
        <div className="result">
          <p className="result-size">
            {sourceBrand} {sourceSize} &asymp; {targetBrand} <strong>{result.targetSize}</strong>
          </p>
          <p className={`confidence confidence-${result.confidence === "close match" ? "close" : "uncertain"}`}>
            {result.confidence === "close match" ? "Close match" : "Uncertain — brands cut differently"}
          </p>
          <p className="caveat">{result.caveat}</p>
          <button onClick={handleSaveMySize}>
            Save {sourceBrand} {sourceSize} as my size
          </button>
          <button onClick={() => setScreen("lookup")}>New lookup</button>
        </div>
      )}

      {screen === "coverage" && (
        <div className="coverage">
          <h2>What we cover today</h2>
          {getCoverage().map(({ category, brands }) => (
            <div key={category}>
              <h3>{category}</h3>
              <ul>
                {brands.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
          <p>More brands added over time.</p>
          <button onClick={() => setScreen("lookup")}>Back to lookup</button>
        </div>
      )}
    </div>
  );
}
