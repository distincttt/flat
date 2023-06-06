const form = document.querySelector(".login-form");

const error = document.querySelector(".error");
error.innerHTML =
  "<br>Аккаунт не найден. Чтобы создать его, перейдите по <a href='../signup/signup.html'>ссылке</a> на страницу регистрации.";
const linkToMainPage = document.querySelector(".header__link");

const inputs = document.querySelectorAll(".login-input");
const values = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  inputs.forEach((input, i) => {
    values.push(input.value);
  });
  console.log(values);

  const storage = JSON.parse(localStorage.getItem("user"));
  if (!storage || !values[0] || !values[1]) error.classList.remove("hidden");
  else {
    const valuesUser = Object.values(storage);
    let isUserWasCreated = false;
    valuesUser.forEach((user) => {
      console.log(user, values);
      if (user[1] === values[0] && user[2] === values[1])
        isUserWasCreated = true;
    });
    if (isUserWasCreated) {
      localStorage.setItem("currentName", values[0]);
      inputs.forEach((input) => {
        input.value = "";
      });
      linkToMainPage.click();
    } else error.classList.remove("hidden");
  }
});
