/* eslint-disable react/prop-types */
import axios from "axios";
import {
  BorrowWrpr,
  ModalWrpr,
  StyledForm,
  StyledInput,
  SubmitBtn,
} from "./AddEditBook.styled";
import { useEffect, useState } from "react";

const AddEditBook = ({
  addBookModal,
  closeModals,
  selectedItem,
  refreshBooks,
}) => {
  const [formData, setFormData] = useState({
    isbn: "",
    title: "",
    author: "",
    isBorrowed: false,
  });

  useEffect(() => {
    if (!addBookModal && selectedItem) {
      setFormData({
        isbn: selectedItem.isbn || "",
        title: selectedItem.title || "",
        author: selectedItem.author || "",
        isBorrowed: selectedItem.isBorrowed || false,
      });
    } else {
      setFormData({
        isbn: "",
        title: "",
        author: "",
        isBorrowed: false,
      });
    }
  }, [addBookModal, selectedItem]);

  const formatISBN = (value) =>
    `978-${value[0]}-${value.slice(1, 6)}-${value.slice(6, 9)}-${value[9]}`;

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "isbn") {
      const cleanedValue = value.replace(/[^0-9]/g, "");
      setFormData({
        ...formData,
        [name]: cleanedValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      isbn: formatISBN(formData.isbn),
    };

    const request = addBookModal
      ? axios.post("http://localhost:3000/api/books", formattedData)
      : axios.put(
          `http://localhost:3000/api/books/${selectedItem.isbn}`,
          formData
        );

    request
      .then(() => {
        console.log(
          addBookModal ? "Book successfully added" : "Book successfully edited",
          formattedData
        );
        refreshBooks();
      })
      .catch((error) => {
        console.log(error.message);
      });
    closeModals();
  };

  return (
    <ModalWrpr>
      <h3>{addBookModal ? "Add a new book" : "Edit book"}</h3>
      <StyledForm onSubmit={onSubmit}>
        <StyledInput
          type="text"
          inputMode="numeric"
          placeholder="ISBN"
          value={formData.isbn}
          name="isbn"
          onChange={onChange}
          disabled={!addBookModal}
          maxLength={10}
        />
        <StyledInput
          type="text"
          placeholder="Title"
          value={formData.title}
          name="title"
          onChange={onChange}
        />
        <StyledInput
          type="text"
          placeholder="Author"
          value={formData.author}
          name="author"
          onChange={onChange}
        />
        <BorrowWrpr>
          <label htmlFor="isBorrowed">Is Borrowed</label>
          <input
            type="checkbox"
            name="isBorrowed"
            id="isBorrowed"
            checked={formData.isBorrowed}
            onChange={onChange}
          />
        </BorrowWrpr>
        <SubmitBtn type="submit">{addBookModal ? "Add" : "Edit"}</SubmitBtn>
      </StyledForm>
    </ModalWrpr>
  );
};

export default AddEditBook;
