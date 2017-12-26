import express from 'express';
import Authorization from '../middleware/Authorization';
import BookController from '../controllers/Book';

const app = express.Router();

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
 *           $ref: '#/definitions/Category'
 */
app.route('/')
  .get(Authorization.isLoggedIn,
    BookController.getCategory);

export default app;
