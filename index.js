const XLSX = require("xlsx");
const workbook = XLSX.readFile("schedules.xlsx");
const sheet_name_list = workbook.SheetNames;
const json = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
const array = json.map((item) => {
    Object.keys(item).forEach((key) => {
        if (item[key].includes(" - ")) {
            item[key] = item[key].split(" - ");
        }
    })
    return item;
});
const array1 = [].concat(...array);

const fs = require("fs");

fs.writeFileSync("schedules.json", JSON.stringify(array1));

const workbook2 = XLSX.readFile("source.xlsx");
const sheet_name_list2 = workbook2.SheetNames;
const json2 = XLSX.utils.sheet_to_json(workbook2.Sheets[sheet_name_list2[0]]);
const array2 = json2.map((item) => {
    let periods = Object.values(item);
    periods = periods.filter(
        (type) => isNaN(type) && type !== "Homeroom" && type !== "Lunch"
    );
    return periods;
});

fs.writeFileSync("source.json", JSON.stringify(array2.flat()));