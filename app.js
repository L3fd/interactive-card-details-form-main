const cardNumber = document.querySelector(".card-number");
const cardName = document.querySelector(".cardholder-name");
const cardExpDate = document.querySelector(".exp-date");
const cardCVC = document.querySelector(".cvc span");
// inputs
const form = document.querySelector("form");
const inputName = document.querySelector("#name");
const inputNumber = document.querySelector("#card-number");
const inputMonth = document.querySelector("#month");
const inputYear = document.querySelector("#year");
const inputCVC = document.querySelector("#cvc");

const infoErr = document.querySelectorAll(".info-err");
const complete = document.querySelectorAll(".complete");

const showErr = (input, arrErr, message) => {
	input.classList.add("input-err");
	infoErr[arrErr].classList.add("block");
	infoErr[arrErr].textContent = message;
};

const hideErr = (input, arrErr) => {
	input.classList.remove("input-err");
	infoErr[arrErr].classList.remove("block");
};
