[![Build Status](https://travis-ci.org/nosisky/Hello-Books.svg?branch=implement-tests)](https://travis-ci.org/nosisky/Hello-Books) [![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/nosisky/Hello-Books)
[![Coverage Status](https://coveralls.io/repos/github/nosisky/Hello-Books/badge.svg?branch=implement-tests)](https://coveralls.io/github/nosisky/Hello-Books?branch=implement-tests)
# Hello-Books 
### Hello-Books is a simple application that helps manage a library and its processes like stocking, tracking and renting books. With this application users are able to find and rent books. The application also has an admin section where the admin can do things like add books, delete books, increase the quantity of a book etc.

## Installation
> Git clone this repository

> CD to the created directory

> run ```npm install```

> run ```npm start``` to start server

## API Routes

> POST : ```/api/v1/users/signup```
API routes for users to create accounts and login to the application

> POST : ```/api/v1/users/signin (username, password)```
An API route that allow users add new book:

> GET : ```/api/v1/books```
An API route that allow users to get all books in the library

> PUT : /api/v1/books/<bookId>
An API route that allow users to modify book in the library

> GET : ```/api/v1/books?returned=false```
An API route that allow users to get all the books that the user has borrowed but has not returned

> POST : ```/api/users/<userId>/books```
An API route that allow user to borrow a book

> PUT : ```/api/users/<userId>/books```
An API route that allow user to return a book

> DELETE : ```/api/v1/books/delete/:bookId```
An API route that allows admin to delete books

> GET : ```/api/v1/users/all```
An API route that allows admin to get all users

> GET : ```/api/v1/books/:bookId```
An API route that allows users get a specific book

> GET : ```/api/v1/books/logs/:userId```
An API route that allows users see rented book history

