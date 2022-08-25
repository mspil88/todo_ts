let dayMap = new Map<string, string>([
    ["Mon", "Monday"],
    ["Tue", "Tueday"],
    ["Wed", "Wednesday"],
    ["Thu", "Thursday"],
    ["Fri", "Friday"],
    ["Sat", "Saturday"],
    ["Sun", "Sunday"],
])

let monMap = new Map<string, string>([
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
])

let prefixMap = new Map<string, string>([
    ["1", "st"],
    ["2", "nd"],
    ["3", "rd"],
    ["21", "st"],
    ["22", "nd"],
    ["23", "rd"],
    ["31", "st"],
])

function getDatePrefix(dayNumber:string): string {
    const num: number = Number(dayNumber);
    
    if(prefixMap.has(dayNumber)) {
        return prefixMap.get(dayNumber)
    }
    return "th"
}

export function setDate(dayElem: HTMLElement, monthElem: HTMLElement): void {
    const [dayText, month, dayNum]: string[] = new Date().toString().split(" ").slice(0, 3);
    const daySuffix = getDatePrefix(dayNum)
    dayElem.textContent = `${dayMap.get(dayText)}, ${dayNum}${daySuffix}`
    monthElem.textContent = `${monMap.get(month)}`
}