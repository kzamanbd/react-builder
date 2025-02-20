import typescript from "@rollup/plugin-typescript";
import postcss from 'rollup-plugin-postcss'

// export default [
//   {
//     input: "src/Button.tsx",
//     output: {
//       file: "dist/button.js",
//     },
//   },
//   {
//     input: "src/Header.tsx",
//     output: {
//       file: "dist/header.js",
//     },
//   },
// ].map((entry) => ({
//   ...entry,
//   external: ["react/jsx-runtime"],
//   plugins: [typescript(), postcss()],
// }));

export default {
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
  },
  external: ["react/jsx-runtime"],
  plugins: [typescript(), postcss()],
}
