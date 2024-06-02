import React, { useState, useEffect } from "react";
import { useParams, link, Link } from "react-router-dom";
import axios from "axios";
import "./PostDetail.css";

const PostDetail = () => {
  const { post_id } = useParams();
  const [post, setPost] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;

    const storedPosts = localStorage.getItem("post_details");
    setPost(storedPosts);
    axios
      .get(`http://localhost:8000/api/post/${post_id}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        setPost(response.data);
        localStorage.setItem("post_details", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [post_id]);

  if (!post) {
    return (
      <div className="post-detail-container">
        <p>Loading...</p>
      </div>
    );
  }

  const renderTextWithParagraphs = (text) => {
    if (!text) return null;
    return text.split("\n").map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ));
  };

  return (
    <div className="post-detail-container">
      <h1 className="detail-title">{post.title}</h1>
      <Link to={`/edit/${post_id}`}>Edit post</Link>
      <div className="detail-body">{renderTextWithParagraphs(post.text_body)}</div>
    </div>
  );
};

export default PostDetail;
