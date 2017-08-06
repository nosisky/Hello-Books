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
  /** User can rent a book
   * @param  {object} req request
   * @param  {object} res response
   * Route: POST: /api/users/:Userid/books/:bookId
   */
  rentBook(req, res) {
    const cur = new Date(),
      after30days = cur.setDate(cur.getDate() + 30);
    return RentedBook
      .create({
        bookId: req.params.bookId,
        userId: req.params.userId,
        toReturnDate: after30days
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
            success: false,
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
            success: false,
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
        description: req.body.description || Book.description
      },
      {
        where: {
          id: req.params.id
        }
      })
      .then(() => res.status(200).send({
        message: 'Book updated successfully!'
      }))
      .catch(error => res.status(400).send(error));
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
      .then(() => res.status(200).send(
        {
          message: 'Book returned successfully!'
        }
      ))
      .catch(error => res.status(400).send(error));
  },
};
