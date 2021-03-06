/* eslint-disable no-undef */
import { createAuthHeaders, createHeadersFromToken } from '../../src/utils/createHeaders'
import { user, login, offer, apiUrl } from '../fixtures/testData'

Cypress.Commands.add('createTester', () => {
 cy.request('POST', `${apiUrl}user/register`, user)
})

Cypress.Commands.add('loginTester', () => {
  cy.request('POST', `${apiUrl}user/login`, login).then((res) => {
    localStorage.setItem('curUser', JSON.stringify(res.body))
  })
})  

Cypress.Commands.add('resetUsers', () => {
  cy.request('POST', `${apiUrl}test/resetusers`)
})

Cypress.Commands.add('resetOffers', () => {
  cy.request('POST', `${apiUrl}test/resetoffers`)
})

Cypress.Commands.add('createOffer', () => {

  const headers = createAuthHeaders()
  cy.request({
    url: `${apiUrl}offers`,
    method: 'POST',
    body: offer,
    headers: headers.headers,
  })
})

Cypress.Commands.add('createOfferId', () => {
  const headers = createAuthHeaders()
  cy.request({
    url: `${apiUrl}offers`,
    method: 'POST',
    body: offer,
    headers: headers.headers,
  }).then((res) => {
    return res.body.id
  })
})

Cypress.Commands.add('getResetToken', () => {
  cy.request('POST', `${apiUrl}test/pwresettoken`, { email: user.email })
})

Cypress.Commands.add('requestWithResetToken', (request) => {

  const token = cy.getResetToken()
  const headers = createHeadersFromToken(token)
  cy.request({
    ...request,
    headers: headers.headers,
  })
})

Cypress.Commands.add('checkImportedOfferFormValues', () => {
  cy.get("#beerNameField").should('value', offer.beerName)
  cy.get("#descriptionField").should('value', offer.description)
  cy.get("#locationField").should('value', offer.location.asText)
  cy.get("#recipeLinkField").should('value', offer.recipeLink)
  cy.get("#reviewLinkField").should('value', offer.reviewLink)
})



