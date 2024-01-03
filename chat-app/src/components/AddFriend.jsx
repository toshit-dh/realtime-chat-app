import React from "react";
import styled from "styled-components";
import {FaUserPlus} from "react-icons/fa";
export default function AddFriend({handleClick}) {
  return (
    <Button>
      <FaUserPlus onClick={handleClick} />
    </Button>
  );
}
const Button = styled.button`
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

  }
`;
