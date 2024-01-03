import React from "react";
import styled from "styled-components";
import {AiOutlineCloseCircle } from "react-icons/ai";
export default function Reject({handleClick}) {
  return (
    <Button>
      <AiOutlineCloseCircle onClick={handleClick} />
    </Button>
  );
}
const Button = styled.button`
cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  background-color: #9186f3;
  svg {
    font-size: 0.8rem;
    color: red;
  }
`;
