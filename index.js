const inquirer = require("inquirer");
const fs = require("fs");

const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");
const { option } = require("yargs");
const { Console } = require("console");

/**@type {Employee[]} */
let employees = [

  new Intern("Some intern", "intern@fake.com", "milwuakee"),
  
  new Intern("Some intern", "intern@fake.com", "milwuakee"),
  new Manager("Manuel", "mauel@manager.com", "22222994"),

 
  new Engineer("Manuel", "mauel@manager.com", "somehub.github.com"),
  new Manager("Manuel", "mauel@manager.com", "22222994"),

  new Manager("Manuel", "mauel@manager.com", "22222994"),
 
  new Engineer("Manuel", "mauel@manager.com", "somehub.github.com"),
  new Manager("Manuel", "mauel@manager.com", "22222994"),
  new Manager("Manuel", "mauel@manager.com", "22222994"),

 
];

/**
 *
 * @param {Employee} employee
 */
function addEmployee(employee) {
  employees.push(employee);
  console.log("%s added:", employee.getRole());
}

function printEmployees(employees) {
  employees.forEach((employee) => {
    console.log("Name: %s Role: %s\n", employee.getName(), employee.getRole());
  });
}

function empObjectToHtml(emp) {
  let github_or_shool_or_office_number;
  let github_or_shool_or_office_number__title;
  switch (emp.getRole()) {
    case "Manager":
      github_or_shool_or_office_number = emp.getOfficeNumber();
      github_or_shool_or_office_number__title = "Office Number";
      github_or_shool_or_office_number__img = "./Assets/coffee.png";
      break;

    case "Engineer":
      github_or_shool_or_office_number = emp.getGithub();
      github_or_shool_or_office_number__title = "Github";
      github_or_shool_or_office_number__img = "./Assets/glasses.png";
      break;
    case "Intern":
      github_or_shool_or_office_number = emp.getSchool();
      github_or_shool_or_office_number__title = "School";
      github_or_shool_or_office_number__img = "./Assets/student.png";
      break;
    default:
      break;
  }

  return `
  <div class="employee employee__card">
  <div class="employee__title">
    <h2 class="employee__name">${emp.getName()}</h2>
    <div class="employee__role">
      <img src="${github_or_shool_or_office_number__img}" alt="" class="employee__role_img"/>
      <h3 class="employee__role_text inline">${emp.getRole()}</h3>

    </div>
  </div>
  <ul  class="employee__attributes">
    <li class="id">ID:<span>${emp.getId()}</span></li>
    <li class="email"><a href="mailto://${emp.getEmail()}">Email:<span>${emp.getEmail()}</a></span></li>
    <li>${github_or_shool_or_office_number__title}:<a>${github_or_shool_or_office_number}</a></li>
  </ul>
 
</div>
  `;
}
/**
 *
 * @param {Employee[]} employees
 */
function generateHtml(employees) {
  let employees_html_text = employees
    .map(empObjectToHtml)
    .join("<!-- separator just for visual presence -->"); //convert each employee into a htmlText, join merges all the text together

  // load html template

  /**@type string */
  let html_template = fs.readFile(
    "./index.tpl.html",
    { encoding: "utf8" },
    function (err, data) {
      if (err) return console.log(err);

      console.log("data type %s", typeof data);
      let found = data.includes("EMPLOYEES_PLACE_HOLDER");

      console.log("found EMPLOYEES_PLACE_HOLDER: %s", found);

      let gerated_html_text = data.replace(
        /EMPLOYEES_PLACE_HOLDER/,
        employees_html_text
      );
      console.log(gerated_html_text);

      fs.writeFile(
        "./index.generated.html",
        gerated_html_text,
        {
          encoding: "utf8",
          flag: "w",
          mode: 0o666,
        },
        (err) => {
          if (err) console.log(err);
          else {
            console.log("File written successfully\n");
            console.log("The written has the following contents:");
            console.log(fs.readFileSync("movies.txt", "utf8"));
          }
        }
      );
    }
  );
}

async function askForField(field_name) {
  let result = await inquirer.prompt({
    name: field_name,
    message: `Enter a ${field_name}`,
  });

  if (!result[field_name].length) {
    console.log("Invalid response, try again\n");
    return askForField(field_name);
  }

  return result;
}

async function makeEmployee() {
  let response = await inquirer.prompt({
    name: "employee_type",
    message:
      "What employee do you want to make, Opts: \n1.Manager \n2.Engineer \n3.Intern \n4 Exit",
  });
  switch (response.employee_type) {
    case "1": {
      //make manager
      //ask for name,email, github
      let name = await askForField("name");
      let email = await askForField("email");
      let officeNumber = await askForField("officeNumber");

      addEmployee(new Manager(name, email, officeNumber));
      break;
    }

    case "2": {
      // make engineer
      //ask for name,email, github
      let name = await askForField("name");
      let email = await askForField("email");
      let github = await askForField("github");

      addEmployee(new Engineer(name, email, github));
      break;
    }
    case "3": {
      // make intern
      //ask for name,email, github
      let name = await askForField("name");
      let email = await askForField("email");
      let school = await askForField("school");

      addEmployee(new Engineer(name, email, school));
      break;
    }
    case "4": {
      //exit
      console.log("You have chosen toout of making an employee!");
      return;
      break;
    }
    default: {
      console.log("Invalid choice try again");
      return makeEmployee();
      break;
    }
  }

  return console.log("Creation complete");
}
// application starts
//print the count of employee types
// ask user for action, make employee or generate new employee html
// ask for type
//ask for inputs
// go back to first screen

async function startApplication() {
  console.log("starting application");

  let option = await inquirer
    .prompt({
      name: "option",
      message:
        "Welcome to the employee cli webpage generator.\n1. list all the current employees. \n2.Add a new employee \n3.Generate a new webpage for the current employees \n4. Exit\n\nwhat would you like to do ==>>?",
    })
    .then(({ option }) => option);

  console.log("type of option %s", typeof option, option);
  switch (option) {
    case "1":
      await printEmployees(employees);
      break;

    case "2":
      await makeEmployee();
      break;

    case "3":
      generateHtml(employees);
      break;

    case "4":
      console.log("You have chosen to exit, come back soon!");
      return;
      break;

    default:
      console.log("Invalid input, try again");
      break;
  }
  startApplication();
}

startApplication();
