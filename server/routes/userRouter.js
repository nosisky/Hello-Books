import express from 'express';

import Validation from '../middleware/Validation';
import UserController from '../controllers/UserController';
import Authorization from '../middleware/Authorization';

const { isLoggedIn } = Authorization;

const {
  retrieveUserDetails,
  checkUserExist,
  checkUserInput,
  validateUserEdit,
  sendUserInput
} = Validation;

const { create, login, editProfile } = UserController;


const userRouter = express.Router();

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
 *       productionYear:
 *         type: integer
 *     example: {
 *        isbn: 123-isbn-1992,
 *        title: Think rich to grow rich,
 *       author: Napoleon Hill,
 *       description: This is a sample book description,
 *       quantity: 10,
 *       cover: http://example.com/img/cover.jpg,
 *       productionYear: 1993
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
 *       productionYear:
 *         type: integer
 *     example: [{
 *        isbn: 123-isbn-1992,
 *        title: Think rich to grow rich,
 *       author: Napoleon Hill,
 *       description: This is a sample book description,
 *       quantity: 10,
 *       cover: http://example.com/img/cover.jpg,
 *       productionYear: 1993
 *  },
 * {
 *       isbn: 345-isbn-book,
 *       title: Safe way,
 *       author: Sandle Hill,
 *       description: This is a sample book description,
 *       quantity: 10,
 *       cover: http://example.com/img/cover.jpg,
 *       productionYear: 1999
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
 *         example: {
 *           "message": "Signed up successfully",
 *           "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJpc0Jhbm5lZCI6MCwicGxhbiI6IlNpbHZlciIsImFjdGl2ZSI6ZmFsc2UsImlzQWRtaW4iOjAsImlkIjo1LCJ1c2VybmFtZSI6InRlc3RlciIsImZ1bGxOYW1lIjoiTmFzaXJ1IE9sYSIsImVtYWlsIjoibmFzaXJ1QGdtYWlsLmNvbSIsInVzZXJJZCI6NX0sImV4cCI6MTUxNTI1ODY4NywiaWF0IjoxNTE1MTcyMjg3fQ.1cISJjOboFY1zxqKEIZFpBJTSawG7BkMG6iGdhMxxGU"
 *       }
 *       400:
 *         description: Bad Username, Password or Email
 *       500:
 *         description: Internal server error
 */
userRouter.route('/signup')
  .post(checkUserInput, sendUserInput, create);

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
 *         example: {
 *             "message": "Logged In Successfully",
 *             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJpZCI6NSwiZnVsbE5hbWUiOiJOYXNpcnUgT2xhIiwidXNlcm5hbWUiOiJ0ZXN0ZXIiLCJlbWFpbCI6Im5hc2lydUBnbWFpbC5jb20iLCJpc0Jhbm5lZCI6MCwicGxhbiI6IlNpbHZlciIsImFjdGl2ZSI6ZmFsc2UsImlzQWRtaW4iOjAsInVzZXJJZCI6NX0sImV4cCI6MTUxNTI1ODc3MSwiaWF0IjoxNTE1MTcyMzcxfQ.4Ujxzar6LrP3aIllKzZWnQliRsE5YGRZk6ZLxw85ymc"
 *         }
 *       400:
 *         description: Bad Username or Password
 *       500:
 *         description: Internal server error
 */
userRouter.route('/signin')
  .post(login);

userRouter.route('/edit/:userId')
  .put(isLoggedIn, validateUserEdit, editProfile);

userRouter.route('/validate')
  .post(checkUserExist, retrieveUserDetails);

export default userRouter;
