import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// @param { Array } images

export function createGallery(images) {
  const markup = images
    .map(image => {
      return `
    <li class="gallery-item">
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      </a>
      <div class="info">
        <div class="info-item">
          <h4>Likes</h4>
          <p>${image.likes}</p>
        </div>
        <div class="info-item">
          <h4>Views</h4>
          <p>${image.views}</p>
        </div>
        <div class="info-item">
          <h4>Comments</h4>
          <p>${image.comments}</p>
        </div>
        <div class="info-item">
          <h4>Downloads</h4>
          <p>${image.downloads}</p>
        </div>
      </div>
    </li>
    `;
    })
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  document.querySelector('.loader').classList.add('visible');
}

// export function hideLoader() {
//   document.querySelector('.loader').classList.remove('visible');
// }

export function hideLoader() {
  setTimeout(() => {
    document.querySelector('.loader').classList.remove('visible');
  }, 700);
}
