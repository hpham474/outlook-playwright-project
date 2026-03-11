class EmailPage {
  constructor(page) {
    this.page = page;
    this.newMailBtn = page.getByRole('button', { name: 'New mail' });
    this.sendToField = page.locator('[contenteditable="true"][aria-label*="To"]');
    this.subjectField = page.getByRole('textbox', { name: 'Subject' });
    this.bodyField = page.getByRole('textbox', { name: 'Message body' });
    this.sendBtn = page.getByRole('button', { name: /^Send$/ });
    this.sentItems = page.locator('[role="treeitem"][data-folder-name="sent items"]');
    
    this.firstEmail = page.getByRole('listbox', { name: 'Message list' }).getByRole('option').first();

  }

  async clickNewEmail() { 
    await this.newMailBtn.click();
  }

  async fillInSendTo(sendto) {
    await this.sendToField.click();
    await this.sendToField.fill(sendto);
    await this.sendToField.press('Enter');
  }

  async fillInSubject(subject) {
    await this.subjectField.click();
    await this.subjectField.fill(subject);
  }

  async fillInBody(text) {
    await this.bodyField.click();
    await this.bodyField.fill(text);
  }

  async clickSend() {
    await this.sendBtn.click();
  }
}

module.exports = EmailPage;