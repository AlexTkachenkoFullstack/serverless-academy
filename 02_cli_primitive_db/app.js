const inquirer = require("inquirer");
const { addUser, listUsers, findUser } = require("./models/users");

const createUserDB = async () => {
  try {
    const nameAnswer = await inquirer.prompt([
      {
        type: "input",
        name: "userName",
        message: "Enter the user's name. To cancel press ENTER: ",
      },
    ]);
    const isUserInDB = await findUser(nameAnswer.userName);
    if (isUserInDB) {
      console.log("User with this name is already in the database");
      process.exit();
    }
    if (!nameAnswer.userName) {
      const searchAnswer = await inquirer.prompt([
        {
          type: "confirm",
          name: "findUser",
          message: "Would you to search user in DB?",
        },
      ]);
      if (!searchAnswer.findUser) {
        process.exit();
      }
      const allUsers = await listUsers();
      console.log(allUsers);
      const nameForSearch = await inquirer.prompt([
        {
          type: "input",
          name: "userName",
          message: "Enter user's name  you wanna find in DB: ",
        },
      ]);
      const user = await findUser(nameForSearch.userName);
      if (!user) {
        console.log(`User ${nameForSearch.userName} was not found`);
        process.exit();
      }
      console.log(`User ${nameForSearch.userName} was found\n`, user);
      process.exit();
    } else {
      const nextAnswers = await inquirer.prompt([
        {
          type: "list",
          name: "gender",
          message: "Choose your Gender.",
          choices: ["male", "female"],
        },
        {
          type: "number",
          name: "age",
          message: "Enter your age.",
        },
      ]);
      const userData = {
        userName: nameAnswer.userName,
        gender: nextAnswers.gender,
        age: nextAnswers.age,
      };
      addUser(userData);
      createUserDB();
    }
  } catch (error) {
    throw new Error(error);
  }
};

createUserDB();
