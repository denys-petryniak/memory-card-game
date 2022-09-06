const section = document.querySelector(".section");
const playerLivesCount = document.querySelector(".playerLivesCount");

const MAX_PLAYER_LIVES = 6;

let playerLives = MAX_PLAYER_LIVES;
playerLivesCount.textContent = playerLives;

const getData = () => [
  { imgSrc: "./images/beatles.jpeg", id: 1, name: "beatles" },
  { imgSrc: "./images/blink182.jpeg", id: 2, name: "blink 182" },
  { imgSrc: "./images/fkatwigs.jpeg", id: 3, name: "fka twigs" },
  { imgSrc: "./images/fleetwood.jpeg", id: 4, name: "fleetwood" },
  { imgSrc: "./images/joy-division.jpeg", id: 5, name: "joy division" },
  { imgSrc: "./images/ledzep.jpeg", id: 6, name: "led zeppelin" },
  { imgSrc: "./images/metallica.jpeg", id: 7, name: "metallica" },
  { imgSrc: "./images/pinkfloyd.jpeg", id: 8, name: "pink floyd" },
  { imgSrc: "./images/beatles.jpeg", id: 9, name: "beatles" },
  { imgSrc: "./images/blink182.jpeg", id: 10, name: "blink 182" },
  { imgSrc: "./images/fkatwigs.jpeg", id: 11, name: "fka twigs" },
  { imgSrc: "./images/fleetwood.jpeg", id: 12, name: "fleetwood" },
  { imgSrc: "./images/joy-division.jpeg", id: 13, name: "joy division" },
  { imgSrc: "./images/ledzep.jpeg", id: 14, name: "led zeppelin" },
  { imgSrc: "./images/metallica.jpeg", id: 15, name: "metallica" },
  { imgSrc: "./images/pinkfloyd.jpeg", id: 16, name: "pink floyd" },
];

const randomizeData = () => {
  const data = getData();
  data.sort(() => Math.random() - 0.5);
  return data;
};

const cardGenerator = () => {
  const randomizedData = randomizeData();

  randomizedData.forEach(item => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.className = "card";
    face.className = "face";
    back.className = "back";

    face.src = item.imgSrc;
    card.setAttribute("name", item.name);

    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", event => {
      card.classList.toggle("toggleCard");
      checkCards(event);
    });
  });
};

const checkCards = event => {
  const clickedCard = event.target;
  clickedCard.classList.add("flipped");

  const flippedCards = document.querySelectorAll(".flipped");
  const toggleCards = document.querySelectorAll(".toggleCard");

  const requiredCardMatchesCount = 2;

  if (flippedCards.length === requiredCardMatchesCount) {
    if (flippedCards[0].getAttribute("name") === flippedCards[1].getAttribute("name")) {
      flippedCards.forEach(card => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
    } else {
      flippedCards.forEach(card => {
        card.classList.remove("flipped");
        setTimeout(() => {
          card.classList.remove("toggleCard");
        }, 1000);
      });

      playerLives--;
      playerLivesCount.textContent = playerLives;

      setTimeout(() => {
        if (playerLives === 0) {
          restart("👎🐧 try again");
        }
      }, 1000);
    }
  }

  const allCardsCount = getData().length;

  setTimeout(() => {
    if (toggleCards.length === allCardsCount) {
      restart("🤟🐧 you won");
    }
  }, 1000);
};

const restart = text => {
  const randomizedData = randomizeData();
  const faces = document.querySelectorAll(".face");
  const cards = document.querySelectorAll(".card");

  section.style.pointerEvents = "none";

  randomizedData.forEach((item, index) => {
    cards[index].classList.remove("toggleCard");

    setTimeout(() => {
      cards[index].style.pointerEvents = "all";
      faces[index].src = item.imgSrc;
      cards[index].setAttribute("name", item.name);
      section.style.pointerEvents = "all";
    }, 1000);
  });

  playerLives = MAX_PLAYER_LIVES;
  playerLivesCount.textContent = playerLives;

  setTimeout(() => window.alert(text), 100);
};

cardGenerator();
