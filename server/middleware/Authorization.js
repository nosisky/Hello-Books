import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../models/';

dotenv.load();
const key = process.env.secretKey;
const { User } = db;
export default {
  checkUserInput(req, res, next) {
    const userNameError = 'Please provide a username with atleast 5 characters.';
    req.checkBody(
      {
        username: {
          notEmpty: true,
          isLength: {
            options: [{ min: 5 }],
            errorMessage: userNameError
          },
          errorMessage: 'Your Username is required'
        },
        email: {
          notEmpty: true,
          isEmail: {
            errorMessage: 'Provide a valid a Email Adrress'
          },
          errorMessage: 'Your Email Address is required'
        },
        fullName: {
          notEmpty: true,
          errorMessage: 'Your Fullname is required'
        },
        password: {
          notEmpty: true,
          isLength: {
            options: [{ min: 8 }],
            errorMessage: 'Provide a valid password with minimum of 8 characters'
          },
          errorMessage: 'Your Password is required'
        }
      }
    );
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = [];
      errors.forEach((error) => {
        const errorMessage = error.msg;
        allErrors.push(errorMessage);
      });
      return res.status(409)
        .json({
          message: allErrors[0]
        });
    }
    const password = bcrypt.hashSync(req.body.password, 10); // encrypt password
    req.userInput = {
      username: req.body.username,
      fullName: req.body.fullName,
      email: req.body.email,
      password,
      plan: req.body.plan
    };
    next();
  },
  validateLogin(req, res, next) {
    if (!req.body.username || !req.body.password) {
      return res.status(400)
        .json({
          message: 'Please provide your username or password to login'
        });
    }
    User.findOne(
      {
        where: {
          username: req.body.username
        }
      })
      .then((user) => {
        if (user &&
          bcrypt.compareSync(req.body.password, user.password)) {
          next();
        } else {
          return res.status(401)
            .json({
              message: 'Invalid Credentials.'
            });
        }
      });
  },
  getUsers(req, res) {
    //winston.info(req.decoded)
    return User
      .findAll({})
      .then(users => res.status(201).send(users))
      .catch(error => res.status(404).send(error));
  },
  isLoggedIn(req, res, next) {
    const token = req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, key, (error, decoded) => {
        if (error) {
          res.status(401)
            .send({
              message: 'Failed to Authenticate Token',
              error
            });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(401)
        .send({
          message: 'Access denied, Authentication token does not exist'
        });
    }
  },
  isAdmin(req, res, next) {
    const decodedToken = req.decoded;
    if (decodedToken.currentUser.isAdmin === 1) {
      next();
    } else {
      return res.status(401)
        .send({
          message: 'You do not have permission to perform that operation'
        });
    }
  }
};
