const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium, expect } = require('@playwright/test');
const LoginPage = require('../../pages/loginPage');
const EmailPage = require('../../pages/emailPage');
require('dotenv').config();

let browser, page, loginPage, emailPage;

Given('I am on the login page', async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  await loginPage.goto();
});

When('I enter my email credentials with {string}', async function (credentials) {
  await loginPage.login(process.env[credentials]);
});

When('I select no for stay signed in', async function () {
  await page.waitForURL('https://login.microsoftonline.com/common/login');
  await loginPage.handleStaySignedIn('No');
});

When('I should be logged in successfully', async function () {
  await page.waitForSelector('#MailList');
});

When('I click the new email button', async function () {
  emailPage = new EmailPage(page);
  await emailPage.clickNewEmail();
});

When('I fill in the send to line with {string}', async function(sendto) {
  await emailPage.fillInSendTo(process.env[sendto]);
});

When('I fill in the subject line with {string}', async function(subject) {
  await emailPage.fillInSubject(subject);
});

When('I fill in the body with {string}', async function(text) {
  await emailPage.fillInBody(text);
});

When('I click the send button', async function() {
  await emailPage.clickSend();
});

Then('I should receive an email with the subject line {string}', async function (subject) {
  
  await emailPage.sentItems.click();

  const messageList = page.getByRole('listbox', { name: 'Message list' });
  await messageList.waitFor({ state: 'visible' });

  // The subject is in <span class="TtcXM">...</span>
  const subjectCell = emailPage.firstEmail.locator('span.TtcXM');

  // Wait up to 15s for the subject to match
  await expect(subjectCell).toHaveText(subject, { timeout: 15_000 });

  const actual = (await subjectCell.innerText()).trim();
  if (actual !== subject) {
    throw new Error(`Expected most recent subject to be "${subject}", but got "${actual}"`);
  }

  await browser.close();

});