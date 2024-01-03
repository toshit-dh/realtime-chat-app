import React from "react";
import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";
export default function Accept({handleClick}) {
  return (
    <Button>
      <FaCheckCircle onClick={handleClick} />
    </Button>
  );
}
const Button = styled.button`
cursor: pointer;
  display: flex;
  margin: 0.1rem;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  background-color: #9186f3;
  svg {
    font-size: 0.8rem;
    color: green;
  }
`;
