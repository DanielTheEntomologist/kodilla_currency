import { convertPLNToUSD } from "./../convertPLNToUSD";

describe("ConvertPLNtoUSD", () => {
  it("should return proper value when good input", () => {
    expect(convertPLNToUSD(1)).toBe("$0.29");
    expect(convertPLNToUSD(2)).toBe("$0.57");
    expect(convertPLNToUSD(20)).toBe("$5.71");
    expect(convertPLNToUSD(12)).toBe("$3.43");
  });
});

// Sprawdzić, czy dla argumentów w formacie tekstowym, funkcja zwróci NaN.
describe("ConvertPLNtoUSD", () => {
  it("should return NaN for string input", () => {
    expect(convertPLNToUSD("1")).toBeNaN();
    expect(convertPLNToUSD("")).toBeNaN();
    expect(convertPLNToUSD("1.1")).toBeNaN();
    expect(convertPLNToUSD("word")).toBeNaN();
    expect(convertPLNToUSD("word")).toBeNaN();
  });
});

// Sprawdzić dla kilku wartości, czy dla dobrych inputów zwróci dobry wynik w dobrym formacie.

// Sprawdzić, czy dla argumentów, które nie są tekstem ani liczbą, funkcja wyrzuci błąd.
describe("ConvertPLNtoUSD", () => {
  it("for nonstring nonnumber arguments should return 'Error'", () => {
    expect(convertPLNToUSD(Object)).toBe("Error");
    expect(convertPLNToUSD([])).toBe("Error");
    expect(convertPLNToUSD({})).toBe("Error");
    expect(convertPLNToUSD(null)).toBe("Error");
    expect(convertPLNToUSD(true)).toBe("Error");
    expect(convertPLNToUSD(function () {})).toBe("Error");
  });
});

// Sprawdzić, czy dla argumentu liczbowego, ale mniejszego niż zero, funkcja zwróci “$0.00“.
describe("ConvertPLNtoUSD", () => {
  it("should return  “$0.00“ for number below 0", () => {
    expect(convertPLNToUSD(-1)).toBe("$0.00");
    expect(convertPLNToUSD(-0.0123)).toBe("$0.00");
    expect(convertPLNToUSD(-12)).toBe("$0.00");
    expect(convertPLNToUSD(-22)).toBe("$0.00");
  });
});

// Sprawdzić, czy brak argumentu spowoduje zwrócenie wartości NaN.
describe("ConvertPLNtoUSD", () => {
  it("should return NaN for no argument or undefined arg", () => {
    expect(convertPLNToUSD()).toBeNaN();
    expect(convertPLNToUSD(undefined)).toBeNaN();
  });
});
