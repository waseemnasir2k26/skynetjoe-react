import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // React Compiler advisory rule (eslint-plugin-react-hooks v6+). Every hit in
    // this repo is the hydration-safe "read localStorage / window on mount, then
    // setState" pattern, which is intentional (lazy useState init would cause a
    // server/client hydration mismatch). Kept visible as a warning so new code
    // still gets flagged; migrate to useSyncExternalStore when touching a file.
    rules: {
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
