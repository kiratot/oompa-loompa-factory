import Grid from "../Grid";
import React from "react";
import { render, cleanup } from "@testing-library/react";

afterEach(cleanup);

it("renders Grid without crashing", () => {
  const { getByTestId } = render(<Grid></Grid>);
  expect(getByTestId("grid")).toBeInTheDocument();
});

it("renders Grid with children prop 1", () => {
  const { getByTestId } = render(
    <Grid>
      <h2>testing grid 1</h2>
    </Grid>
  );
  expect(getByTestId("grid")).toHaveTextContent("testing grid 1");
});

it("renders Grid with children prop 2", () => {
  const { getByTestId } = render(
    <Grid>
      <h2>testing grid 2</h2>
    </Grid>
  );
  expect(getByTestId("grid")).toHaveTextContent("testing grid 2");
});
