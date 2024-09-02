import "./App.css";

const books = [
  {
    isbn: "978-3-16-148410-0",
    cover: "3690eea4c1aa0ae57265f07285eb92c3.png",
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    isBorrowed: false,
  },
  {
    isbn: "978-1-56619-909-4",
    cover: "17157681.jpg",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    isBorrowed: true,
  },
];

function App() {
  return (
    <div>
      <div>
        <h1>Library</h1>

        {books.length ? (
          <ul>
            {books.map(({ isbn, cover, title, author, isBorrowed }) => (
              <li key={isbn}>
                <img src={cover} alt={title + "'s cover"} width={100} />
                <div>
                  <p className="title">{title}</p>
                  <p className="author">{author}</p>
                </div>
                {isBorrowed && (
                  <>
                    <div className="overlay"></div>
                    <p className="borrowed">This book is already borrowed</p>
                  </>
                )}
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
