import {
  getPhone,
  getEmail,
  phonePin,
  emailPin,
  incorrectPhonePin,
  incorrectEmailPin,
  pinSelector,
  emailSelector,
  checkMrtdSection,
  searchSelectorTimeout,
  kycTopbarTitleSelector,
} from '../support/app.po';
import 'cypress-file-upload';
import { should } from 'chai';

describe('tests-e2e', () => {
 
  describe('KYC passing', () => {
    const phone = getPhone();

    it('should login as new user', () => {
      cy.visit('/');
      cy.wait(2000);
      cy.get('input').type('estonia');
      cy.get(
        '[hidden="false"] > .ui-form-option__content > .country > .country__text'
      ).should('be.visible');
      cy.get(
        '[hidden="false"] > .ui-form-option__content > .country > .country__text'
      ).click();
      cy.get('.ui-large-button').click();
      cy.get('#e2e--kyc-phone-number--input', { timeout: 5000 }).clear();
      cy.get('input').type(`${phone}{enter}`, { timeout: 5000 });

      cy.get(pinSelector, { timeout: searchSelectorTimeout }).should(
        'be.visible'
      );
      cy.enterPin(phonePin);
      cy.get('#e2e--terms-and-agreements--accept').click();
      cy.get(kycTopbarTitleSelector, {
        timeout: searchSelectorTimeout,
      }).should('be.visible');
      cy.get('button.form__btn').click();

      cy.get('kyc-email-action button', {
        timeout: searchSelectorTimeout,
      }).should('be.visible');
    });

    it("should confirm user's email", () => {
      cy.get(emailSelector).type(`${getEmail(phone)}{enter}`);
      cy.get('kyc-agreement button').first().click();

      cy.enterPin(emailPin);

      cy.get('kyc-message-with-list button', {
        timeout: searchSelectorTimeout,
      }).should('be.visible');
    });

    it('should choose a document type to a Passport', () => {

      cy.get('#e2e--document-select--passport').click();

      cy.get('form-file-upload-or-drag', {
        timeout: searchSelectorTimeout,
      }).should('be.visible');
    });
     
    it('should upload a Passport', () => {
      cy.get('.form-file-upload-or-drag').attachFile('images/default/Passport.jpg', {
        subjectType: 'drag-n-drop',       
      })    
      cy.get('kyc-image-preview-action button.image-preview__btn', {
        timeout: searchSelectorTimeout,
      }).should('be.visible');
    });

    it('should submit the document', () => {
      cy.get('kyc-image-preview-action button.image-preview__btn').click();

      cy.get('kyc-camera-ask-action', {
        timeout: searchSelectorTimeout,
      }).should('be.visible');
    });
    it('should start ID verification', () => {
      cy.get('.ui-large-button--secondary > .ui-large-button__content').click();

      cy.get('form-file-upload-or-drag', {
        timeout: searchSelectorTimeout,
      }).should('be.visible');
    });

    it('should upload ID', () => {
      cy.get('.form-file-upload-or-drag').attachFile('images/default/selfie.jpg', {
        subjectType: 'drag-n-drop',
      })
    });

    it('should upload Adress documents', () => {
      cy.get('#e2e--address-ask-action--upload', { timeout: 50000 }).click();

      cy.get('form-file-upload-or-drag', {
        timeout: searchSelectorTimeout,
      }).should('be.visible');

      cy.get('.form-file-upload-or-drag').attachFile('images/default/adress.jpg', {
        subjectType: 'drag-n-drop',
      })
      
      cy.get('kyc-image-preview-action button.image-preview__btn', {
        timeout: searchSelectorTimeout,
      }).should('be.visible');
    
      cy.get('kyc-image-preview-action button.image-preview__btn').click();
      });

    it('should enter home adress', () => {  
      cy.get('#e2e--template-form--country > .ui-form-field__wrapper > .ui-form-field__control > .ui-form-field-infix').type('Italy')
      cy.get('[hidden="false"] > .ui-form-option__content > .country > .country__text').click();      
      cy.get('#e2e--template-form--region > .ui-form-field__wrapper > .ui-form-field__control > .ui-form-field-infix', { timeout: 10000 }).type('Lambodjia')
      cy.get('#e2e--template-form--city > .ui-form-field__wrapper > .ui-form-field__control > .ui-form-field-infix').type('Milan')
      cy.get('#e2e--template-form--address > .ui-form-field__wrapper > .ui-form-field__control > .ui-form-field-infix').type('some street')
      cy.get('#e2e--template-form--postalCode > .ui-form-field__wrapper > .ui-form-field__control > .ui-form-field-infix').type('345251')
      cy.get('.ui-large-button').click();

    });
    it('should submit due-diligence', () => {  
      cy.get('#e2e--due-diligence--start', { timeout: 30000 }).click();
      cy.get('#e2e--template-form--title > .ui-form-field__wrapper > .ui-form-field__control > .ui-form-field-infix').click();
      cy.get('.ui-form-select-panel > :nth-child(1)').click();
      cy.get('#e2e--template-form--area > .ui-form-field__wrapper > .ui-form-field__control > .ui-form-field-infix').click();
      cy.get('.ui-form-select-panel > :nth-child(3)').click();
      cy.get('#e2e--template-form--card_purpose > .ui-form-field__wrapper > .ui-form-field__control > .ui-form-field-infix').click();
      cy.get('.ui-form-select-panel > :nth-child(3)').click();
      cy.get('#e2e--template-form--monthly_income > .ui-form-field__wrapper > .ui-form-field__control > .ui-form-field-infix').click();
      cy.get('.ui-form-select-panel > :nth-child(4)').click();
      cy.wait(2000)
      cy.get('.ui-large-button').click();
    });
    it('should finish registration', () => { 

    cy.get('.ui-large-button').click();    
  });
  });  
});
