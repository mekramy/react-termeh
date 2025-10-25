import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { viteStaticCopy } from "vite-plugin-static-copy";
import pkg from "./package.json";

/// <reference types="vitest" />
// Configure Vitest (https://vitest.dev/config/)
// https://vitejs.dev/config/
export default defineConfig({
    build: {
        sourcemap: true,
        lib: {
            formats: ["es"],
            name: "ReactTermeh",
            entry: resolve(__dirname, "packages", "index.ts"),
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            external: [...Object.keys(pkg.peerDependencies || {})],
        },
    },
    plugins: [
        react({
            babel: {
                plugins: [["babel-plugin-react-compiler"]],
            },
        }),
        dts({
            insertTypesEntry: true,
            copyDtsFiles: true,
        }),
        viteStaticCopy({
            targets: [{ src: "./packages/style.scss", dest: "." }],
        }),
    ],
});
