// src/components/MovieCard.jsx
import { Link } from 'react-router-dom';

function MovieCard({ id, title }) {
  return (
    <article>
      <h2>{title}</h2>
      {/* Ensure the path matches your routes.jsx definition */}
      <Link to={`/movies/${id}`}>View Details</Link>
    </article>
  );
}

export default MovieCard;
