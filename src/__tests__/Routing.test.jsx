// src/__tests__/Routing.test.jsx
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import routes from "../routes"; // Import the actual routes
import { beforeEach, describe, expect, test } from "vitest";

// Mock fetch globally for all tests in this file if components fetch on render
// Adjust mock data as needed for specific route tests if necessary
'global'.fetch = 'jest'.fn(() =>
  Promise.resolve({
    ok: true, // Ensure ok is true for successful responses
    json: () => Promise.resolve([]), // Default empty array for list pages
  })
);

beforeEach(() => {
  fetch.mockClear(); // Reset mock before each test
});


describe("Routing", () => {
  test('renders the Home component on route "/"', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });
    render(<RouterProvider router={router} />);
    // Match the ACTUAL src/pages/Home.jsx H1 text
    expect(screen.getByText(/Welcome to the Movie App!/i)).toBeInTheDocument();
  });

  test('renders the Actors component on route "/actors"', async () => { // Made async
    const router = createMemoryRouter(routes, {
      initialEntries: ['/actors']
    });
    render(<RouterProvider router={router}/>);
    // Match the ACTUAL src/pages/Actors.jsx H1 text
    // Use findByRole for potentially async rendering after fetch
    expect(await screen.findByRole('heading', { name: /^Actors$/i, level: 1 })).toBeInTheDocument();
  });

  test('renders the Directors component on route "/directors"', async () => { // Made async
    const router = createMemoryRouter(routes, {
      initialEntries: ['/directors']
    });
    render(<RouterProvider router={router}/>);
    // Match the ACTUAL src/pages/Directors.jsx H1 text
    expect(await screen.findByRole('heading', { name: /^Directors$/i, level: 1 })).toBeInTheDocument();
  });

  test("renders the NotFound component when given a bad URL", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/some-non-existent-route"]
    });
    render(<RouterProvider router={router} />);
    // This assertion is correct as src/pages/NotFound.jsx renders this text
    expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
  });

  // You can keep the specific movie route test here or in index.test.jsx
  test('renders the Movie component on route "/movies/:id"', async () => {
      const movieId = 5; // Example ID
      const mockMovieData = { id: movieId, title: "Mock Movie Title", description: "Mock Desc" };

      // Reset fetch mock specifically for this test
      fetch.mockImplementationOnce((url) => {
          if (url === `/api/movies/${movieId}`) {
              return Promise.resolve({
                  ok: true,
                  json: () => Promise.resolve(mockMovieData),
              });
          }
          return Promise.resolve({ ok: false, json: () => Promise.resolve({}) }); // Default fail
      });


      const router = createMemoryRouter(routes, {
          initialEntries: [`/movies/${movieId}`]
      });

      render(<RouterProvider router={router} />);

      // Wait for the title from the mocked data
      expect(await screen.findByText(mockMovieData.title)).toBeInTheDocument();
      expect(screen.getByText(mockMovieData.description)).toBeInTheDocument();
      expect(fetch).toHaveBeenCalledWith(`/api/movies/${movieId}`);
  });
});
