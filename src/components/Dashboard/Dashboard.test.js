import React from "react";
import { render } from "@testing-library/react";
import Dashboard from "./Dashboard";

it("has a Dashboard component", () => {
  const { getByText } = render(<Dashboard />);
  expect(getByText("Dashboard")).toBeInTheDocument();
});
