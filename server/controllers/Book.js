import db from '../models';

const { Book } = db;
export default {
  create(req, res) {
    return Book
      .create(req.userInput)
      .then(() => res.status(201).send({
        success: true,
        message: 'Book uploaded successfully',
      }))
      .catch(error => res.status(400).send(error));
  },
  getBooks(req, res) {
    return Book
      .findAll({})
      .then(books => res.status(201).send(books))
      .catch(error => res.status(404).send(error));
  },
  modify(req, res) {
    return Book
      .findById(req.params.id, {
        include: [{
          model: Book,
          as: 'books',
        }],
      })
      .then(books => {
      if (!books) {
        return res.status(404).send({
          message: 'Book With Id Not Found',
        });
      }
      return Book
      .update({
          title: req.body.title || book.title,
          isbn: req.body.isbn || book.isbn,
          prodYear: req.body.prodYear || book.prodYear,
          cover: req.body.title || book.title,
          author: req.body.author || book.author,
          description: req.body.description || book.description
        })
        .then(() => res.status(200).send(book))
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
},
  }
};
