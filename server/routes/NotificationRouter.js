import express from 'express';
import Authorization from '../middleware/Authorization';
import BookController from '../controllers/BookController';

const notificationRouter = express.Router();

 /**
 * @swagger
 * definitions:
 *   Notifications:
 *     properties:
 *       userId:
 *         type: integer
 *     example: {
 *      userId: 13,
 *      message: James rented Hello from the other side
 *      }
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
 *         description: Returns a list of book transaction notifications
 *         schema:
 *           $ref: '#/definitions/Notifications'
 */
notificationRouter.route('/')
  .get(Authorization.isLoggedIn,
    Authorization.isAdmin,
    BookController.getNotification);


export default notificationRouter;
