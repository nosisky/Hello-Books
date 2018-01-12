const path = require('path');
const faker = require('faker');

const randomName = faker.name.findName();
const isbn = faker.lorem.slug();

module.exports = {

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
      .setValue('.textarea textarea', 'This is just a test description')
      .setValue('input[name=isbn]', isbn)
      .setValue('input[name=author]', 'James Waldow')
      .setValue('input[name=productionYear]', 1992)
      .click('#categoryId option:nth-child(2n)')
      .setValue('input[name=total]', 19)
      .setValue('input[type="file"]', path.resolve('../../Desktop/how-to-book.jpeg'))
      .waitForElementVisible('#completed', 10000)
      .click('#addIt')
      .waitForElementVisible('#book_card', 10000)
      .assert
      .containsText(`[data-isbn=${isbn}] span`, 'This is just a test')
      .assert
      .containsText(`[data-isbn=${isbn}] p`, 'This is just a test description')
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
      .setValue('input[name=isbn]', isbn)
      .setValue('input[name=author]', 'James Waldow')
      .setValue('input[name=productionYear]', 1992)
      .click('#categoryId option:nth-child(2n)')
      .setValue('input[name=total]', 19)
      .click('#addIt')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Book with that ISBN already exist')
      .assert.urlContains('http://localhost:8000/admin')
      .end(),

  'Admin should not be able to add book with existing category name': browser =>
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
      .assert.containsText('.toast', 'Category with that name already exist')
      .assert.urlContains('http://localhost:8000/admin')
      .end(),

  'Admin should not be able to add book with title less than 5 characters': browser =>
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'admin')
      .setValue('input[name=password]', 'admin')
      .click('button[name=action]')
      .waitForElementVisible('#add_book', 5000)
      .click('#add_book')
      .setValue('input[name=title]', 'This')
      .setValue('.textarea textarea', 'This is just a test')
      .assert.containsText('.red-text', 'Book title must be greater than 5 characters')
      .end(),


  'Admin should be able to edit a book': browser =>
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'admin')
      .setValue('input[name=password]', 'admin')
      .click('button[name=action]')
      .waitForElementVisible('#add_book', 5000)
      .click(`[data-isbn=${isbn}] #edit_button`)
      .clearValue('#title_book')
      .setValue('#title_book', 'This book has been edited')
      .pause(2000)
      .click('#submit_edit')
      .waitForElementVisible('#book_card', 5000)
      .assert
      .containsText(`[data-isbn=${isbn}] span`, 'This book has been edited')
      .assert
      .containsText(`[data-isbn=${isbn}] p`, 'This is just a test description')
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
      .click(`[data-isbn=${isbn}] #delete_button`)
      .waitForElementVisible('.swal-button--confirm', 5000)
      .click('.swal-button--confirm')
      .assert.elementNotPresent(`[data-isbn=${isbn}]`)
      .assert.urlContains('http://localhost:8000/admin')
      .end(),

  'Admin should be able to add a new book': browser =>
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'admin')
      .setValue('input[name=password]', 'admin')
      .click('button[name=action]')
      .waitForElementVisible('#add_book', 5000)
      .click('#add_book')
      .setValue('input[name=title]', 'This is just a test')
      .setValue('.textarea textarea', 'This is just a test description')
      .setValue('input[name=isbn]', 'isbn-the-test')
      .setValue('input[name=author]', 'James Waldow')
      .setValue('input[name=productionYear]', 1992)
      .click('#categoryId option:nth-child(2n)')
      .setValue('input[name=total]', 19)
      .setValue('input[type="file"]', path.resolve('../../Desktop/how-to-book.jpeg'))
      .waitForElementVisible('#completed', 10000)
      .click('#addIt')
      .waitForElementVisible('#book_card', 10000)
      .assert
      .containsText('[data-isbn=isbn-the-test] span', 'This is just a test')
      .assert
      .containsText('[data-isbn=isbn-the-test] p', 'This is just a test description')
      .assert.urlContains('http://localhost:8000/admin')
      .end(),

};
