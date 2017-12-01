import express from 'express';

import Validation from '../middleware/Validation';
import UserController from '../controllers/User';
import Authorization from '../middleware/Authorization';
import BookController from '../controllers/Book';

const app = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Welcome to Hello Books
 *     description: Returns the homepage
 *     responses:
 *       200:
 *         description: Welcome to Hello Books Library
 */

/**
 * @swagger
 * definitions:
 *   Register:
 *     properties:
 *       username:
 *         type: string
 *       fullName:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 */
/**
 * @swagger
 * definitions:
 *   Login:
 *     properties:
 *       username:
 *         type: string
 *         default: dealwap
 *       password:
 *         type: string
 *         default: dealwap
 *     example: {
 *       "username": dealwap,
 *       "password": dealwap
 *     }
 */

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
 * /users/signup:
 *   post:
 *     tags:
 *       - Users & Authentication
 *     description: Register/Signs up a User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Register'
 *     responses:
 *       201:
 *         description: Successfully created
 *       400:
 *         description: Bad Username, Password or Email
 */
app.route('/signup')
  .post(Validation.checkUserInput, UserController.create);

/**
 * @swagger
 * /users/signin:
 *   post:
 *     tags:
 *       - Users & Authentication
 *     description: Signs in a User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Login'
 *     responses:
 *       200:
 *         description: Successfully Logged In
 *       400:
 *         description: Bad Username, Password or Email
 */
app.route('/signin')
  .post(UserController.login);

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users & Authentication
 *     description: Returns all Users
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
 *         description: An array of Users
 *         schema:
 *           $ref: '#/definitions/Register'
 */
app.route('/all')
  .get(Authorization.isLoggedIn, Authorization.isAdmin, Authorization.getUsers);

// User Exist
app.route('/get')
  .post(Validation.UserExist);

// Email Exist
app.route('/getemail')
  .post(Validation.emailExist);


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
 *       201:
 *         description: Book Successfully borrowed
 *         schema:
 *           $ref: '#/definitions/Book'
 *       400:
 *         description: All fields are required
 *       404:
 *         description: Book not found
 */

app.route('/:userId/books')
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
app.route('/:userId/books')
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
app.route('/:userId/books')
  .get(Authorization.isLoggedIn,
    Validation.validUser,
    BookController.rentedBooks);

// Edit user profile
app.route('/edit/:userId')
  .put(Authorization.isLoggedIn,
    Validation.validUser,
    UserController.editProfile);

/**
 * @swagger
 * /users/:userId:
 *   get:
 *     tags:
 *       - Users & Authentication
 *     description: Get a specific user by ID
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
 *         description: A user object
 *         schema:
 *           $ref: '#/definitions/Register'
 */
app.route('/:userId')
  .get(Authorization.isLoggedIn,
    Validation.validBook,
    Authorization.getOneUser);

export default app;
