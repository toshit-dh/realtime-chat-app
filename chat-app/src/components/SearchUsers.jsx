import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AddFriend from "./AddFriend";
import axios from "axios";
import { FaHourglass } from "react-icons/fa";
import {
  addFriendRequestRoute,
  nonFriendContactRoute,
} from "../utils/api-routes";
export default function SearchUsers() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [searchContacts, setSearchContacts] = useState([]);
  const [text, setText] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [isloaded, setIsLoaded] = useState(false);
  useEffect(() => {
    async function setUser() {
      if (!localStorage.getItem("user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("user")));
        setIsLoaded(true);
      }
    }
    setUser();
  }, []);
  useEffect(() => {
    async function setSearchContact() {
      if (currentUser) {
        const data = await axios.get(
          `${nonFriendContactRoute}/${currentUser._id}`
        );
        setSearchContacts(data.data);
      }
    }
    setSearchContact();
  }, [currentUser,filtered]);
  const onChange = (e) => {
    const searchText = e.target.value.toLowerCase();
    setText(searchText);
    const afterSearch = searchContacts.filter((contact) =>
      contact.username.toLowerCase().startsWith(searchText)
    );
    setFiltered(afterSearch);
  };
  const addFriendreq = async (contact,index) => {
    contact.friendRequests.push(currentUser._id)
    setFiltered(filtered)
    const data = await axios.post(addFriendRequestRoute, {
      from: currentUser._id,
      to: contact._id,
    });
    const modifiedContacts = [...data.data]
    setSearchContacts(modifiedContacts)
  };
  return (
    <>
      <Container>
        <div className="search">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Search"
              value={text}
              onChange={(e) => onChange(e)}
            />
          </form>
        </div>
        <div className="search-contacts">
          {filtered.map((contact, index) => (
            <div className="search-contact" key={index}>
              <div className="search-avatar">
                <img
                  src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                  alt="avatarImage"
                />
              </div>
              <div className="search-username">
                <h3>{contact.username}</h3>
              </div>
              <div className="icons">
                {contact.friendRequests.includes(currentUser._id) ? (
                  <div style={{ fontSize: "0.8rem", color: "brown" }}>
                    <FaHourglass />
                  </div>
                ) : (
                  <AddFriend handleClick={() => addFriendreq(contact,index)} />
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #080420;
  gap: 0.8rem;

  .search {
    form {
      display: flex;
      flex-direction: column;
      background-color: #00000076;
      input {
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #4e0eff;
        border-radius: 0.4rem;
        color: white;
        width: 100%;
        font-size: 1rem;
        &:focus {
          border: 0.1rem solid #997af0;
          outline: none;
        }
      }
    }
  }

  .search-contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .search-contact {
      background-color: #ffffff39;
      min-height: 3rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      display: flex;
      align-items: center;
      transition: 0.5s ease-in-out;

      .search-avatar {
        img {
          height: 3rem;
        }
      }

      .search-username {
        display: flex;
        justify-content: end;
        align-items: center;
        overflow: hidden;
        text-overflow: ellipsis;
        h3 {
          color: white;
        }
      }

      .icons {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;
