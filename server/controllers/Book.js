import db from '../models';

const { Book } = db;
export default {
  create(req, res) {
    return Book
      .create(req.userInput)
      .then(() => {
        return res.status(201).send({
          success: true,
          message: 'Book uploaded successfully',
        });
      })
      .catch(error => res.status(400).send(error));
  },
};
