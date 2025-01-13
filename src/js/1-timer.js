import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const timer = {
  deadLine: new Date(),
  intervalId: null,
  elements: {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
    button: document.querySelector('[data-start]'),
    input: document.querySelector('#datetime-picker'),
  },

  addEvent() {},

  start() {
    this.elements.button.disabled = true; // делаю неактивную кнопку
    this.elements.input.disabled = true; // делаю неактивний input

    this.intervalId = setInterval(() => {
      const diffTime = this.deadLine - Date.now();

      if (diffTime <= 0) {
        this.stop();

        return;
      }

      const timeComponents = this.convertMs(diffTime);
      this.elements.days.textContent = this.pad(timeComponents.days);
      this.elements.hours.textContent = this.pad(timeComponents.hours);
      this.elements.minutes.textContent = this.pad(timeComponents.minutes);
      this.elements.seconds.textContent = this.pad(timeComponents.seconds);
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
    this.elements.days.textContent = '00';
    this.elements.hours.textContent = '00';
    this.elements.minutes.textContent = '00';
    this.elements.seconds.textContent = '00';
    this.elements.input.disabled = false;
  },

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day); // Remaining days
    const hours = Math.floor((ms % day) / hour); // Remaining hours
    const minutes = Math.floor(((ms % day) % hour) / minute); // Remaining minutes
    const seconds = Math.floor((((ms % day) % hour) % minute) / second); // Remaining seconds

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  },

  pad(value) {
    return String(value).padStart(2, '0');
  },
};

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timer.stop(); // stop

    if (selectedDates[0] < new Date()) {
      iziToast.show({
        message: 'Будь ласка, оберіть дату в майбутньому!',
        color: 'red',
        position: 'topRight',
      });

      timer.elements.button.disabled = true;
      return;
    }

    timer.elements.button.disabled = false;
    timer.deadLine = selectedDates[0];
    iziToast.show({
      message: `Дедлайн встановлено:, ${timer.deadLine}`,
      color: 'green',
      position: 'topRight',
    });
  },
});

timer.elements.button.addEventListener('click', () => {
  timer.start();
});
