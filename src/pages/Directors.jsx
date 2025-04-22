// src/pages/Directors.jsx
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

function Directors() {
  const [directors, setDirectors] = useState([]);

  useEffect(() => {
    // Example fetch
    fetch("/api/directors")
      .then(res => {
         if (!res.ok) throw new Error('Network response was not ok');
         return res.json();
      })
      .then(data => setDirectors(data))
      .catch(error => console.error("Failed to fetch directors:", error)); // Add error handling
  }, []);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h1>Directors</h1>
        {/* Render director names */}
        {directors.map((director) => (
          // Assuming API returns { id: ..., name: ... }
          <p key={director.id}>{director.name}</p>
        ))}
      </main>
    </>
  );
}

export default Directors;
