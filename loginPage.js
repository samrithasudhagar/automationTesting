const assert = require('assert')

const LOGIN_USER_EMAIL='.inputField'
const PWD_FIELD='.inputField[type=password]'
const SUBMIT_BTN='.btn'
describe('login page', () => {
    it('should have the right title', () => {
        browser.url('https://dd-dev.tmls.dev/login')
    })
    it('email-id is typeable', () => {
        let email_field = $(LOGIN_USER_EMAIL)
        email_field.addValue('chinnaiyanswathi@gmail.com' )
       
      })
      it('password is typeable', () => {
        let pwd_field = $(PWD_FIELD)
        pwd_field.addValue('16jecs247')
       
      })
      it('submit is clickable', () => {
        $(SUBMIT_BTN).waitForEnabled(3000)
        const myButton = $(SUBMIT_BTN)
        myButton.click()
    })
})