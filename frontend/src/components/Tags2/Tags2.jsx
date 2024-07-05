import { useContext } from "react";
import React from "react";
import TagsContext from "../../context/TagsContext";
import "./Tags2.css";

const Tags2 = () => {
  const {
    tags,
    name,
    setName,
    handleCreateTag,
    handleAddExistingTag,
    retrievedTags,
    removeTag,
  } = useContext(TagsContext);

  const handleRemoveTag = (tag) => () => {
    removeTag(tag);
  };

  return (
    <div className="tag-container">
      <ul className="saved-tags">
        Current saved tags:{" "}
        {retrievedTags.map((tag) => (
          <li className="tag-item" key={tag.id}>
            <span onClick={() => handleAddExistingTag(tag)}>{tag.name} </span>
            <i onClick={() => handleRemoveTag(tag)}>✖</i>
          </li>
        ))}
      </ul>
      <div className="add-tag">
        <ul className="ul-tag">
          {tags.map((tag) => (
            <li className="tag-item" key={tag.id}>
              <span>{tag.name}</span>
              <i onClick={handleRemoveTag(tag)}>✖</i>
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Press enter to add a tag"
          value={name}
          onKeyUp={handleCreateTag}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Tags2;
