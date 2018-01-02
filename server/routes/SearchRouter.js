import express from 'express';

import Authorization from '../middleware/Authorization';
import BookController from '../controllers/BookController';

const { isLoggedIn, getUserByEmail } = Authorization;

const { search } = BookController;

const searchRouter = express.Router();

 /**
 * @swagger
 * definitions:
 *   SearchUser:
 *     properties:
 *       userId:
 *         type: integer
 *     example: {
 *      username: James,
 *      fullname: James Adele,
 *      plan: Gold,
 *      isAdmin: 1,
 *      email: dealwap@gmail.com
 *      }
 */

  /**
 * @swagger
 * definitions:
 *   SearchUserByEmail:
 *     properties:
 *       email:
 *         type: string
 *     example: {
 *      username: James,
 *      fullname: James Adele,
 *      plan: Gold,
 *      isAdmin: 1,
 *      email: dealwap@gmail.com
 *      }
 */

/**
 * @swagger
 * /search:
 *   get:
 *     tags:
 *       - Book Operations
 *     description: Returns list of books that matches search query
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
 *         description: Returns list of books that matches search query
 *       404:
 *         description: No book matches search query
 *         schema:
 *           $ref: '#/definitions/BookList'
 */
searchRouter.route('/')
            .post(isLoggedIn, search);
    
/**
 * @swagger
 * /search/email:
 *   get:
 *     tags:
 *       - Users & Authentication
 *     description: Returns an object containing user data
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
 *         description: Returns an object containing user data
 *       404:
 *         description: User not found
 *         schema:
 *           $ref: '#/definitions/SearchUserByEmail'
 */
searchRouter.route('/email')
            .post(getUserByEmail);


export default searchRouter;
