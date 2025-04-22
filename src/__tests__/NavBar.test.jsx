// src/__tests__/NavBar.test.jsx
import "@testing-library/jest-dom";
// React import is not needed for testing-library tests unless using React APIs directly
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "../components/NavBar";
import { beforeEach, expect, test } from "vitest";

let container;

beforeEach(() => {
  // Render the component within BrowserRouter for NavLink context
  // Store the container for querying the DOM structure if needed
  container = render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  ).container;
});

test('wraps content in a div with "navbar" class', () => {
  // Use container.querySelector for specific DOM structure checks
  expect(container.querySelector(".navbar")).toBeInTheDocument();
  // Or check if the element with the role 'navigation' exists (semantically better)
  expect(screen.getByRole('navigation')).toHaveClass('navbar');
});

test("renders a Home <NavLink> and checks active state on click", async () => {
  // Use screen.getByRole for accessibility and user-centric testing
  const homeLink = screen.getByRole('link', { name: /Home/i });

  expect(homeLink).toBeInTheDocument();
  expect(homeLink.tagName).toBe("A"); // NavLink renders as an <a> tag
  expect(homeLink).toHaveAttribute('href', '/'); // Check the target URL

  // Simulate user clicking the link
  fireEvent.click(homeLink);

  // Check if the 'active' class is applied after click (default NavLink behavior)
  // Note: In a real app, the route would change, triggering the active state.
  // BrowserRouter here doesn't change routes, so this tests the immediate class application
  // if NavLink applies it directly, or might need more setup for route-based active state.
  // For basic rendering and click simulation, this is okay.
  // If testing *actual* route change effect on 'active' class, need RouterProvider/MemoryRouter setup.
  expect(homeLink).toHaveClass("active");
});

test("renders an Actors <NavLink> and checks active state on click", async () => {
  const actorsLink = screen.getByRole('link', { name: /Actors/i });

  expect(actorsLink).toBeInTheDocument();
  expect(actorsLink.tagName).toBe("A");
  expect(actorsLink).toHaveAttribute('href', '/actors'); // Check the target URL

  fireEvent.click(actorsLink);

  expect(actorsLink).toHaveClass("active");
});

test("renders a Directors <NavLink> and checks active state on click", async () => {
  const directorsLink = screen.getByRole('link', { name: /Directors/i });

  expect(directorsLink).toBeInTheDocument();
  expect(directorsLink.tagName).toBe("A");
  expect(directorsLink).toHaveAttribute('href', '/directors'); // Check the target URL

  fireEvent.click(directorsLink);

  expect(directorsLink).toHaveClass("active");
});
