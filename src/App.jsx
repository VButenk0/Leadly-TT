import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

// const books = [
//   {
//     isbn: "978-3-16-148410-0",
//     title: "Harry Potter and the Philosopher's Stone",
//     author: "J.K. Rowling",
//     isBorrowed: false,
//   },
//   {
//     isbn: "978-1-56619-909-4",
//     title: "The Hobbit",
//     author: "J.R.R. Tolkien",
//     isBorrowed: true,
//   },
// ];

function App() {
  const [books, setBooks] = useState([]);
  console.log(books);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchValue, setSearchValue] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(books);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/books")
      .then((res) => {
        setBooks(res);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);
  const handleAddBook = () => {
    console.log("Add Book button is working");
  };

  const handleBorrowBook = () => {
    console.log("Borrow Book button is working");
  };

  const handleEditBook = () => {
    console.log("Edit Book button is working");
  };

  const handleDeleteBook = () => {
    console.log("Delete Book button is working");
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const filtered = books.filter((book) => {
      return (
        book.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        book.isbn.includes(searchValue)
      );
    });
    setFilteredBooks(filtered);
  };

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div>
        <h1 className="title">Library</h1>
        <button className="bookBtns addBtn" onClick={handleAddBook}>
          Add New Book
        </button>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search book by title or ISBN"
            name="search"
            id="search"
            value={searchValue}
            onChange={handleSearchChange}
          />
          <button type="submit">Search</button>
        </form>

        {filteredBooks.length ? (
          <ul>
            {filteredBooks.map(({ isbn, title, author, isBorrowed }) => (
              <li key={isbn}>
                <div>
                  <div className={isBorrowed && "borrowed"}>
                    <p className="title">{title}</p>
                    <p className="author">{author}</p>
                  </div>
                  {isBorrowed && <p className="borrowed">borrowed</p>}
                </div>
                <div>
                  <button
                    className={
                      "bookBtns " + (isBorrowed ? "unborrowBtn" : "borrowBtn")
                    }
                    onClick={handleBorrowBook}
                  >
                    {isBorrowed ? "🚫" : "✅"}
                  </button>
                  <button className="bookBtns editBtn" onClick={handleEditBook}>
                    ✏️
                  </button>
                  <button
                    className="bookBtns deleteBtn"
                    onClick={handleDeleteBook}
                  >
                    ❌
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <p>📚</p>
            <p>No books are fit to your search</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
