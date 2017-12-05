const path = require('path');

module.exports = {
  'Admin should be able to sign in': browser =>
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'admin')
      .setValue('input[name=password]', 'admin')
      .click('button[name=action]')
      .waitForElementVisible('.dropdown-button', 5000)
      .assert.urlContains('http://localhost:8000/admin')
      .end(),
  'Admin should be able to add a book': browser =>
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'admin')
      .setValue('input[name=password]', 'admin')
      .click('button[name=action]')
      .waitForElementVisible('#add-book', 5000)
      .click('#add-book')
      .setValue('input[name=title]', 'This is just a test')
      .setValue('.textarea textarea', 'This is just a test')
      .setValue('input[name=isbn]', 'isbn-the-book')
      .setValue('input[name=author]', 'James Waldow')
      .setValue('input[name=prodYear]', 1992)
      .click('#catId option:nth-child(2n)')
      .setValue('input[name=total]', 19)
      .setValue('input[type="file"]', path.resolve('../../Desktop/how-to-book.jpeg'))
      .waitForElementVisible('#completed', 10000)
      .click('#addIt')
      .waitForElementVisible('#book_card', 10000)
      .assert.urlContains('http://localhost:8000/admin')
      .end(),
  'Admin should be able to edit a book': browser =>
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'admin')
      .setValue('input[name=password]', 'admin')
      .click('button[name=action]')
      .waitForElementVisible('#add-book', 5000)
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
      .waitForElementVisible('#add-book', 5000)
      .click('#delete_button')
      .waitForElementVisible('.swal-button--confirm', 5000)
      .click('.swal-button--confirm')
      .waitForElementVisible('#book_card', 5000)
      .assert.urlContains('http://localhost:8000/admin')
      .end()
};
