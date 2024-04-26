function openPage(url) {
  const iframeContainer = document.getElementById('iframe-container');
  const iframe = document.getElementById('iframe');
  const buttons = document.getElementById('game-selection')
  //Hide buttons on call
  buttons.style.display = 'none';
  const currentSrc = new URL(iframe.src, window.location).href;
  const targetSrc = new URL(url, window.location).href;
  //Set iframe
  if (currentSrc !== targetSrc) {
    iframe.src = url;
  }
  //fullscreen
  if (iframe.requestFullscreen) {
    iframe.requestFullscreen();
  } else if (iframe.webkitRequestFullscreen) { 
    iframe.webkitRequestFullscreen(); 
  } else if (iframe.msRequestFullscreen) { 
    iframe.msRequestFullscreen();
  }
  Swal.fire({
    title: "Please consider donating to help me develop the site",
    text: "If you don't want to, thats cool! Just wait 5 seconds for this to go away.",
    icon: "question",
    confirmButtonText: "No donate link yet!",
    timer: 5000,
    timerProgressBar: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    showConfirmButton: true
  }).then((result) => {
    if (result.value) {
      window.location.href = `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
    }
  }); 
}
function openSWF(swf) {
  openPage(`./flash.html?swf=${swf}`);
}
function fullscreenchanged(event) {
  const iframeContainer = document.getElementById('iframe-container');
  const iframe = document.getElementById('iframe');
  const buttons = document.getElementById('game-selection') 
  //if not fullscreen, show buttons
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
  //check if the text matches any game's image name (triggers on keyUp)
  for (i = 0; i < gameButtons.length; i++) {
      if (gameButtons[i].src.indexOf(filter) > -1) {
          gameButtons[i].style.display = '';
      } else {
          gameButtons[i].style.display = 'none';
      }
  }
}
async function generateNews() {
  const response = await fetch('./json/news.json');
  const newsData = await response.json();
  const newsContainer = document.getElementById('news-container');
  //for all news "Blocks" call createNewsElement with the title/content, then appends it.
  newsData.forEach(news => {
    const newsElement = createNewsElement(news.title, news.content);
    newsContainer.appendChild(newsElement);
  });
}
function createNewsElement(title, content) {
  const element = document.createElement('div');
  element.classList.add('news');
  //create element
  const titleElement = document.createElement('h2');
  //add content
  titleElement.textContent = title;
  //add class
  titleElement.classList.add('news-title');
  const contentElement = document.createElement('span');
  contentElement.textContent = content;
  contentElement.classList.add('news-content');
  element.appendChild(titleElement);
  element.appendChild(contentElement);
  return element;
}
function loadGames() {
  const gameSelectionDiv = document.getElementById('game-selection');
  fetch('./json/games.json')
    .then(response => response.json())
    .then(games => {
      games.forEach(game => {
        const img = document.createElement('img');
        img.className = 'game-button';
        img.src = `./images/${game.name}.jpg`;
        img.alt = `${game.name}`;
        img.onclick = game.flash ? () => openSWF(`${game.name}.swf`) : () => openPage(`./games/${game.name}/index.html`);
        gameSelectionDiv.appendChild(img);
      });
    })
    .catch(error => alert('Error fetching games:', error));
}
function loadExploits() {
  const gameSelectionDiv = document.getElementById('game-selection');
  fetch('./json/exploits.json')
    .then(response => response.json())
    .then(exploits => {
      exploits.forEach(exploit => {
        const img = document.createElement('img');
        img.className = 'game-button';
        img.src = `./images/${exploit.name}.jpg`;
        img.alt = `${exploit.name}`;
        img.onclick = () => openPage(`./exploits/${exploit.name}/index.html`);
        gameSelectionDiv.appendChild(img);
      });
    })
    .catch(error => alert('Error fetching exploits:', error));
}