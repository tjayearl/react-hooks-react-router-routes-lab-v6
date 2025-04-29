import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

function Actors() {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/actors")
      .then(r => r.json())
      .then(setActors);
  }, []);

  return (
    <>
      <NavBar />
      <h1>Actors Page</h1>
      {actors.map((actor, index) => (
        <article key={index}>
          <h2>{actor.name}</h2>
          <ul>
            {actor.movies.map((title, i) => (
              <li key={i}>{title}</li>
            ))}
          </ul>
        </article>
      ))}
    </>
  );
}

export default Actors;
