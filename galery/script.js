const root = document.querySelector("#root");

let sliderIndex = 0;

const images = [
  "https://marvel-b1-cdn.bc0a.com/f00000000299671/www.columbuszoo.org/sites/default/files/styles/square_large/public/assets/animals/Pallas%20Cat%20%28Tiina%29%206531%20-%20Amanda%20Carberry%2C%20Columbus%20Zoo%20and%20Aquarium.jpg?h=46a79ab1&itok=95TTPBNX",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3OcGUNHS2K_745I99yRZgXY_AT4_ZMqLxCw&s",
  "https://upload.wikimedia.org/wikipedia/commons/d/d6/Manoel.jpg",
  "https://media.wired.com/photos/59324c6352d99d6b984dd8ee/master/w_2560%2Cc_limit/Grumpy_Kitty....jpg",
  "https://featuredcreature.com/wp-content/uploads/2012/10/tumblr_l54aeqIVqj1qc0jpmo1_5002.jpg",
];

const frame = document.createElement("div");
const cards = document.createElement("div");
const triggers = document.createElement("div");

const leftBtn = document.createElement("button");
const rightBtn = document.createElement("button");
leftBtn.innerText = "<";
rightBtn.innerText = ">";

triggers.classList.add("trigger");
triggers.append(leftBtn, rightBtn);
frame.append(triggers);

frame.classList.add("frame");
cards.classList.add("cards");

images.forEach((item) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.style.backgroundImage = `url(${item})`;
  cards.append(card);
});

frame.append(cards);
root.append(frame);

leftBtn.addEventListener("click", () => {
  if (sliderIndex !== 0) {
    sliderIndex--;
    cards.style.left = `${-1 * sliderIndex * 500}px`;
    activeRounds(sliderIndex)
  }
});

rightBtn.addEventListener("click", () => {
  if (sliderIndex < images.length - 1) {
    sliderIndex++;
    cards.style.left = `${-1 * sliderIndex * 500}px`;
    activeRounds(sliderIndex)
  }
});

function activeRounds(sliderIndex){
    allButtons[1][sliderIndex].classList.add("active");
    for (let j =0;  j < allButtons.length; j++) {
        if(j!=sliderIndex){
        allButtons[1][j].classList.remove("active");
    }
      }
}

const container = document.createElement("div");
const allButtons = []
function createRounds() {
  container.classList.add("rounds");

  for (let i = 0; i < images.length; i++) {
    const button = document.createElement("button");
    if (i === sliderIndex) {
      button.classList.add("active");
    }
    container.append(button);
    allButtons.push( button.parentElement.children)
        console.log(allButtons);
        
    button.addEventListener("click", function () {
      sliderIndex = i;
      cards.style.left = `${-1 * sliderIndex * 500}px`;

    activeRounds(sliderIndex)
    });
  }
  frame.append(container);
}



createRounds();
