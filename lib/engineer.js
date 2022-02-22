const Employee = require("./employee");

class Engineer extends Employee {
  constructor( name, email, github) {
    super( name, email);
    this.github = github;
  }

  getGithub() {
    return this.github;
  }

  getRole() {
    return "Engineer";
  }
}

module.exports = Engineer;
