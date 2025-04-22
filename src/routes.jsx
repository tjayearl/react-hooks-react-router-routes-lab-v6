// src/routes.jsx
import Home from "./pages/Home";
import Actors from "./pages/Actors";
import Directors from "./pages/Directors";
import Movie from "./pages/Movie";
import NotFound from "./pages/NotFound";

const routes = [
  {
    path: "/",
    element: <Home />,
    // You could add an errorElement here for route-level errors
    // errorElement: <ErrorPage />,
  },
  {
    path: "/actors",
    element: <Actors />,
  },
  {
    path: "/directors",
    element: <Directors />,
  },
  {
    // Correct path for movie details
    path: "/movies/:id",
    element: <Movie />,
  },
  {
    path: "*", // Catch-all for unmatched routes
    element: <NotFound />,
  },
];

export default routes;
