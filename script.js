function openPage(url) {
  const iframeContainer = document.getElementById('iframe-container');
  const iframe = document.getElementById('iframe');
  const buttons = document.getElementById('game-selection')
  iframeContainer.style.display = 'block';
  buttons.style.display = 'none';
  const currentSrc = new URL(iframe.src, window.location).href;
  const targetSrc = new URL(url, window.location).href;
  if (currentSrc !== targetSrc) {
    iframe.src = url;
  }
  if (iframe.requestFullscreen) {
    iframe.requestFullscreen();
  } else if (iframe.webkitRequestFullscreen) { 
    iframe.webkitRequestFullscreen(); // Safari
  } else if (iframe.msRequestFullscreen) { 
    iframe.msRequestFullscreen(); // IE11
  }
}
function openSWF(swf) {
  openPage(`./flash.html?swf=${swf}`);
}
function fullscreenchanged(event) {
  const iframeContainer = document.getElementById('iframe-container');
  const iframe = document.getElementById('iframe');
  const buttons = document.getElementById('game-selection') 
  if (document.fullscreenElement) {
  } else {
    buttons.style.display = 'block';
  }
}
function searchGames() {
  var input, filter, gameButtons, i;
  input = document.getElementById('search-bar');
  filter = input.value.toLowerCase().replace(/\s+/g, '');
  gameButtons = document.getElementsByClassName("game-button");

  for (i = 0; i < gameButtons.length; i++) {
      if (gameButtons[i].src.indexOf(filter) > -1) {
          gameButtons[i].style.display = '';
      } else {
          gameButtons[i].style.display = 'none';
      }
  }
}
async function fetchNews() {
  const response = await fetch('news.json');
  const newsData = await response.json();
  return newsData;
}
async function generateNews() {
  const newsData = await fetchNews();
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = '';

  newsData.forEach(news => {
    const newsElement = createNewsElement(news.title, news.content);
    newsContainer.appendChild(newsElement);
  });
}
function createNewsElement(title, content) {
  const element = document.createElement('div');
  element.classList.add('news');
  const titleElement = document.createElement('h2');
  titleElement.textContent = title;
  titleElement.classList.add('');
  const contentElement = document.createElement('p');
  contentElement.textContent = content;
  contentElement.classList.add('');
  element.appendChild(titleElement);
  element.appendChild(contentElement);
  return element;
}

document.addEventListener("fullscreenchange", fullscreenchanged);
generateNews();
