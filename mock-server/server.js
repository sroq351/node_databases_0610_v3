const dotenv = require("dotenv");
const app = require("./index");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 3000;

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"));

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  pageNum: { type: Number, required: true },
  imageURL: { type: String, required: true },
  topic: { type: String, required: true },
  id: { type: mongoose.Schema.Types.ObjectId, auto: true },
});
const Book = mongoose.model("Book", bookSchema);

const testBook = new Book({
  title: "Book Title",
  author: "Author Name",
  pageNum: 200,
  imageURL: "https://example.com/book.jpg",
  topic: "Technology",
});

testBook.save().then(() => console.log("Test Book saved"));

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
/*const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);*/
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
