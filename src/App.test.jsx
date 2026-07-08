import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import App from "./App";

test("renders navigation links", () => {
  render(<App />);

  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("Spacecrafts")).toBeInTheDocument();
  expect(screen.getByText("Planets")).toBeInTheDocument();
});
