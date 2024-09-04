import axios from "axios";
import { DeleteBtn, DeleteModalWrpr } from "./DeleteBook.styled";

const DeleteBook = ({ isbn, closeModals, refreshBooks }) => {
  console.log(isbn);

  const handleDeleteClick = () => {
    axios
      .delete(`http://localhost:3000/api/books/${isbn}`)
      .then(() => {
        console.log("Book successfully deleted");
        refreshBooks();
      })
      .catch((error) => {
        console.log(error.message);
      });
    closeModals();
  };

  return (
    <DeleteModalWrpr>
      <h3>Delete this book?</h3>
      <DeleteBtn onClick={handleDeleteClick}>Delete</DeleteBtn>
    </DeleteModalWrpr>
  );
};

export default DeleteBook;
