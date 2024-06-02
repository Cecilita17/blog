import axios from "axios";
import { React, useEffect, useState } from "react";
import "./Category.css";

const Category = ({ setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      try {
        const storedToken = localStorage.getItem("authToken");
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${storedToken}`;
        const response = await axios.get("http://127.0.0.1:8000/api/category/");
        setCategories(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  const handleCreateCategory = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      const response = await axios.post("http://127.0.0.1:8000/api/category/", {
        name: name,
        description: description,
      });
      console.log("category created successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value.id);
  };

  return (
    <div className="category-container">
      <label htmlFor="category">Select a category:</label>
      <select name="category" id="category" onChange={handleCategoryChange}>
        {categories.map((categoria) => (
          <option value={categoria.name}>{categoria.name}</option>
        ))}
        ;
      </select>
      <form onSubmit={handleCreateCategory} className="form-cat">
        <h2>Create new category:</h2>
        <label htmlFor="Name">New category name: </label>
        <input
          type="text"
          name="name"
          id="name"
          className="input-form-cat"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="description">Enter description:</label>
        <input
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

 export default Category;


/*import React, { useState, useContext } from "react";
import "./Add.css";
import AuthContext from "../../context/AuthContext";
import Category from "../Category/Category";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Add = () => {
  const [title, setTitle] = useState("");
  const [textBody, setTextBody] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { currentUser } = useContext(AuthContext);

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
    const storedToken = localStorage.getItem("authToken");

    const apiUrl = "http://localhost:8000/api/post/";
    const formData = new FormData();
    formData.append("title", title);
    formData.append("text_body", textBody);
    formData.append("image", file);
    formData.append("category", selectedCategory);
    formData.append("author", parsedUserId);

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
        setFilePreview(null);
        setSelectedCategory("");
      } else {
        console.error("Error creating post:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating post:", error.message);
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
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="text_body" className="add-label">
          Write your post here:
        </label>
        <ReactQuill
          value={textBody}
          onChange={setTextBody}
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
              padding: "5px",
              border: "none",
            }}
            alt=""
            onChange={handleFileChange}
          />

          {file && (
            <img
              src={filePreview}
              style={{ height: "300px", width: "600px", marginBottom: "10px" }}
              alt="Preview"
            />
          )}

          <Category setSelectedCategory={setSelectedCategory} />
        </div>

        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Add;
 */
