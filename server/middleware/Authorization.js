import bcrypt from 'bcrypt';
import db from '../models/';
import jwt from 'jsonwebtoken';

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
    };
    // check if username already exist
    User.findOne(
      {
        where: {
          username: req.body.username
        }
      }
    ).then((user) => {
      if (user) {
        return res.status(409).send({
          message: 'Username already exist'
        });
      }
    });
    // check if email address already exist
    User.findOne(
      {
        where: {
          email: req.body.email
        }
      }
    ).then((user) => {
      if (user) {
        return res.status(409).send({
          message: 'Email Address already exist'
        });
      }
    });
    next();
  },
  validateLogin(req, res, next) {
    if (!req.body.username || !req.body.password) {
      return res.status(400)
        .json({
          success: false,
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
              success: false,
              message: 'Invalid Credentials.'
            });
        }
      });
  },
  getUsers(req, res) {
    return User
      .findAll({})
      .then(users => res.status(201).send(users))
      .catch(error => res.status(404).send(error));
  }
};
