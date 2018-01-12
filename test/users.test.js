import supertest from 'supertest';
import should from 'should';
import mocha from 'mocha';
import expect from 'expect';
import jwt from 'jsonwebtoken';
import app from '../server';
import models from '../server/models/';
import userSeeder from '../server/seeders/userSeeder';

const server = supertest.agent(app);

let token;

before((done) => {
  models.sequelize.sync({ force: true }).then(() => {
    done(null);
  }).catch((errors) => {
    done(errors);
  });
});

describe('User Api: ', () => {
  it('Should register a new user', (done) => {
    server
      .post('/api/v1/users/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(userSeeder.signUp2)
      .expect(201)
      .end((err, res) => {
        ({ token } = res.body);
        res.status.should.equal(201);
        const currentUser = jwt.decode(res.body.token);
        expect(currentUser.currentUser.email).toEqual('main@gmail.com');
        expect(currentUser.currentUser.username).toEqual('dealwapb');
        expect(currentUser.currentUser.fullName)
          .toEqual('Abdulrasaq Nasirudeen');
        res.body.message.should.equal('Signed up successfully');
        done();
      });
  });

  it('Should retrieve user details by email address', (done) => {
    server
      .post('/api/v1/search/email')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({ email: 'main@gmail.com' })
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.user.username.should.equal('dealwapb');
        res.body.user.userId.should.equal(2);
        done();
      });
  });

  it(`Should display 'Profile updated successfully'' 
  when profile is modified`, (done) => {
      server
        .put('/api/v1/users/edit/2')
        .set('x-access-token', token)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          fullName: 'James Babalola',
          email: 'james@yahoo.com'
        })
        .expect(200)
        .end((err, res) => {
          const updatedData = jwt.decode(res.body.token);
          res.status.should.equal(200);
          res.body.message.should.equal('Profile updated successfully');
          updatedData.currentUser.fullName.should.equal('James Babalola');
          updatedData.currentUser.email.should.equal('james@yahoo.com');
          done();
        });
    });
});

