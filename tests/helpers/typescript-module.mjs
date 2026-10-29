import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const sources = new Map();

export async function loadTypescriptModule(path, dependencies, globals = {}) {
  if (!sources.has(path)) {
    const source = await readFile(
      new URL(`../../${path}`, import.meta.url),
      "utf8",
    );
    sources.set(
      path,
      ts.transpileModule(source, {
        fileName: path,
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          target: ts.ScriptTarget.ES2022,
          jsx: ts.JsxEmit.ReactJSX,
        },
      }).outputText,
    );
  }
  const exports = {};
  runInNewContext(sources.get(path), {
    exports,
    require: (id) => {
      assert.ok(
        Object.hasOwn(dependencies, id),
        `Unexpected dependency: ${id}`,
      );
      return dependencies[id];
    },
    Request,
    Response,
    Headers,
    URL,
    Buffer,
    Date,
    process,
    ...globals,
  });
  return exports;
}
