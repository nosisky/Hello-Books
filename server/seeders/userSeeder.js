const userSeeder = {
  signUp: {
    fullName: 'Abdulrasaq Nasirudeen',
    username: 'Dealwap',
    password: 'helloworld',
    email: 'nosisky@gmail.com',
    isAdmin: 1,
    passwordConfirm: 'helloworld'
  },

  signUp2: {
    fullName: 'Abdulrasaq Nasirudeen',
    username: 'Dealwapb',
    password: 'helloworld',
    email: 'main@gmail.com',
    passwordConfirm: 'helloworld'
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
    email: 'jamesjunior@yahoo.com',
    passwordConfirm: 'helloworld'
  },

  existingEmail: {
    fullName: 'Abdulrasaq Nasirudeen',
    username: 'Bisola',
    password: 'helloworld',
    email: 'nosisky@gmail.com',
    passwordConfirm: 'helloworld'
  },
  noFullName: {
    username: 'Bisola',
    password: 'helloworld',
    email: 'nosisky@gmail.com',
    passwordConfirm: 'helloworld'
  },
  noEmail: {
    fullName: 'Abdulrasaq Nasirudeen',
    username: 'Bisola',
    password: 'helloworld',
    passwordConfirm: 'helloworld'
  },
  usernameMin5: {
    fullName: 'Abdulrasaq Nasirudeen',
    username: 'ola',
    password: 'helloworld',
    email: 'daniel@gmail.com',
    passwordConfirm: 'helloworld'
  }
};

export default userSeeder;
