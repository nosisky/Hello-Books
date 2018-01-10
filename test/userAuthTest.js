import supertest from 'supertest';
import should from 'should';
import mocha from 'mocha';
import dotenv from 'dotenv';
import expect from 'expect';
import jwt from 'jsonwebtoken';

import app from '../server';
import models from '../server/models/';
import userSeeder from '../server/seeders/userSeeder';

dotenv.load();

const {
  usernameMin5,
  noFullName,
  signUp,
  invalidLoginDetails,
  missingPassword,
  login
} = userSeeder;

const server = supertest.agent(app);
const token = process.env.testToken;

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
      .send(usernameMin5)
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
      .send(noFullName)
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
      .send(signUp)
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.message.should.equal('Signed up successfully');
        const currentUser = jwt.decode(res.body.token);
        expect(currentUser.currentUser.email).toEqual('nosisky@gmail.com');
        expect(currentUser.currentUser.username).toEqual('dealwap');
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
      .send({ username: 'dealwap' })
      .expect(409)
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.message.should.equal('Username already exist');
        done();
      });
  });

  it(`Should return 'invalid email address supplied'
  when invalid email address is supplied`, (done) => {
      server
        .post('/api/v1/users/validate')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({ email: 'Dealwap' })
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('Invalid email supplied');
          done();
        });
    });

  it(`Should return 'Invalid username supplied'
    when username with invalid characters is supplied`, (done) => {
      server
        .post('/api/v1/users/validate')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({ username: '!!!!!!' })
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('Invalid Username supplied!');
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
      .expect(409)
      .end((err, res) => {
        res.status.should.equal(409);
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
      .send(invalidLoginDetails)
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
      .send(missingPassword)
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
      .send(login)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        const currentUser = jwt.decode(res.body.token);
        expect(currentUser.currentUser.email).toEqual('nosisky@gmail.com');
        expect(currentUser.currentUser.username).toEqual('dealwap');
        expect(currentUser.currentUser.fullName)
          .toEqual('Abdulrasaq Nasirudeen');
        res.body.message.should.equal('Logged In Successfully');
        done();
      });
  });
});

