import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FamilyTree from "./components/FamilyTree";
import AddMember from "./components/AddMember";
import Search from "./components/Search";
import "bootstrap/dist/css/bootstrap.min.css";

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
