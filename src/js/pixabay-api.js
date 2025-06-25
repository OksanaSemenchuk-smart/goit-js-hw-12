import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '51015226-beaf55d01e034eca2e3702ad7';

export async function getImagesByQuery(query, page) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 15,
  };

  const response = await axios.get(BASE_URL, { params });
  return response.data;
}
