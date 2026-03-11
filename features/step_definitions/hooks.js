// features/step_definitions/hooks.js
const { setDefaultTimeout } = require('@cucumber/cucumber');

// default tineout increased due to fingerprint scan
setDefaultTimeout(60 * 1000);
