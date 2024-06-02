import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
/* import Swal from "sweetalert2"; */
import "./Posts.css";
import AuthContext from "../../context/AuthContext";

const Posts = ({ fetchedPosts, setFetchedPosts }) => {
  const { isLoggedIn } = React.useContext(AuthContext);
  console.log("is logged in (posts)? " + isLoggedIn);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    const apiURL = "http://localhost:8000/api/post/";
    if (storedToken) {
      const fetchPosts = async () => {
        try {
          const response = await axios.get(apiURL, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });
          console.log("fetched posts are: " + JSON.stringify(response.data));
          setFetchedPosts(response.data);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      };
      fetchPosts();
      // Poll the server every 5 seconds (adjust as needed)
      const intervalId = setInterval(fetchPosts, 60000);

      return () => {
        clearInterval(intervalId); // Clean up the interval on component unmount
      };
    }
  }, [setFetchedPosts]);

  return (
    <div className="posts-container">
      <ul>
        {isLoggedIn ? (
          fetchedPosts.map((post) => (
            <Link className="link" key={post.id} to={`/postdetail/${post.id}`}>
              <li className="posts-li">
                <img src={post.image} alt="" />
                <div className="post-inside-li">
                  <p className="post-date">
                    {new Date(post.pub_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="post-title">{post.title}</p>
                  <p className="body-post">{post.text_body.slice(0, 500)}</p>
                  <p>View more</p>
                  <div>{/* <p>category</p> */}</div>
                </div>
              </li>
            </Link>
          ))
        ) : (
          <h2> Sign in to see your posts </h2>
        )}
      </ul>
    </div>
  );
};

export default Posts;
