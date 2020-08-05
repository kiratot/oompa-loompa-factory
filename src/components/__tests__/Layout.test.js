import React from "react";
import { render, cleanup } from "@testing-library/react";
import Layout from "../Layout";

afterEach(cleanup);

it("renders Layout without crashing", () => {
  const { getByTestId } = render(<Layout></Layout>);
  expect(getByTestId("layout")).toBeInTheDocument();
});

it("renders Layout with children prop 1", () => {
  const { getByTestId } = render(
    <Layout>
      <h3>rendering layout 1</h3>
    </Layout>
  );
  expect(getByTestId("layout")).toHaveTextContent("rendering layout 1");
});

it("render Layout with children prop 2", () => {
  const { getByTestId } = render(
    <Layout>
      <h2>rendering layout 2</h2>
    </Layout>
  );
  expect(getByTestId("layout")).toHaveTextContent("rendering layout 2");
});
