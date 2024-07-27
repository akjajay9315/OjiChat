import React, { useContext, useState } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext for logout functionality

const Chat = () => {
  const { data } = useContext(ChatContext);
  const { logout } = useContext(AuthContext); // Get logout function from AuthContext
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleMoreClick = () => {
    setDropdownVisible(!dropdownVisible); // Toggle dropdown visibility
  };

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
          <img src={Add} alt="Add" onClick={handleAddClick} />
          <img src={More} alt="More" onClick={handleMoreClick} />
        </div>
        {dropdownVisible && (
          <div className="dropdownMenu">
            <button onClick={handleLogout}>Log Out</button>
          </div>
        )}
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
