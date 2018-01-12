import supertest from 'supertest';
import should from 'should';
import mocha from 'mocha';
import dotenv from 'dotenv';
import expect from 'expect';

import app from '../server';
import models from '../server/models/';
import bookSeeder from '../server/seeders/bookSeeder';

const {
  validBook,
  noBookTitle,
  noIsbn,
  noProductionYear,
  noCover,
  noAuthor,
  noCategoryId
} = bookSeeder;

dotenv.load();

const server = supertest.agent(app);
const token = process.env.testToken;
const { notAdmin } = process.env;

before((done) => {
  models.sequelize.sync({ force: true }).then(() => {
    done(null);
  }).catch((errors) => {
    done(errors);
  });
});

describe('#Book Features: ', () => {
  it(`Should display You do not have permission to perform that operation
    when a non-admin user tries to add a book`, (done) => {
      server
        .post('/api/v1/books')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('x-access-token', notAdmin)
        .type('form')
        .send(validBook)
        .expect(403)
        .end((err, res) => {
          res.status.should.equal(403);
          res.body
            .message
            .should
            .equal('You do not have permission to perform that operation');
          done();
        });
    });

  it(`Should display Access denied, Authentication token does not exist
  When there is no token passed to the authenticated endpoint`, (done) => {
      server
        .post('/api/v1/books')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(validBook)
        .expect(401)
        .end((err, res) => {
          res.status.should.equal(401);
          res.body
            .message
            .should.equal('Access denied, Authentication token does not exist');
          done();
        });
    });

  it('Should add a new book', (done) => {
    server
      .post('/api/v1/books')
      .set('Connection', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send(validBook)
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        expect(res.body.book.title).toEqual('Think rich to grow rich');
        expect(res.body.book.isbn).toEqual('123-456-5858');
        expect(res.body.book.productionYear).toEqual('2018');
        expect(res.body.book.author).toEqual('Albert Einstein');
        expect(res.body.book.description);
        res.body.message.should.equal('Book uploaded successfully');
        done();
      });
  });

  it(`Should display 'Book title is required' when book title 
  is not supplied to the Add Book route`, (done) => {
      server
        .post('/api/v1/books')
        .set('Connection', 'keep alive')
        .set('x-access-token', token)
        .set('Content-Type', 'application/json')
        .type('form')
        .send(noBookTitle)
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('Book title is required');
          done();
        });
    });


  it(`Should display 'ISBN is required' when book isbn 
  is not supplied to the Add Book route`, (done) => {
      server
        .post('/api/v1/books')
        .set('Connection', 'keep alive')
        .set('x-access-token', token)
        .set('Content-Type', 'application/json')
        .type('form')
        .send(noIsbn)
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('ISBN is required');
          done();
        });
    });

  it(`Should display 'Please add book category' when category id 
  is not supplied to the Add Book route`, (done) => {
      server
        .post('/api/v1/books')
        .set('Connection', 'keep alive')
        .set('x-access-token', token)
        .set('Content-Type', 'application/json')
        .type('form')
        .send(noCategoryId)
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('Please add book category');
          done();
        });
    });

  it(`Should display 'Production Year is required' when Production year 
  is not supplied to the Add Book route`, (done) => {
      server
        .post('/api/v1/books')
        .set('Connection', 'keep alive')
        .set('x-access-token', token)
        .set('Content-Type', 'application/json')
        .type('form')
        .send(noProductionYear)
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('Production Year is required');
          done();
        });
    });

  it(`Should display 'Please upload a valid book cover' when book cover 
  is not supplied to the Add Book route`, (done) => {
      server
        .post('/api/v1/books')
        .set('Connection', 'keep alive')
        .set('x-access-token', token)
        .set('Content-Type', 'application/json')
        .type('form')
        .send(noCover)
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('Please upload a valid book cover');
          done();
        });
    });

  it(`Should display 'Please add book author' when book author 
  is not supplied to the Add Book route`, (done) => {
      server
        .post('/api/v1/books')
        .set('Connection', 'keep alive')
        .set('x-access-token', token)
        .set('Content-Type', 'application/json')
        .type('form')
        .send(noAuthor)
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('Please add book author');
          done();
        });
    });
});
