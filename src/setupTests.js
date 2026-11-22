// Runs before every test file (see "setupFiles" in vite.config.js)

// Adds matchers such as toBeChecked() and toHaveFocus() to expect()
import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Remove what each test rendered, so the next test starts from an empty page
afterEach(cleanup);
