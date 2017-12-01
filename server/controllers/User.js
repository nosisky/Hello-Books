import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import omit from 'lodash/omit';
import db from '../models';

dotenv.load();
const secret = process.env.secretKey;

const { User } = db;
export default {

  /** Adds a new use to the database
   * @param  {object} req request object
   * @param  {object} res response object
   * Route: POST: /users/signup
   * @return {Object} - Object containing user details
   */
  create(req, res) {
    return User.create(req.userInput)
      .then((user) => {
        const currentUser = omit(user, [
          'password',
          'createdAt',
          'updatedAt'
        ]);
        const token = jwt.sign({
          currentUser,
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) },
        secret);
        return res.status(201).send({
          message: 'Signed up successfully',
          token
        });
      })
      .catch(error => res.status(500).send(error));
  },

  /** Authenticates user login information
   * @param  {object} req - request
   * @param  {object} res - response 
   * Route: POST: /users/signin
   * @return {Object} - Object containing user details
   */
  login(req, res) {
    if (!req.body.username || !req.body.password) {
      return res.status(401).json({
        message: 'Please provide your username or password to login'
      });
    }
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then((user) => {
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const currentUser = omit(user, [
          'password',
          'createdAt',
          'updatedAt'
        ]);
        const token = jwt.sign({
          currentUser,
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) },
        secret);
        return res.status(200).send({
          message: 'Logged in successfully',
          token
        });
      }
      return res.status(401).json({
        message: 'Invalid Credentials.'
      });
    })
      .catch(error => res.status(500).send(error));
  },

  /**
   * 
   * Edit profile controller
   * @param {Object} req - request
   * @param {Object} res - response
   * @returns {Object} - Object containing status code and success message
   */
  editProfile(req, res) {
    return User.update(req.body, {
      where: {
        id: req.params.userId
      }
    })
      .then(() =>
        res.status(201).send({
          message: 'Profile updated successfully'
        })
      )
      .catch(error => res.status(400).send(error));
  }
};
