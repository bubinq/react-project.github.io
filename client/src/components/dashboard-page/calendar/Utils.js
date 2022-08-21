import dayjs from 'dayjs'


//  Main logic for rendering current month view


export function displayMonth(month = dayjs().month()) {
    let year = dayjs().year()
    let firstDayOfMonth = dayjs(new Date(year, month, 1)).day();
    let firstWeekFirstDay = 0 - firstDayOfMonth;

    let calendar = new Array(6).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            firstWeekFirstDay++
            return dayjs(new Date(year, month, firstWeekFirstDay));
        })
    })

    return calendar
}