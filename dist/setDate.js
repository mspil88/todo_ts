"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDate = void 0;
let dayMap = new Map([
    ["Mon", "Monday"],
    ["Tue", "Tueday"],
    ["Wed", "Wednesday"],
    ["Thu", "Thursday"],
    ["Fri", "Friday"],
    ["Sat", "Saturday"],
    ["Sun", "Sunday"],
]);
let monMap = new Map([
    ["Jan", "January"],
    ["Feb", "Febuary"],
    ["Mar", "March"],
    ["Apr", "April"],
    ["May", "May"],
    ["Jun", "June"],
    ["Jul", "July"],
    ["Aug", "August"],
    ["Sep", "September"],
    ["Oct", "October"],
    ["Nov", "November"],
    ["Dec", "December"],
]);
let prefixMap = new Map([
    ["1", "st"],
    ["2", "nd"],
    ["3", "rd"],
    ["21", "st"],
    ["22", "nd"],
    ["23", "rd"],
    ["31", "st"],
]);
function getDatePrefix(dayNumber) {
    const num = Number(dayNumber);
    if (prefixMap.has(dayNumber)) {
        return prefixMap.get(dayNumber);
    }
    return "th";
}
function setDate(dayElem, monthElem) {
    const [dayText, month, dayNum] = new Date().toString().split(" ").slice(0, 3);
    const daySuffix = getDatePrefix(dayNum);
    dayElem.textContent = `${dayMap.get(dayText)}, ${dayNum}${daySuffix}`;
    monthElem.textContent = `${monMap.get(month)}`;
}
exports.setDate = setDate;
