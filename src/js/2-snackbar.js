// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  console.dir(event.target);
  const delay = event.target[0].value;
  const isChecked = event.target[2].checked;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isChecked) {
        resolve('Fulfilled');
      } else {
        reject('Rejected');
      }
    }, delay);
  });

  promise.then(
    value => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,

        color: 'green',
        position: 'topRight',
      });
      console.log(value); // "Success! Value passed to resolve function"
    },
    error => {
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        color: 'red',
        position: 'topRight',
      });
      console.log(error); // "Error! Error passed to reject function"
    }
  );
});
