console.log('XD');

const img = document.querySelector('img');

fetch(
  'https://api.giphy.com/v1/gifs/translate?api_key=SAYes8i0ch0qq5OYo03U5Wk2nD5sb88J&s=cats',
  {
    mode: 'cors',
  }
)
  .then((response) => response.json())
  .then((response) => {
    img.src = response.data.images.original.url;
  });
