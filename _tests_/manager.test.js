const { describe, it, expect } = require("@jest/globals");
const Employee = require("../lib/employee");
const Intern = require("../lib/intern");

describe("testing intern", () => {
  test("should be an Employee instance", () => {
    let intern = new Intern("some intern", "intern@email.com", "basic school");

    expect(intern instanceof Employee).toBeTruthy();
  });
});
