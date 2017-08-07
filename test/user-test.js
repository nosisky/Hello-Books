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