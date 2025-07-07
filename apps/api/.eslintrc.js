module.exports = {
  extends: ["@repo/eslint-config/nest"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    // Add any NestJS-specific ESLint rules here
  },
};
