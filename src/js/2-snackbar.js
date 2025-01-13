// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const delay = form.elements.delay.value;
  const isChecked = form.elements.state.value === 'fulfilled';
  // console.log(form.elements.state);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isChecked) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise.then(
    value => {
      // console.log(value);
      iziToast.show({
        message: `✅ Fulfilled promise in ${value}ms`,

        color: 'green',
        position: 'topRight',
      });
    },
    error => {
      // console.log(error);
      iziToast.show({
        message: `❌ Rejected promise in ${error}ms`,
        color: 'red',
        position: 'topRight',
      });
    }
  );
});
