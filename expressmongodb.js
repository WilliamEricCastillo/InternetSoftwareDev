const express = require('express');
const http = require('http');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// const connectionUri = "INSERT MANGODB API CONNECTION STRING;

const bookSchema = mongoose.Schema({
    id: { type: String },
    title: { type: String },
    author: { type: String },
    publisher: { type: String },
    isbn: { type: String },
    avail: { type: Boolean },
    who: { type: String },
    due: { type: Date }
});

const book = mongoose.model('book', bookSchema);

const Book01 = new book({
    id: "1",
    title: "Reactions in REACT",
    author: "Ben Dover",
    publisher: "Random House",
    isbn: "978-3-16-148410-0",
    avail: true,
    who: null,
    due: null,
});

const Book02 = new book({
    id: "2",
    title: "Express-sions",
    author: "Frieda Livery",
    publisher: "Chaotic House",
    isbn: "978-3-16-14841-2",
    avail: true,
    who: null,
    due: null,
});

const Book03 = new book({
    id: "3",
    title: "Restful REST",
    author: "AL Gorithm",
    publisher: "ACM",
    isbn: "978-3-16-143310",
    avail: true,
    who: null,
    due: null,
});

const Book04 = new book({
    id: "4",
    title: "See Essess",
    author: "Anna Log",
    publisher: "O'Reilly",
    isbn: "987-6-54-148220-1",
    avail: false,
    who: "Homer",
    due: "2023-01-01",
});

const Book05 = new book({
    id: "5",
    title: "Scripting in JS",
    author: "Dee Gital",
    publisher: "IEEE",
    isbn: "987-6-54-321123-1",
    avail: false,
    who: "Marge",
    due: "2023-01-02",
});

const Book06 = new book({
    id: "6",
    title: "Be an HTML Hero",
    author: "Jen Neric",
    publisher: "Coders-R-Us",
    isbn: "987-6-54-321123-2",
    avail: false,
    who: "Lisa",
    due: "2023-01-03",
});

async function startingPoint() {
    await mongoose.connect(connectionUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const connection = mongoose.connection;

    connection.on("error", console.error.bind(console, "MongoDB connection error"));
    connection.once("open", () => {
        console.log("MongoDB database connection established successfully");
    });

    await book.deleteMany()
        .then(() => {
            console.log('Start');
        })
        .catch((error) => {
            console.log(error);
        });

    await Book01.save().then( () => console.log("logged"));
    await Book02.save().then( () => console.log("logged"));
    await Book03.save().then( () => console.log("logged"));
    await Book04.save().then( () => console.log("logged"));
    await Book05.save().then( () => console.log("logged"));
    await Book06.save().then( () => console.log("logged"));
    console.log("Pushed To Compass");
        app.listen(3000);
    }

    startingPoint();

app.use(function(req, res, next){
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods',
            'GET,PUT,POST,PATCH,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers',
            'Content-Type, Authorization, Content-Length, X-Requested-With');
        if (req.method === "OPTIONS") res.sendStatus(200);
        else next();
    });

app.get('/books', async function(req, res) {
    console.log(`${req.method} on ${req.path}`);
    res.setHeader('Content-Type', 'application/json');

    try {
        let books;
        if (req.query.avail === "true") {
            books = await book.find({avail: true}).select({_id: 0, id: 1, title: 1});
        } else if (req.query.avail === "false") {
            books = await book.find({avail: false}).select({_id: 0, id: 1, title: 1});
        } else {
            books = await book.find().select({_id: 0, id: 1, title: 1});
        }

        if (books.length === 0) {
            return res.status(404).json({msg: "No books found."});
        } else {
            return res.status(200).json(books);
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({msg: "Internal server error."});
    }
});

app.get('/books/:id', async (req, res) => {
    console.log(`${req.method} on ${req.path}`);
    const id = req.params.id;

    try {
        const book = await book.findOne({ id: id }).select({
            _id: 0,
            title: 1,
            author: 1,
            publisher: 1,
            isbn: 1,
            avail: 1,
            who: 1,
            due: 1,
        });

        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }

        return res.status(200).json(book);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Server error' });
    }
});

app.post('/books', async (req, res) => {
    try {
        console.log(`${req.method} on ${req.path}`);
        const newBook = await book.create({
            id: req.body.id,
            title: req.body.title,
            author: req.body.author,
            publisher: req.body.publisher,
            isbn: req.body.isbn,
            avail: req.body.avail,
            who: req.body.who,
            due: req.body.due
        });
        return res.status(201).json({
            msg: 'Book added successfully',
            book: newBook
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Internal server error'
        });
    }
});

app.delete('/books/:id', async (req, res)=> {
    console.log(`${req.method} on ${req.path}`)
    const id = req.params.id;
    try {
        const book = await book.findOneAndDelete({id: id});

        if(!book){
            return res.status(404).json({msg: "not found"});
        }else{
            return res.status(200).json({
                msg: "book deleted",
                book
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({msg: "server error"});
    }
});

app.patch('/books/:id', async (req, res) => {
    console.log(`${req.method} on ${req.path}`);
    const id = req.params.id;

    try {
        const book = await book.findOne({ id: id });
        if (!book) {
            return res.status(404).json({ msg: "Book not found" });
        }

        book.id = req.body.id || book.id;
        book.Title = req.body.Title || book.Title;
        book.Author = req.body.Author || book.Author;
        book.Publisher = req.body.Publisher || book.Publisher;
        book.isbn = req.body.isbn || book.isbn;
        book.avail = req.body.avail || book.avail;
        book.who = req.body.who || book.who;
        book.due = req.body.due || book.due;

        const updatedBook = await book.save();
        return res.status(200).json({
            msg: "Book updated",
            book: updatedBook,
        });
    } catch (error) {
        return res.status(500).json({ msg: "Error updating book" });
    }
});


