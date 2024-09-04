import styled from "styled-components";

export const DeleteModalWrpr = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const DeleteBtn = styled.button`
  padding: 10px;
  border-radius: 5px;
  width: 50%;
  margin: 0 auto;
  color: #fff;
  background-color: #3232e9;

  transition: all 0.3s;
  &:hover {
    background-color: #ff5c5c;
  }
`;
