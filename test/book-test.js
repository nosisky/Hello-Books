import supertest from 'supertest';
import should from 'should';
import mocha from 'mocha';
import app from '../server';
import models from '../server/models/';
import bookSeeder from '../server/seeders/books';

const server = supertest.agent(app);
let token;

before((done) => {
  models.sequelize.sync({ force: true }).then(() => {
    done(null);
  }).catch((errors) => {
    done(errors);
  });
});

describe('Adds a new book to the database', () => {
  it('allows a new user with admin priviledge to register', (done) => {
    server
      .post('/api/v1/users/admin-x-x/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(bookSeeder.signUp)
      .expect(201)
      .end((err, res) => {
        token = res.body.Token;
        res.status.should.equal(201);
        res.body.message.should.equal('Signed up successfully');
        done();
      });
  });

  it('tests that AUTH token is required to add a new book', (done) => {
    server
      .post('/api/v1/books')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(bookSeeder.validBook)
      .expect(401)
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.message.should.equal('Access denied, Authentication token does not exist');
        done();
      });
  });

  it('adds a new book', (done) => {
    server
      .post('/api/v1/books')
      .set('Connection', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send(bookSeeder.validBook)
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.message.should.equal('Book uploaded successfully');
        done();
      });
  });
  it('tests for valid book title', (done) => {
    server
      .post('/api/v1/books')
      .set('Connection', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send(bookSeeder.noBookTitle)
      .expect(409)
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.message.should.equal('Book title is required');
        done();
      });
  });


  it('tests for valid book ISBN', (done) => {
    server
      .post('/api/v1/books')
      .set('Connection', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send(bookSeeder.noIsbn)
      .expect(409)
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.message.should.equal('ISBN is required');
        done();
      });
  });
  it('tests for valid book category', (done) => {
    server
      .post('/api/v1/books')
      .set('Connection', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send(bookSeeder.noCatId)
      .expect(409)
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.message.should.equal('Please add book category');
        done();
      });
  });
  it('tests for valid book Production year', (done) => {
    server
      .post('/api/v1/books')
      .set('Connection', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send(bookSeeder.noProdYear)
      .expect(409)
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.message.should.equal('Production Year is required');
        done();
      });
  });

  it('tests for valid book cover', (done) => {
    server
      .post('/api/v1/books')
      .set('Connection', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send(bookSeeder.noCover)
      .expect(409)
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.message.should.equal('Please upload a valid book cover');
        done();
      });
  });

  it('tests for valid book author', (done) => {
    server
      .post('/api/v1/books')
      .set('Connection', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send(bookSeeder.noAuthor)
      .expect(409)
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.message.should.equal('Please add book author');
        done();
      });
  });
});
