// `.eslintrc.json` allows comments, but `.stylelintrc.json` does not
module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recess-order",
    "stylelint-config-prettier",
  ],
  rules: {
    // `stylelint-disable` comments do not work in JSX, so set them in here instead
    "function-name-case": ["lower", { ignoreFunctions: [] }],
    "value-keyword-case": ["lower", { ignoreKeywords: [] }],
  },
  // for VS Code
  ignoreFiles: ["node_modules/**", "dist"],
};
