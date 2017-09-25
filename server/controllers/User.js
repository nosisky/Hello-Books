import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../models';

dotenv.load();
const secret = process.env.secretKey;

const { User } = db;
export default {

  /** Adds a new use to the database
   * @param  {object} req request object
   * @param  {object} res response object
   * Route: POST: /users/signup
   */

  create(req, res) {
    return User
      .create(req.userInput)
      .then((user) => {
        user
          .update({
            active: true
          });
        const currentUser = {
          userId: user.id,
          username: user.username,
          fullname: user.fullName,
          isAdmin: user.isAdmin,
          plan: user.plan,
          active: user.active };
        const token = jwt.sign({ currentUser }, secret);
        return res.status(201).send({
          message: 'Signed up successfully',
          Token: token
        });
      })
      .catch(error => res.status(400).send(error));
  },

  /** Authenticates user login information
   * @param  {object} req
   * @param  {object} res
   * Route: POST: /users/signin
   */

  login(req, res) {
    User
      .findOne({
        where: { username: req.body.username }
      })
      .then((user) => {
        user
          .update(
            {
              active: true,

            }).then((result) => {
            const currentUser = { userId: result.id,
              username: result.username,
              fullname: result.fullName,
              active: result.active,
              isAdmin: result.isAdmin,
              email: result.email,
              plan: result.plan };
            const token = jwt.sign(
              { currentUser
              }, secret
            );
            res.status(200)
              .json({
                message: 'Logged In Successfully',
                Token: token
              });
          });
      });
  },
  editProfile(req, res) {
    return User
      .update(
        req.body,
        {
          where: {
            id: req.params.userId
          }
        })
      .then(() => res.status(201).send({
        message: 'Profile updated successfully'
      }))
      .catch(error => res.status(400).send(error));
  }
};
