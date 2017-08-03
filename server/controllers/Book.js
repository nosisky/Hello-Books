import db from '../models';

const { RentedBook } = db;
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
  rentBook(req, res) {
    return RentedBook
      .create({
        bookId: req.params.bookId,
        userId: req.params.userId,
        toReturnDate: Date.now()
      })
      .then(() => res.status(201).send({
        success: true,
        message: 'You have successfully rented the book',
      }))
      .catch(error => res.status(400).send(error));
  },
  getBooks(req, res) {
    return Book
      .findAll({})
      .then(books => res.status(201).send(books))
      .catch(error => res.status(404).send(error));
  },
  modifyBook(req, res) {
    return Book
      .update({
        title: req.body.title[1] || Book.title,
        isbn: req.body.isbn[1] || Book.isbn,
        catId: req.body.catId[1] || Book.catId,
        prodYear: req.body.prodYear[1] || Book.prodYear,
        cover: req.body.title[1] || Book.title,
        author: req.body.author[1] || Book.author,
        description: req.body.description[1] || Book.description
      },
      {
        where: {
          id: req.params.id
        }
      })
      .then(book => res.status(200).send(book))
      .catch(error => res.status(400).send(error));
  },
};
