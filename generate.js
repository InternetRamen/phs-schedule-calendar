const nodeXLSX = require("node-xlsx");

const data = [["Subject", "Start Date", "Start Time", "End Time"]];

const source = require("./source.json");
const w = require("./schedules.json");
function addYearToMDD(date) {
    date = date.split("/");
    if (parseInt(date[0]) >= 8) {
        date.push("2022");
    } else {
        date.push("2023");
    }
    return date.join("/");
}
function addAMorPM(time) {
    if (parseInt(time.split(":")[0]) < 6 || parseInt(time.split(":")[0]) == 12) {
        return time + " PM";
    } else {
        return time + " AM";
    }
}

source.forEach((item) => {
    if (item.includes("FT") || item.includes("Adv.")) {
        let itemArr = item.split(" - ");

        let sched = w.find((obj) => obj.FalconTime == itemArr[1].split("\n")[0]);
                
        if (sched) {
            Object.entries(sched).forEach((doarr) => {
                if (Array.isArray(doarr[1])) {
                    if (doarr[0] == "Period 8") return;
                    data.push([
                        doarr[0],
                        addYearToMDD(itemArr[0]),
                        addAMorPM(doarr[1][0]),
                        addAMorPM(doarr[1][1]),
                    ]);
                    console.log([
                        doarr[0],
                        addYearToMDD(itemArr[0]),
                        addAMorPM(doarr[1][0]),
                        addAMorPM(doarr[1][1]),
                    ]);
                }
            });
        }
    }
});

const buffer = nodeXLSX.build([{ name: "Sheet1", data: data }]);
const fs = require("fs");
fs.writeFileSync("output.xlsx", buffer);