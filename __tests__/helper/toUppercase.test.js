import { toUppercase } from "../../helper/toUppercase";

describe("toUppercase", () => {
  it("if params is undefined then output value is null", () => {
    expect(toUppercase()).toBe(null);
  });

  it("if params is empty then output value is null", () => {
    expect(toUppercase("")).toBe(null);
  });

  it("if params is not empty then output value is uppercase", () => {
    expect(toUppercase("string")).toBe("STRING");
  });
});
