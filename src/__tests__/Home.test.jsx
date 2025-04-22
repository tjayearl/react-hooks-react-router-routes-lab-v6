// src/__tests__/Home.test.jsx
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home"; // Import the REAL Home component from pages

test("renders the Home component correctly", () => {
  render(
    // Need MemoryRouter because Home uses NavBar which has NavLinks
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  // Check for the text that src/pages/Home.jsx actually renders
  expect(screen.getByRole('heading', { name: /Welcome to the Movie App!/i, level: 1 })).toBeInTheDocument();
  expect(screen.getByText(/Select a section from above to explore./i)).toBeInTheDocument();
  // Check if NavBar content (like links) is present
  expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Actors/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Directors/i })).toBeInTheDocument();
});
