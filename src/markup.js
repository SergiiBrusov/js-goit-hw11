const gallery = document.querySelector('.gallery');

export function createGallery(arr) {
  const createCards = arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <div class = "full-card">
          <div class="first-div">
              <a class="gallery_link" href="${largeImageURL}">
                  <img src="${webformatURL}" alt="${tags}" width="300" height = '180' loading="lazy" />
              </a>
          </div>
          <div class="info">
              <p class="info-item"><b>Likes:</b> ${likes}</p>
              <p class="info-item"><b>Views:</b> ${views}</p>
              <p class="info-item"><b>Comments:</b> ${comments}</p>
              <p class="info-item"><b>Downloads:</b> ${downloads}</p>
          </div>
        </div>
    `;
      }
    )
    .join('');
  return createCards;
}