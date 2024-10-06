const express = require("express");
const fs = require("fs");
const cors = require("cors");

const PORT = 4001;
const app = express();

app.use(cors());
app.use(express.json());

const books = JSON.parse(fs.readFileSync(`${__dirname}/data/books.json`));

const getAllBooks = (req, res) => {
  res.status(200).json({
    status: "success",
    results: books.length,
    data: books,
  });
};

const getBookById = (req, res) => {
  const book = books.find((book) => book.id === parseInt(req.params.id));

  if (!book) {
    res.status(404).json({
      status: "error",
      message: "Book not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: book,
  });
};

const createBook = (req, res) => {
  const newBook = req.body;
  console.log(newBook);

  books.sort((a, b) => a.id - b.id);
  const lastBookId = books.length !== 0 ? books[books.length - 1].id : 0;
  const newBooks = [...books, { ...newBook, id: lastBookId + 1 }];

  console.log(newBooks);

  fs.writeFile(`${__dirname}/data/books.json`, JSON.stringify(newBooks), () => {
    res.status(201).json({
      status: "success",
      results: newBooks.length,
      data: newBooks,
    });
  });
};

const updateBook = (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((book) => book.id === bookId);

  if (!book) {
    res.status(404).json({
      status: "error",
      message: "Book not found",
    });
  }

  const updatedBooks = books.map((book) => {
    if (book.id === bookId) {
      return { ...book, ...req.body };
    } else {
      return book;
    }
    /// return book.id === bookId ? {...book, ...req.body } : book;
  });

  fs.writeFile(
    `${__dirname}/data/books.json`,
    JSON.stringify(updatedBooks),
    () => {
      res.status(201).json({
        status: "success",
        results: updatedBooks.length,
        data: updatedBooks,
      });
    }
  );
};

const deleteBook = (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((book) => book.id === bookId);

  if (!book) {
    res.status(404).json({
      status: "error",
      message: "Book not found",
    });
  }

  const newBooks = books.filter((book) => book.id !== bookId);

  fs.writeFile(`${__dirname}/data/books.json`, JSON.stringify(newBooks), () => {
    res.status(201).json({
      status: "success",
      results: newBooks.length,
      data: newBooks,
    });
  });
};

// app.get("/api/v1/books", getAllBooks);
// app.post("/api/v1/books", createBook);

// app.get("/api/v1/books/:id", getBookById);
// app.delete("/api/v1/books/:id", deleteBook);
// app.patch("/api/v1/books/:id", updateBook);

// Routes

app.route("/api/v1/books").get(getAllBooks).post(createBook);

app
  .route("/api/v1/books/:id")
  .get(getBookById)
  .delete(deleteBook)
  .patch(updateBook);

module.exports = app;
