import supertest from 'supertest';
import should from 'should';
import mocha from 'mocha';
import app from '../../server';
import models from '../../server/models/';
import bookSeeder from '../../server/seeders/books';

const server = supertest.agent(app);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJ1c2VySWQiOjQsInVzZXJuYW1lIjoiZGVhbHdhcCIsImZ1bGxuYW1lIjoiZHNoY2p2c2R2bmoiLCJhY3RpdmUiOnRydWUsImlzQWRtaW4iOjEsImVtYWlsIjoiZGVhbHdhcEBkZWFsd2FwLmNvbSIsInBsYW4iOiJzaWx2ZXIifSwiaWF0IjoxNTA4ODM1NTYwfQ.AUm0CjxQ_zjn5OVAQg1ntXlNP0W2IcROAygrJQ5j75Y';

let loggedInuser;

describe('Adds a new book to the database', () => {
  before((done) => {
    models.sequelize.sync({ force: true }).then(() => {
      server
        .post('/api/v1/users/signup')
        .send({
          fullName: 'signumicheal jordan',
          email: 'jordan@you.com',
          password: 'micheal123',
          username: 'jordan'
        })
        .end((err, res) => {
          loggedInuser = res.body;
          done();
        });
    }).catch((errors) => {
      done(errors);
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

  it('tests for invalid user', (done) => {
    server
      .post('/api/v1/users/dhdhs/books')
      .set('Connection', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({ bookId: 1 })
      .expect(401)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.message.should.equal('Invalid user id supplied!!!');
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

  it('tests for invalid book id', (done) => {
    server
      .post('/api/v1/users/1/books')
      .set('Connection', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({ bookId: 'dhbsnnmz' })
      .expect(401)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.message.should.equal('Invalid book id supplied!!!');
        done();
      });
  });
  it('should display message \'No rented books by this user \' ', (done) => {
    server
      .get('/api/v1/books/logs/1')
      .set('x-access-token', token)
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('No rented books by this user');
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
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.message.should.equal('Book returned successfully');
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
  it('should rent a new book', (done) => {
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
  it('should display logs of rented books', (done) => {
    server
      .get('/api/v1/books/logs/1')
      .set('x-access-token', token)
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .expect(201)
      .end((err, res) => {
        res.body[0].should.have.property('toReturnDate');
        res.body[0].should.have.property('returnDate');
        res.body[0].should.have.property('bookId');
        done();
      });
  });
  it('get a specific book with id = 1', (done) => {
    server
      .get('/api/v1/books/1')
      .set('x-access-token', token)
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body[0].should.have.property('title');
        res.body[0].should.have.property('author');
        res.body[0].should.have.property('description');
        res.body[0].should.have.property('isbn');
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
  it('should return all books', (done) => {
    server
      .get('/api/v1/books?page=0')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('x-access-token', token)
      .type('form')
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.count.should.equal(1);
        res.body.rows[0].should.have.property('title');
        res.body.rows[0].should.have.property('author');
        res.body.rows[0].should.have.property('description');
        res.body.rows[0].should.have.property('isbn');
        done();
      });
  });
  it('deletes a book successfully', (done) => {
    server
      .delete('/api/v1/books/delete/1')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('x-access-token', token)
      .type('form')
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('Book deleted successfully!');
        done();
      });
  });
  it('should return message \'There is no book in the database\' ', (done) => {
    server
      .get('/api/v1/books?page=0')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('x-access-token', token)
      .type('form')
      .expect(200)
      .end((err, res) => {
        console.log(res.body)
        res.status.should.equal(400);
        res.body.message.should.equal('There is no book in the database');
        done();
      });
  });
});
