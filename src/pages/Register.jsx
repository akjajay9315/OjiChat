import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

// Custom hook for registration logic
const useRegister = (navigate) => {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    const displayName = e.target.elements.displayName.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const file = e.target.elements.file.files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          throw new Error("File upload failed.");
        },
        async () => {
          const downloadURL = await getDownloadURL(storageRef);
          await updateProfile(res.user, {
            displayName,
            photoURL: downloadURL,
          });

          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });

          await setDoc(doc(db, "userChats", res.user.uid), {});
          navigate("/");
        }
      );
    } catch (err) {
      console.error("Error:", err.message);
      setErr("Check email or password again. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, err, loading };
};

const Register = () => {
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();
  const { handleSubmit, err, loading } = useRegister(navigate);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">OjiChat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input
            name="displayName"
            required
            type="text"
            placeholder="Display name"
          />
          <input name="email" required type="email" placeholder="Email" />
          <input
            name="password"
            required
            type="password"
            placeholder="Password"
          />
          <input
            name="file"
            type="file"
            id="file"
            style={{ display: "none" }}
            required
            onChange={handleFileChange}
          />
          <label htmlFor="file">
            <img src={avatar || Add} alt="Add avatar" />
            <span>Add an avatar</span>
          </label>
          <button disabled={loading} type="submit">
            Sign up
          </button>
          {loading && (
            <span>Uploading and compressing the image, please wait...</span>
          )}
          {err && <span style={{ color: "red" }}>{err}</span>}
        </form>
        <p>
          You already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
