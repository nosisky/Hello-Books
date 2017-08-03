import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../models';

dotenv.load();
const secret = process.env.secretKey;

const { User } = db;
export default {
  create(req, res) {
    return User
      .create(req.userInput)
      .then((user) => {
        const token = jwt.sign(
          { userId: user.id,
            username: user.username
          }, secret
        );
        return res.status(201).send({
          success: true,
          message: 'Signed up successfully',
          Token: token
        });
      })
      .catch(error => res.status(400).send(error));
  },
  login(req, res) {
    User
      .findOne({
        where: { username: req.body.username }
      })
      .then((user) => {
        user
          .update(
            {
              active: true,

            }).then((result) => {
            const token = jwt.sign(
              { result
              }, secret
            );
            res.status(200)
              .json({
                success: true,
                message: 'Logged In Successfully',
                Token: token
              });
          });
      });
  },
};
