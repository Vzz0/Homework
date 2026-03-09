'use strict';

const DOGS_API_URL = 'https://dog.ceo/api/breeds/image/random/20';

const galleryGridElement = document.getElementById('gallery-grid');
const galleryLoaderElement = document.getElementById('gallery-loader');
const galleryErrorElement = document.getElementById('gallery-error');
const loadImagesButtonElement = document.getElementById('load-images-button');

function showLoader() {
  galleryLoaderElement.classList.add('gallery__loader_visible');
  galleryLoaderElement.setAttribute('aria-hidden', 'false');
}

function hideLoader() {
  galleryLoaderElement.classList.remove('gallery__loader_visible');
  galleryLoaderElement.setAttribute('aria-hidden', 'true');
}

function setButtonDisabled(isDisabled) {
  loadImagesButtonElement.disabled = isDisabled;
}

function clearGallery() {
  galleryGridElement.innerHTML = '';
}

function showError(message) {
  galleryErrorElement.textContent = message;
}

function clearError() {
  galleryErrorElement.textContent = '';
}

function createGalleryItem(imageUrl) {
  const itemElement = document.createElement('article');
  itemElement.className = 'gallery__item';

  const imageElement = document.createElement('img');
  imageElement.className = 'gallery__image';
  imageElement.src = imageUrl;
  imageElement.alt = 'Изображение';
  imageElement.loading = 'lazy';

  itemElement.append(imageElement);

  return itemElement;
}

function normalizeDogsResponse(data) {
  if (!data || data.status !== 'success' || !Array.isArray(data.message)) {
    throw new Error('Некорректный ответ сервера с собаками');
  }

  return data.message.map(function (imageUrl) {
    return { url: imageUrl };
  });
}

async function fetchImages(url, normalize) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Сервер вернул ошибку: ' + response.status);
  }

  const data = await response.json();

  return normalize(data);
}

async function handleLoadImagesClick(apiUrl, normalize) {
  clearError();
  showLoader();
  setButtonDisabled(true);

  try {
    const images = await fetchImages(apiUrl, normalize);

    clearGallery();

    images.forEach(function (image) {
      const itemElement = createGalleryItem(image.url);
      galleryGridElement.appendChild(itemElement);
    });

    if (images.length === 0) {
      showError('По вашему запросу ничего не найдено.');
    }
  } catch (error) {
    console.error(error);
    showError('Не удалось загрузить изображения. Попробуйте ещё раз.');
  } finally {
    hideLoader();
    setButtonDisabled(false);
  }
}

loadImagesButtonElement.addEventListener('click', function (event) {
  event.preventDefault();
  handleLoadImagesClick(DOGS_API_URL, normalizeDogsResponse);
});

