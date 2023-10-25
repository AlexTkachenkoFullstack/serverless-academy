const fs = require("fs/promises");
const path = require("path");
const vacationsPath = path.join(__dirname, "data.json");

const groupVacations = async () => {
  const vacations = await fs.readFile(vacationsPath, "utf-8");
  const vacationsPasre = JSON.parse(vacations);
  const usersId = [...new Set(vacationsPasre.map((item) => item.user._id))];
  const newData = usersId.reduce((acc, item) => {
    const oldUserVacationInfo = vacationsPasre.filter(
      (user) => user.user._id === item
    );
    const userId = item;
    const userName = oldUserVacationInfo[0].user.name;
    const vacations = [
      ...oldUserVacationInfo.map((item) => {
        return { startDate: item.startDate, endDate: item.endDate };
      }),
    ].sort((a, b) => a.startDate.localeCompare(b.startDate));
    acc.push({ userId, userName, vacations });
    return acc;
  }, []);
  fs.writeFile(
    path.join(__dirname, "newData.json"),
    JSON.stringify(newData, null, 2)
  );
};

groupVacations();
