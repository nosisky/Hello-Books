const path = require('path');
const faker = require('faker');

const randomName = faker.name.findName();

module.exports = {
  'Admin should be able to sign in': browser =>
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'admin')
      .setValue('input[name=password]', 'admin')
      .click('button[name=action]')
      .pause(1000)
      .assert.urlContains('http://localhost:8000/admin')
      .pause(1000)
      .end(),

  'Admin should be able to add a book': browser =>
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'admin')
      .setValue('input[name=password]', 'admin')
      .click('button[name=action]')
      .waitForElementVisible('#add_book', 5000)
      .click('#add_book')
      .setValue('input[name=title]', 'This is just a test')
      .setValue('.textarea textarea', 'This is just a test')
      .setValue('input[name=isbn]', 'isbn-the-book')
      .setValue('input[name=author]', 'James Waldow')
      .setValue('input[name=productionYear]', 1992)
      .click('#categoryId option:nth-child(2n)')
      .setValue('input[name=total]', 19)
      .setValue('input[type="file"]', path.resolve('../../Desktop/how-to-book.jpeg'))
      .waitForElementVisible('#completed', 10000)
      .click('#addIt')
      .waitForElementVisible('#book_card', 10000)
      .assert.urlContains('http://localhost:8000/admin')
      .end(),

  'Admin should be able to add category': browser =>
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'admin')
      .setValue('input[name=password]', 'admin')
      .click('button[name=action]')
      .waitForElementVisible('#add_category', 5000)
      .click('#add_category')
      .setValue('input[name=name]', randomName)
      .setValue('.textarea textarea', 'This is just a test')
      .click('#submit_category')
      .pause(1000)
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Category added successfully')
      .assert.urlContains('http://localhost:8000/admin')
      .end(),

  'Admin should not be able to add book with the same isbn': browser =>
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'admin')
      .setValue('input[name=password]', 'admin')
      .click('button[name=action]')
      .waitForElementVisible('#add_book', 5000)
      .click('#add_book')
      .setValue('input[name=title]', 'This is just a test')
      .setValue('.textarea textarea', 'This is just a test')
      .setValue('input[name=isbn]', 'isbn-the-book')
      .setValue('input[name=author]', 'James Waldow')
      .setValue('input[name=productionYear]', 1992)
      .click('#categoryId option:nth-child(2n)')
      .setValue('input[name=total]', 19)
      .click('#addIt')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Book with that ISBN already exist')
      .assert.urlContains('http://localhost:8000/admin')
      .end(),

  'Admin should be able to edit a book': browser =>
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'admin')
      .setValue('input[name=password]', 'admin')
      .click('button[name=action]')
      .waitForElementVisible('#add_book', 5000)
      .click('#edit_button')
      .clearValue('input[name=title]')
      .setValue('input[name=title]', 'This book has been edited')
      .click('#submit_edit')
      .waitForElementVisible('#book_card', 5000)
      .assert.urlContains('http://localhost:8000/admin')
      .end(),

  'Admin should be able to delete a book': browser =>
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'admin')
      .setValue('input[name=password]', 'admin')
      .click('button[name=action]')
      .waitForElementVisible('#add_book', 5000)
      .click('#delete_button')
      .waitForElementVisible('.swal-button--confirm', 5000)
      .click('.swal-button--confirm')
      .waitForElementVisible('#book_card', 5000)
      .assert.urlContains('http://localhost:8000/admin')
      .end(),
};
