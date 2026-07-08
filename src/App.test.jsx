import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders navigation links", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("Spacecrafts")).toBeInTheDocument();
  expect(screen.getByText("Planets")).toBeInTheDocument();
});
