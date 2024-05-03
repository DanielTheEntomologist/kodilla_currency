import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CurrencyForm from "./CurrencyForm";

afterEach(cleanup);

describe("Component CurrencyForm", () => {
  it("should render without crashing", () => {
    render(<CurrencyForm action={() => {}} />);
  });
  it("should run action callback on form submit", () => {
    const action = jest.fn();
    // render component
    render(<CurrencyForm action={action} />);

    // find “convert” button
    const submitButton = screen.getByText("Convert");

    // simulate user click on "convert" button
    userEvent.click(submitButton);

    // check if action callback was called once
    expect(action).toHaveBeenCalledTimes(1);
  });
  it("should run action callback with proper data on form submit", () => {
    const testCases = [
      { amount: "100", from: "PLN", to: "USD" },
      { amount: "20", from: "USD", to: "PLN" },
      { amount: "200", from: "PLN", to: "USD" },
      { amount: "345", from: "USD", to: "PLN" },
    ];
    const action = jest.fn();
    for (const testCase of testCases) {
      const { amount, from, to } = testCase;
      const amountExpected = parseInt(amount);
      // render component
      render(<CurrencyForm action={action} />);

      // find “convert” button
      const submitButton = screen.getByText("Convert");

      const amountField = screen.getByTestId("amount");
      const currencyFromField = screen.getByTestId("currency-from");
      const currencyToField = screen.getByTestId("currency-to");

      // simulate user input
      userEvent.type(amountField, amount);
      userEvent.selectOptions(currencyFromField, from);
      userEvent.selectOptions(currencyToField, to);

      // simulate user click on "convert" button
      userEvent.click(submitButton);

      // check if action callback was called once
      expect(action).toHaveBeenCalledWith({ amount: amountExpected, from, to });
      cleanup();
    }
  });

  it("should run action callback with proper data on form resubmit", () => {
    const testCases = [
      { amount: "100", from: "PLN", to: "USD" },
      { amount: "20", from: "USD", to: "PLN" },
      { amount: "200", from: "PLN", to: "USD" },
      { amount: "345", from: "USD", to: "PLN" },
    ];
    const action = jest.fn();

    // render component
    render(<CurrencyForm action={action} />);

    for (const testCase of testCases) {
      const { amount, from, to } = testCase;
      const amountExpected = parseInt(amount);

      // find “convert” button
      const submitButton = screen.getByText("Convert");

      const amountField = screen.getByTestId("amount");
      const currencyFromField = screen.getByTestId("currency-from");
      const currencyToField = screen.getByTestId("currency-to");

      // simulate user input
      userEvent.type(amountField, amount);
      userEvent.selectOptions(currencyFromField, from);
      userEvent.selectOptions(currencyToField, to);

      // simulate user click on "convert" button
      userEvent.click(submitButton);

      // check if action callback was called once
      expect(action).toHaveBeenCalledWith({
        amount: amountExpected,
        from: from,
        to: to,
      });
    }
  });
});
