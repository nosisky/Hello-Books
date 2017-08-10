import db from '../models/index';

const { Book } = db;

export default {
  checkUserInput(req, res, next) {
    const bookError = 'Please provide a book title with atleast 5 characters.';
    req.checkBody(
      {
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
        },
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
  checkTotalBook(req, res, next) {
    Book
      .findOne({
        where: {
          id: req.params.bookId
        }
      })
      .then((book) => {
        if (book.total < 1) {
          res.status(200).send({
            message: 'This book is not available for rent!'
          });
        } else {
          next();
        }
      });
  }
};
