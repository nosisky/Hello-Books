import bcrypt from 'bcrypt';
import omit from 'lodash/omit';

import database from '../models';

const { Book, User } = database;

const Validation = {
  /**
   *
   * @description - Validates User Input
   *
   * @param {Object} req - request
   *
   * @param {Object} res - response
   *
   * @param {Object} next - call back function
   *
   * @returns {Object} - Object containing error message
   */
  checkUserInput(req, res, next) {
    let userNameError = '';
    userNameError = 'Please provide a username with atleast 4 characters.';
    req.assert('passwordConfirm', 'Confirm password').notEmpty().len(5, 20);
    req.assert('passwordConfirm', 'Passwords must match')
      .equals(req.body.password);

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
      return res.status(400).json(allErrors);
    }
    return User.findOne({
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
        } else if (user.username === req.body.username) {
          return res.status(409).send({
            message: 'Username already exist'
          });
        }
      } else {
        const password = bcrypt.hashSync(req.body.password, 10);
        req.userInput = {
          username: req.body.username,
          fullName: req.body.fullName,
          email: req.body.email,
          password
        };
        next();
      }
    });
  },

  /**
 * Checks if book id is a number
 *
 * @param {Object} req - request
 *
 * @param {Object} res - response
 *
 * @param {Function} next - Call back function
 *
 * @returns { Object } - containing error message
 */
  checkBookId(req, res, next) {
    const querier = req.body.bookId || req.params.bookId;
    if (!querier || /[\D]/.test(querier)) {
      return res.status(400).send({
        message: 'Invalid book id supplied!!!'
      });
    }
    next();
  },

  /**
   *
   * @description - Validates User Input when adding book
   *
   * @param {Object} req - request
   *
   * @param {Object} res - response
   *
   * @param {Object} next - call back function
   *
   * @returns {Object} - Object containing error message
   */
  checkBookInput(req, res, next) {
    const bookError = 'Please provide a book title with atleast 5 characters.';
    req.checkBody({
      title: {
        notEmpty: true,
        isLength: {
          options: [{ min: 5 }],
          errorMessage: bookError
        },
        errorMessage: 'Book title is required'
      },
      isbn: {
        notEmpty: true,
        errorMessage: 'ISBN is required'
      },
      prodYear: {
        notEmpty: true,
        errorMessage: 'Production Year is required'
      },
      cover: {
        notEmpty: true,
        errorMessage: 'Please upload a valid book cover'
      },
      author: {
        notEmpty: true,
        errorMessage: 'Please add book author'
      },
      description: {
        notEmpty: true,
        errorMessage: 'Please add book description'
      },
      total: {
        notEmpty: true,
        errorMessage: 'Please add total book'
      },
      catId: {
        notEmpty: true,
        errorMessage: 'Please add book category'
      }
    });
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = [];
      errors.forEach((error) => {
        const errorMessage = error.msg;
        allErrors.push(errorMessage);
      });
      return res.status(400).json({
        message: allErrors[0]
      });
    }
    Book.findOne({
      where: {
        isbn: req.body.isbn
      }
    })
      .then((book) => {
        if (book) {
          return res.status(409).send({
            message: 'Book with that ISBN already exist'
          });
        }
      });
    req.userInput = {
      title: req.body.title,
      isbn: req.body.isbn,
      prodYear: req.body.prodYear,
      cover: req.body.cover,
      author: req.body.author,
      description: req.body.description,
      catId: req.body.catId,
      total: req.body.total
    };
    next();
  },

  /**
   * @description - Validates user data
   *
   * @param {String} email - User email
   *
   * @param {String} username - Username
   *
   * @param {Object} res - response object
   *
   * @returns {Object} - response message
   */
  checkValidDetails(email, username, res) {
    const validator = /[\W]{2,}/;
    const regularExpression = /\S+@\S+\.\S+/;
    const emailValidate = regularExpression.test(email);

    if (username) {
      if (validator.test(username)) {
        return res.status(400).send({
          message: 'Invalid Username supplied!'
        });
      }
    } else if (email) {
      if (!emailValidate) {
        return res.status(200).send({
          status: true,
          message: 'Invalid email supplied'
        });
      }
    } else {
      return res.status(400).send({
        message: 'Invalid request'
      });
    }
  },

  /**
 * @description - Verify and retrieve suer details
 *
 * @param {Object} req - request
 *
 * @param {Object} res - response
 *
 * @return {Object} - repsonse object
 */
  checkAndRetrieveUserDetails(req, res) {
    const userExist = 'Username already exist';
    const emailExist = 'Email already exist';

    Validation.checkValidDetails(req.body.email, req.body.username, res);

    User.findOne({
      where: {
        $or: [{ username: req.body.username },
          { email: req.body.email }]
      }
    })
      .then((users) => {
        if (users) {
          const currentUser = omit(
            users.dataValues,
            ['password', 'createdAt', 'updatedAt']
          );

          if (req.body.userId) {
            if (Number(req.body.userId) === users.id) {
              if (req.body.email) {
                return res.status(200).send({
                  user: currentUser,
                  emailExist: true,
                  message: '',
                  status: true
                });
              }
              return res.status(200).send({
                user: currentUser,
                userExist: true,
                status: true,
                message: emailExist
              });
            }
            if (req.body.email) {
              return res.status(200).send({
                user: currentUser,
                emailExist: true,
                message: emailExist,
                status: true
              });
            }
            return res.status(200).send({
              user: currentUser,
              userExist: true,
              status: true,
              message: userExist
            });
          }
          if (req.body.google) {
            return res.status(200).send({
              emailExist: true,
              status: true,
              message: userExist,
              user: currentUser
            });
          }
          if (req.body.email) {
            return res.status(200).send({
              emailExist: true,
              status: true,
              message: emailExist
            });
          }
          return res.status(200).send({
            userExist: true,
            status: true,
            message: userExist
          });
        }
        return res.status(200).send({
          message: 'User not found',
          status: false,
          userExist: false
        });
      })
      .catch((error) => {
        return res.status(500).send(error);
      });
  },

  /**
   * Validates user data when editing profile
   *
   * @param {Object} req - request object
   *
   * @param {Object} res - repsonse object
   *
   * @param {Function} next - Call back function
   *
   * @returns {Object} - Response object
   */
  validateUserEdit(req, res, next) {
    const emailValidator = /\S+@\S+\.\S+/;
    const usernameValidator = /[A-Za-z]/g;

    if (!usernameValidator.test(req.body.username)
    || !emailValidator.test(req.body.email)) {
      res.status(400).send({
        message: 'Invalid data supplied pls check and try again'
      });
    } else {
      User.findOne({
        where: {
          email: req.body.email
        }
      })
        .then((user) => {
          if (user && user.id !== req.decoded.currentUser.id) {
            return res.status(409).send({
              message: 'Email already exist'
            });
          } else if (req.body.oldPassword &&
            !bcrypt.compareSync(req.body.oldPassword, user.password)) {
            res.status(400).send({
              message: 'Old password is incorrect'
            });
          }

          let userData;

          if (req.body.oldPassword) {
            const password = bcrypt.hashSync(req.body.newPassword, 10);
            userData = {
              email: req.body.email,
              fullName: req.body.fullName,
              password,
            };
          } else {
            userData = {
              email: req.body.email,
              fullName: req.body.fullName,
            };
          }
          req.newUserData = userData;
          next();
        });
    }
  },

  /**
   * @description - Checks for validity of book
   *
   * @param  {Object} req - request
   *
   * @param  {object} res - response
   *
   * @param {Object} next - Call back function
   *
   * @return {Object} - Object containing message
   */
  validBook(req, res, next) {
    const querier = req.body.bookId || req.params.bookId;
    if (!querier || /[\D]/.test(querier)) {
      res.status(400).send({
        message: 'Invalid book id supplied!!!'
      });
    } else {
      Book.findOne({
        where: {
          id: req.params.bookId || req.body.bookId
        }
      }).then((book) => {
        if (!book) {
          res.status(400).send({
            message: 'Book id is not valid'
          });
        } else {
          next();
        }
      });
    }
  }
};

export default Validation;
