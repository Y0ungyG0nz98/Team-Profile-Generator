const Employee = require("./employee");

class Intern extends Employee {
  constructor(name, email, school) {
    super(name, email);

    this.school = school;
  }

  getSchool() {
    return this.school;
  }

  getRole() {
    return "Intern";
  }
}

let some_intern = new Intern();

module.exports = Intern;
