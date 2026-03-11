// report.js
const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: 'reports',
  reportPath: 'reports/html',
  pageTitle: 'Cucumber Test Report',
  displayDuration: true
});
``