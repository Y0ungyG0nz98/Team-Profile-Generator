const makeId = require("./makeId");

class Employee {

  constructor(name, email) {
    this.id = makeId();
    this.name = name;
    this.email = email;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }

getRole() {
   return null;
  }
}

module.exports = Employee;
