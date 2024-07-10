import React, { useState, useEffect } from "react";
import axios from "axios";

const FamilyTree = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const response = await axios.get("http://localhost:5000/api/family");
      setMembers(response.data.data);
    };
    fetchMembers();
  }, []);

  const renderTree = (parentId) => {
    return members
      .filter((member) => member.parent_id === parentId)
      .map((member) => (
        <li key={member.id}>
          {member.name}
          <ul>{renderTree(member.id)}</ul>
        </li>
      ));
  };

  return (
    <div>
      <h2>Family Tree</h2>
      <ul>{renderTree(null)}</ul>
    </div>
  );
};

export default FamilyTree;
