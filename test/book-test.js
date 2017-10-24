import supertest from 'supertest';
import should from 'should';
import mocha from 'mocha';
import app from '../server';
import models from '../server/models/';
import bookSeeder from '../server/seeders/books';

const server = supertest.agent(app);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJ1c2VySWQiOjQsInVzZXJuYW1lIjoiZGVhbHdhcCIsImZ1bGxuYW1lIjoiZHNoY2p2c2R2bmoiLCJhY3RpdmUiOnRydWUsImlzQWRtaW4iOjEsImVtYWlsIjoiZGVhbHdhcEBkZWFsd2FwLmNvbSIsInBsYW4iOiJzaWx2ZXIifSwiaWF0IjoxNTA4ODM1NTYwfQ.AUm0CjxQ_zjn5OVAQg1ntXlNP0W2IcROAygrJQ5j75Y';
const notAdmin = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJ1c2VySWQiOjQsInVzZXJuYW1lIjoic2VydmVyIiwiZnVsbG5hbWUiOiJ0ZXN0IHNlcnZlciIsImFjdGl2ZSI6dHJ1ZSwiaXNBZG1pbiI6MCwiZW1haWwiOiJzZXJ2ZXJAeWFocG8uY3BvbSIsInBsYW4iOiJzaWx2ZXIifSwiaWF0IjoxNTA4NjU5MDg2fQ.fyUymW7PzkMoxYVK-ErTPpshLZMUj_JNXS7fniLqlHQ';
before((done) => {
  models.sequelize.sync({ force: true }).then(() => {
    done(null);
  }).catch((errors) => {
    done(errors);
  });
});

describe('Adds a new book to the database', () => {
  it('tests that only admin can add book', (done) => {
    server
      .post('/api/v1/books')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('x-access-token', notAdmin)
      .type('form')
      .send(bookSeeder.validBook)
      .expect(403)
      .end((err, res) => {
        res.status.should.equal(403);
        res.body.message.should.equal('You do not have permission to perform that operation');
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
