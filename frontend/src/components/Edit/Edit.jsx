import { React, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Edit/Edit.css";
import Category from "../Category/Category";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [textBody, setTextBody] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { post_id } = useParams();

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files) {
      const objectURL = URL.createObjectURL(e.target.files[0]);
      setFile(e.target.files[0]);
      setFilePreview(objectURL);
    }
  };

  useEffect(() => {
    const fetchedPostDetails = async () => {
      try {
        const storedToken = localStorage.getItem("authToken");
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${storedToken}`;
        const response = await axios.get(
          `http://localhost:8000/api/post/${post_id}/`
        );
        setTitle(response.data.title);
        setTextBody(response.data.text_body);
        setFile(response.data.file);
      } catch (error) {
        console.error(
          "Error fetching post details:",
          error.response ? error.response.data : error.message
        );
      }
    };
    fetchedPostDetails();
  }, [post_id]);

  const handleEdit = async (e) => {
    e.preventDefault(e);
    const bodyFormData = new FormData();
    bodyFormData.append("title", title);
    bodyFormData.append("text_body", textBody);
    bodyFormData.append("image", file);
    bodyFormData.append("category", selectedCategory);

    const storedToken = localStorage.getItem("authToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    try {
      const response = await axios.put(
        `http://localhost:8000/api/post/${post_id}/`,
        bodyFormData
      );
      console.log("post edited successfully", response);
      navigate(`/postDetail/${post_id}`);
    } catch (error) {
      console.error(
        "Error editing post:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="add-container">
      <h1 className="add-h1">Edit your Post:</h1>
      <form
        onSubmit={handleEdit}
        className="add-form"
        encType="multipart/form-data"
      >
        <label htmlFor="title" className="add-label">
          Change Title:
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
        <label htmlFor="file">Change image</label>
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
            src={filePreview}
            value={file}
            style={{ height: "300px", width: "600px", marginBottom: "10px" }}
          />
        )}

        <label htmlFor="text_body" className="add-label">
          Edit your post here:
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

        <Category setSelectedCategory={setSelectedCategory} />

        <button className="button" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default Edit;
