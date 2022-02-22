const { describe, it, expect } = require("@jest/globals");
const Employee = require("../lib/employee");
const Intern = require("../lib/intern");

describe("testing intern", () => {
    let intern = new Intern("some intern", "intern@email.com", "basic school");
  test("should be an Employee instance", () => {

    expect(intern instanceof Employee).toBeTruthy();
  });


  test('should validate getSchool', () => {
      let testValue = 'string'
      expect(typeof intern.getSchool() !== testValue ).toBeFalsy()

      expect(typeof intern.getSchool()).toBe(testValue)
  });


});
