import express from 'express';
import Authorization from '../middleware/Authorization';
import BookController from '../controllers/BookController';


const { isLoggedIn } = Authorization;

const { getCategory } = BookController;

const categoryRouter = express.Router();

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
 *           $ref: '#/definitions/CategoryList'
 *       401:
 *         description: Invalid token supplied
 *       500:
 *         description: Internal server error
 */
categoryRouter.route('/')
  .get(isLoggedIn, getCategory);

export default categoryRouter;
