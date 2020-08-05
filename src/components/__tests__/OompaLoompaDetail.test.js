import React from "react";
import { render } from "@testing-library/react";
import OompaLoompaDetail from "../OompaLoompaDetail";

it("renders detail view component (OompaLoompaDetail)", () => {
  const { getByTestId } = render(<OompaLoompaDetail id={1} />);
  expect(getByTestId("details-1")).toBeInTheDocument();
});

it("renders OompaLoompaDetail with props", () => {
  const { getByTestId } = render(
    <OompaLoompaDetail
      id="1"
      first_name="John"
      last_name="Doe"
      gender="M"
      profession="UnitTester"
      image="https://via.placeholder.com/150"
      description="some description"
    />
  );
  expect(getByTestId("details-1")).toHaveTextContent(/John Doe/i);
  expect(getByTestId("details-1")).toHaveTextContent(/Man/i);
  expect(getByTestId("details-1")).toHaveTextContent(/UnitTester/i);
  expect(getByTestId("details-1")).toHaveTextContent(/some description/i);
  expect(
    getByTestId("details-1").getElementsByTagName("img")[0]
  ).toHaveAttribute("src", "https://via.placeholder.com/150");
});
