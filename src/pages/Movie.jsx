// src/pages/Movie.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null); // Add error state
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    setLoading(true); // Start loading
    setError(null); // Reset error
    fetch(`/api/movies/${id}`)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch movie ${id}`);
        return res.json();
        })
      .then(data => {
        setMovie(data);
        setLoading(false); // Stop loading on success
        })
      .catch(err => {
        console.error(err);
        setError(err.message); // Set error message
        setLoading(false); // Stop loading on error
      });
  }, [id]);

  if (loading) return <p>Loading...</p>; // Show loading state
  if (error) return <p>Error: {error}</p>; // Show error state
  if (!movie) return <p>Movie not found.</p>; // Handle case where movie is null after loading/error

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h1>{movie.title}</h1>
        <p>{movie.description}</p>
        {/* Add more movie details here if available */}
      </main>
    </>
  );
}

export default Movie;
