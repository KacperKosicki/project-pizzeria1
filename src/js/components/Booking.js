import { classNames, select, settings, templates } from '../settings.js';
import { utils } from '../utils.js';
import AmountWidget from './AmountWidget.js';
import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js';

class Booking {
  constructor(element) {
    const thisBooking = this;

    thisBooking.render(element);
    thisBooking.initWidgets();
    thisBooking.getData();
    this.selectedTable = null;
  }

  getData() {
    const thisBooking = this;

    const startDateParam = settings.db.dateStartParamKey + '=' + utils.dateToStr(thisBooking.datePicker.minDate);
    const endDateParam = settings.db.dateEndParamKey + '=' + utils.dateToStr(thisBooking.datePicker.maxDate);

    const params = {
      bookings: [
        startDateParam,
        endDateParam,
      ],
      eventsCurrent: [
        settings.db.notRepeatParam,
        startDateParam,
        endDateParam,
      ],
      eventsRepeat: [
        settings.db.repeatParam,
        endDateParam,
      ],
    };

    //console.log('getData params', params);

    const urls = {
      bookings:       settings.db.url + '/' + settings.db.bookings  + '?' + params.bookings.join('&'),
      eventsCurrent:  settings.db.url + '/' + settings.db.events    + '?' + params.eventsCurrent.join('&'),
      eventsRepeat:   settings.db.url + '/' + settings.db.events    + '?' + params.eventsRepeat.join('&'),
    };

    Promise.all([
      fetch(urls.bookings),
      fetch(urls.eventsCurrent),
      fetch(urls.eventsRepeat),
    ])
      .then(function(allResponses) {
        const bookingResponse = allResponses[0];
        const eventsCurrentResponse = allResponses[1];
        const eventsRepeatResponse = allResponses[2];
        return Promise.all([
          bookingResponse.json(),
          eventsCurrentResponse.json(),
          eventsRepeatResponse.json(),
        ]);
      })
      .then(function([bookings, eventsCurrent, eventsRepeat]) {
        thisBooking.parseData(bookings, eventsCurrent, eventsRepeat);
      })
      .catch(function(error) {
        console.log('Wystąpił błąd:', error);
      });
  }

  parseData(bookings, eventsCurrent, eventsRepeat) {
    const thisBooking = this;
  
    thisBooking.booked = {};
  
    for (let item of bookings) {
      thisBooking.makeBooked(item.date, item.hour, item.duration, item.table);
    }

    for (let item of eventsCurrent) {
      thisBooking.makeBooked(item.date, item.hour, item.duration, item.table);
    }

    const minDate = thisBooking.datePicker.minDate;
    const maxDate = thisBooking.datePicker.maxDate;

    for (let item of eventsRepeat) {
      if(item.repeat == 'daily') {
        for(let loopDate = minDate; loopDate <= maxDate; loopDate = utils.addDays(loopDate, 1)) {
          thisBooking.makeBooked(utils.dateToStr(loopDate), item.hour, item.duration, item.table);
        }
      } 
    }
    thisBooking.updateDOM();
  }

  makeBooked(date, hour, duration, table) {
    const thisBooking = this;
  
    if (typeof thisBooking.booked[date] === 'undefined') {
      thisBooking.booked[date] = {};
    }
  
    const startHour = utils.hourToNumber(hour);
  
    if (typeof thisBooking.booked[date][startHour] === 'undefined') {
      thisBooking.booked[date][startHour] = [];
    }
  
    thisBooking.booked[date][startHour].push(table);
  
    for (let hourBlock = startHour; hourBlock < startHour + duration; hourBlock += 0.5) {
  
      if (typeof thisBooking.booked[date][hourBlock] === 'undefined') {
        thisBooking.booked[date][hourBlock] = [];
      }
  
      thisBooking.booked[date][hourBlock].push(table);
    }
  }

