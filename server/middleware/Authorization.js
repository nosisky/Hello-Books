import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../models/';

dotenv.load();
const key = process.env.secretKey;
const { User } = db;
const { RentedBook } = db;

export default {
  checkUserInput(req, res, next) {
    const userNameError = 'Please provide a username with atleast 4 characters.';
    req.checkBody({
      username: {
        notEmpty: true,
        isLength: {
          options: [{ min: 4 }],
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
          options: [{ min: 5 }],
          errorMessage: 'Provide a valid password with minimum of 8 characters'
        },
        errorMessage: 'Your Password is required'
      }
    });
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = [];
      errors.forEach((error) => {
        allErrors.push({
          error: error.msg
        });
      });
      return res.status(409).json(allErrors);
    }
    User.findOne({
      where: {
        username: req.body.username,
        $or: {
          email: req.body.email
        }
      }
    }).then((user) => {
      if (user) {
        if (user.email === req.body.email) {
          return res.status(409).send({
            message: 'Email already exist'
          });
        } else if (user.username === req.body.email) {
          return res.status(409).send({
            message: 'Username already exist'
          });
        }
      }
    });

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
  /** Validates users login information
   * @param  {Object} req - request
   * @param  {Object} res - response
   * @param  {Object} next - calls the next method
   */

  validateLogin(req, res, next) {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({
        message: 'Please provide your username or password to login'
      });
    }
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then((user) => {
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        next();
      } else {
        return res.status(401).json({
          message: 'Invalid Credentials.'
        });
      }
    });
  },

  /** Get all users in the database
   * @param  {Object} request 
   * @param  {Object} response
   */

  getUsers(req, res) {
    return User.findAll({})
      .then(users => res.status(201).send(users))
      .catch(error => res.status(404).send(error));
  },

  /** Ad
   * @param  {object} req - request
   * @param  {object} res - response
   */

  UserExist(req, res) {
    return User.findOne({
      where: {
        username: req.body.username
      }
    })
      .then((user) => {
        if (user) {
          res.status(200).send({ message: 'username already exist' });
        } else {
          res.status(200).send({ message: '' });
        }
      })
      .catch(error => res.status(500).send({ error }));
  },

  /** Validates Email address
   * @param  {object} req - request
   * @param  {object} res - response
   */

  emailExist(req, res) {
    const re = /\S+@\S+\.\S+/,
      emailValidate = re.test(req.body.email);
    if (!emailValidate) {
      res.send({ message: 'Invalid email supplied' });
      return;
    }
    return User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then((user) => {
        if (user) {
          res.status(200).send({
            message: 'Email already exist',
            user: {
              id: user.id,
              fullname: user.fullName,
              username: user.username,
              email: user.email,
              active: user.acative,
              isBanned: user.isBanned,
              isAdmin: user.isAdmin,
              plan: user.plan
            }
          });
        } else {
          res.status(200).send({ message: '' });
        }
      })
      .catch(error => res.status(404).send({ error }));
  },

  /** Checks if logged in user has valid AUTH token
   * @param  {object} req - request
   * @param  {object} res - response
   */

  isLoggedIn(req, res, next) {
    let token;
    const tokenAvailable = req.headers.authorization || req.headers['x-access-token'];
    if (req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1];
    } else {
      token = tokenAvailable;
    }
    if (token) {
      jwt.verify(token, key, (error, decoded) => {
        if (error) {
          res.status(401).send({
            message: 'Failed to Authenticate Token',
            error
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(401).send({
        message: 'Access denied, Authentication token does not exist'
      });
    }
  },
  /** Checks if currently logged in user is an admin
   * @param  {object} req - request
   * @param  {object} res - response
   */

  isAdmin(req, res, next) {
    const decodedToken = req.decoded;
    if (typeof decodedToken.currentUser.isAdmin === 'undefined') {
      return res.status(403).send({
        message: 'You do not have permission to perform that operation'
      });
    } else if (decodedToken.currentUser.isAdmin === 1) {
      next();
    } else {
      return res.status(403).send({
        message: 'You do not have permission to perform that operation'
      });
    }
  },

  /** Checks if user has rented a book before
   * @param  {object} req - request
   * @param  {object} res - response
   */

  hasRentedBefore(req, res, next) {
    RentedBook.findOne({
      where: {
        bookId: req.body.bookId,
        userId: req.params.userId,
        returned: false
      }
    }).then((books) => {
      if (books) {
        res.status(401).send({
          message: 'You have rented that book before'
        });
      } else {
        next();
      }
    });
  },
  getOneUser(req, res) {
    return User.findById(req.params.userId)
      .then((user) => {
        const currentUser = {
          userId: user.id,
          username: user.username,
          fullname: user.fullName,
          active: user.active,
          isAdmin: user.isAdmin,
          email: user.email,
          plan: user.plan
        };
        const token = jwt.sign(
          {
            currentUser
          },
          key
        );
        return res.status(201).send({
          token
        });
      })
      .catch(error => res.status(404).send(error));
  },

  /**
   * 
   *  Check the rentedbook limit limit
   * @param {any} req - request
   * @param {any} res - response
   * @param {any} next - callBack function
   * @return {Object} - Object
   */
  checkUserPlan(req, res, next) {
    const message =
   'You are not permitted to ' +
   'borrow more books, please return the ones you have ' +
   'borrowed or upgrade your plan';

    RentedBook.findAndCount({
      where: {
        userId: req.params.userId,
        returned: false
      }
    }).then((rented) => {
      User.findById(req.params.userId).then((user) => {
        if (user.plan === 'Silver' && rented.count === 5) {
          res.status(403).send({
            message
          });
        } else if (user.plan === 'Diamond' && rented.count === 20) {
          res.status(403).send({
            message
          });
        } else if (user.plan === 'Gold' && rented.count === 20) {
          res.status(403).send({
            message: 'Book limit reached, return previously borrowed'
          });
        } else {
          next();
        }
      });
    });
  },

  /**
   * 
   *  Get users by email address
   * @param {Object} req - request
   * @param {Object} res - response
   * @returns {Object} - Object
   */
  getUserByEmail(req, res) {
    return User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then((user) => {
        const currentUser = {
          userId: user.id,
          username: user.username
        };
        const token = jwt.sign(
          {
            currentUser
          },
          key
        );
        return res.status(201).send({
          token
        });
      })
      .catch(error => res.status(404).send(error));
  }
};
