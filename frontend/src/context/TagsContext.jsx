import axios from "axios";
import { React, useEffect, useState, createContext } from "react";
import {Add} from '../components/Add/Add'

const TagsContext = createContext();

export const TagsProvider = ({ children }) => {
  const [retrievedTags, setRetrievedTags] = useState([]);
  const [tags, setTags] = useState([name]);
  const [name, setName] = useState("");
  

  useEffect(() => {
    const getTags = async () => {
      try {
        const storedToken = localStorage.getItem("authToken");
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${storedToken}`;
        const response = await axios.get("http://127.0.0.1:8000/api/tag/");
        setRetrievedTags(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTags();
  }, []);

  const handleCreateTag = async (event) => {
    if (event.key === "Enter" && name.trim()) {
      event.preventDefault();
      try {
        const storedToken = localStorage.getItem("authToken");
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${storedToken}`;
        const response = await axios.post("http://127.0.0.1:8000/api/tag/", {
          name: name,
        });
        setTags([...tags, response.data]);
        console.log("Tag created successfully");
        setName(""); // Clear the input field
      } catch (error) {
        console.log("error creating tag: " + error.message);
      }
    }
  };

  const handleAddExistingTag = (tag) => {
    setTags((prevTags) => {
      // Avoid adding duplicate tags
      if (prevTags.some((t) => t.id === tag.id)) return prevTags;
      return [...prevTags, tag];
    });
  };

  const removeTag = async (tag) => {
    try {
      const storedToken = localStorage.getItem("authToken");
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/tag/${tag.id}/`
      );
      setTags(tags.filter((ele) => ele.id !== tag.id));
      console.log("Tag deleted successfully");
    } catch (error) {
      console.log("error deleting tag: " + error.message);
    }
  };

  return (
    <TagsContext.Provider
      value={{
        tags,
        setTags,
        removeTag,
        retrievedTags,
        handleCreateTag,
        name,
        setName,
        handleAddExistingTag,
      }}
    >
          <Add/>
    </TagsContext.Provider>
  );
};

export default TagsContext;
