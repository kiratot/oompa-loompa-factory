import React from "react";
import {
  render,
  waitForElement,
  getByTestId,
  fireEvent,
} from "@testing-library/react";
import OompaLoompa from "../OompaLoompa";
import { BrowserRouter as Router, MemoryRouter, Route } from "react-router-dom";
import OompaLoompaDetail from "../OompaLoompaDetail";

it("renders OompaLoompa without crashing", () => {
  const { getByTestId } = render(
    <Router>
      <OompaLoompa />
    </Router>
  );
  expect(getByTestId("oompaloompa")).toBeInTheDocument();
});

it("render OompaLooompa with props", () => {
  const { getByTestId } = render(
    <Router>
      <OompaLoompa
        id="1"
        firstName="John"
        lastName="Doe"
        gender="M"
        profession="UnitTester"
        image="https://via.placeholder.com/150"
      />
    </Router>
  );
  expect(getByTestId("oompaloompa")).toHaveTextContent(/John Doe/i);
  expect(getByTestId("oompaloompa")).toHaveTextContent(/Man/i);
  expect(getByTestId("oompaloompa")).toHaveTextContent(/UnitTester/i);
  expect(
    getByTestId("oompaloompa").getElementsByTagName("img")[0]
  ).toHaveAttribute("src", "https://via.placeholder.com/150");
});
