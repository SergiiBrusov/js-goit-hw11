import axios from 'axios';

const API_KEY = '39092859-16fe7b22871fd83438b6d2f7f';
const BASE_URL = 'https://pixabay.com/api/';
const perPage = 40;

export async function createPicture(q, page) {
    const url = `${BASE_URL}?key=${API_KEY}&q=${q}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true`;
    const response = await axios.get(url);
    return response.data;
  }