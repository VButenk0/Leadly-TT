import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Modal from "./components/Modal/Modal";

function App() {
  const [books, setBooks] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [selectedItem, setSelectedItem] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [isEditBookModalOpen, setIsEditBookModalOpen] = useState(false);
  const [isDeleteBookModalOpen, setIsDeleteBookModalOpen] = useState(false);

  const fetchBooks = () => {
    axios
      .get("http://localhost:3000/api/books")
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
        setFilteredBooks(res.data);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = () => {
    setIsModalOpen(true);
    setIsAddBookModalOpen(true);
    console.log("Add Book button is working");
  };

  const handleBorrowBook = (book) => {
    setSelectedItem(book);
    const { isbn } = selectedItem;
    axios
      .patch(`http://localhost:3000/api/books/${isbn}/borrow`)
      .then(() => {
        console.log("Book successfully borrowed");
        fetchBooks();
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const handleEditBook = (book) => {
    setSelectedItem(book);
    setIsModalOpen(true);
    setIsEditBookModalOpen(true);
    console.log("Edit Book button is working");
  };

  const handleDeleteBook = (book) => {
    setSelectedItem(book);
    setIsModalOpen(true);
    setIsDeleteBookModalOpen(true);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div>
        <h1 className="title">Library</h1>
        <button className="bookBtns addBtn" onClick={() => handleAddBook()}>
          Add New Book
        </button>
        <form className="searhForm" onSubmit={handleSearchSubmit}>
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
            {filteredBooks.map((book, index) => (
              <li key={index}>
                <div className={"mainInfo"}>
                  <p className="isbn">{book.isbn}</p>
                  <div className={book.isBorrowed ? "borrowed" : ""}>
                    <div className="titleWrpr">
                      <p className="title">{book.title}</p>
                    </div>
                    <p className="author">{book.author}</p>
                  </div>
                </div>
                <div>
                  {book.isBorrowed && <p className="borrowed">borrowed</p>}
                  <button
                    className={
                      "bookBtns " +
                      (book.isBorrowed ? "unborrowBtn" : "borrowBtn")
                    }
                    onClick={() => handleBorrowBook(book)}
                  >
                    {book.isBorrowed ? "🚫" : "✅"}
                  </button>
                  <button
                    className="bookBtns editBtn"
                    onClick={() => handleEditBook(book)}
                  >
                    ✏️
                  </button>
                  <button
                    className="bookBtns deleteBtn"
                    onClick={() => handleDeleteBook(book)}
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
      {isModalOpen && (
        <Modal
          addBookModal={isAddBookModalOpen}
          editBookModal={isEditBookModalOpen}
          deleteBookModal={isDeleteBookModalOpen}
          closeModal={() => setIsModalOpen(false)}
          closeAddBookModal={() => setIsAddBookModalOpen(false)}
          closeEditBookModal={() => setIsEditBookModalOpen(false)}
          closeDeleteBookModal={() => setIsDeleteBookModalOpen(false)}
          selectedItem={selectedItem}
          refreshBooks={fetchBooks}
        />
      )}
    </div>
  );
}

export default App;
