import supertest from 'supertest';
import should from 'should';
import mocha from 'mocha';
import app from '../server';
import expect from 'expect';
import models from '../server/models/';
import bookSeeder from '../server/seeders/books';

const server = supertest.agent(app);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJ1c2VySWQiOjQsInVzZXJuYW1lIjoiZGVhbHdhcCIsImZ1bGxuYW1lIjoiZHNoY2p2c2R2bmoiLCJhY3RpdmUiOnRydWUsImlzQWRtaW4iOjEsImVtYWlsIjoiZGVhbHdhcEBkZWFsd2FwLmNvbSIsInBsYW4iOiJzaWx2ZXIifSwiaWF0IjoxNTA4ODM1NTYwfQ.AUm0CjxQ_zjn5OVAQg1ntXlNP0W2IcROAygrJQ5j75Y';

let loggedInuser;

describe('#Book Features: ', () => {
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

  it('Should add a new book', (done) => {
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
        expect(res.body.book.title).toEqual('Think rich to grow rich');
        expect(res.body.book.isbn).toEqual('123-456-5858');
        expect(res.body.book.prodYear).toEqual('2018');
        expect(res.body.book.author).toEqual('Albert Einstein');
        expect(res.body.book.description)
        .toEqual('The book is based on education');
        res.body.message.should.equal('Book uploaded successfully');
        done();
      });
  });

  it(`Should display 'Category added successfully' 
      when a new category is added`, (done) => {
    server
      .post('/api/v1/books/cat')
      .set('Connection', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({ name: 'Test', description: 'test' })
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        expect(res.body.category.name).toEqual('Test');
        expect(res.body.category.description).toEqual('test');
        res.body.message.should.equal('Category added successfully');
        done();
      });
  });

  it('Should fetch all categories from the database', (done) => {
    server
      .get('/api/v1/category')
      .set('Connection', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        expect(res.body[0].name).toEqual('Test');
        expect(res.body[0].description).toEqual('test');
        res.body.should.have.lengthOf(1);
        done();
      });
  });

  it('should search for books', (done) => {
    server
      .post('/api/v1/search')
      .set('Connection', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({ search: 'Think rich' })
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.rows.should.have.lengthOf(1);
        res.body.rows[0].title.should.equal('Think rich to grow rich')
        res.body.rows[0].author.should.equal('Albert Einstein');
        res.
        body.
        rows[0].description.should.equal('The book is based on education');
        res.body.rows[0].isbn.should.equal('123-456-5858');
        done();
      });
  });

  it(`Should display 'Failed to Authenticate Token' 
  when no token is passed email sender route`, (done) => {
    server
      .post('/api/v1/books/email')
      .set('Connection', 'keep alive')
      .set('x-access-token', '8884848484848484')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({ message: 'Think rich', subject: 'Hello Test' })
      .expect(401)
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.message.should.equal('Failed to Authenticate Token');
        done();
      });
  });

  it(`Should display 'Access denied, Authentication token does not exist' 
  when no token is passed to the get books route`, (done) => {
    server
      .post('/api/v1/users/1/books')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({ bookId: 1 })
      .expect(401)
      .end((err, res) => {
        res.status.should.equal(401);
        res.
        body.
        message.
        should.equal('Access denied, Authentication token does not exist');
        done();
      });
  });

  it(`Should display 'Invalid user id supplied!!!' 
  when invalid user id is passed to get books route`, (done) => {
    server
      .post('/api/v1/users/dhdhs/books')
      .set('Connection', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({ bookId: 1 })
      .expect(400)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('Invalid user id supplied!!!');
        done();
      });
  });

  it(`Should display 'Invalid book id supplied!!!' 
  when invalid book Id is passed to get books route`, (done) => {
    server
      .post('/api/v1/users/4/books')
      .set('Connection', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({ bookId: 'dhbsnnmz' })
      .expect(400)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('Invalid book id supplied!!!');
        done();
      });
  });

  it(`Should display 'No rented books by this user'
   when user with no rent history is supplied`, (done) => {
    server
      .get('/api/v1/books/logs/4')
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

  it(`Should display 'You have successfully rented the book'
  when user rents a book`, (done) => {
    server
      .post('/api/v1/users/4/books')
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

  it('Shoud display list of notifications', (done) => {
    server
      .get('/api/v1/notification')
      .set('x-access-token', token)
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.length.should.equal(1);
        res.body[0].id.should.equal(1);
        res.
        body[0].message.should.equal('dealwap rented Think rich to grow rich');
        done();
      });
  });


  it('Should test for rented books', (done) => {
    server
      .get('/api/v1/users/4/books?returned=false')
      .set('x-access-token', token)
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .expect(200)
      .end((err, res) => {
        res.body[0].bookId.should.equal(1)
        res.body[0].userId.should.equal(4)
        res.body[0].title.should.equal('Think rich to grow rich')
        res.body[0].cover.should.equal('albert-think.jpg')
        res.status.should.equal(200);
        done();
      });
  });

  it(`Should display 'Book returned successfully' 
    when a user returns a book`, (done) => {
    server
      .put('/api/v1/users/4/books')
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

  it('Should test if book is truly returned', (done) => {
    server
      .get('/api/v1/users/4/books?returned=false')
      .set('x-access-token', token)
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('No rented unreturned books');
        done();
      });
  });

  it('should display logs of rented books', (done) => {
    server
      .get('/api/v1/books/logs/4')
      .set('x-access-token', token)
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .expect(200)
      .end((err, res) => {
        res.body[0].bookId.should.equal(1)
        res.body[0].userId.should.equal(4)
        res.body[0].title.should.equal('Think rich to grow rich')
        res.body[0].cover.should.equal('albert-think.jpg')
        done();
      });
  });

  it('Should get book details by book id', (done) => {
    server
      .get('/api/v1/books/1')
      .set('x-access-token', token)
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body[0].title.should.equal('Think rich to grow rich')
        res.body[0].author.should.equal('Albert Einstein');
        res.body[0].description.should.equal('The book is based on education');
        res.body[0].isbn.should.equal('123-456-5858');
        done();
      });
  });

  it(`Should display 'Book updated successfully!'' 
  when book data is modified`, (done) => {
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

  it('should fetch all books', (done) => {
    server
      .get('/api/v1/books?page=0')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('x-access-token', token)
      .type('form')
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.count.should.equal(1);
        res.body.rows[0].title.should.equal('This is a new title')
        res.body.rows[0].author.should.equal('Albert Einstein');
        res.
        body.rows[0].description.should.equal('The book is based on education');
        res.body.rows[0].isbn.should.equal('123-456-5858');
        done();
      });
  });

  it(`Should display 'Book deleted successfully!'
    when a book is succesfully deleted`, (done) => {
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

  it(`should return message 'There is no book in the database' 
  when book list is empty`, (done) => {
    server
      .get('/api/v1/books?page=0')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('x-access-token', token)
      .type('form')
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.message.should.equal('There is no book in the database');
        done();
      });
  });
});
