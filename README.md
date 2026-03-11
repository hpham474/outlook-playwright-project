# 📧 Outlook-Playwright-Project (Playwright + Cucumber + JavaScript)

This project automates an end-to-end Outlook Web workflow using **Playwright**, **Cucumber (Gherkin)**, and **JavaScript**.  
The flow covers:

1.  Login to **Outlook Web**
2.  Compose and send an email
3.  Navigate to **Sent Items**
4.  Validate that the sent email’s **subject** matches the expected value

***

## 🧰 Tech Stack

*   **Playwright** – Browser automation (Chromium/Edge/Firefox/WebKit)
*   **Cucumber (Gherkin)** – BDD feature scenarios
*   **JavaScript** – Step definitions and Page Objects
*   **Page Object Model (POM)** – Clean locator + action patterns
*   **HTML Reporting** – Playwright HTML report + optional Cucumber HTML

***

## 📦 Installation (Cognizant Environment Friendly)

### 1️⃣ Install Node.js

Install from **Cognizant Software Center**  
(or Node.js LTS if organizational policy allows).

Verify installation:

```bash
node -v
npm -v
```

### 2️⃣ Install project dependencies

```bash
npm install
```

### 3️⃣ Install Playwright browsers

```bash
npx playwright install
```

### 4️⃣ Environment Setup

Create a `.env` file in the project root and define the following variables:

- **EMAIL_SENDTO** — The email address that will receive the test message  
- **EMAIL_CREDENTIALS** — The email address used to log in during the test

Example `.env`:

```
EMAIL_SENDTO="recipient@cognizant.com"
EMAIL_CREDENTIALS="testuser@cognizant.com"
```

## 🗂️ Project Structure

    outlook-playwright-project/
    ├── features/
    │   ├── loginEmail.feature
    │   └── step_definitions/
    │       ├── hooks.js
    │       └── loginEmail.steps.js
    ├── pages/
    │   ├── emailPage.js
    │   └── loginPage.js
    ├── reports/
    ├── playwright.config.js
    ├── cucumber.js
    ├── .env
    ├── package.json
    └── README.md

***

## 🧭 How to Execute Tests

### ▶️ Run 

```bash
npm run test
```

### ▶️ Open Report

```bash
npm run open
```

## 📌 Key Features Implemented

### ✔️ Login Flow

*   Handles Microsoft login page navigation
*   Detects and interacts with:
    *   Email input
    *   Password input
    *   “Stay Signed In” prompt

### ✔️ Compose Email Flow

*   Opens "New mail" or "New message"
*   Handles Outlook dynamic DOM rendering
*   Fills To, Subject, and Body fields
*   Sends the email

### ✔️ Sent Items Verification

*   Navigates to **Sent Items**
*   Searches for matching subject text
*   Performs assertion with Playwright’s `expect`

***

## 🧱 Locator Strategy (Stable & Resilient)

*   Prefer **aria-label**, **role**, **placeholder**, and **text-based** selectors
*   Avoid brittle CSS/XPath tied to internal Outlook markup

***

## 📊 Reporting

### Cucumber Report

*   Generates cucumber-report.json inside /reports
*   HTML report created using multiple-cucumber-html-reporter

***

## 🚧 Challenges Faced & Solutions

### 1️⃣ MFA Blocking Login

**Solution:**  
Manually authenticate using finger print while logging in.

### 2️⃣ Sent Items Delay

**Solution:**  
Add a wait for up to 15 seconds after sending email.

***
