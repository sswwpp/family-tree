import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

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
      <Form onSubmit={handleSearch}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Search by name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Search</Button>
      </Form>
      <ul>
        {results.map((member) => (
          <li key={member.id}>{member.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
