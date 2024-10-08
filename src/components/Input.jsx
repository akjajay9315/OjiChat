// import React, { useContext, useState } from "react";
// import Img from "../img/img.png";
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";
// import {
//   arrayUnion,
//   doc,
//   serverTimestamp,
//   Timestamp,
//   updateDoc,
// } from "firebase/firestore";
// import { db, storage } from "../firebase";
// import { v4 as uuid } from "uuid";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

// const Input = () => {
//   const [text, setText] = useState("");
//   const [img, setImg] = useState(null);

//   const { currentUser } = useContext(AuthContext);
//   const { data } = useContext(ChatContext);

// const handleSend = async () => {
//   if (img) {
//     // Ensure the storage reference is set correctly
//     const storageRef = ref(storage, `images/${uuid()}`); // Storing images in a folder named 'images'

//     const uploadTask = uploadBytesResumable(storageRef, img);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         // Progress monitoring
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log("Upload is " + progress + "% done");
//       },
//       (error) => {
//         // Handle upload errors
//         console.error("Upload failed:", error);
//         alert("Image upload failed: " + error.message); // Add alert to inform users
//       },
//       async () => {
//         // Handle successful uploads
//         try {
//           const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//           // Add image message to Firestore
//           await updateDoc(doc(db, "chats", data.chatId), {
//             messages: arrayUnion({
//               id: uuid(),
//               text,
//               senderId: currentUser.uid,
//               date: Timestamp.now(),
//               img: downloadURL, // Store the image URL
//             }),
//           });
//           // Update user chat collections with last message
//           await updateDoc(doc(db, "userChats", currentUser.uid), {
//             [data.chatId + ".lastMessage"]: {
//               text: text || "Image", // Show "Image" if no text is provided
//             },
//             [data.chatId + ".date"]: serverTimestamp(),
//           });
//           await updateDoc(doc(db, "userChats", data.user.uid), {
//             [data.chatId + ".lastMessage"]: {
//               text: text || "Image",
//             },
//             [data.chatId + ".date"]: serverTimestamp(),
//           });
//         } catch (error) {
//           console.error("Error updating documents:", error);
//         }
//       }
//     );
//   } else {
//     // Handle sending text-only messages
//     try {
//       await updateDoc(doc(db, "chats", data.chatId), {
//         messages: arrayUnion({
//           id: uuid(),
//           text,
//           senderId: currentUser.uid,
//           date: Timestamp.now(),
//         }),
//       });
//       await updateDoc(doc(db, "userChats", currentUser.uid), {
//         [data.chatId + ".lastMessage"]: {
//           text,
//         },
//         [data.chatId + ".date"]: serverTimestamp(),
//       });
//       await updateDoc(doc(db, "userChats", data.user.uid), {
//         [data.chatId + ".lastMessage"]: {
//           text,
//         },
//         [data.chatId + ".date"]: serverTimestamp(),
//       });
//     } catch (error) {
//       console.error("Error updating documents:", error);
//     }
//   }

//   setText("");
//   setImg(null);
// };


//   return (
//     <div className="input">
//       <input
//         type="text"
//         placeholder="Type something..."
//         onChange={(e) => setText(e.target.value)}
//         value={text}
//       />
//       <div className="send">
//         <label htmlFor="file">
//           <img src={Img} alt="" />
//         </label>
//         <input
//           type="file"
//           style={{ display: "none" }}
//           id="file"
//           onChange={(e) => setImg(e.target.files[0])}
//         />
//         <button onClick={handleSend}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default Input;

import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

const handleSend = async () => {
  if (img) {
    const storageRef = ref(storage, `images/${uuid()}`); // Use a specific path for the image

    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Error during upload:", error);
      },
      async () => {
        // Successful upload
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          // Now proceed with saving the downloadURL to Firestore
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL, // Save the download URL here
            }),
          });
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
              text: text || "Image",
            },
            [data.chatId + ".date"]: serverTimestamp(),
          });
          await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
              text: text || "Image",
            },
            [data.chatId + ".date"]: serverTimestamp(),
          });
        } catch (error) {
          console.error("Error updating documents:", error);
        }
      }
    );
  } else {
    // Handle text messages
    try {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error updating documents:", error);
    }
  }

  setText("");
  setImg(null);
};

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;