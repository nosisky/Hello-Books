const faker = require('faker');

const randomName = faker.name.findName();
const username = faker.name.firstName();
const randomEmail = faker.internet.email();

module.exports = {
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
      .waitForElementVisible('.dropdown-button', 5000)
      .assert.urlContains('http://localhost:8000/dashboard')
      .end(),
  'Users should be able to rent and return book': browser =>
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', username)
      .setValue('input[name=password]', randomName)
      .click('button[name=action]')
      .waitForElementVisible('.dropdown-button', 5000)
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
      .pause(2000)
      .end(),
  'Users should be able to search for books': browser =>
      browser
        .url('http://localhost:8000/')
        .waitForElementVisible('body', 5000)
        .setValue('input[name=username]', username)
        .setValue('input[name=password]', randomName)
        .click('button[name=action]')
        .waitForElementVisible('.dropdown-button', 5000)
        .assert.urlContains('http://localhost:8000/dashboard')
        .click('#showSearch')
        .setValue('input[name=search]', 'This')
        .waitForElementVisible('#borrowNow', 5000)      
        .end()
};
