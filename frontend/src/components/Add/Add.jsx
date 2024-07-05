import React, { useState, useContext } from "react";
import "./Add.css";
import AuthContext from "../../context/AuthContext";
import TagsContext from "../../context/TagsContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Tags2 from "../Tags2/Tags2";

export const Add = () => {
  const [title, setTitle] = useState("");
  const [textBody, setTextBody] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const { currentUser } = React.useContext(AuthContext);

  const { tags, setTags } = useContext(TagsContext);
  console.log("Tags in Add component:", tags);
  const tagsMap = tags ? tags.map((tag) => tag.name) : [];
  console.log("chosen tags: " + typeof tagsMap);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const objectURL = URL.createObjectURL(e.target.files[0]);
      setFile(e.target.files[0]);
      setFilePreview(objectURL);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedUserId = JSON.parse(currentUser).id;
    console.log("user id: " + parsedUserId);
    const storedToken = localStorage.getItem("authToken");
    console.log("stored token is: " + storedToken);

    const apiUrl = "http://localhost:8000/api/post/";
    const formData = new FormData();
    formData.append("title", title);
    formData.append("text_body", textBody);
    formData.append("image", file);
    formData.append("tags", JSON.stringify(tags));
    if (parsedUserId) {
      formData.append("author", parsedUserId);
    } else {
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
        setTags([]);
      } else {
        console.error("Error creating post:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    }
  };

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

        <label htmlFor="text_body" className="add-label">
          Write your post here:
        </label>
        <ReactQuill
          value={textBody}
          onChange={(value) => {
            setTextBody(value);
          }}
          className="react-quill"
        />

        <div className="meta">
          <input
            type="file"
            id="file"
            name="image"
            accept="image/jpeg,image/png,image/gif"
            style={{
              height: "40px",
              width: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "start",
              padding: "5px",
              marginTop: "20px",
              border: "none",
            }}
            alt=""
            onChange={handleFileChange}
          />

          {file && (
            <img
              src={filePreview}
              style={{ height: "300px", width: "600px", marginBottom: "10px" }}
            />
          )}
          {tags !== undefined && <Tags2 />}
        </div>

        <button className="button" type="submit">
          Submit
        </button>
        {
          <p>
            <p>Chosen tags: </p>
            <p>{tagsMap}</p>
          </p>
        }
      </form>
    </div>
  );
};

export default Add;
