import express from 'express';
import Authorization from '../middleware/Authorization';
import BookController from '../controllers/BookController';
import Validation from '../middleware/Validation';
import sendMail from '../middleware/sendMail';

const { checkBookId, checkBookInput, validBook } = Validation;

const {
  isLoggedIn,
  isAdmin,
  checkUserPlan,
  hasRentedBefore
} = Authorization;

const {
  create,
  getBooks,
  rentBook,
  returnBook,
  rentedBooks,
  modifyBook,
  addCategory,
  deleteBook,
  rentedBookByUser
} = BookController;

const bookRouter = express.Router();

/**
 * @swagger
 * definitions:
 *   Book:
 *     properties:
 *       isbn:
 *         type: integer
 *       title:
 *         type: string
 *       author:
 *         type: string
 *       description:
 *         type: string
 *       quantity:
 *         type: integer
 *       cover:
 *         type: string
 *       prodYear:
 *         type: integer
 *     example: {
 *       isbn: 123-isbn-1992,
 *       title: Think rich to grow rich,
 *       author: Napoleon Hill,
 *       description: This is a sample book description,
 *       quantity: 10,
 *       cover: http://example.com/img/cover.jpg,
 *       prodYear: 1993
 *     }
 */

/**
 * @swagger
 * definitions:
 *   Category:
 *     properties:
 *       name:
 *         type: string
 *       description:
 *         type: string
 *     example: {
 *      name: Art & Science,
 *      description: This is sample description
 *      }
 */

/**
 * @swagger
 * definitions:
 *   Mail:
 *     properties:
 *       message:
 *         type: string
 *       subject:
 *         type: string
 *     example: {
 *      message: Nasirudeen wants account upgrade to Gold plan,
 *      subject: Mail upgrade notification
 *      }
 */


/**
 * @swagger
 * definitions:
 *   CategoryList:
 *     properties:
 *       name:
 *         type: string
 *       description:
 *         type: string
 *     example: [{
 *      name: Art & Science,
 *      description: This is sample description
 *      },
 *      {
 *      name: Music,
 *      description: This is sample description
 *      }]
 */

/**
 * @swagger
 * definitions:
 *   RentBook:
 *     properties:
 *       bookId:
 *         type: integer
 *     example: {
 *      bookId: 13
 *      }
 */

/**
 * @swagger
 * /books:
 *   post:
 *     tags:
 *       - Book Operations
 *     description: Adds a new book to the database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: book
 *         description: Book object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Book'
 *       - name: x-access-token
 *         in: header
 *         description: an authentication header
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Successfully created
 *       400:
 *         description: Bad input supplied
 *       401:
 *         description: Invalid token supplied
 *       500:
 *         description: Internal server error
 */
bookRouter.route('/books')
  .post(isLoggedIn, isAdmin, checkBookInput, create)
  .get(isLoggedIn, getBooks);


/**
 * @swagger
 * /users/{userId}/books:
 *   post:
 *     tags:
 *       - Borrowing Operations
 *     description: Borrow a specific Book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: ID of the User
 *         in: path
 *         required: true
 *         type: integer
 *       - name: bookId
 *         description: ID of Book to Borrow
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/RentBook'
 *           type: object
 *           required:
 *             - bookId
 *           properties:
 *             bookId:
 *               type: integer
 *           example: {
 *             "bookId": 4
 *           }
 *       - name: x-access-token
 *         in: header
 *         description: an authentication header
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Book Successfully borrowed
 *       400:
 *         description: All fields are required
 *       404:
 *         description: Book not found
 *       401:
 *         description: Invalid token supplied
 *       500:
 *         description: Internal server error
 */

bookRouter.route('/users/:userId/books')
  .post(
    isLoggedIn,
    checkUserPlan,
    checkBookId,
    hasRentedBefore,
    rentBook
  );

