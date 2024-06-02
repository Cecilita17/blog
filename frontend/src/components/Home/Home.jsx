import React, { useState } from "react";
import Posts from "../Posts/Posts";
import Add from "../Add/Add";
import "./Home.css";

import LastFive from "../LastFive/LastFive";
import About from "../About/About";
import Image from "react-bootstrap/Image";
import image2 from "../../image2.jpg";

function Home() {
  const [fetchedPosts, setFetchedPosts] = useState([]);

  return (
    <div className="section-container">
      <h1 className="home-title">My Diary-Blog</h1>
      <div className="carousel">
        <Image
          src={image2}
          rounded
          style={{ width: "90%", height: "500px" }}
        />
      </div>
      <div className="about">
        <About />
      </div>
      <div className="recent-posts">
        <LastFive />
      </div>
      <div className="posts">
        <Posts fetchedPosts={fetchedPosts} setFetchedPosts={setFetchedPosts} />
      </div>
      <div className="add">
        <Add />
      </div>
      {/* <div className="other">
        <p>Other content</p>
      </div> */}
    </div>
  );
}

export default Home;
