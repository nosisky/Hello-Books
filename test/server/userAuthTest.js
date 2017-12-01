import supertest from 'supertest';
import should from 'should';
import mocha from 'mocha';
import app from '../../server';
import models from '../../server/models/';
import userSeeder from '../../server/seeders/users';

const server = supertest.agent(app);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJ1c2VySWQiOjQsInVzZXJuYW1lIjoiZGVhbHdhcCIsImZ1bGxuYW1lIjoiZHNoY2p2c2R2bmoiLCJhY3RpdmUiOnRydWUsImlzQWRtaW4iOjEsImVtYWlsIjoiZGVhbHdhcEBkZWFsd2FwLmNvbSIsInBsYW4iOiJzaWx2ZXIifSwiaWF0IjoxNTA4ODM1NTYwfQ.AUm0CjxQ_zjn5OVAQg1ntXlNP0W2IcROAygrJQ5j75Y';

before((done) => {
  models.sequelize.sync({ force: true }).then(() => {
    done(null);
  }).catch((errors) => {
    done(errors);
  });
});

describe('User Api', () => {
  it('checks that username exceeds 4 characters', (done) => {
    server
      .post('/api/v1/users/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(userSeeder.usernameMin5)
      .expect(409)
      .end((err, res) => {
        res.status.should.equal(409);
        res.body[0].error.should.equal('Please provide a username with atleast 4 characters.');
        done();
      });
  });

  it('checks for missing full name during registeration', (done) => {
    server
      .post('/api/v1/users/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(userSeeder.noFullName)
      .expect(409)
      .end((err, res) => {
        res.status.should.equal(409);
        res.body[0].error.should.equal('Your Fullname is required');
        done();
      });
  });

  it('allows a new user to register', (done) => {
    server
      .post('/api/v1/users/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(userSeeder.signUp)
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.message.should.equal('Signed up successfully');
        done();
      });
  });

  it('Checks for existing username', (done) => {
    server
      .post('/api/v1/users/get')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({ username: 'Dealwap' })
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('username already exist');
        done();
      });
  });

  it('Checks for existing email address', (done) => {
    server
      .post('/api/v1/users/getemail')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({ email: 'nosisky@gmail.com' })
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('Email already exist');
        done();
      });
  });

  it('Checks for invalid login details', (done) => {
    server
      .post('/api/v1/users/signin')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(userSeeder.invalidLoginDetails)
      .expect(401)
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.message.should.equal('Invalid Credentials.');
        done();
      });
  });

  it('Feteches all users from the database', (done) => {
    server
      .get('/api/v1/users/all')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('x-access-token', token)
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        done();
      });
  });

  it('Logs the user in successfully', (done) => {
    server
      .post('/api/v1/users/signin')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(userSeeder.login)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('Logged In Successfully');
        done();
      });
  });
});

