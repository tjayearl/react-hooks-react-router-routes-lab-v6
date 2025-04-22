// src/__tests__/NavBar.test.jsx
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
// Import MemoryRouter to control the current route for testing NavLink active state
import { MemoryRouter } from "react-router-dom";
import NavBar from "../components/NavBar";
import { expect, test } from "vitest";

test('wraps content in a div with "navbar" class and role="navigation"', () => {
  // Render within MemoryRouter as NavBar contains NavLinks
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );
  // Check using the semantic role 'navigation'
  const navElement = screen.getByRole('navigation');
  expect(navElement).toBeInTheDocument();
  expect(navElement).toHaveClass('navbar');
  // Ensure it's a div (or appropriate element based on NavBar implementation)
  expect(navElement.tagName).toBe('DIV'); // Or NAV, etc. depending on NavBar.jsx
});

test("renders NavLinks with correct href attributes", () => {
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );

  const homeLink = screen.getByRole('link', { name: /Home/i });
  const actorsLink = screen.getByRole('link', { name: /Actors/i });
  const directorsLink = screen.getByRole('link', { name: /Directors/i });

  expect(homeLink).toBeInTheDocument();
  expect(homeLink).toHaveAttribute('href', '/');

  expect(actorsLink).toBeInTheDocument();
  expect(actorsLink).toHaveAttribute('href', '/actors');

  expect(directorsLink).toBeInTheDocument();
  expect(directorsLink).toHaveAttribute('href', '/directors');
});

test("applies 'active' class to Home NavLink when route is '/'", () => {
  render(
    // Set the initial route to '/'
    <MemoryRouter initialEntries={['/']}>
      <NavBar />
    </MemoryRouter>
  );

  const homeLink = screen.getByRole('link', { name: /Home/i });
  const actorsLink = screen.getByRole('link', { name: /Actors/i });

  // Home link should be active
  expect(homeLink).toHaveClass('active');
  // Other links should not be active
  expect(actorsLink).not.toHaveClass('active');
});

test("applies 'active' class to Actors NavLink when route is '/actors'", () => {
  render(
    // Set the initial route to '/actors'
    <MemoryRouter initialEntries={['/actors']}>
      <NavBar />
    </MemoryRouter>
  );

  const homeLink = screen.getByRole('link', { name: /Home/i });
  const actorsLink = screen.getByRole('link', { name: /Actors/i });

  // Actors link should be active
  expect(actorsLink).toHaveClass('active');
  // Other links should not be active
  expect(homeLink).not.toHaveClass('active');
});

test("applies 'active' class to Directors NavLink when route is '/directors'", () => {
  render(
    // Set the initial route to '/directors'
    <MemoryRouter initialEntries={['/directors']}>
      <NavBar />
    </MemoryRouter>
  );

  const homeLink = screen.getByRole('link', { name: /Home/i });
  const directorsLink = screen.getByRole('link', { name: /Directors/i });

  // Directors link should be active
  expect(directorsLink).toHaveClass('active');
  // Other links should not be active
  expect(homeLink).not.toHaveClass('active');
});
