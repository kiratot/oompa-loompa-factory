import React from "react";
import {
  render,
  cleanup,
  getByTestId,
  fireEvent,
} from "@testing-library/react";
import SearchBar from "../SearchBar";

const setup = () => {
  const utils = render(<SearchBar />);
  const input = utils.getByLabelText("search-input");
  return {
    input,
    ...utils,
  };
};
it("renders SearchBar without crashing", () => {
  const { getByTestId } = setup();
  expect(getByTestId("searchbar")).toBeInTheDocument();
});

it("should work as a controlled input", () => {
  const { input } = setup();
  expect(input.value).toBe(""); //empty before
  fireEvent.change(input, { target: { value: "test" } });
  expect(input.value).toBe("test");
});
