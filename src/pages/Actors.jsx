// src/pages/Actors.jsx
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

function Actors() {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    // Example fetch, you can replace with your own API
    fetch("/api/actors")
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => setActors(data))
      .catch(error => console.error("Failed to fetch actors:", error)); // Add error handling
  }, []);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h1>Actors</h1>
        {/* Render actor names */}
        {actors.map((actor) => (
          // Assuming API returns { id: ..., name: ... }
          <p key={actor.id}>{actor.name}</p>
        ))}
      </main>
    </>
  );
}

export default Actors;
