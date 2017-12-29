import supertest from 'supertest';
import should from 'should';
import mocha from 'mocha';
import app from '../../server';
import models from '../../server/models/';
import userSeeder from '../../server/seeders/users';

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
        res.status.should.equal(201);
        token = res.body.token;
        res.body.message.should.equal('Signed up successfully');
        done();
      });
  });

  it('Should edit user profile', (done) => {
    server
      .put('/api/v1/users/edit/1')
      .set('Connection', 'keep alive')
      .set('x-access-token', token)      
      .set('Content-Type', 'application/json')
      .type('form')
      .send({ fullName: 'bolaji Usman', email: 'bolaji@mama.com' })
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('Profile updated successfully');
        done();
      });
  });

  it('Should retrieve user details by email address', (done) => {
    server
      .post('/api/v1/search/email')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({ email: 'bolaji@mama.com' })
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.user.username.should.equal('Dealwapb');
        done();
      });
  });
});

