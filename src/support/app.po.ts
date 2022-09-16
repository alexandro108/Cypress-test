export const getGreeting = () => cy.get('h1');

export const searchSelectorTimeout = 10000;

const phoneNumberPrefix = '700000000006';

export const getPhone = () =>
  phoneNumberPrefix + Math.floor(10000 + Math.random() * 90000);

export const phonePin = '000000';
export const incorrectPhonePin = '111111';

export const getEmail = (phoneNumber: number | string) =>
  `${phoneNumber}@optherium.com`;

export const emailPin = '000000';
export const incorrectEmailPin = '111111';

export const pinSelector = 'form-code-input input';
export const emailSelector = 'kyc-email-action input';

export const kycTopbarTitleSelector = 'ui-topbar span';

export const checkMrtdSection = () => {
  cy.get('.ui-overlay-pane ui-topbar', { timeout: 10000 }).should('be.visible');
  cy.get('.ui-overlay-pane button.ui-topbar-close').click();
  cy.get('.ui-overlay-pane').should('not.exist');
};
