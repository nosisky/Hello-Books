import supertest from 'supertest';
import should from 'should';
import mocha from 'mocha';
import expect from 'expect';
import app from '../server';
import models from '../server/models/';
import jwt from 'jsonwebtoken';
import userSeeder from '../server/seeders/users';

const server = supertest.agent(app);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJ1c2VySWQiOjQsInVzZXJuYW1lIjoiZGVhbHdhcCIsImZ1bGxuYW1lIjoiZHNoY2p2c2R2bmoiLCJhY3RpdmUiOnRydWUsImlzQWRtaW4iOjEsImVtYWlsIjoiZGVhbHdhcEBkZWFsd2FwLmNvbSIsInBsYW4iOiJzaWx2ZXIifSwiaWF0IjoxNTA4ODM1NTYwfQ.AUm0CjxQ_zjn5OVAQg1ntXlNP0W2IcROAygrJQ5j75Y';

before((done) => {
  models.sequelize.sync({ force: true }).then(() => {
    done(null);
  }).catch((errors) => {
    done(errors);
  });
});

describe('User Api: ', () => {
  it('should check that username exceeds 4 characters', (done) => {
    server
      .post('/api/v1/users/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(userSeeder.usernameMin5)
      .expect(400)
      .end((err, res) => {
        res.status.should.equal(400);
        res
          .body[0]
          .error
          .should.equal('Please provide a username with atleast 4 characters.');
        done();
      });
  });

  it('Should check for missing full name during registeration', (done) => {
    server
      .post('/api/v1/users/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(userSeeder.noFullName)
      .expect(400)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body[0].error.should.equal('Your Fullname is required');
        done();
      });
  });

  it('Should register a new user', (done) => {
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
        const currentUser = jwt.decode(res.body.token);
        expect(currentUser.currentUser.email).toEqual('nosisky@gmail.com');
        expect(currentUser.currentUser.username).toEqual('Dealwap');
        expect(currentUser.currentUser.fullName)
          .toEqual('Abdulrasaq Nasirudeen');
        done();
      });
  });

  it('Should Check for existing username', (done) => {
    server
      .post('/api/v1/users/validate')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({ username: 'Dealwap' })
      .expect(409)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('Username already exist');
        done();
      });
  });

  it('Should check for existing email address', (done) => {
    server
      .post('/api/v1/users/validate')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('x-access-token', token)
      .type('form')
      .send({ email: 'nosisky@gmail.com' })
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('Email already exist');
        done();
      });
  });

  it('Should check for invalid login details', (done) => {
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

  it('Should validate for empty password', (done) => {
    server
      .post('/api/v1/users/signin')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(userSeeder.missingPassword)
      .expect(401)
      .end((err, res) => {
        res.status.should.equal(401);
        res
          .body
          .message
          .should.equal('Please provide your username or password to login');
        done();
      });
  });


  it('Should log the user in successfully', (done) => {
    server
      .post('/api/v1/users/signin')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(userSeeder.login)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        const currentUser = jwt.decode(res.body.token);
        expect(currentUser.currentUser.email).toEqual('nosisky@gmail.com');
        expect(currentUser.currentUser.username).toEqual('Dealwap');
        expect(currentUser.currentUser.fullName)
          .toEqual('Abdulrasaq Nasirudeen');
        res.body.message.should.equal('Logged In Successfully');
        done();
      });
  });
});

