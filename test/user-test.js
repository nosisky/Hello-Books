import supertest from 'supertest';
import should from 'should';
import mocha from 'mocha';
import app from '../server';
import models from '../server/models/';
import { signUp, login, noFullName, invalidLoginDetails, existingUsername, existingEmail, noEmail, usernameMin5 } from '../server/seeders/users';

const server = supertest.agent(app);

before((done) => {
  models.sequelize.sync({ force: true }).then(() => {
    done(null);
  }).catch((errors) => {
    done(errors);
  });
});

describe('User Registration', () => {
  it('allows a new user to register', (done) => {
    server
      .post('/api/v1/users/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(signUp)
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.success.should.equal(true);
        done();
      });
  });

  it('should ensure that username is unique', (done) => {
    server
      .post('/api/v1/users/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(existingUsername)
      .expect(409)
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.message.should.equal('username must be unique');
        done();
      });
  });

  it('validates email during registration', (done) => {
    server
      .post('/api/user/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(noEmail)
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.message.should.equal('Your Email Address is required');
        done();
      });
  });

  it('disallows a new user to register if username is not up to eight characters', (done) => {
    server
      .post('/api/v1/users/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(usernameMin5)
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.success.should.equal(false);
        done();
      });
  });