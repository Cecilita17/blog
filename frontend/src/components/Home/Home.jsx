import React, { useState } from "react";
import Posts from "../Posts/Posts";
import Add from "../Add/Add";
import "./Home.css";
import Carousel from "../Carousel/Carousel";

function Home() {
  const [fetchedPosts, setFetchedPosts] = useState([]);
  return (
    <section className="section-container">
      <h1 className="home-title">My Diary-Blog </h1>
      
        <Carousel />
      <Posts fetchedPosts={fetchedPosts} setFetchedPosts={setFetchedPosts} />
      <Add />
    </section>
  );
}
export default Home;
