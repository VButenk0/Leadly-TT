import styled from "styled-components";

export const ModalWrpr = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StyledInput = styled.input`
  width: 100%;
  border: 1px solid gray;
  border-radius: 5px;
`;

export const BorrowWrpr = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  width: fit-content;

  padding-bottom: 10px;
`;

export const SubmitBtn = styled.button`
  padding: 10px;
  border-radius: 5px;
  width: 50%;
  margin: 0 auto;
  color: #fff;
  background-color: #3232e9;
`;
