import * as esbuild from "esbuild";

function main() {
    esbuild.build({
        bundle: true,
        entryPoints: ["src/index.ts"],
        minify: true,
        platform: "browser",
        format: "iife",
        globalName: "satCollisions",
        outfile: "dist/sat.js",
    });
}

main();