module.exports = {
  parser: "babel-eslint",
  extends: ["plugin:prettier/recommended"],
  plugins: ["prettier", "import", "react-hooks"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "lf",
        semi: true,
        singleQuote: false,
        tabWidth: 2,
        trailingComma: "es5"
      }
    ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
};
