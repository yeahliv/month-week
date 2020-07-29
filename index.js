class Month {

  constructor(year, month) {
    this.today = year || month ? new Date(year, month) : new Date()
    this.year = year ? year : this.today.getFullYear()
    this.month = month ? month : this.today.getMonth() + 1
  }

  checkSunday(num) {
    return num === 0 ? 7 : num
  }

  curMonthFirstDate() {
    return new Date(this.year, this.month - 1, 1)
  }

  curMonthFirstDay() {
    return this.checkSunday(this.curMonthFirstDate().getDay())
  }

  curMonthLastDate() {
    return new Date(this.year, this.month, 0)
  }

  lastMonthLastDate() {
    return new Date(this.year, this.month - 1, 0)
  }

  preMonthDayCount() {
    return this.curMonthFirstDay() - 1
  }

  getMonth() {
    let res = []
    for (let i = 0; i < 7 * 6; i++) {
      let count = (i + 1) - this.preMonthDayCount()
      let year = this.year
      let month = this.month
      let date = count
      let day
      let currentMonth = false

      if (date <= 0) {
        month = this.month - 1
        date = this.lastMonthLastDate().getDate() + date

      } else if (date > this.curMonthLastDate().getDate()) {
        month = month + 1
        date = date - this.curMonthLastDate().getDate()

      } else {
        currentMonth = true
      }

      if (month === 0) {
        month = 12
        year -= 1
      }

      if (month === 13) {
        month = 1
        year += 1
      }

      day = new Date(year, month - 1, date).getDay()

      res.push({
        year,
        month,
        date,
        day,
        index: count,
        currentMonth,
        _year: `${year}`,
        _month: month < 10 ? `0${month}` : `${month}`,
        _date: date < 10 ? `0${date}` : `${date}`
      })
    }

    return res
  }

  lastMonth() {
    this.month = (this.month - 1) === 0 ? 12 : (this.month - 1)
    this.year = (this.month === 12) ? this.year - 1 : this.year
    return this.getMonth()
  }

  nextMonth() {
    this.month = (this.month + 1) === 12 ? 1 : (this.month + 1)
    this.year = (this.month === 1) ? this.year + 1 : this.year
    return this.getMonth()
  }

  resetMonth() {
    this.year = this.today.getFullYear()
    this.month = this.today.getMonth() + 1
    return this.getMonth()
  }
}

class Week {

  constructor(year, month, date) {
    this.today = new Date()

    if (!year || !month || !date) {
      this.time = new Date()
    } else {
      this.time = new Date(year, month - 1, date)
    }
  }

  day() {
    return this.time.getDay() === 0 ? 7 : this.time.getDay()
  }

  // Is it today
  isToday(time) {
    let year = this.today.getFullYear()
    let month = this.today.getMonth()
    let date = this.today.getDate()
    let _year = time.getFullYear()
    let _month = time.getMonth()
    let _date = time.getDate()
    return year == _year && month == _month && date == _date ? true : false
  }

  monday() {
    return new Date(this.time - (this.day() - 1) * 86400000)
  }

  monLastDay() {
    return new Date(this.monday() - 86400000)
  }

  sunday() {
    return new Date((this.monday() / 1000 + 6 * 86400) * 1000)
  }

  sunNextDay() {
    return new Date((this.sunday() / 1000 + 86400) * 1000)
  }

  week() {
    let res = []
    for (let i = 0; i < 7; i++) {
      let date = new Date(this.sunday() - (6 - i) * 86400000)
      res.push({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate(),
        day: date.getDay() === 0 ? 7 : date.getDay(),
        _year: `${date.getFullYear()}`,
        _month:
          date.getMonth() + 1 < 10
            ? `0${date.getMonth() + 1}`
            : `${date.getMonth() + 1}`,
        _date: date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`,
        isToday: this.isToday(date)
      })
    }
    return res
  }

  lastWeek() {
    this.time = this.monLastDay()
    return this.week()
  }

  nextWeek() {
    this.time = this.sunNextDay()
    return this.week()
  }

  reset(year, month, date) {
    if (!year || !month || !date) {
      this.time = new Date()
    } else {
      this.time = new Date(year, month - 1, date)
    }
    return this.week()
  }
}

export default {
  Month,
  Week
}
