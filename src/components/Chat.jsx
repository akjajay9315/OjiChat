import React, { useContext } from "react";
import Add from "../img/add.png";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext for logout functionality

const Chat = () => {
  const { data } = useContext(ChatContext);
  const { logout } = useContext(AuthContext); // Get logout function from AuthContext

  const handleLogout = async () => {
    try {
      await logout(); // Call logout function
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleAddClick = () => {
    alert("Please search for a name in the search box to chat with a user."); // Show alert message
  };

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          {/* <img src={Cam} alt="Camera" /> */}
          <img className="add" src={Add} alt="Add" onClick={handleAddClick} />
          <button onClick={handleLogout}>Log Out</button>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
