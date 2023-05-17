import { client } from "twirpscript";
import * as monaco from "monaco-editor";

import { Login } from "./steady.pb";

self.MonacoEnvironment = {
  getWorkerUrl: function (moduleId, label) {
    let assets = (window as any).monacoWorkerAssets;
    if (label === "json") return assets.json;
    if (label === "css" || label === "scss" || label === "less")
      return assets.css;
    if (label === "html" || label === "handlebars" || label === "razor")
      return assets.html;
    if (label === "typescript" || label === "javascript") return assets.ts;
    return assets.editor;
  },
};

console.log(client, Login);

(async () => {
  const editorContainer = document.getElementById("monaco-editor");
  if (!editorContainer) {
    return;
  }
  let text = editorContainer.innerText;
  editorContainer.innerText = "";
  const editor = monaco.editor.create(editorContainer, {
    value: text,
    language: "typescript",
    minimap: {
      enabled: false,
    },
  });
  monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    lib: ["ESNext"],
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    strict: true,
    allowJs: true,
  });
  let resp = await fetch("/assets/types.d.ts");
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    await resp.text(),
    "bun-types"
  );
  let runApplicationForm = document.forms["run-application" as any];
  if (runApplicationForm) {
    runApplicationForm.onsubmit = function () {
      let element = runApplicationForm.elements[
        "index.ts" as any
      ] as HTMLInputElement;
      element.value = editor.getValue();
    };
  }
})();
