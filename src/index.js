import Notiflix from 'notiflix';
import { createGallery } from './markup.js';
import {createPicture} from './create-pic.js'
import './styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import {input, form, gallery, loadBtn} from './refs.js'

let page = 1;
let searchQuery = '';
const perPage = 40;
let lightbox;

loadBtn.classList.add('is-hidden');

form.addEventListener('submit', handleSubmit);
loadBtn.addEventListener('click', loadProcess);

async function handleSubmit(e) {
  e.preventDefault();
  page = 1;
  searchQuery = input.value;

  createPicture(searchQuery, page)
    .then(data => {
      const hits = data.hits;

      gallery.innerHTML = '';
      if (hits.length === 0) {
        loadBtn.classList.remove('is-hidden');
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        loadBtn.classList.add('is-hidden');
      } else {
        gallery.insertAdjacentHTML('beforeend', createGallery(hits));
        lightbox = new SimpleLightbox('.gallery a', {});
        loadBtn.classList.remove('is-hidden');
      }
      form.reset();
    })
    .catch(err => {
      console.log('Caught error:', err);
      console.error(err);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page or make another choice!',
        err
      );
    });
}

async function loadProcess() {
  page += 1;
  createPicture(searchQuery, page)
    .then(data => {
      const searchResults = data.hits;
      const pageNumber = Math.ceil(data.totalHits / perPage);

      gallery.insertAdjacentHTML('beforeend', createGallery(searchResults));
      if (page === pageNumber) {
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        loadBtn.removeEventListener('click', loadProcess);
        loadBtn.classList.add('is-hidden');
      } else {
        lightbox.refresh();
      }
    })
    .catch(err => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page or make another choice!',
        err
      );
    });
}
