import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./LastFive.css";

const LastFive = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    const storedToken = localStorage.getItem("authToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    const response = await axios.get("http://localhost:8000/api/post/", {
      params: {
        ordering: "-pub_date",
        limit: 5,
      },
    });
    setPosts(response.data);
    setLoading(false);
    setImage(response.data.image);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (posts.length === 0) {
    return <h1>No posts yet</h1>;
  }

  return (
    <div className="recent-container">
      <h1 className="h1-recent">
        Recent posts  <span className="line"></span>
      </h1>
      <ul className="ul-recent">
        {posts.slice(-0, 5).map((post) => (
          <li key={post._id}>
            <Link to={`/posts/${post._id}`} className="last-item">
              <img src={post.image} alt={post.title} className="img-recent" />
              <div className="div-title-date">
                <p className="title-recent">{post.title}</p>
                <p className="post-date">{new Date(post.pub_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LastFive;
