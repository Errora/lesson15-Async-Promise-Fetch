const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos';

const createPhotoElement = (photo) => {
  const photoElement = document.createElement('li');
  photoElement.className = 'photo-item';
  const imgElement = document.createElement('img');
  imgElement.className = 'photo-item__image';
  imgElement.setAttribute('src', photo.url);
  const h3Element = document.createElement('h3');
  h3Element.className = 'photo-item__title';
  h3Element.textContent = photo.title;
  photoElement.append(imgElement);
  photoElement.append(h3Element);

  return photoElement;
}

const toggleLoader = () => {
  const loaderHtml = document.querySelector('#loader');
  const isHidden = loaderHtml.hasAttribute('hidden');
  if (isHidden) {
    loaderHtml.removeAttribute('hidden');
  } else {
    loaderHtml.setAttribute('hidden', '');
  }
}

const dataContainer = document.querySelector('#data-container');
const ids = [60, 12, 55];

const getFastestLoadedPhoto = (ids) => {
  toggleLoader();
  const requests = ids.map((id) => fetch(`${PHOTOS_URL}/${id}`));
  Promise.race(requests)
    .then((response) => {
      const dataResults = response.json();
      return dataResults;
    })
    .then((photo) => {
      dataContainer.append(createPhotoElement(photo));
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      toggleLoader();
    })
}

getFastestLoadedPhoto(ids);