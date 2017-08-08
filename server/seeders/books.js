const bookSeeder = {
  signUp: {
    fullName: 'Abdulrasaq Nasirudeen',
    username: 'testtest',
    password: 'helloworld',
    email: 'test@gmail.com'
  },
  adminSignup: {
    fullName: 'Abdulrasaq Nasirudeen',
    username: 'hellobooks',
    password: 'helloworld',
    email: 'hellot@gmail.com'
  },
  validBook: {
    title: 'Think rich to grow rich',
    isbn: '123-456-5858',
    prodYear: 2018,
    catId: 1,
    author: 'Albert Einstein',
    description: 'The book is based on education',
    cover: 'albert-think.jpg'
  },

  noBookTitle: {
    isbn: '123-456-5858',
    prodYear: 2018,
    author: 'Albert Einstein',
    catId: 1,
    description: 'The book is based on education',
    cover: 'albert-think.jpg'
  },

  noIsbn: {
    title: 'Think rich to grow rich',
    prodYear: 2018,
    catId: 1,
    author: 'Albert Einstein',
    description: 'The book is based on education',
    cover: 'albert-think.jpg'
  },

  noProdYear: {
    title: 'Think rich to grow rich',
    author: 'Albert Einstein',
    isbn: '123-565-h474',
    catId: 1,
    description: 'The book is based on education',
    cover: 'albert-think.jpg'
  },

  noCover: {
    title: 'Think rich to grow rich',
    isbn: '123-fgg-383v',
    prodYear: 2018,
    catId: 1,
    author: 'Albert Einstein',
    description: 'The book is based on education'
  },

  noAuthor: {
    title: 'Think rich to grow rich',
    prodYear: 2018,
    cover: 'think-man.png',
    catId: 1,
    isbn: '123-838h-hdh',
    description: 'The book is based on education'
  },

  noCatId: {
    title: 'Think rich to grow rich',
    prodYear: 2018,
    cover: 'think-man.png',
    author: 'Albert james',
    isbn: '123-838h-hdh',
    description: 'The book is based on education'
  }

};
export default bookSeeder;
