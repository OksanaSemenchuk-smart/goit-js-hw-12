// Імпортуємо функції для отримання зображень з API Pixabay
import { getImagesByQuery } from './js/pixabay-api.js';

// Імпортуємо функції для рендерингу галереї, контролю лоадера, контролю кнопки load-more
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

// Імпорт бібліотеки iziToast для виводу повідомлень
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Отримуємо доступ до форми пошуку, поля вводу та кнопки load-more
const form = document.querySelector('.form');
const input = form.elements['search-text'];
const loadMoreBtn = document.querySelector('.load-more');

// Змінні для поточного пошукового запиту, номеру сторінки та загальної кількості знайдених зображень
let query = '';
let page = 1;
let totalHits = 0;

// Додаємо обробник події submit (для пошуку). Обробляємо подію сабміту форми
// Скасовуємо перезавантаження сторінки, зчитуємо запит, перевіряємо, що він не порожній.
form.addEventListener('submit', async function (event) {
  event.preventDefault();
  query = input.value.trim();
  if (query === '') return;

  // Скидаємо page, очищаємо галерею, ховаємо кнопку load-more, показуємо лоадер.
  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  // Виконуємо запит і зберігаємо totalHits, ховаємо лоадер.
  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;
    hideLoader();

    // Якщо масив зображень порожній — показуємо повідомлення й виходимо з функції.
    if (data.hits.length === 0) {
      iziToast.warning({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'center',
      });
      return;
    }
    // Рендеринг галереї. Якщо ще залишились сторінки — показуємо кнопку load-more, якщо ні - ховаємо кнопку.
    // Обробляємо помилки.
    createGallery(data.hits);
    if (totalHits > page * 15) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      message: 'Something went wrong. Try again later.',
      position: 'center',
    });
  }
});

// Додаємо обробника події - клік по кнопці load-more
// Переходимо на наступну сторінку, ховаємо кнопку, показуємо лоадер.
loadMoreBtn.addEventListener('click', async function () {
  page += 1;
  hideLoadMoreButton();
  showLoader();

  // Запитуємо нову сторінку зображень, додаємо їх у галерею, ховаємо лоадер.
  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);
    hideLoader();

    // Плавне прокручування на дві висоти картки після додавання нових елементів.
    const { height: cardHeight } = document
      .querySelector('.gallery-item')
      .getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    // Якщо всі результати вже завантажено — ховаємо кнопку load-more і показуємо повідомлення.
    // Якщо ще є результати пошкуку - знову показуємо кнопку load-more.
    // У разі помилки — ховаємо лоадер, показуємо повідомлення.
    if (page * 15 >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'bottomCenter',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      message: 'Something went wrong. Try again later.',
      position: 'topRight',
    });
  }
});
