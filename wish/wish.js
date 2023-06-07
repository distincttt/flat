const list = document.querySelector(".list");
const allLink = document.querySelectorAll(".header__button");

const likedArray = JSON.parse(localStorage.getItem("liked"));
const author = localStorage.getItem("currentName");
const mainPage = document.querySelector(".header__link");
const oops = document.querySelector(".oops");
// localStorage.removeItem("liked");

const onClick = (e) => {
  const like = e.target;
  const price = like.parentElement.firstChild.innerHTML;
  let cardPriceArray = price.slice(0, price.length - 3).split("");

  cardPriceArray = cardPriceArray.filter((number) => {
    if (number === " ") return false;
    else return true;
  });
  const resPrice = Number(cardPriceArray.join(""));

  if (like.classList.contains("wishlist__empty")) {
    like.classList.add("wishlist__pull");
    like.classList.remove("wishlist__empty");
  } else {
    like.classList.remove("wishlist__pull");
    like.classList.add("wishlist__empty");

    const likedArray = JSON.parse(localStorage.getItem("liked"));

    const resArray = [...likedArray].filter((likedItem) => {
      console.log(likedItem.id, Number(like.id));
      console.log(resPrice, Number(likedItem.price));
      if (
        likedItem.id === Number(like.id) &&
        resPrice === Number(likedItem.price)
      )
        return false;
      else return true;
    });

    localStorage.setItem("liked", JSON.stringify(resArray));

    const list = document.querySelector(".list");

    list.removeChild(like.parentElement.parentElement.parentElement);
  }

  const resArray = JSON.parse(localStorage.getItem("liked"));

  if (!resArray.length) {
    const oops = document.querySelector(".oops");
    oops.classList.remove("hidden");
  }
};

const printOneItem = (object) => {
  const content = document.createElement("div");
  content.classList.add("content");

  const leftPart = document.createElement("div");
  leftPart.classList.add("leftPart");

  const price = document.createElement("h1");
  price.classList.add("price");
  const phone = document.createElement("span");

  const rightPart = document.createElement("div");
  rightPart.classList.add("rightPart");

  const div = document.createElement("div");
  div.classList.add("card");

  const button = document.createElement("button");
  button.classList.add("wishlist__pull");
  button.classList.add("wishlist");
  button.setAttribute("id", object.id);

  button.addEventListener("click", onClick);

  const area = document.createElement("span");

  const rooms = document.createElement("span");

  const floor = document.createElement("span");

  const balcon = document.createElement("span");

  const phoneNumber = document.createElement("span");

  const img = document.createElement("img");

  img.setAttribute("src", `../${object.img}`);
  img.classList.add("img");
  console.log(object.img);

  price.innerHTML = `${object.price} р.`
    .split("")
    .reverse()
    .join("")
    .replace(/\d\d\d/g, "$& ")
    .split("")
    .reverse()
    .join("");
  area.innerHTML = `Площадь: ${object.area} м2`;
  rooms.innerHTML = `Количество комнат: ${object.rooms}`;
  floor.innerHTML = `Этаж: ${object.floor}`;
  balcon.innerHTML = `${object.balcon}`;
  phone.innerHTML = `Телефон риелтора:`;
  phoneNumber.innerHTML = `${object["lessor's phone"]}`;
  button.innerHTML = ``;

  leftPart.appendChild(price);
  rightPart.appendChild(area);
  rightPart.appendChild(rooms);
  rightPart.appendChild(floor);
  rightPart.appendChild(balcon);
  leftPart.appendChild(button);
  leftPart.appendChild(phone);
  leftPart.appendChild(phoneNumber);
  content.appendChild(leftPart);
  content.appendChild(rightPart);
  div.appendChild(content);
  div.appendChild(img);
  list.appendChild(div);
};
const printItems = (objects) => {
  objects.forEach((object) => {
    printOneItem(object);
  });
};

const resArray = likedArray.filter((card) => {
  if (card.author === author) return true;
  else return false;
});

if ((resArray && !resArray.length) || !resArray) {
  oops.classList.remove("hidden");
} else {
  printItems(resArray);
}

let filteredArray = null;
let page = 6;

// console.log(objects);

const authDiv = document.getElementById("auth");
console.log(authDiv.children);

const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
  [...authDiv.children].forEach((link) => {
    if (
      !link.classList.contains("about-button") &&
      !link.classList.contains("search__button")
    ) {
      if (!link.classList.contains("hidden")) link.classList.add("hidden");
      else link.classList.remove("hidden");
    }
  });

  localStorage.removeItem("currentName");
  mainPage.click();
});

if (author) {
  const person = document.createElement("span");
  person.innerHTML = `${author}`;
  person.classList.add("person");
  person.setAttribute("id", "userName");
  authDiv.insertBefore(person, authDiv.firstChild);

  [...authDiv.children].forEach((link) => {
    if (
      !link.classList.contains("about-button") &&
      !link.classList.contains("search__button")
    )
      link.classList.add("hidden");
  });
  logout.classList.remove("hidden");
  person.classList.remove("hidden");
}
