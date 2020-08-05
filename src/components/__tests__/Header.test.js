import React from "react";
import { render, cleanup } from "@testing-library/react";
import Header from "../Header";
import { BrowserRouter as Router } from "react-router-dom";

it("renders Header without crashing", () => {
  const { getByTestId } = render(
    <Router>
      <Header />
    </Router>
  );
  expect(getByTestId("header")).toBeInTheDocument();
  cleanup();
});
