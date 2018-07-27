const access_key = config.ACCESS_KEY;
const API_URL = `https://api.unsplash.com/search/photos?client_id=${access_key}&query=`;
const form = document.querySelector('form');
const input = document.querySelector('input');
const loadingImage = document.querySelector('#loadingImage');
const imageSection = document.querySelector('.images');

loadingImage.style.display = 'none';

form.addEventListener('submit', formSubmitted);

function formSubmitted(event) {
  event.preventDefault()
  const searchTerm = input.value;
  search(searchTerm)
    .then(displayImages);
}

function search(searchTerm) {
  const url = `${API_URL}${searchTerm}`;
  loadingImage.style.display = '';
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      return data.results;
    })
}

function displayImages(images) {
  images.forEach(image => {
    // console.log(image.urls.regular);
    const imageElement = document.createElement('img');
    imageElement.src = image.urls.regular;
    imageSection.appendChild(imageElement);
  });
  loadingImage.style.display = 'none';
}

