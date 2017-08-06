export default {
  checkUserInput(req, res, next) {
    const bookError = 'Please provide a book title with atleast 5 characters.';
    req.checkBody(
      {
        title: {
          notEmpty: true,
          isLength: {
            options: [{ min: 5 }],
            errorMessage: bookError
          },
          errorMessage: 'Book title is required'
        },
        isbn: {
          notEmpty: true,
          errorMessage: 'ISBN is required'
        },
        prodYear: {
          notEmpty: true,
          errorMessage: 'Production Year is required'
        },
        cover: {
          notEmpty: true,
          errorMessage: 'Please upload a valid book cover'
        },
        author: {
          notEmpty: true,
          errorMessage: 'Please add book author'
        },
        description: {
          notEmpty: true,
          errorMessage: 'Please add book description'
        },
      }
    );
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = [];
      errors.forEach((error) => {
        const errorMessage = error.msg;
        allErrors.push(errorMessage);
      });
      return res.status(409)
        .json({
          message: allErrors[0]
        });
    }
    req.userInput = {
      title: req.body.title,
      isbn: req.body.isbn,
      prodYear: req.body.prodYear,
      cover: req.body.cover,
      author: req.body.author,
      description: req.body.description,
      catId: req.body.catId
    };
    next();
  },
};
