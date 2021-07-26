import express from 'express';
import Authorization from '../middleware/Authorization';
import BookController from '../controllers/BookController';

const { isLoggedIn, isAdmin } = Authorization;

const { getNotification } = BookController;

const notificationRouter = express.Router();

/**
 * @swagger
 * definitions:
 *   Notifications:
 *     properties:
 *       userId:
 *         type: integer
 *     example: [{
 *      userId: 13,
 *      message: James rented Hello from the other side
 *      }]
 */

/**
 * @swagger
 * /notifications:
 *   get:
 *     tags:
 *       - Book Operations
 *     description: Returns list of notifications
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
 *         description: Successful
 *         schema:
 *           $ref: '#/definitions/Notifications'
 *       500:
 *          description: Internal server error
 */
notificationRouter.route('/')
  .get(isLoggedIn, isAdmin, getNotification);


export default notificationRouter;
