Feature: Email Login, Search, and Send

  Scenario: User logs into email account
    Given I am on the login page
    When I enter my email credentials with "<credentials>"
    And I select no for stay signed in
    And I should be logged in successfully
    And I click the new email button
    And I fill in the send to line with "<sendto>"
    And I fill in the subject line with "<subject>"
    And I fill in the body with "<text>"
    And I click the send button
    Then I should receive an email with the subject line "<subject>"
    
    Examples:
      | text                                       | subject               | sendto       | credentials       |
      | This is a sample email to test PlayWright. | Playwright Test Email | EMAIL_SENDTO | EMAIL_CREDENTIALS |