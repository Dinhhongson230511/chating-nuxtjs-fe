const { camelCase } = require("lodash");
const { off } = require("process");

module.exports = {
  // ...
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  extends: ["@nuxtjs/eslint-config-typescript", "plugin:prettier/recommended"],
  rules: {
    camelcase: "off",
  },
  // ...
};
