import db from '../models';

const { RentedBook } = db;
const { Book } = db;
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
  rentBook(req, res) {
    const cur = new Date(),
      after30days = cur.setDate(cur.getDate() + 30);
    return RentedBook
      .create({
        bookId: req.params.bookId,
        userId: req.params.userId,
        toReturnDate: after30days
      })
      .then(() => {
        return Book
          .findOne({ where: { id: req.params.bookId } })
          .then((books) => Book
            .update({
              total: books.total - 1
            }, {
              where: {
                id: req.params.bookId
              }
            }));
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
      .update({
        title: req.body.title || Book.title,
        catId: req.body.catId || Book.catId,
        prodYear: req.body.prodYear || Book.prodYear,
        cover: req.body.cover || Book.title,
        author: req.body.author || Book.author,
        total: req.body.total || Book.total,
        description: req.body.description || Book.description
      },
      {
        where: {
          id: req.params.bookId
        }
      })
      .then(() => res.status(200).send({
        message: 'Book updated successfully!'
      }))
      .catch(error => res.status(400).send(error));
  },

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

  deleteBook(req, res) {
    return Book
      .destroy({
        where: {
          id: req.params.bookId
        }
      })
      .then(() => {
        res.status(200).send({
          message: 'Book deleted successfully!'
        });
      })
      .catch(error => res.status(404).send(error));
  },

  rentedBookByUser(req, res) {
    return RentedBook
      .findAll({
        where: {
          userId: req.params.userId
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
      .catch(error => res.status(404).send(error));
  },

  returnBook(req, res) {
    return RentedBook
      .update({
        returnDate: Date.now(),
        returned: true
      },
      {
        where: {
          bookId: req.params.bookId
        }
      })
      .then(() => {
        return Book
          .findOne({ where: { id: req.params.bookId } })
          .then((books) => Book
            .update({
              total: books.total + 1
            }, {
              where: {
                id: req.params.bookId
              }
            }));
      })
      .then(() => res.status(200).send(
        {
          message: 'Book returned successfully!'
        }
      ))
      .catch(error => res.status(400).send(error));
  },
};
