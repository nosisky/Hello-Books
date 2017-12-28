import database from '../models';
import UserController from './User';

const { checkValidUser } = UserController;

const { RentedBook, Book, Category, Notification } = database;

const bookController = {

  /** 
   * @description - Admin add new book
   * 
   * @param  {object} req - request
   * 
   * @param  {object} res - response
   * 
   * @return {Object} - Object containing status code and success message
   * 
   * Route: POST: /books  
   * 
   */
  create(req, res) {
    return Book.create(req.userInput)
      .then(book =>
        res.status(201).send({
          message: 'Book uploaded successfully',
          book
        })
      )
      .catch(error => res.status(500).send(error));
  },

  /**
   * @description - Notified the admin on any transaction
   * 
   * @param {number} userId - User ID
   * 
   * @param {String} username 
   * 
   * @param {String} bookTitle 
   * 
   * @param {String} type 
   */
  createNotification(userId, username, bookTitle, type) {
    Notification.create({
      userId,
      message: `${username} ${type} ${bookTitle}`
    });
  },

  /** 
   * @description - User rent book
   * 
   * @param  {object} req - request
   * 
   * @param  {object} res - response
   * 
   * @return {Object} - Success message
   * 
   * ROUTE: POST: /users/:userId/books
   */
  rentBook(req, res) {
    const { userId, id } = req.decoded.currentUser;
    const userData = { userId: userId || id, 
      newId: req.body.userId || req.params.userId}
    
    checkValidUser(res, userData)

    const currentDate = new Date();
    const after20days = currentDate.setDate(currentDate.getDate() + 20);
    Book.findById(req.body.bookId)
      .then((book) => {
        if (book.total > 1) {
          RentedBook.create({
            bookId: req.body.bookId,
            description: book.description,
            title: book.title,
            userId: req.params.userId,
            cover: book.cover,
            toReturnDate: after20days
          })
            .then(() => {
              Book.update(
                {
                  total: book.total - 1
                },
                {
                  where: {
                    id: req.body.bookId
                  }
                }
              );
            })
            .then(() => {
              const { username, id } = req.decoded.currentUser;
              bookController.createNotification(id,
                username, book.title, 'rented');
            });
        }
      })
      .then(() =>
        res.status(201).send({
          message: 'You have successfully rented the book'
        })
      )
      .catch(error => res.status(500).send(error));
  },

  /**
   * @description - Retrieves all recent notifications from the database
   * 
   * @param {Object} req - request
   * 
   * @param {Object} res - response
   * 
   * @return {Array} - Lists of notifications
   */
  getNotification(req, res) {
    const limit = 10,
      offset = 0;
    Notification.findAll({
      order: [['createdAt', 'DESC']],
      limit,
      offset
    })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },

  /** 
   * @description - displays all books
   * 
   * @param  {object} req - request
   * 
   * @param  {object} res - response
   * 
   * @return {Object} - Book details
   * 
   *  Route: GET: /api/books
   */
  getBooks(req, res) {
    const pageNum = Number(req.query.page);
    let offset;
    let page;
    const limit = 8;
    if (pageNum === 0) {
      offset = 0;
    } else {
      page = pageNum;
      offset = (page - 1) * limit;
    }
    return Book.findAndCountAll({
      order: [['title', 'ASC']],
      limit,
      offset
    })
      .then((books) => {
        if (books.count < 1) {
          res.status(404).send({
            message: 'There is no book in the database'
          });
        } else {
          res.status(200).send(books);
        }
      })
      .catch(error => res.status(500).send(error));
  },

  /** 
   * @description - Adds a new category
   * 
   * @param  {object} req - request
   * 
   * @param  {Object} res - response
   * 
   * @return {Object} - return lists of category
   */
  addCategory(req, res) {
    return Category.create(req.body)
      .then((category) => {
        if (category) {
          return res.status(201).send({
            message: 'Category added successfully',
            category
          });
        }
      })
      .catch(error =>
        res.status(500).send({
          error
        })
      );
  },
  /** 
   * @description - Dislay users rented books
   * 
   * @param  {object} req - request
   * 
   * @param  {Object} res - response
   * 
   * @return {Object} - Status code and book data
   * 
   * Route: GET: //api/users/:UserId/books?returned=false
   */
  rentedBooks(req, res) {
    const { userId, id } = req.decoded.currentUser;
    const userData = { 
      userId: userId, id, newId: req.body.userId || req.params.userId
    }
    
    checkValidUser(res, userData)
    return RentedBook.findAll({
      where: {
        returned: req.query.returned,
        userId: req.params.userId
      }
    })
      .then((books) => {
        if (books.length < 1) {
          res.status(200).send({
            message: 'No rented unreturned books'
          });
        } else {
          res.status(200).send(books);
        }
      })
      .catch(error => res.status(500).send(error));
  },

  /** 
   * @description - Admin modify book details
   * 
   * @param  {object} req - request
   * 
   * @param  {object}  res - resonse
   * 
   * @return {Object} - Newly modified book
   */
  modifyBook(req, res) {
    return Book.update(req.body, {
      where: {
        id: req.params.bookId
      },
      returning: true,
      plain: true
    })
      .then((result) => {
          res.status(200).send({
            book: result[1].dataValues,
            message: 'Book updated successfully!'
          });
      })
      .catch(error => res.status(500).send(error));
  },
  /** 
   * @description - User get a specific book
   * 
   * @param  {Object} req - request
   * 
   * @param  {Object} res - response
   * 
   * @returns {Object} - status code and book details
   * 
   * Route: GET: /books/:bookId 
   * 
   */
  getOneBook(req, res) {
    return Book.findAll({
      where: {
        id: req.params.bookId
      }
    })
      .then((books) => {
        res.status(200).send(books);
      })
      .catch(error => res.status(500).send(error));
  },

  /** 
   * @description - Admin delete a book
   * 
   * @param  {Object} req - request
   * 
   * @param  {Object} res - reponse
   * 
   * @returns {Object} - returns success message
   * 
   * Route: DELETE: /books/delete/:bookId
   * 
   */
  deleteBook(req, res) {
    return Book.destroy({
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
      .catch(error => res.status(500).send(error));
  },

  /** 
   * @description - Get rented books by a specific user
   * 
   * @param  {Object} req - request
   * 
   * @param  {object} res - response
   * 
   * @returns {Object} - return lists of rented book by a user
   *
   * Route: GET: /books/logs/:userId
   */
  rentedBookByUser(req, res) {
    const { userId, id } = req.decoded.currentUser;
    const userData = { userId: userId || id, 
      newId: req.body.userId || req.params.userId}
    
    
    checkValidUser(res, userData)
    return RentedBook.findAll({
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
      .catch(error => res.status(500).send({ message: error }));
  },

  /** 
   * @description - User return rented book
   * 
   * @param  {object} req - request
   * 
   * @param  {object} res - response
   * 
   * @return {Object} - return list of rented books
   * 
   * Route: PUT: /users/:userId/books
   * 
   */
  returnBook(req, res) {
    const { userId, id } = req.decoded.currentUser;
    const userData = { userId: userId || id, 
      newId: req.body.userId || req.params.userId}
    
    checkValidUser(res, userData)
    const querier = req.body.bookId || req.params.bookId;
    if (!querier || /[\D]/.test(querier)) {
      return res.status(400).send({
        message: 'Invalid book id supplied!!!'
      });
    }
    return RentedBook.update(
      {
        returnDate: Date.now(),
        returned: true
      },
      {
        where: {
          bookId: req.body.bookId
        }
      }
    )
      .then(() =>
        Book.findById(req.body.bookId).then((book) => {
          Book.update(
            {
              total: book.total + 1
            },
            {
              where: {
                id: req.body.bookId
              }
            }
          ).then(() => {
            const { username, id } = req.decoded.currentUser;
            bookController.createNotification(id,
              username, book.title, 'return');
            res.status(201).send({
              message: 'Book returned successfully',
              book
            });
          });
        })
      )
      .catch(error => res.status(500).send(error));
  },

  /** 
   * @description - Gets the list of category from database
   * 
   * @param  {object} req - request
   * 
   * @param  {object} res - response
   * 
   * @return {Object} - Return category from database
   * 
   * Route: PUT: /books/category
   * 
   */
  getCategory(req, res) {
    return Category.findAll({})
      .then((category) => {
        res.status(200).send(category);
      })
      .catch(error => res.status(500).send(error));
  },

  /**
   * 
   * @description - Book search controller
   * 
   * @param {Object} req - request
   * 
   * @param {Object} res - response
   * 
   * @returns {Object} - Returns search result
   */
  search(req, res) {
    return Book.findAll({
      where: {
        $or: [
          {
            title: {
              $iLike: `%${req.body.search}%`
            }
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

export default bookController;
