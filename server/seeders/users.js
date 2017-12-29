const userSeeder = {
  signUp: {
    fullName: 'Abdulrasaq Nasirudeen',
    username: 'Dealwap',
    password: 'helloworld',
    email: 'nosisky@gmail.com'
  },

  signUp2: {
    fullName: 'Abdulrasaq Nasirudeen',
    username: 'Dealwapb',
    password: 'helloworld',
    email: 'main@gmail.com'
  },

  login: {
    username: 'Dealwap',
    password: 'helloworld'
  },

  invalidLoginDetails: {
    username: 'Dealwap',
    password: 'hello'
  },

  missingPassword: {
    username: 'Dealwap',
  },

  existingUsername: {
    fullName: 'Abdulrasaq Nasirudeen',
    username: 'Dealwap',
    password: 'helloworld',
    email: 'jamesjunior@yahoo.com'
  },

  existingEmail: {
    fullName: 'Abdulrasaq Nasirudeen',
    username: 'Bisola',
    password: 'helloworld',
    email: 'nosisky@gmail.com'
  },
  noFullName: {
    username: 'Bisola',
    password: 'helloworld',
    email: 'nosisky@gmail.com'
  },
  noEmail: {
    fullName: 'Abdulrasaq Nasirudeen',
    username: 'Bisola',
    password: 'helloworld',
  },
  usernameMin5: {
    fullName: 'Abdulrasaq Nasirudeen',
    username: 'ola',
    password: 'helloworld',
    email: 'daniel@gmail.com'
  }
};

export default userSeeder;
