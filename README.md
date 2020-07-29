# month-week
A tool for generating monthly and weekly data

## Install
```bash
npm install month-week --save
```

## Use
```javascript
import {Month, Week} from 'month-week'

const month = new Month()
const week = new Month()

month.today // Today
month.year // Year
month.month // month
month.curMonthFirstDate() // Return current month first day instance of Date Object
month.curMonthFirstDay() // Return current month first day
month.curMonthLastDate() // Return current month last day instance of Date Object
month.lastMonthLastDate() // Return last month last day instance of Date Object
month.preMonthDayCount() // Return last month day count
month.getMonth() // Return current month data
month.lastMonth() // Return last month data
month.nextMonth() // Return next month data
month.resetMonth() // Reset and return current month data

week.today // Today
week.time // Current time
week.day() // Return day
week.isToday() // Check is today
week.monday() // Return monday instance of Date Object
week.monLastDay() // Return last sunday instance of Date Object
week.sunday() // Return sunday instance of Date Object
week.sunNextDay() // Return next monday instance of Date Object
week.week() // Return this week data
week.lastWeek() // Return last week data
week.nextWeek() // Return next week data
week.reset() // Reset and return this week data
```
