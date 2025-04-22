// src/__tests__/Actors.test.jsx
/* eslint-env jest */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Actors from "../pages/Actors";
import { beforeEach, describe, expect, test } from "vitest";

// No global.fetch = ... here

describe("Actors Component Tests", () => { // Wrap in describe 
  const mockActorsData = [
    { id: 1, name: "Mock Actor One" },
    { id: 2, name: "Mock Actor Two" },
  ];

  beforeEach(() => {
    // Restore mocks before each test in this suite
    'jest'.restoreAllMocks();
  });

  test("renders Actors heading and fetches/displays actor names", async () => {
    // Mock fetch specifically for this test
    'jest'.spyOn('global', 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockActorsData,
    });

    render(
      <MemoryRouter>
        <Actors />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Actors/i, level: 1 })).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("/api/actors");
    expect(await screen.findByText("Mock Actor One")).toBeInTheDocument();
    expect(await screen.findByText("Mock Actor Two")).toBeInTheDocument();
  });

  test("handles fetch error", async () => {
    // Mock fetch to reject for this test
    'jest'.spyOn('global', 'fetch').mockRejectedValueOnce(new Error("API is down"));

    render(
      <MemoryRouter>
        <Actors />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Actors/i, level: 1 })).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(1); // Still called once
    expect(fetch).toHaveBeenCalledWith("/api/actors");
    expect(screen.queryByText("Mock Actor One")).not.toBeInTheDocument();
    // Add assertion for error display if Actors.jsx implements it
  });
});
