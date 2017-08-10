import supertest from 'supertest';
import should from 'should';
import mocha from 'mocha';
import app from '../server';
import models from '../server/models/';
import bookSeeder from '../server/seeders/books';

const server = supertest.agent(app);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJ1c2VySWQiOjQsInVzZXJuYW1lIjoiYmFiYWxvbGEiLCJmdWxsbmFtZSI6IkFiZHVsIHJhc2EiLCJpc0FkbWluIjoxLCJwbGFuIjoic2lsdmVyIiwiYWN0aXZlIjp0cnVlfSwiaWF0IjoxNTAyMjEyNzY5fQ.OY7VqntSO0zn1fYzmTw-RcFIcEbdZ4uvLBGT_TUpdB4';

before((done) => {
  models.sequelize.sync({ force: true }).then(() => {
    done(null);
  }).catch((errors) => {
    done(errors);
  });
});

describe('Adds a new book to the database', () => {
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

  it('tests if user can rent book without logging in', (done) => {
    server
      .post('/api/v1/users/1/books')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({ bookId: 1 })
      .expect(401)
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.message.should.equal('Access denied, Authentication token does not exist');
        done();
      });
  });

  it('tests for book renting', (done) => {
    server
      .post('/api/v1/users/1/books')
      .set('x-access-token', token)
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({ bookId: 1 })
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.message.should.equal('You have successfully rented the book');
        done();
      });
  });

  it('tests for rented books', (done) => {
    server
      .get('/api/v1/users/1/books?returned=false')
      .set('x-access-token', token)
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        done();
      });
  });
  it('test for returns rented books', (done) => {
    server
      .put('/api/v1/users/1/books')
      .set('x-access-token', token)
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({ bookId: 1 })
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('Book returned successfully!');
        done();
      });
  });

  it('test if book is truly returned', (done) => {
    server
      .get('/api/v1/users/1/books?returned=false')
      .set('x-access-token', token)
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.message.should.equal('No rented unreturned books');
        done();
      });
  });

  it('test for book modification', (done) => {
    server
      .put('/api/v1/books/1')
      .set('x-access-token', token)
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({ title: 'This is a new title' })
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('Book updated successfully!');
        done();
      });
  });
});
