import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import { reactRefresh } from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

// https://eslint.org/docs/latest/use/configure/configuration-files
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      // Rules of Hooks plus the React Compiler rules (refs, purity, ...)
      reactHooks.configs.flat.recommended,
      // Warns when a file exports something other than components,
      // which breaks Fast Refresh in the dev server
      reactRefresh.configs.vite(),
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    // Config files run in Node, not the browser
    files: ["*.config.js"],
    languageOptions: { globals: globals.node },
  },
]);
