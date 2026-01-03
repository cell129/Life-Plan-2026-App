import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

// Robust LocalStorage Mock
const localStorageMock = (function () {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key) => {
      delete store[key];
    },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("Life Plan App 2026", () => {
  beforeEach(() => {
    window.localStorage.clear();
    jest.clearAllMocks();
  });

  test("loads and renders the main vision tab by default", () => {
    render(<App />);
    const heading = screen.getByRole("heading", {
      name: /Vision & Power Goals/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Specific, Measurable/i)
    ).toBeInTheDocument();
  });

  test("progressive disclosure hides extra goals initially", () => {
    render(<App />);
    expect(screen.getByPlaceholderText("Power Goal #1")).toBeInTheDocument();
    expect(
      screen.queryByPlaceholderText("Power Goal #4")
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByText(/Show All 12/i));
    expect(screen.getByPlaceholderText("Power Goal #4")).toBeInTheDocument();
  });

  test("execution mode toggle switches views", () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Execution Mode/i));
    expect(screen.getByText(/Focus on today's actions/i)).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /Vision & Power Goals/i, level: 2 })
    ).not.toBeInTheDocument();
  });

  test("persistence: saves data to local storage", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Specific, Measurable/i);

    // Type into the North Star field
    fireEvent.change(input, { target: { value: "Become a React Expert" } });

    // Click Save
    fireEvent.click(screen.getByText("Save"));

    // Wait for the UI confirmation first
    await waitFor(() => {
      expect(
        screen.getByText(/Progress saved successfully/i)
      ).toBeInTheDocument();
    });

    // Directly check the mock store
    const storedString = window.localStorage.getItem("2026BlueprintData");
    expect(storedString).not.toBeNull(); // Ensure it exists

    const savedData = JSON.parse(storedString);
    expect(savedData.northStar).toBe("Become a React Expert");
  });

  test("progress bar updates when data is entered", async () => {
    render(<App />);

    const progressText = screen.getByText(/% Ready/i);
    const initialText = progressText.textContent;

    // CHANGE: Update TWO fields to ensure percentage jumps enough to change the rounded number
    const input1 = screen.getByPlaceholderText(/Specific, Measurable/i);
    fireEvent.change(input1, { target: { value: "Big Goal" } });

    const input2 = screen.getByPlaceholderText(/The one project that unlocks/i);
    fireEvent.change(input2, { target: { value: "Big Project" } });

    await waitFor(() => {
      const newText = screen.getByText(/% Ready/i).textContent;
      expect(newText).not.toBe(initialText);
    });
  });
});
