import { useCallback, useEffect } from "react";
import ReactDom from "react-dom";
import AddEditBook from "../AddEditBook/AddEditBook";
import DeleteBook from "../DeleteBook/DeleteBook";
import { BtnClose, ModalContainer, ModalStyled, Overlay } from "./Modal.styled";

const Modal = ({
  addBookModal,
  editBookModal,
  deleteBookModal,
  closeModal,
  closeAddBookModal,
  closeEditBookModal,
  closeDeleteBookModal,
  selectedItem,
  refreshBooks,
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const closeModals = useCallback(() => {
    document.body.style.overflow = "auto";
    closeModal();
    closeAddBookModal();
    closeEditBookModal();
    closeDeleteBookModal();
  });

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        document.body.style.overflow = "auto";
        closeModals();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeModals]);

  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModals();
    }
  };

  return ReactDom.createPortal(
    <>
      <Overlay onClick={onBackdropClick}>
        <ModalContainer>
          <ModalStyled>
            {(addBookModal || editBookModal) && (
              <AddEditBook
                addBookModal={addBookModal}
                closeModals={closeModals}
                selectedItem={selectedItem}
                refreshBooks={refreshBooks}
              />
            )}
            {deleteBookModal && (
              <DeleteBook
                isbn={selectedItem.isbn}
                closeModals={closeModals}
                refreshBooks={refreshBooks}
              />
            )}

            <BtnClose type="button" onClick={closeModals}>
              X
            </BtnClose>
          </ModalStyled>
        </ModalContainer>
      </Overlay>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
