import {bootstrap} from 'angular2/platform/browser';
import {Component, Pipe} from 'angular2/core';
import {NgFor} from 'angular2/common';

@Pipe({ name: 'shortMonth' })
class ShortMonth {
  transform(input, args) {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][input]
  }
}

@Pipe({ name: 'month' })
class Month {
    transform(input, args) {
        return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][input]
    }
}

@Component({
  selector: 'app',
  pipes: [ShortMonth, Month],
  template: `
    <div>
      <div class="header">
        <div class="year">{{year}}</div>
        <div class="date">{{ month | shortMonth}} {{day}}</div>
      </div>
      <div class="body">
        <div class="monthyear">
          <div class="left" on-click="onLeft()"></div>
          <div class="content">{{month | month}} {{year}}</div>
          <div class="right" on-click="onRight()"></div>
        </div>
        <div class="days">
          <div class="week">
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>
          <div class="day">
            <div *ngFor="#day of allDays">{{day}}</div>
          </div>
        </div>
      </div>
    </div>
  `
})

export class App {
  constructor() {
    const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']


    this.__originDate = new Date()
    this.year = this.__originDate.getFullYear()

    this.month = this.__originDate.getMonth()

    this.day = this.__originDate.getDate()

    this.numWeek = this.__originDate.getDay()
    this.week = WEEK[this.numWeek]

    this.isLeapYear = (this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0

    this.allDays = this.__getAllDays()

  }

  __initData() {

  }

  __onClick() {
    this.allDays = this.__getAllDays()
  }

  onLeft() {
    if (this.month === 0) {
      this.month = 11
      this.year--
    } else {
      this.month--
    }
    
    this.__onClick()
  }

  onRight() {
      if (this.month === 11) {
          this.month = 0
          this.year++
      } else {
          this.month++
      }
    this.__onClick()
  }

  __getAllDays() {
    let EVERY_MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (this.isLeapYear) EVERY_MONTH_DAYS[1] = 29
    let MonthFirstDayWeek = new Date(this.year, this.month, 1).getDay()

    let days = []
    for (let i = 0; i < EVERY_MONTH_DAYS[this.month] + MonthFirstDayWeek; i++) {
      if (i < MonthFirstDayWeek) {
        days.push('')    
      } else {
        days.push(i + 1 - MonthFirstDayWeek)
      }
    }
    return days
  }
}

bootstrap(App);