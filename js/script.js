//init functions
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
        img.addEventListener('click', function() {
          if (game.flash) {
            loadFlash(`${game.name}.swf`);
          } else if (game.externalUrl) {
            loadGame(`${game.url}`)
          } else {
            loadGame(`./games/${game.name}/index.html`);
          }
        });
        gameSelectionDiv.appendChild(img);
      });
    })
    .catch(error => alert('Error fetching games:', error));
}
async function chooseName() {
  const response = await fetch('./json/disguises.json');
  const data = await response.json();
  const rand = Math.floor(Math.random() * data.length);
  const { title, image } = data[rand];
  const head = document.getElementsByTagName('head')[0];
  const secretChance = Math.floor(Math.random() * 1000);
  if (secretChance === 0) {
    title = "Napoleon Feet Leaks"
    image = "./images/favicon/feet.png"
  }
  const titleElement = document.createElement("title");
  titleElement.textContent = title;
  head.appendChild(titleElement);
  const linkElement = document.createElement("link");
  linkElement.rel = "icon";
  linkElement.type = "image/x-icon";
  linkElement.href = image;
  head.appendChild(linkElement);
}
function refHandler() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const ref = urlParams.get('ref')
  if (ref==="badSite") {
    Swal.fire({
      title: "Your welcome!",
      text: "You were on a clone of our website! Do not use these. We have brought you back here!",
      icon: "warning",
    })
  }
  
}

//news functions
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

//game  opening functions
//loadGame/loadFlash calls loadPopup, which calls openPage
function loadGame(url) {
  loadPopup(url)
}
function loadFlash(swf) {
  loadGame(`./flash.html?swf=${swf}`)
}
function loadPopup(url) {
  var popup = Math.floor(Math.random() * 2);
  if (popup == 0) {
    var title = "Please consider donating!"
    var text = "It would help me have motivation to continue working on the site. There is no place to donate yet."
    var icon = "question"
    var confirmButton = true
    var confirmButtonText = "Donate!"
    var urlToOpen = "https://example.com"
  }
  if (popup == 1) {
    var title = "Discord"
    var text = "Join the discord to send game suggestions, donate, get notifications, and get links if the site is blocked!"
    var icon = "success"
    var confirmButton = true
    var confirmButtonText = "Join!"
    var urlToOpen = "https://discord.com/invite/7yusceyJdC"
  }
  if (popup == 1) {
    var title = "Youtube"
    var text = "Subscribe to my youtube"
    var icon = "success"
    var confirmButton = true
    var confirmButtonText = "Subscribe!"
    var urlToOpen = "https://www.youtube.com/@dragonterror"
  }
  Swal.fire({
    title: title,
    text: text  + " (This popup will close after 8 seconds)",
    icon: icon,
    showConfirmButton: confirmButton,
    confirmButtonText: confirmButtonText,
    timer: 8000,
    timerProgressBar: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = urlToOpen;
    } else {
      openPage(url);
    }
  });
}
function openPage(url) {
  const iframeContainer = document.getElementById('iframe-container');
  const iframe = document.getElementById('iframe');
  const currentSrc = new URL(iframe.src, window.location).href;
  const targetSrc = new URL(url, window.location).href;
  //Set iframe
  if (currentSrc !== targetSrc) {
    iframe.src = url;
  }
}
function fullscreen() {
  const buttons = document.getElementById('game-selection')
  //Hide buttons on call
  buttons.style.display = 'none';
  //fullscreen
  if (iframe.requestFullscreen) {
    iframe.requestFullscreen();
  } else if (iframe.webkitRequestFullscreen) { 
    iframe.webkitRequestFullscreen(); 
  } else if (iframe.msRequestFullscreen) { 
    iframe.msRequestFullscreen();
  }
}

//user functions
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
chooseName()
refHandler()
var currentURL = window.location.href

if(!window.location.href.includes("https://napoleonschoolgames.github.io/NapoleonSchoolGames/")){if (window.self !== window.top) {window.location.replace("http://napoleonschoolgames.github.io/NapoleonSchoolGames/stolengame.html");} else {window.location.replace("http://napoleonschoolgames.github.io/NapoleonSchoolGames/?ref=badSite");}}