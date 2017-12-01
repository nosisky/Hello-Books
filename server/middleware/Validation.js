import db from '../models/index';

const { Book, User } = db;

export default {

  checkUserInput(req, res, next) {
    const userNameError = 'Please provide a '
    + 'username with atleast 4 characters.';
    
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

  /** A middleware that checks user input for valid book details
   * @param  {object} req - request
   * @param  {object} res - response
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
      return res.status(409).json({
        message: allErrors[0]
      });
    }
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

  /** Check quantity of book in the DB
   * @param  {Object} req - request
   * @param  {object} res - response
   */

  checkTotalBook(req, res, next) {
    Book.findOne({
      where: {
        id: req.body.bookId
      }
    }).then((book) => {
      if (book.total < 1) {
        res.status(200).send({
          message: 'This book is not available for rent!'
        });
      } else {
        next();
      }
    });
  },
  /** Checks is a valid user ID was supplied
   * @param  {Object} req - request
   * @param  {object} res - response
   */

  validUser(req, res, next) {
    const querier = req.params.userId;
    if (!querier || querier.match(/[\D]/)) {
      res.status(404).send({
        message: 'Invalid user id supplied!!!'
      });
    } else {
      User.findOne({
        where: {
          id: req.params.userId
        }
      }).then((user) => {
        if (!user) {
          res.status(404).send({
            message: 'Invalid user id supplied'
          });
        } else {
          next();
        }
      });
    }
  },
  /** Checks if a valid book ID was supplied
   * @param  {object} req - request
   * @param  {object} res - response
   */

  validBook(req, res, next) {
    const querier = req.body.bookId || req.params.bookId;
    if (!querier || /[\D]/.test(querier)) {
      res.status(404).send({
        message: 'Invalid book id supplied!!!'
      });
    } else {
      Book.findOne({
        where: {
          id: req.params.bookId || req.body.bookId
        }
      }).then((book) => {
        if (!book) {
          res.status(404).send({
            message: 'Book id is not valid'
          });
        } else {
          next();
        }
      });
    }
  }
};
