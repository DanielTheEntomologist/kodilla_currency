import ResultBox from "./ResultBox";

import { render, cleanup, screen } from "@testing-library/react";
// import { extend-expect } from "@testing-library/jest-dom";

afterEach(cleanup);

const testSingleCase = (testCase) => {
  const { from, to, amount, expected } = testCase;
  render(<ResultBox from={from} to={to} amount={amount} />);
  const element = screen.getByTestId("result-box");
  expect(element.textContent).toBe(expected);
};

describe("Component ResultBox", () => {
  it("should render without crashing", () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });
  it("should render proper info about conversion when PLN -> USD”.", () => {
    const testCases = [
      { from: "PLN", to: "USD", amount: 100, expected: "PLN 100.00 = $28.57" },
      { from: "PLN", to: "USD", amount: 15, expected: "PLN 15.00 = $4.29" },
      { from: "PLN", to: "USD", amount: 30, expected: "PLN 30.00 = $8.57" },
    ];

    for (const testCase of testCases) {
      testSingleCase(testCase);
      cleanup();
    }
  });
  it("should render proper info about conversion when USD -> PLN”.", () => {
    const testCases = [
      { from: "USD", to: "PLN", amount: 100, expected: "$100.00 = PLN 350.00" },
      { from: "USD", to: "PLN", amount: 11, expected: "$11.00 = PLN 38.50" },
      {
        from: "USD",
        to: "PLN",
        amount: 101.1,
        expected: "$101.10 = PLN 353.85",
      },
    ];
    for (const testCase of testCases) {
      testSingleCase(testCase);
      cleanup();
    }
  });
  it("should render proper info about conversion when PLN -> PLN”.", () => {
    const testCases = [
      {
        from: "PLN",
        to: "PLN",
        amount: 100,
        expected: "PLN 100.00 = PLN 100.00",
      },
      { from: "PLN", to: "PLN", amount: 10, expected: "PLN 10.00 = PLN 10.00" },
      { from: "PLN", to: "PLN", amount: 0, expected: "PLN 0.00 = PLN 0.00" },
    ];
    for (const testCase of testCases) {
      testSingleCase(testCase);
      cleanup();
    }
  });
  it("should render proper info about conversion when USD -> USD”.", () => {
    render(<ResultBox from="USD" to="USD" amount={100} />);
    const element = screen.getByTestId("result-box");
    expect(element.textContent).toBe("$100.00 = $100.00");
  });

  it("should render error message for negative values”.", () => {
    render(<ResultBox from="USD" to="USD" amount={-100} />);
    const element = screen.getByTestId("result-box");
    expect(element.textContent).toBe("Wrong amount!");
  });
});
