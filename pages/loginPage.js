class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailField = page.getByRole('textbox', { name: /email|phone|skype/i });
    this.nextBtn = page.getByRole('button', { name: /^(next|sign in)$/i });

    
    this.kmsiHeading = page.getByRole('heading', { name: /Stay signed in/i });
    this.kmsiYesBtn  = page.getByRole('button', { name: /^yes$/i });
    this.kmsiNoBtn   = page.getByRole('button', { name: /^no$/i });
    
    this.kmsiNoById = page.locator('#idBtn_Back');
  }

  async goto() {
    await this.page.goto('https://outlook.cloud.microsoft/mail/?deeplink=mail%2F0%2F');
  }

  async login(email) {
    await this.emailField.fill(email);
    await this.nextBtn.click();
  }

  
  async handleStaySignedIn(choice = 'No') {
    await this.kmsiHeading.isVisible();

    const pickYes = String(choice).toLowerCase().startsWith('y');

    // Try role-based first
    const targetBtn = pickYes ? this.kmsiYesBtn : this.kmsiNoBtn;
    const hasRoleBtn = await targetBtn.isVisible().catch(() => false);

    if (hasRoleBtn) {
      await Promise.all([
        this.page.waitForLoadState('domcontentloaded'),
        targetBtn.click()
      ]);
      return;
    }

    // Fallback to ID (works for "No")
    if (!pickYes) {
      await Promise.all([
        this.page.waitForLoadState('domcontentloaded'),
        this.kmsiNoById.click()
      ]);
    }
  }

}

module.exports = LoginPage;