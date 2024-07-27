import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    if (!currentUser?.uid) return; // Guard clause for when currentUser is not defined

    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        const data = doc.data();
        if (data) {
          setChats(data);
        }
      });

      return () => {
        unsub();
      };
    };

    getChats();
  }, [currentUser?.uid]);

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => (b[1]?.date || 0) - (a[1]?.date || 0))
        .map((chat) => (
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => handleSelect(chat[1]?.userInfo)}
          >
            <img src={chat[1]?.userInfo?.photoURL || ""} alt="User Avatar" />
            <div className="userChatInfo">
              <span>{chat[1]?.userInfo?.displayName || "Unknown User"}</span>
              <p>{chat[1]?.lastMessage?.text || "No message"}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
