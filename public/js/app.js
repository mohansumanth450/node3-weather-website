
console.log("Client Side JS file loaded");

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    });
});

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const textOne = document.querySelector("#messageOne");
const textTwo = document.querySelector("#messageTwo");

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const location = search.value;
    textOne.textContent = "Loading...";
    textTwo.textContent = "";
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                textOne.textContent = data.error;
            }
            else {
                textOne.textContent = data.location;
                textTwo.textContent = data.body;
            }

        });
    });
});
