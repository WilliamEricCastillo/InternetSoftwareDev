# This repository contains two files:
## Express.js and Expressmongodb.js


# 1. Express.js 

## Book API

This repository contains an Express.js application that serves as a simple API for managing a collection of books.

## Description

The `Express.js` file contains an Express.js application that provides endpoints for performing CRUD (Create, Read, Update, Delete) operations on a collection of books. The application uses in-memory data storage for the book collection, allowing users to interact with the data via HTTP requests.

## Features

- RESTful API endpoints for managing books
- Middleware for enabling CORS (Cross-Origin Resource Sharing) and parsing JSON requests
- Endpoints for retrieving all books, retrieving a specific book by ID, adding a new book, updating an existing book, and deleting a book
- Sample data for books stored in-memory

## Usage

1. Ensure you have Node.js and npm installed on your machine.
2. Install dependencies by running `npm install` in your terminal.
3. Start the server by running `node Express.js`.
4. Access the API endpoints using a tool like Postman or cURL.

## Endpoints

- `GET /books`: Retrieve all books or filter books based on availability (`avail=true` or `avail=false`).
- `GET /books/:id`: Retrieve a specific book by its ID.
- `POST /books`: Add a new book to the collection.
- `PUT /books/:id`: Update an existing book.
- `DELETE /books/:id`: Delete a book from the collection.

## Note

- This application is for educational purposes and may require additional configuration for production use.
- Ensure to handle sensitive information securely, especially when dealing with database connection strings.
- The application provides a basic understanding of building RESTful APIs with Express.js.





# 2. Expressmongodb.js

## Express MongoDB Book API

This repository contains an Express.js application integrated with MongoDB for managing a collection of books.

## Description

The `Expressmongodb.js` file contains an Express.js application that provides endpoints for performing CRUD (Create, Read, Update, Delete) operations on a collection of books stored in a MongoDB database. The application utilizes Mongoose, an Object Data Modeling (ODM) library for MongoDB and Node.js, to define the book schema and interact with the MongoDB database.

## Features

- RESTful API endpoints for managing books
- Integration with MongoDB for persistent data storage
- Schema definition using Mongoose for book data structure
- Endpoints for retrieving all books, retrieving a specific book by ID, adding a new book, updating an existing book, and deleting a book

## Usage

1. Ensure you have Node.js and npm installed on your machine.
2. Install dependencies by running `npm install` in your terminal.
3. Ensure you have a MongoDB instance set up and accessible.
4. Set the MongoDB connection URI in the `connectionUri` variable inside the `Expressmongodb.js` file.
5. Start the server by running `node Expressmongodb.js`.
6. Access the API endpoints using a tool like Postman or cURL.

## Endpoints

- `GET /books`: Retrieve all books or filter books based on availability (`avail=true` or `avail=false`).
- `GET /books/:id`: Retrieve a specific book by its ID.
- `POST /books`: Add a new book to the collection.
- `PUT /books/:id`: Update an existing book.
- `DELETE /books/:id`: Delete a book from the collection.

## Note

- Ensure to replace `"INSERT MANGODB API CONNECTION STRING"` with the actual MongoDB connection URI.
- This application is for educational purposes and may require additional configuration for production use.
- Handle sensitive information securely, especially database connection strings.
- The application demonstrates how to integrate Express.js with MongoDB using Mongoose.
