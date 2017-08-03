import omit from 'lodash/omit';
import db from '../models';

const { User } = db;
export default {
  create(req, res) {
    return User
      .create(req.userInput)
      .then((user) => {
        const data = omit(user.dataValues, [
          'password'
        ]);
        return res.status(201).send({
          message: 'Book Uploaded Successfully!',
          data
        })    
      .catch(error => res.status(400).send(error));
  },
};
