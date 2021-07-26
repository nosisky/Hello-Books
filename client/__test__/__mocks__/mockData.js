const mockData = {
  authResponse: {
    currentUser: {
      username: 'dealwap',
      email: 'nosis@gmail.com',
      fullName: 'Abdulrasaq Nasirudeen'
    },
    data: {
      token: 'dhjdjdkkddkdkdkdkkdkd'
    }
  },
  user: {
    fullName: 'test',
    username: 'tester',
    id: 1,
    plan: 'Silver',
    email: 'nosisky@gmail.com',
    isAdmin: 0
  },
  notifications: [
    { id: 1, message: 'Hello from the other side' }
  ],
  Dashboard: {
    props: {
      user: {
        fullName: 'Test'
      },
      actions: {
        getAllBooksActions: jest.fn()
      }
    }
  },
  bookData: {
    title: 'This is a test',
    author: 'dealwap',
    isbn: 'isbn-test-book',
    productionYear: 1992,
    cover: 'hello.jpg',
    descriptions: 'Hello world',
    categoryId: 1,
  },
  modifiedBook: [{
    id: 1,
    title: 'This is a test',
    author: 'dealwap',
    isbn: 'isbn-test-book',
    productionYear: 1992,
    cover: 'hello.jpg',
    descriptions: 'Hello world',
    categoryId: 1,
  },
  {
    id: 2,
    title: 'This is a test',
    author: 'dealwap',
    isbn: 'isbn-test-book',
    productionYear: 1992,
    cover: 'hello.jpg',
    descriptions: 'Hello world',
    categoryId: 1,
  }],
  returnedBook: {
    count: 5,
    rows: [{
      title: 'This is a test',
      author: 'dealwap',
      isbn: 'isbn-test-book',
      productionYear: 1992,
      cover: 'hello.jpg',
      descriptions: 'Hello world',
      categoryId: 1,
    },
    {
      title: 'This is a test',
      author: 'dealwap',
      isbn: 'isbn-test-book',
      productionYear: 1992,
      cover: 'hello.jpg',
      descriptions: 'Hello world',
      categoryId: 1,
    }]
  },
  deletedBook: [{
    title: 'This is a test',
    author: 'dealwap',
    isbn: 'isbn-test-book',
    productionYear: 1992,
    cover: 'hello.jpg',
    descriptions: 'Hello world',
    categoryId: 1,
  }]
};

export default mockData;
