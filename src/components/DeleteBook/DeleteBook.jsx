import { DeleteBtn, DeleteModalWrpr } from "./DeleteBook.styled";
import { api } from "../../configAxios/configAxios";

const DeleteBook = ({ isbn, closeModals, refreshBooks }) => {
  const handleDeleteClick = () => {
    api
      .delete(`/books/${isbn}`)
      .then((res) => {
        if (res.status === 204) {
          refreshBooks();
        }
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
