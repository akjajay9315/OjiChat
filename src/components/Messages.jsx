import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    if (data.chatId) {
      const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });

      return () => {
        unSub();
      };
    } else {
      // Clear messages if no chat is selected
      setMessages([]);
    }
  }, [data.chatId]);

  return (
    <div className="messages">
      {data.chatId ? (
        messages.length > 0 ? (
          messages.map((m) => <Message message={m} key={m.id} />)
        ) : (
          <div className="placeholderMessage">
            Click on any friend to chat
          </div>
        )
      ) : (
        <div className="placeholderMessage">Loading..</div>
      )}
    </div>
  );
};

export default Messages;
