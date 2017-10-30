import express from 'express';
import Authorization from '../middleware/Authorization';
import BookController from '../controllers/Book';
import Validation from '../middleware/Validation';

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
 *       200:
 *         description: Successfully created
 *       400:
 *         description: Bad Username, Password or Email
 */
app.route('/')
  .post(Authorization.isLoggedIn,
    Authorization.isAdmin,
    Validation.checkUserInput,
    BookController.create)
  .get(Authorization.isLoggedIn, BookController.getBooks);

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
 *         description: Successfully created
 *         schema:
 *           $ref: '#/definitions/Book'
 *       400:
 *         description: All fields are required
 *       404:
 *         description: Book not found
 */
app.route('/:bookId')
  .put(Authorization.isLoggedIn,
    Authorization.isAdmin,
    Authorization.validBook,
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
 *       200:
 *         description: Successfully created
 *       400:
 *         description: Bad Username, Password or Email
 */
app.route('/cat')
  .post(Authorization.isLoggedIn,
    Authorization.isAdmin,
    BookController.addCategory);

// Get a specific book
app.route('/:bookId')
  .get(Authorization.isLoggedIn,
    Authorization.validBook,
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
app.route('/delete/:bookId')
  .delete(Authorization.isLoggedIn,
    Authorization.isAdmin,
    Authorization.validBook,
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
 *         description: An array of Categories
 *         schema:
 *           $ref: '#/definitions/Book'
 */
app.route('/logs/:userId')
  .get(Authorization.isLoggedIn,
    Authorization.validUser,
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
 *         description: An array of Categories
 *         schema:
 *           $ref: '#/definitions/Book'
 */
app.route('/category')
  .get(Authorization.isLoggedIn,
    Authorization.validUser,
    BookController.rentedBookByUser);

export default app;
