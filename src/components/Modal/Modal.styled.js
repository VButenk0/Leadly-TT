import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #1d1e214d;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const ModalStyled = styled.div`
  width: 536px;
  overflow-y: auto;
  max-height: 90vh;
  z-index: 2000;
  border-radius: 12px;
  background-color: #fff;
  padding: 40px;

  @media only screen and (max-width: 767px) {
    width: 335px;
  }
`;

export const BtnClose = styled.button`
  background-color: transparent;
  position: absolute;
  border: none;
  padding: 0;
  top: 14px;
  right: 14px;
  transition: scale 300ms ease-in-out;

  &:hover,
  &:focus {
    scale: 1.4;
  }
`;
