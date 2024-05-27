import React, { useState } from "react";
import "./Add.css";
import AuthContext from "../../context/AuthContext";

const Add = () => {
  const [title, setTitle] = useState("");
  const [textBody, setTextBody] = useState("");
  const [file, setFile] = useState(null);
  const { currentUser } = React.useContext(AuthContext);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedUserId = JSON.parse(currentUser).id;
    console.log("user id: " +parsedUserId);
    const storedToken = localStorage.getItem("authToken");
    console.log("stored token is: " + storedToken);

    const apiUrl = "http://localhost:8000/api/post/";
    const formData = new FormData();
    formData.append("title", title);
    formData.append("text_body", textBody);
    formData.append("image", file);
    if (parsedUserId) {
      formData.append("author", parsedUserId);
    } else  {
      console.log("couldnt append userId to the form");
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Post created successfully:", data);
        setTitle("");
        setTextBody("");
        setFile(null);
      } else {
        console.error("Error creating post:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating post:", error.message);
    }
  };

  /* console.log(typeof file); */

  return (
    <div className="add-container">
      <h1 className="add-h1">Add a Post:</h1>
      <form
        onSubmit={handleSubmit}
        className="add-form"
        encType="multipart/form-data"
      >
        <label htmlFor="title" className="add-label">
          Title:
        </label>
        <input
          className="add-input"
          type="text"
          id="title"
          name="title"
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label htmlFor="file">Add image</label>
        <input
          type="file"
          id="file"
          name="image"
          accept="image/jpeg,image/png,image/gif"
          style={{
            height: "40px",
            width: "300px",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "5px",
            border: "none",
          }}
          alt=""
          onChange={handleFileChange}
        />

        {file && (
          <img
            src={file}
            style={{ height: "300px", width: "600px", marginBottom: "10px" }}
          />
        )}

        <label htmlFor="text_body" className="add-label">
          Write your post here:
        </label>
        <textarea
          className="add-textarea"
          id="text_body"
          name="text_body"
          value={textBody}
          onChange={(e) => {
            setTextBody(e.target.value);
          }}
        ></textarea>

        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Add;
