module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 13,
  },
  extends: ["eslint:recommended"],
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "always"],
    // no undef globals allow
    "no-undef": "off",
  },
};
