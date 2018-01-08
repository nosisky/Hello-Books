const faker = require('faker');

const randomName = faker.name.findName();
const username = faker.name.firstName();
const randomEmail = faker.internet.email();

module.exports = {
  'Users should not be able to login with invalid details': browser =>
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', username)
      .setValue('input[name=password]', randomName)
      .click('button[name=action]')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Invalid Credentials.')
      .assert.urlContains('http://localhost:8000')
      .pause(1000),

  'Users should be able to register, login and logout': browser =>
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .click('#joinus')
      .setValue('#uname', username)
      .setValue('input[name=fullName]', randomName)
      .setValue('#pword', randomName)
      .setValue('input[name=passwordConfirm]', randomName)
      .setValue('input[name=email]', randomEmail)
      .click('#createAccount')
      .waitForElementVisible('#logout_icon', 5000)
      .click('#logout_icon')
      .assert.urlContains('http://localhost:8000')
      .setValue('input[name=username]', username)
      .setValue('input[name=password]', randomName)
      .click('button[name=action]')
      .waitForElementVisible('#book_card', 5000)
      .assert.urlContains('http://localhost:8000/dashboard')
      .click('#logout_icon')
      .pause(1000),

  'Users cannot register with existing/invalid details': browser =>
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .click('#joinus')
      .setValue('#uname', 'tea')
      .setValue('input[name=fullName]', randomName)
      .waitForElementVisible('#usernameError', 5000)
      .assert
      .containsText(
        '#usernameError',
        'username must be a minimum of 4 characters'
      )
      .waitForElementVisible('#usernameError', 5000)
      .pause(1000),

  'Users should be able to rent and return book': browser =>
    browser
      .click('#login_now')
      .setValue('input[name=username]', username)
      .setValue('input[name=password]', randomName)
      .click('button[name=action]')
      .waitForElementVisible('#logout_icon', 5000)
      .assert.urlContains('http://localhost:8000/dashboard')
      .click('#borrowNow')
      .waitForElementVisible('.swal-button--confirm', 5000)
      .click('.swal-button--confirm')
      .waitForElementVisible('.swal-button--confirm', 5000)
      .click('.swal-button--confirm')
      .waitForElementVisible('#rentedBooks', 5000)
      .click('#rentedBooks')
      .waitForElementVisible('#returnBook', 5000)
      .click('#returnBook')
      .waitForElementVisible('.swal-button--confirm', 5000)
      .click('.swal-button--confirm')
      .end(),

  'Users should be able to search for books': browser =>
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', username)
      .setValue('input[name=password]', randomName)
      .click('button[name=action]')
      .waitForElementVisible('#logout_icon', 5000)
      .click('#showSearch')
      .setValue('input[name=search]', 'This')
      .waitForElementVisible('#borrowNow', 5000)
      .end()
};
