import db from '../models';

const { RentedBook, Book, Category, History } = db;

export default {
  /** Admin add new book
   * @param  {object} req request
   * @param  {object} res response
   * Route: POST: /books  
   */

  create(req, res) {
    return Book
      .create(req.userInput)
      .then(() => res.status(201).send({
        message: 'Book uploaded successfully',
      }))
      .catch(error => res.status(400).send(error));
  },

  /** User rent book
   * @param  {object} req - request
   * @param  {object} res - response
   * ROUTE: POST: /users/:userId/books
   */

  rentBook(req, res) {
    const cur = new Date(),
      after30days = cur.setDate(cur.getDate() + 30);
    Book.findById(req.body.bookId)
      .then(book => RentedBook
        .create({
          bookId: req.body.bookId,
          description: book.description,
          title: book.title,
          userId: req.params.userId,
          cover: book.cover,
          toReturnDate: after30days
        }))
      .then(() => Book
        .findOne({ where: { id: req.body.bookId } })
        .then(books => Book
          .update({
            total: books.total - 1
          }, {
            where: {
              id: req.body.bookId
            }
          })))
      .then((book) => {
        History
          .create({
            userId: req.params.userId,
            type: 'rent',
            description: `You rented ${book.title}`
          });
      })
      .then(() => res.status(201).send({
        message: 'You have successfully rented the book',
      }))
      .catch(error => res.status(400).send(error));
  },

  /** displays all books
   * @param  {object} req request
   * @param  {object} res response
   *  Route: GET: /api/books
   */

  getBooks(req, res) {
    return Book
      .findAll({})
      .then((books) => {
        if (books.length < 1) {
          res.status(400).send({
            message: 'There is no book in the database'
          });
        } else {
          res.status(201).send(books);
        }
      })
      .catch(error => res.status(404).send(error));
  },

  /** Adds a new category
   * @param  {object} req request
   * @param  {0bject} res response
   */

  addCategory(req, res) {
    return Category
      .create(req.body)
      .then((category) => {
        if (category) {
          return res.status(201).send({
            message: 'Category added successfully',
            category
          });
        }
      })
      .catch(error => res.status(401).send({
        error
      }));
  },
  /** Dislay users rented books
   * @param  {object} req request
   * @param  {0bject} res response
   * Route: GET: //api/users/:UserId/books?returned=false
   */

  rentedBooks(req, res) {
    return RentedBook
      .findAll({
        where: {
          returned: req.query.returned,
          userId: req.params.userId
        }
      })
      .then((books) => {
        if (books.length < 1) {
          res.status(201).send({
            message: 'No rented unreturned books'
          });
        } else {
          res.status(201).send(books);
        }
      })
      .catch(error => res.status(404).send(error));
  },

  /** Admin modify book details
   * @param  {object} request
   * @param  {object} resonse
   * Route: GET: /
   */

  modifyBook(req, res) {
    return Book
      .update(req.body,
        {
          where: {
            id: req.params.bookId
          }
        })
      .then(() => {
        Book.findById(req.params.bookId)
          .then((book) => {
            res.status(200).send({
              book,
              message: 'Book updated successfully!'
            });
          });
      })
      .catch(error => res.status(400).send(error));
  },
  /** User get a specific book
   * @param  {Object} req - request
   * @param  {Object} res - response
   * Route: GET: /books/:bookId 
   */

  getOneBook(req, res) {
    return Book
      .findAll({
        where: {
          id: req.params.bookId
        }
      })
      .then((books) => {
        res.status(200).send(books);
      })
      .catch(error => res.status(404).send(error));
  },
  /** Admin delete a book
   * @param  {} req - request
   * @param  {} res - reponse
   * ROute: DELETE: /books/delete/:bookId
   */

  deleteBook(req, res) {
    return Book
      .destroy({
        where: {
          id: req.params.bookId
        }
      })
      .then(() => {
        res.status(200).send({
          message: 'Book deleted successfully!',
          id: req.params.bookId
        });
      })
      .catch(error => res.status(404).send(error));
  },
  /** Get rented books by a specific user
   * @param  {Object} req - request
   * @param  {object} res - response
   * Route: GET: /books/logs/:userId
   */

  rentedBookByUser(req, res) {
    return RentedBook
      .findAll({
        where: {
          userId: req.params.userId,
        }
      })
      .then((books) => {
        if (books.length < 1) {
          res.status(200).send({
            message: 'No rented books by this user'
          });
        } else {
          res.status(200).send(books);
        }
      })
      .catch(error => res.status(404).send({ message: error }));
  },
  /** User return rented book
   * @param  {object} req - request
   * @param  {object} res - response
   * Route: PUT: /users/:userId/books
   */

  returnBook(req, res) {
    return RentedBook
      .update({
        returnDate: Date.now(),
        returned: true
      },
      {
        where: {
          bookId: req.body.bookId
        }
      })
      .then(() => Book
        .findOne({ where: { id: req.body.bookId } })
        .then(books => Book
          .update({
            total: books.total + 1
          }, {
            where: {
              id: req.body.bookId
            }
          })
          .then(() => {
            res.status(201).send({
              message: 'Book returned successfully',
              book: books
            });
          })
        ))
      .catch(error => res.status(400).send(error));
  },

  /** Gets the list of category from database
   * @param  {object} req - request
   * @param  {object} res - response
   * Route: PUT: /books/category
   */

  getCategory(req, res) {
    return Category.findAll({})
      .then((category) => {
        res.status(200).send(category);
      })
      .catch(error => res.status(500).send(error));
  },

  search(req, res) {
    return Book.findAll({
      where: {
        $or: [
          { title: {
            $iLike: `%${req.body.search}%` }
          }
        ]
      }
    })
      .then((book) => {
        res.status(200).send(book);
      })
      .catch(error => res.status(500).send(error));
  }
};