/**
 * @swagger
 * /users/{userId}/books:
 *   put:
 *     tags:
 *       - Borrowing Operations
 *     description: Return a specific Book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: ID of the User
 *         in: path
 *         required: true
 *         type: integer
 *       - name: bookId
 *         description: ID of Book to Return
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Book'
 *           type: object
 *           required:
 *             - bookId
 *           properties:
 *             bookId:
 *               type: integer
 *           example: {
 *              bookId: 12
 *           }
 *       - name: x-access-token
 *         in: header
 *         description: an authentication header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Book Successfully returned
 *       400:
 *         description: All fields are required / Invalid input
 *       404:
 *         description: Book not found
 *       401:
 *         description: Invalid token supplied
 *       500:
 *         description: Internal server error
 */
bookRouter.route('/users/:userId/books')
  .put(isLoggedIn, returnBook);

/**
 * @swagger
 * /users/{userId}/books:
 *   get:
 *     tags:
 *       - Borrowing Operations
 *     description: Returns all Books borrowed but not returned by a User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: returned
 *         in: query
 *         required: true
 *         type: boolean
 *         default: false
 *       - name: userId
 *         in: path
 *         description: ID of the User to show list for
 *         required: true
 *         type: integer
 *       - name: x-access-token
 *         in: header
 *         description: an authentication header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: An array of Books
 *       401:
 *         description: Invalid token supplied
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/BookList'
 */
bookRouter.route('/users/:userId/books')
  .get(isLoggedIn, rentedBooks);

/**
 * @swagger
 * /books/{bookId}:
 *   put:
 *     tags:
 *       - Book Operations
 *     description: Modify an already added Book's information
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bookId
 *         description: ID of the Book
 *         in: path
 *         required: true
 *         type: integer
 *       - name: book
 *         description: Book object with updated information
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Book'
 *       - name: x-access-token
 *         in: header
 *         description: an authentication header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Book Successfully modified
 *         schema:
 *           $ref: '#/definitions/Book'
 *       400:
 *         description: All fields are required
 *       404:
 *         description: Book not found
 *       401:
 *         description: Invalid token supplied
 *       500:
 *         description: Internal server error
 */
bookRouter.route('/books/:bookId')
  .put(isLoggedIn, isAdmin, validBook, modifyBook);

/**
 * @swagger
 * /books/category:
 *   post:
 *     tags:
 *       - Book Operations
 *     description: Adds a new category to the database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: category
 *         description: Category object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Category'
 *       - name: x-access-token
 *         in: header
 *         description: an authentication header
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Successfully created
 *       400:
 *         description: Bad input supplied
 *       401:
 *         description: Invalid token supplied
 *       500:
 *         description: Internal server error
 */
bookRouter.route('/books/category')
  .post(isLoggedIn, isAdmin, addCategory);

/**
 * @swagger
 * /books/delete/{bookId}:
 *   delete:
 *     tags:
 *       - Book Operations
 *     description: Delete a specified Book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bookId
 *         description: ID of Book to delete
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/RentBook'
 *           type: object
 *           required:
 *             - bookId
 *           properties:
 *             bookId:
 *               type: integer
 *           example: {
 *             "bookId": 4
 *           }
 *       - name: x-access-token
 *         in: header
 *         description: an authentication header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Book successfully deleted
 *       400:
 *         description: invalid inputs!
 *       404:
 *         description: Book not found
 *       401:
 *         description: Invalid token supplied
 *       500:
 *         description: Internal server error
 */
bookRouter.route('/books/delete/:bookId')
  .delete(isLoggedIn, isAdmin, validBook, deleteBook);

/**
 * @swagger
 * /books/logs/:userId:
 *   get:
 *     tags:
 *       - Book Operations
 *     description: Returns all book browsing history of a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         description: an authentication header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Returns An array of books
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/BookList'
 */
bookRouter.route('/books/logs/:userId')
  .get(isLoggedIn, rentedBookByUser);

/**
 * @swagger
 * /books/email:
 *   post:
 *     tags:
 *       - Book Operations
 *     description: Send user upgrade information to the admin
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         description: an authentication header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Mail sent successfully
 *         schema:
 *           $ref: '#/definitions/Mail'
 *       400:
 *         description: Bad  input supplied
 *       500:
 *         description: Internal server error
 */
bookRouter.route('/books/email')
  .post(isLoggedIn, isAdmin, sendMail);

export default bookRouter;

