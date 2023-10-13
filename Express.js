const express = require('express');
const app = express();
// const http = require('INSET CONNECTION URL');

app.use(express.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

const Books = [
    {
        "id": "1",
        "title": "Reactions in REACT",
        "author": "Ben Dover",
        "publisher": "Random House",
        "isbn": "978-3-16-148410-0",
        "avail": "true",
        "who": "",
        "due": ""
    },
    {
        "id": "2",
        "title": "Express-sions",
        "author": "Frida Livery",
        "publisher": "Chaotic House",
        "isbn": "978-3-16-148410-2",
        "avail": "true",
        "who": "",
        "due": ""
    },
    {
        "id": "3",
        "title": "Restful REST",
        "author": "Al Gorithm",
        "publisher": "ACM",
        "isbn": "978-3-16-143310-1",
        "avail": "true",
        "who": "",
        "due": ""
    },
    {
        "id": "4",
        "title": "See Essess",
        "author": "Anna Log",
        "publisher": "O'Reilly",
        "isbn": "987-6-54-148220-1",
        "avail": "false",
        "who": "Homer",
        "due": "1/1/23"
    },
    {
        "id": "5",
        "title": "Scripting in JS",
        "author": "Dee Gital",
        "publisher": "IEEE",
        "isbn": "987-6-54-321123-1",
        "avail": "false",
        "who": "Marge",
        "due": "1/2/23"
    },
    {
        "id": "6",
        "title": "Be An HTML Hero",
        "author": "Jen Neric",
        "publisher": "Coders-R-Us",
        "isbn": "987-6-54-321123-2",
        "avail": "false",
        "who": "Lisa",
        "due": "1/3/23"
    }
];

app.get('/books', function(req, res) {
    console.log(`${req.method} on ${req.path}`);
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;

    if (req.query.avail === "true") {
        const availableBooks = Books.filter(book => book.avail === "true");
        res.json(availableBooks);
    } else if (req.query.avail === "false") {
        const unavailableBooks = Books.filter(book => book.avail === "false");
        res.json(unavailableBooks);
    } else {
        const result = Books.map(({id, title}) => ({id, title}));
        res.json(result);
    }
});

app.get('/books/:id', function(req, res) {
    console.log(`${req.method} on ${req.path}`);
    const id = req.params.id;
    console.log(id);
    const book = Books.find(book => book.id === id);

    if (!book) {
        res.statusCode = 404;
        res.send(res.statusCode);
    }

    if (book.id === id) {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        const {avail} = book;
        const availBool = avail === 'true';
        const bookWithBoolean = {...book, avail: availBool};
        res.send(bookWithBoolean);
    }
});

app.post('/books', function(req, res){
    console.log(`${req.method} on ${req.path}`);
    const book = Books.find(book => book.id === req.body.id);

    if (book !== undefined) {
        res.statusCode = 403;
        res.end(res.statusCode);
    } else {
        const newBook = {
            id: req.body.id,
            title: req.body.title,
            author: req.body.author,
            publisher: req.body.publisher,
            isbn: req.body.isbn,
            avail: "true",
            who: " ",
            due: " "
        };

        Books.push(newBook);
        res.statusCode = 201;
        res.json(newBook);
    }
});

app.put('/books/:id', function(req, res){
    console.log(`${req.method} on ${req.path}`);
    const id = req.params.id;
    const bookIndex = Books.findIndex(book => book.id === id);

    if (bookIndex === -1) {
        res.statusCode = 404;
        res.send(res.statusCode);
        return;
    }

    const book = Books[bookIndex];
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.publisher = req.body.publisher || book.publisher;
    book.isbn = req.body.isbn || book.isbn;
    book.avail = req.body.avail.toString();
    book.who = req.body.who || book.who;
    book.due = req.body.due || book.due;

    res.statusCode = 200;
    res.json(book);
});

app.delete('/books/:id', function(req, res){
    console.log(`${req.method} on ${req.path}`);
    const id = req.params.id;
    const bookIndex = Books.findIndex(book => book.id === id);

    if (bookIndex >= 0) {
        Books.splice(bookIndex, 1);
        res.statusCode = 200;
        res.send(res.statusCode);
    } else {
        res.statusCode = 204;
        res.end();
    }
});

app.listen(3000);
