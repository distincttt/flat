function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomAddress(addressArray) {
  return addressArray[Math.floor(Math.random() * 10)];
}

function getRandomPhone(numberArray) {
  return numberArray[Math.floor((Math.random() * 10) / 2)];
}
function getRandomBalcon(balconyArray) {
  return balconyArray[Math.floor((Math.random() * 10) / 4)];
}

const wishlist = document.querySelector(".wishlist__button");
const currentName = localStorage.getItem("currentName");
if (currentName) wishlist.classList.remove("hidden");

// Массив, в котором будут храниться объекты
const objects = [];
const list = document.querySelector(".list");
const allLink = document.querySelectorAll(".header__button");
let id = 0;
const onClick = (e) => {
  const like = e.target;
  let likedArray = JSON.parse(localStorage.getItem("liked"));

  if (like.classList.contains("wishlist__empty")) {
    like.classList.add("wishlist__pull");
    like.classList.remove("wishlist__empty");

    objects.forEach((card) => {
      // console.log(card.id, like.id);
      if (card.id === Number(like.id)) {
        if (!likedArray) localStorage.setItem("liked", JSON.stringify([card]));
        else
          localStorage.setItem("liked", JSON.stringify([...likedArray, card]));
        // localStorage.removeItem("liked", JSON.stringify([card]));
      }
    });
  } else {
    like.classList.remove("wishlist__pull");
    like.classList.add("wishlist__empty");

    resArray = [...likedArray].filter((likedItem) => {
      // console.log(card.id, like.id);
      console.log(likedItem.id, like.id);
      if (likedItem.id === Number(like.id)) return false;
      else return true;
    });

    localStorage.setItem("liked", JSON.stringify(resArray));
  }
};

// Создание 100 объектов
const createItems = () => {
  for (let i = 0; i < 100; i++) {
    const object = {
      id: i,
      price: getRandomNumber(1000000, 100000000),
      area: getRandomNumber(20, 200),
      rooms: getRandomNumber(1, 5),
      floor: getRandomNumber(1, 30),
      address: getRandomAddress([
        "Купчино",
        "Петроградская",
        "Автово",
        "Площадь Ленина",
        "Старая Деревня",
        "Звенигородская",
        "Василеостровская",
        "Рыбацкое",
        "Спасская",
        "Новочеркаская",
      ]),
      isLiked: false,
      "lessor's phone": getRandomPhone([
        "+7-934-387-67-29",
        "+7-867-387-67-29",
        "+7-834-387-67-29",
        "+7-967-527-98-12",
        "+7-874-329-75-65",
      ]),

      img: getRandomAddress([
        "img/room1.jpg",
        "img/room2.png",
        "img/room3.avif",
        "img/room4.jpg",
        "img/room5.jpeg",
        "img/room6.jpg",
        "img/room7.jpg",
        "img/room8.jpg",
        "img/room9.jpg",
        "img/room10.png",
      ]),
      balcon: getRandomBalcon(["Есть Балкон", "", "Есть Лоджия"]),
    };

    objects.push(object);
  }
};
createItems();
const printItems = (objects) => {
  objects.forEach((object) => {
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
    button.classList.add("wishlist__empty");
    button.classList.add("wishlist");
    button.setAttribute("id", id);
    id++;
    button.addEventListener("click", onClick);

    const area = document.createElement("span");

    const rooms = document.createElement("span");

    const floor = document.createElement("span");

    const balcon = document.createElement("span");

    const phoneNumber = document.createElement("span");

    const img = document.createElement("img");

    img.setAttribute("src", object.img);
    img.classList.add("img");

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
    leftPart.appendChild(phone);
    leftPart.appendChild(phoneNumber);
    leftPart.appendChild(button);
    content.appendChild(leftPart);
    content.appendChild(rightPart);
    div.appendChild(content);
    div.appendChild(img);
    list.appendChild(div);
  });
};
printItems(objects.slice(0, 6));

const showMoreButton = document.querySelector(".show-more");
let filteredArray = null;
let page = 6;
const oops = document.querySelector(".oops");

showMoreButton.addEventListener("click", () => {
  console.log("click");
  if (filteredArray) {
    if (filteredArray.length - page > 0) {
      printItems(
        filteredArray
          ? filteredArray.slice(page, page + 6)
          : objects.slice(page, page + 6)
      );
      page += 6;
    } else oops.classList.remove("hidden");
  } else {
    printItems(
      filteredArray
        ? filteredArray.slice(page, page + 6)
        : objects.slice(page, page + 6)
    );
  }
});

console.log(objects);

const search = document.querySelector(".search__button");
const filter = document.querySelector(".filter");
const aboutClose = document.querySelector(".about-button");

list.classList.remove("card--hidden");
search.addEventListener("click", (e) => {
  e.preventDefault();
  filter.classList.remove("filter--hidden");
  list.classList.add("card--hidden");
  aboutClose.classList.add("hidden");
  showMoreButton.classList.add("hidden");
});

aboutClose.addEventListener("click", (e) => {
  e.preventDefault();
  filter.classList.add("filter--hidden");
  list.classList.remove("card--hidden");
  aboutClose.classList.remove("hidden");
});

const about = document.querySelector(".about-text");
const aboutButton = document.querySelector(".about-button");

aboutButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (about.classList.contains("about--hidden"))
    about.classList.remove("about--hidden");
  else about.classList.add("about--hidden");
});

const form = document.querySelector(".form");

const inputs = document.querySelectorAll(".search-input");
const inputNames = ["price", "area"];

const rooms = document.querySelectorAll(".room");
const balcony = document.querySelectorAll(".balcony-checkbox");

const checkboxRooms = [1, 2, 3, 4, 5];
const checkboxBalcony = ["Есть Балкон", "Есть Лоджия"];

oops.classList.add("hidden");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  filter.classList.add("filter--hidden");
  list.classList.remove("card--hidden");

  const resInput = { price: inputs[0].value, area: inputs[1].value };

  const resRooms = [];
  rooms.forEach((room, i) => {
    if (room.checked) resRooms.push(checkboxRooms[i]);
  });

  const resBalcony = [];
  balcony.forEach((balcon, i) => {
    if (balcon.checked) resBalcony.push(checkboxBalcony[i]);
  });

  filteredArray = [...objects].filter((card) => {
    if (Object.keys(resInput).length) {
      if (resInput.price && card.price > resInput.price) return false;
      if (resInput.area && card.area < resInput.area) return false;
    }
    if (resRooms.length && !resRooms.includes(card.rooms)) return false;
    if (resBalcony.length && !resBalcony.includes(card.balcon)) return false;

    return true;
  });

  console.log(filteredArray);
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => {
    list.removeChild(card);
  });
  if (filteredArray.length === 0) {
    oops.classList.remove("hidden");
    showMoreButton.classList.add("hidden");
  } else {
    printItems(filteredArray.slice(0, 6));
  }
});

const authDiv = document.getElementById("auth");
console.log(authDiv.children);

const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
  wishlist.classList.add("hidden");

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
});

if (localStorage.getItem("currentName")) {
  const person = document.createElement("span");
  const userName = localStorage.getItem("currentName");
  person.innerHTML = `${userName}`;
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
