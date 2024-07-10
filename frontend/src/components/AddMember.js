import React, { useState } from "react";
import axios from "axios";

const AddMember = () => {
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/family", {
      name,
      parent_id: parentId,
    });
    setName("");
    setParentId("");
  };

  return (
    <div>
      <h2>Add Family Member</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Parent ID:
          <input
            type="text"
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Add Member</button>
      </form>
    </div>
  );
};

export default AddMember;
