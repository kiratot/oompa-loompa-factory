import React from "react";
import { render, cleanup } from "@testing-library/react";
import Heading from "../Heading";

it("renders Heading without crashing", () => {
  const { getByTestId } = render(<Heading />);
  expect(getByTestId("heading")).toBeInTheDocument();
});
