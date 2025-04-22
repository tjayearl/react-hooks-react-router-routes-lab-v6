// src/__tests__/index.test.jsx
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Movie from "../pages/Movie";
// Import vi from vitest for mocking
import { beforeEach, describe, expect, test, vi } from "vitest";

// Use describe block for better organization and scoping
describe("Movie Component Tests", () => {

  // Use beforeEach/afterEach within the describe block
  beforeEach(() => {
    // Reset mocks before each test in this suite
    // Use vi.restoreAllMocks() for Vitest
    vi.restoreAllMocks();
  });

  test("renders Movie component, fetches and displays movie details", async () => {
    const movieId = '123';
    const mockMovie = { id: movieId, title: "Test Movie Title", description: "Test movie description." };

    // Use vi.spyOn for mocking fetch specifically for this test suite
    vi.spyOn('global', 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockMovie, // Simulate successful JSON parsing
    });

    render(
      <MemoryRouter initialEntries={[`/movies/${movieId}`]}>
        <Routes>
          {/* Ensure the path matches your routes definition */}
          <Route path="/movies/:id" element={<Movie />} />
        </Routes>
      </MemoryRouter>
    );

    // Verify fetch was called correctly
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`/api/movies/${movieId}`);

    // Wait for the movie title and description to appear
    expect(await screen.findByRole('heading', { name: mockMovie.title, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(mockMovie.description)).toBeInTheDocument();
  });

  test("handles Movie component fetch error", async () => {
    const movieId = '404';
    // This is the specific error message our mock will generate
    const mockErrorMessage = "Movie fetch failed";

    // Mock fetch to reject for this specific test using vi.spyOn
    vi.spyOn('global', 'fetch').mockRejectedValueOnce(new Error(mockErrorMessage));

    render(
      <MemoryRouter initialEntries={[`/movies/${movieId}`]}>
        <Routes>
          <Route path="/movies/:id" element={<Movie />} />
        </Routes>
      </MemoryRouter>
    );

    // Verify fetch was called correctly
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`/api/movies/${movieId}`);

    // *** CORRECTED ASSERTION ***
    // Check for the error message rendered by the Movie component,
    // matching the message from the mocked error.
    // Assuming Movie component renders "Error: <error message>"
    expect(await screen.findByText(`Error: ${mockErrorMessage}`)).toBeInTheDocument();

    // Ensure movie details (like the H1 title) are not shown
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });
});
