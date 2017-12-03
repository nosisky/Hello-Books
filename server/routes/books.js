import express from 'express';
import Authorization from '../middleware/Authorization';
import BookController from '../controllers/Book';
import Validation from '../middleware/Validation';
import sendMail from '../middleware/sendMail';

const app = express.Router();

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
 *         description: Bad Username, Password or Email
 */
app.route('/books')
  .post(Authorization.isLoggedIn,
    Authorization.isAdmin,
    Validation.checkBookInput,
    BookController.create)
  .get(Authorization.isLoggedIn,
    BookController.getBooks);


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
 *         description: Book Successfully borrowed
 *         schema:
 *           $ref: '#/definitions/Book'
 *       400:
 *         description: All fields are required
 *       404:
 *         description: Book not found
 */

app.route('/users/:userId/books')
  .post(Authorization.isLoggedIn,
    Authorization.checkUserPlan,
    Authorization.hasRentedBefore,
    BookController.rentBook);

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
 *         description: Book Successfully returned
 *         schema:
 *           $ref: '#/definitions/Book'
 *       400:
 *         description: All fields are required
 *       404:
 *         description: Book not found
 */
app.route('/users/:userId/books')
  .put(Authorization.isLoggedIn,
    BookController.returnBook);

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
 *         schema:
 *           $ref: '#/definitions/Book'
 */
app.route('/books/:userId/books')
  .get(Authorization.isLoggedIn,
    Validation.validUser,
    BookController.rentedBooks);

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
 *       201:
 *         description: Successfully created
 *         schema:
 *           $ref: '#/definitions/Book'
 *       400:
 *         description: All fields are required
 *       404:
 *         description: Book not found
 */
app.route('/books/:bookId')
  .put(Authorization.isLoggedIn,
    Authorization.isAdmin,
    Validation.validBook,
    BookController.modifyBook);

/**
 * @swagger
 * /books/cat:
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
 *         description: Bad Username, Password or Email
 */
app.route('/books/cat')
  .post(Authorization.isLoggedIn,
    Authorization.isAdmin,
    BookController.addCategory);

// Get a specific book
app.route('/books/:bookId')
  .get(Authorization.isLoggedIn,
    Validation.validBook,
    BookController.getOneBook);

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
 *         description: ID of the Book
 *         in: path
 *         required: true
 *         type: integer
 *       - name: x-access-token
 *         in: header
 *         description: an authentication header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Book successfully deleted
 *       400:
 *         description: Enter valid inputs!
 *       404:
 *         description: Book not found
 */
app.route('/books/delete/:bookId')
  .delete(Authorization.isLoggedIn,
    Authorization.isAdmin,
    Validation.validBook,
    BookController.deleteBook);

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
 *         schema:
 *           $ref: '#/definitions/Book'
 */
app.route('/books/logs/:userId')
  .get(Authorization.isLoggedIn,
    Validation.validUser,
    BookController.rentedBookByUser);


/**
 * @swagger
 * /books/category:
 *   get:
 *     tags:
 *       - Book Operations
 *     description: Returns all Category in the database
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
 *         description: Returns An array of Categories
 *         schema:
 *           $ref: '#/definitions/Book'
 */
app.route('/books/category')
  .get(Authorization.isLoggedIn,
    Validation.validUser,
    BookController.rentedBookByUser);

app.route('/books/category')
  .get(Authorization.isAdmin,
    BookController.rentedBookByUser);

export default app;


app.route('/books/email')
  .post(Authorization.isLoggedIn,
    Authorization.isAdmin, sendMail);
