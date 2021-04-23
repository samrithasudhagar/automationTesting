const LOGIN_USER_EMAIL='.inputField'
const FORGOT_PWD_BUTTON='.forgotPassword a'
const SUBMIT_BTN='.btn'
describe('login page', () => {
    it('should have the right title', () => {
        browser.url('https://dd-dev.tmls.dev/login')
    })
    it('email-id is typeable', () => {
        let email_field = $(LOGIN_USER_EMAIL)
        email_field.addValue('chinnaiyanswathi@gmail.com' )
        browser.pause(2000)
      })
      it('forgot pwd is clickable', () => {
        const myButton = $(FORGOT_PWD_BUTTON)
        myButton.click()
        browser.pause(2000)
    })
    it('slowdown page', () => {
        browser.executeAsync((done) => {
            setTimeout(done, 5900);
        });
    });
})
describe('forgot password page', () => {
    it('email-id is typeable', () => {
        let email_field = $(LOGIN_USER_EMAIL)
        email_field.addValue('chinnaiyanswathi@gmail.com' )
        browser.pause(2000)
      })
      it('forgot pwd is clickable', () => {
        const myButton = $(SUBMIT_BTN)
        myButton.click()
        browser.pause(2000)
    })
    it('slowdown page', () => {
        browser.executeAsync((done) => {
            setTimeout(done, 5900);
        });
    })
})