  updateDOM() {
    const thisBooking = this;
  
    thisBooking.date = thisBooking.datePicker.value;
    thisBooking.hour = utils.hourToNumber(thisBooking.hourPicker.value);
  
    let allAvailable = false;
  
    if (
      typeof thisBooking.booked[thisBooking.date] === 'undefined'
      ||
      typeof thisBooking.booked[thisBooking.date][thisBooking.hour] === 'undefined'
    ) {
      allAvailable = true;
    }

    console.log(thisBooking.booked[thisBooking.date]);
  
    for (let table of thisBooking.dom.tables) {
      let tableId = parseInt(table.getAttribute(settings.booking.tableIdAttribute));
  
      if (!isNaN(tableId)) {
        if (
          !allAvailable
          && thisBooking.booked[thisBooking.date][thisBooking.hour].includes(tableId)
          ){
          table.classList.add(classNames.booking.tableBooked);
        } else {
          table.classList.remove(classNames.booking.tableBooked);
        }
      }
    }

    if (
      thisBooking.date !== thisBooking.datePicker.value ||
      thisBooking.hour !== utils.hourToNumber(thisBooking.hourPicker.value) ||
      thisBooking.people !== thisBooking.peopleAmountWidget.value ||
      thisBooking.hours !== thisBooking.hoursAmountWidget.value
    ) {
      thisBooking.selectedTable = null;
      const selectedTables = thisBooking.dom.wrapper.querySelectorAll('.selected');
      selectedTables.forEach((table) => {
        table.classList.remove('selected');
      });
    }

  }

  render(element) {
    const thisBooking = this;

    const generatedHTML = templates.bookingWidget();

    thisBooking.dom = {};

    thisBooking.dom.wrapper = element;

    thisBooking.dom.wrapper.innerHTML = generatedHTML;

    thisBooking.dom.peopleAmount = thisBooking.dom.wrapper.querySelector(select.widgets.booking.peopleAmount);
    thisBooking.dom.hoursAmount = thisBooking.dom.wrapper.querySelector(select.widgets.booking.hoursAmount);

    thisBooking.dom.datePickerWrapper = thisBooking.dom.wrapper.querySelector(select.widgets.datePicker.wrapper);
    thisBooking.dom.hourPickerWrapper = thisBooking.dom.wrapper.querySelector(select.widgets.hourPicker.wrapper);

    thisBooking.dom.tables = thisBooking.dom.wrapper.querySelectorAll(select.widgets.booking.tables);

    thisBooking.dom.tables = thisBooking.dom.wrapper.querySelectorAll(select.widgets.booking.tables);
    thisBooking.initTables();
  }

  initWidgets() {
    const thisBooking = this;

    thisBooking.peopleAmountWidget = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.hoursAmountWidget = new AmountWidget(thisBooking.dom.hoursAmount);

    thisBooking.datePicker = new DatePicker(thisBooking.dom.datePickerWrapper);
    thisBooking.hourPicker = new HourPicker(thisBooking.dom.hourPickerWrapper);

    thisBooking.dom.wrapper.addEventListener('updated', function() {
      thisBooking.updateDOM();
    })

    thisBooking.dom.wrapper.addEventListener('click', function (event) {
      if (event.target.matches(select.widgets.booking.tables)) {
        thisBooking.handleTableClick(event.target);
      }
    });
  }

  handleTableClick(table) {
    const thisBooking = this;
  
    if (!table.classList.contains(classNames.booking.tableBooked)) {
      if (table === thisBooking.selectedTable) {
        table.classList.remove('selected');
        thisBooking.selectedTable = null;
      } else {
        if (thisBooking.selectedTable) {
          thisBooking.selectedTable.classList.remove('selected');
        }
        table.classList.add('selected');
        thisBooking.selectedTable = table;
      }
    }
  }
  
  initTables() {
    const thisBooking = this;
  
    thisBooking.dom.wrapper.addEventListener('click', function(event) {
      const clickedElement = event.target;

      if (clickedElement.classList.contains(classNames.booking.table) && !clickedElement.classList.contains(classNames.booking.tableBooked)) {
        const tableNumber = clickedElement.getAttribute(settings.booking.tableIdAttribute);
  
        if (thisBooking.selectedTable === tableNumber) {
          thisBooking.selectedTable = null;
          clickedElement.classList.remove(classNames.booking.tableSelected);
        } else {
          thisBooking.selectedTable = tableNumber;
          clickedElement.classList.add(classNames.booking.tableSelected);
        }
      } else if (clickedElement.classList.contains(classNames.booking.tableBooked)) {
        alert('Ten stolik jest zajęty! Wybierz inny stolik.');
      }
    });
  }
}

export default Booking;