import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddMember from "./components/AddMember";
import FamilyTree from "./components/FamilyTree";
import Search from "./components/Search";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<FamilyTree />} />
          <Route path="/add" element={<AddMember />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
