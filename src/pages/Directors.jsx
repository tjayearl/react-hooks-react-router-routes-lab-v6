import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

function Directors() {
  const [directors, setDirectors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/directors")
      .then(r => r.json())
      .then(setDirectors);
  }, []);

  return (
    <>
      <NavBar />
      <h1>Directors Page</h1>
      {directors.map((director, index) => (
        <article key={index}>
          <h2>{director.name}</h2>
          <ul>
            {director.movies.map((title, i) => (
              <li key={i}>{title}</li>
            ))}
          </ul>
        </article>
      ))}
    </>
  );
}

export default Directors;
