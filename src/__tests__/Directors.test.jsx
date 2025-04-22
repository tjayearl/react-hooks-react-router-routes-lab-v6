// src/__tests__/Directors.test.jsx
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Directors from "../pages/Directors"; // Import the REAL Directors component
import { beforeEach, expect, test } from "vitest";

// Mock fetch
const mockDirectorsData = [
  { id: 1, name: "Mock Director Alpha" },
  { id: 2, name: "Mock Director Beta" },
];

'global'.fetch = 'jest'.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockDirectorsData),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

test("renders Directors heading and fetches/displays director names", async () => {
  render(
    <MemoryRouter> {/* Needed for NavBar */}
      <Directors />
    </MemoryRouter>
  );

  // Check for the heading from src/pages/Directors.jsx
 expect(screen.getByRole('heading', { name: /Directors/i, level: 1 })).toBeInTheDocument();

  // Verify fetch
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith("/api/directors");

  // Wait for directors' names
  expect(await screen.findByText("Mock Director Alpha")).toBeInTheDocument();
  expect(await screen.findByText("Mock Director Beta")).toBeInTheDocument();
});

 test("handles fetch error", async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error("API failure")));

    render(
        <MemoryRouter>
            <Directors />
        </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Directors/i, level: 1 })).toBeInTheDocument();
    expect(screen.queryByText("Mock Director Alpha")).not.toBeInTheDocument();
    // Add checks for error handling if implemented
});
