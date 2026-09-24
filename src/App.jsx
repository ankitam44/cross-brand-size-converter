import { useState } from "react";
import { BRANDS, convertSize } from "./lib/convert.js";
import Nav from "./components/Nav.jsx";
import Lookup from "./components/Lookup.jsx";
import Result from "./components/Result.jsx";
import Coverage from "./components/Coverage.jsx";

export default function App() {
  const [screen, setScreen] = useState("lookup"); // lookup | result | coverage
  const [sourceBrand, setSourceBrand] = useState(BRANDS[0]);
  const [sourceSize, setSourceSize] = useState("M");
  const [category, setCategory] = useState("tops");
  const [targetBrand, setTargetBrand] = useState(BRANDS[1]);
  const [result, setResult] = useState(null);

  function handleConvert(e) {
    e.preventDefault();
    setResult(convertSize(sourceBrand, sourceSize, category, targetBrand));
    setScreen("result");
  }

  return (
    <div className="min-h-[100dvh] px-4 py-10 sm:py-16">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <header className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Cross-brand size converter
          </h1>
          <Nav screen={screen} onChange={setScreen} />
        </header>

        {screen === "lookup" && (
          <Lookup
            sourceBrand={sourceBrand}
            setSourceBrand={setSourceBrand}
            sourceSize={sourceSize}
            setSourceSize={setSourceSize}
            category={category}
            setCategory={setCategory}
            targetBrand={targetBrand}
            setTargetBrand={setTargetBrand}
            onSubmit={handleConvert}
          />
        )}

        {screen === "result" && result && (
          <Result
            sourceBrand={sourceBrand}
            sourceSize={sourceSize}
            targetBrand={targetBrand}
            result={result}
            onNewLookup={() => setScreen("lookup")}
          />
        )}

        {screen === "coverage" && <Coverage onBack={() => setScreen("lookup")} />}
      </div>
    </div>
  );
}
