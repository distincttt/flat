console.log("You're on Sign up page");

const inputs = document.querySelectorAll(".signup-input");
const form = document.querySelector(".signup-form");

console.log(inputs);
const values = [];
const keysValues = ["имя", "фамилия", "дата", "телефон", "пароль"];
const error = document.querySelector(".error");
const errorMessage = "Неправильно заполены поля: <br><br>";
error.innerHTML = errorMessage;
const linkToMainPage = document.querySelector(".header__link");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  inputs.forEach((input, i) => {
    values.push(input.value);
  });
  console.log(values);

  if (values[0].length < 3) {
    error.classList.remove("hidden");
    error.innerHTML += "Имя должно быть больше трёх символов!<br><br>";
  }
  if (values[0].length > 20) {
    error.classList.remove("hidden");
    error.innerHTML += "Имя должно быть меньше 20 символов!<br><br>";
  }
  if (values[1].length < 3) {
    error.classList.remove("hidden");
    error.innerHTML +=
      "Имя пользователя должно быть больше трёх символов!<br><br>";
  }
  if (values[1].length > 20) {
    error.classList.remove("hidden");
    error.innerHTML +=
      "Имя пользователя должно быть меньше 20 символов!<br><br>";
  }
  if (values[2].length < 6) {
    error.classList.remove("hidden");
    error.innerHTML += "Пароль должен быть больше шести символов!<br><br>";
  }
  if (values[2].length > 20) {
    error.classList.remove("hidden");
    error.innerHTML += "Пароль должен быть меньше 20 символов!<br><br>";
  }

  if (error.innerHTML === errorMessage) {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (!user)
      localStorage.setItem("user", JSON.stringify({ ["0"]: values, count: 0 }));
    else {
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          [user.count + 1]: values,
          count: user.count + 1,
        })
      );
    }
    inputs.forEach((input) => {
      input.value = "";
    });
    linkToMainPage.click();
    localStorage.setItem("currentName", values[1]);
  }
});
