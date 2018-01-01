import express from 'express';

import Validation from '../middleware/Validation';
import UserController from '../controllers/UserController';
import Authorization from '../middleware/Authorization';
import BookController from '../controllers/BookController';

const UserRouter = express.Router();

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
 *     example: {
 *        "fullName": Abdulrasaq Nasirudeen,
 *       "email": dealwap@dealwap.com,
 *       "username": dealwap,
 *       "password": dealwap123 
 *      }
 */

/**
 * @swagger
 * definitions:
 *   UserList:
 *     properties:
 *       username:
 *         type: string
 *       fullName:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *     example: [{
 *        "fullName": Abdulrasaq Nasirudeen,
 *       "email": dealwap@dealwap.com,
 *       "plan": gold,
 *       "isAdmin": 1,
 *       "username": dealwap
 *      },
 *     {
 *        "fullName": Clinton James,
 *       "email": dealwap@dealwap.com,
 *       "plan": gold,
 *       "isAdmin": 1,
 *       "username": dealwap
 *      }
 * 
 * ]
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
 *     example: {
 *        isbn: 123-isbn-1992,
 *        title: Think rich to grow rich,
 *       author: Napoleon Hill,
 *       description: This is a sample book description,
 *       quantity: 10,
 *       cover: http://example.com/img/cover.jpg,
 *       prodYear: 1993
 *  }
 */ 

/**
 * @swagger
 * definitions:
 *   BookList:
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
 *     example: [{
 *        isbn: 123-isbn-1992,
 *        title: Think rich to grow rich,
 *       author: Napoleon Hill,
 *       description: This is a sample book description,
 *       quantity: 10,
 *       cover: http://example.com/img/cover.jpg,
 *       prodYear: 1993
 *  },
 * {
 *       isbn: 345-isbn-book,
 *       title: Safe way,
 *       author: Sandle Hill,
 *       description: This is a sample book description,
 *       quantity: 10,
 *       cover: http://example.com/img/cover.jpg,
 *       prodYear: 1999
 *  }]
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
UserRouter.route('/signup')
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
 *         description: Bad Username or Password
 */
UserRouter.route('/signin')
  .post(UserController.login);

// User Exist
UserRouter.route('/get')
  .post(Validation.userExist);

// Email Exist
UserRouter.route('/getemail')
  .post(Validation.emailExist);

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
 */
UserRouter.route('/edit/:userId')
  .put(Authorization.isLoggedIn,
    UserController.editProfile);

export default UserRouter;