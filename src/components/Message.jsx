// import React, { useContext, useEffect, useState, useRef } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";

// // Function to format time as 'time ago'
// const timeAgo = (timestamp) => {
//   const now = new Date();
//   const diff = now - new Date(timestamp);
//   const minutes = Math.floor(diff / 60000);

//   if (minutes < 1) return "just now";
//   if (minutes < 60) return `${minutes} min ago`;
//   if (minutes < 1440) return `${Math.floor(minutes / 60)} hr ago`;
//   return `${Math.floor(minutes / 1440)} day ago`;
// };

// const Message = ({ message }) => {
//   const { currentUser } = useContext(AuthContext);
//   const { data } = useContext(ChatContext);

//   const [time, setTime] = useState("just now");
//   const [isRecent, setIsRecent] = useState(true);

//   const ref = useRef();

//   useEffect(() => {
//     ref.current?.scrollIntoView({ behavior: "smooth" });
//   }, [message]);

//   useEffect(() => {
//     const messageTime = new Date(message.timestamp);
//     const now = new Date();
//     const minutesSinceMessage = Math.floor((now - messageTime) / 60000);

//     if (minutesSinceMessage > 2) {
//       setIsRecent(false);
//       setTime(timeAgo(message.timestamp));
//     } else {
//       const intervalId = setInterval(() => {
//         setTime(timeAgo(message.timestamp));
//       }, 5 * 60 * 1000);

//       // Cleanup interval on component unmount
//       return () => clearInterval(intervalId);
//     }
//   }, [message.timestamp]);

//   return (
//     <div
//       ref={ref}
//       className={`message ${message.senderId === currentUser.uid && "owner"}`}
//     >
    
//       <div className="messageInfo">
//         <img
//           src={
//             message.senderId === currentUser.uid
//               ? currentUser.photoURL
//               : data.user.photoURL
//           }
//           alt=""
//         />
//         <span>{time}</span>
//       </div>
//       <div className="messageContent">
//         <p>{message.text}</p>
        
//         {message.img && <img src={message.img} alt="" />}
//       </div>
//     </div>
//   );
// };

// export default Message;
import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  // Skip rendering if the message text is empty
  if (!message.text.trim() && !message.img) return null;

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        {/* Time display removed */}
      </div>
      <div className="messageContent">
        {message.text.trim() && <p>{message.text}</p>}
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
