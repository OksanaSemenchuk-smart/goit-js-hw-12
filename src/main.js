// Імпортуємо функції для отримання зображень з API Pixabay
import { getImagesByQuery } from './js/pixabay-api.js';

// Імпортуємо функцію для рендерингу галереї та контролю лоадера
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

// Імпорт бібліотеки iziToast для виводу повідомлень
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Отримуємо доступ до форми пошуку та поля вводу
const form = document.querySelector('.form');
const input = form.elements['search-text'];

// Додаємо обробник події submit на форму
// Запобігаємо стандартному перезавантаженню сторінки при сабміті форми
// Отримуємо значення з поля вводу, видаляємо зайві пробіли
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const query = input.value.trim();

  // Перевіряємо, чи поле не порожнє. Якщо порожнє - зупиняємо виконання.
  if (query === '') {
    iziToast.warning({
      message: 'Please enter a search term!',
      position: 'topRight',
    });
    return;
  }

  // Перед новим пошуком очищуємо попередні результати в галереї
  clearGallery();

  // Відображаємо індикатор завантаження
  showLoader();

  // Виконуємо HTTP-запит за допомогою функції getImagesByQuery
  // Перевіряємо, чи прийшли результати (масив hits не порожній)
  // Якщо немає результатів, показуємо інформаційне повідомлення
  // Якщо результати є, викликаємо функцію для рендеру галереї з отриманих зображень
  // Якщо сталася помилка під час запиту або обробки, повідомляємо користувача
  // Після завершення запиту ховаємо індикатор завантаження
  getImagesByQuery(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.info({
          message: 'Sorry, no images found. Please try again!',
          position: 'center',
        });
        return;
      }

      createGallery(data.hits);
    })
    .catch(error => {
      iziToast.error({
        message: 'Oops! Something went wrong. Please try again later.',
        position: 'center',
      });
      console.error('Помилка під час запиту:', error);
    })
    .finally(() => {
      hideLoader();
    });
});
