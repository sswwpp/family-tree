import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get("http://localhost:5000/api/family");
    const members = response.data.data.filter((member) =>
      member.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(members);
  };

  return (
    <div>
      <h2>Search Family Members</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {results.map((member) => (
          <li key={member.id}>{member.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
