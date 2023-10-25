const fs = require("fs");

const path = require("path");
const userPath = path.join(__dirname, "users");
const countFirstFile = require("./utils/countFirstFile");

let filesList = [];
let usersList = [];
const filesDerictoty = fs.readdirSync(userPath);
filesDerictoty.forEach((file) => {
  const filePath = path.join(userPath, file);
  const users = fs.readFileSync(filePath, "utf-8");
  const usersArray = users.split("\n");
  filesList.push(usersArray);
  usersList = [...usersList, ...usersArray];
});

function uniqueValues(data) {
    const timeStart= performance.now();
  const uniq = [...new Set(data)];
  const timeEnd=performance.now();
  const totalTime=Math.round(timeEnd-timeStart)
  console.log(`The total execution time of the function uniqueValues code is ${totalTime} milliseconds (or ${totalTime/1000}seconds).`)
  return uniq.length;
}

function existInAllFiles(list) {
    const timeStart= performance.now();
  const counter = countFirstFile(list);

  let hitСounting = 0;
  const value = Object.values(counter);
  value.forEach((item) => {
    if (item === list.length) {
      hitСounting++;
    }
  });
  const timeEnd=performance.now();
  const totalTime=Math.round(timeEnd-timeStart)
  console.log(`The total execution time of the function existInAllFiles code is ${totalTime} milliseconds (or ${totalTime/1000}seconds).`)
  return hitСounting;
}

function existInAtleastTen(list) {
  const timeStart= performance.now();
  const counter = countFirstFile(list);

  let hitСounting = 0;
  const value = Object.values(counter);
  value.forEach((item) => {
    if (item >= 10) {
      hitСounting++;
    }
  });
  const timeEnd=performance.now();
  const totalTime=Math.round(timeEnd-timeStart)
  console.log(`The total execution time of the function existInAtleastTen code is ${totalTime} milliseconds (or ${totalTime/1000}seconds).`)
  return hitСounting;
}

console.log("Total number of unique names-", uniqueValues(usersList));
console.log("The total number of usernames that appear in all files -",existInAllFiles(filesList));
console.log("Total number of usernames that appear in at least 10 files -",existInAtleastTen(filesList));
