let dayMap = new Map<string, string>([
    ["Mon", "Monday"],
    ["Tue", "Tueday"],
    ["Wed", "Wednesday"],
    ["Thur", "Thursday"],
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

export function setDate(dayElem: HTMLElement, monthElem: HTMLElement): void {
    const [dayText, month, dayNum]: string[] = new Date().toString().split(" ").slice(0, 3);
    const daySuffix: string = Number(dayNum) == 1
                              ? "st"
                              : Number(dayNum) == 2 
                              ? "nd"
                              : Number(dayNum) == 3
                              ? "rd"
                              : "th"
    dayElem.textContent = `${dayMap.get(dayText)}, ${dayNum}${daySuffix}`
    monthElem.textContent = `${monMap.get(month)}`
}