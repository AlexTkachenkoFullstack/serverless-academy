const fs = require("fs/promises");
const path = require("path");
const usersPath = path.join(__dirname, "..", "users.txt");

const listUsers = async () => {
  const allUsers = await fs.readFile(usersPath, "utf-8");
  const users = allUsers.split("\n");
  const usersObjects = users
    .filter((item) => item.trim() !== "")
    .map((item) => JSON.parse(item));
  return usersObjects;
};

const findUser = async (userName) => {
  const allUsers = await listUsers();
  return allUsers.find( (user) => user.userName.toLowerCase() === userName.toLowerCase());
};

const addUser = async (user) => {
  await fs.appendFile(usersPath, JSON.stringify(user) + "\n");
};

module.exports = {
  listUsers,
  addUser,
  findUser,
};
