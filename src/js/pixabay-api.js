import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '51015226-beaf55d01e034eca2e3702ad7';

// @param { string } query
// @returns { Promise < Object >}

export function getImagesByQuery(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  return axios.get(BASE_URL, { params }).then(response => {
    return response.data;
  });
}
