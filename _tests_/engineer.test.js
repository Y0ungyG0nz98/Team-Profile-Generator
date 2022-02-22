const { describe, it, expect, beforeEach } = require("@jest/globals");
const Employee = require("../lib/employee");
const Engineer = require("../lib/engineer");

describe("testing engineer", () => {

  let engineer = new Engineer(
    "some engineer",
    "engineer@email.com",
    "somelingk.github.com"
  );

  test("should be an Employee instance", () => {
    expect(engineer instanceof Employee).toBeTruthy();
  });


  //getGithub returns a string
  test("should test getGithub works", () => {

    expect(engineer.getGithub()).toBeDefined()
    expect(typeof engineer.getGithub() === 'number').toBeFalsy()
    expect(typeof engineer.getGithub() === 'string').toBeTruthy()
  });




});
