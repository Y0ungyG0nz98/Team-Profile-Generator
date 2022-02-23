const { describe, it, expect } = require("@jest/globals");
const Employee = require("../lib/employee");
const Intern = require("../lib/intern");
const Manager = require("../lib/manager");

describe("testing intern", () => {
  test("should be an Employee instance", () => {
    let manager = new Manager("some intern", "intern@email.com", "basic school");

    expect(manager instanceof Employee).toBeTruthy();

    expect(manager.getRole() !== null).toBeTruthy()
    expect(typeof manager.getRole()).toBe('string')
  });
});
