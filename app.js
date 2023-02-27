const cardNumber = document.querySelector(".card-number");
const cardName = document.querySelector(".cardholder-name");
const cardExpDate = document.querySelector(".expiration-date");
const cardCVC = document.querySelector(".cvc span");
// inputs
const form = document.querySelector("form");
const inputName = document.querySelector("#name");
const inputNumber = document.querySelector("#card-number");
const inputMonth = document.querySelector("#month");
const inputYear = document.querySelector("#year");
const inputCVC = document.querySelector("#cvc");

const infoErr = document.querySelectorAll(".info-err");
const complete = document.querySelector(".complete");

const showErr = (input, arrErr, message) => {
	input.classList.add("input-err");
	infoErr[arrErr].classList.add("block");
	infoErr[arrErr].textContent = message;
};

const hideErr = (input, arrErr) => {
	input.classList.remove("input-err");
	infoErr[arrErr].classList.remove("block");
};

let inputNameValue;
let inputNumberValue;
let inputYearValue = "00";
let inputMonthValue = "00";
let inputCVCValue;

const validateInput = (input, arrErr, wordLength) => {
	if (!wordLength) {
		if (!input.value) {
			showErr(input, arrErr, "Can't be blank");
		} else {
			hideErr(input, arrErr);
			inputNameValue = input.value;
		}
	} else {
		if (!input.value) {
			showErr(input, arrErr, "Can't be blank");
		} else if (!/^\d+(\s\d+)*$/.test(input.value)) {
			showErr(input, arrErr, "Wrong format, numbers only");
		} else if (input.value.length < wordLength) {
			if (wordLength > 3) {
				showErr(input, arrErr, "Card number must be 16 numbers");
			} else {
				showErr(input, arrErr, `Card number must be ${wordLength} numbers`);
			}
		} else {
			hideErr(input, arrErr);

			switch (input) {
				case inputNumber:
					inputNumberValue = input.value;
					break;
				case inputMonth:
					inputMonthValue == input.value;
					break;
				case inputYear:
					inputYearValue = input.value;
					break;
				case inputCVC:
					inputCVCValue = input.value;
					break;
			}
		}
	}
};

inputName.addEventListener("input", (e) => {
	e.preventDefault();
	inputNameValue = e.target.value;
	cardName.textContent = inputNameValue;
});

inputNumber.addEventListener("input", (e) => {
	e.preventDefault;

	let formatText = e.target.value;

	formatText = formatText.substring(0, 19);
	formatText = formatText
		.replace(/\s/g, "")
		.replace(new RegExp(`(.{${4}})`, "g"), "$1 ")
		.trim();

	e.target.value = formatText;

	inputNumberValue = e.target.value;
	cardNumber.textContent = inputNumberValue;
});

const deleteSpace = (input) => {
	if (/\s/.test(input.value)) {
		let formatText = input.value.replace(/\s/g, "");
		input.value = formatText;
	}
};

inputMonth.addEventListener("input", (e) => {
	e.preventDefault();

	deleteSpace(inputMonth);

	inputMonthValue = e.target.value;
	cardExpDate.textContent = inputMonthValue + "/" + inputYearValue;
});

inputYear.addEventListener("input", (e) => {
	e.preventDefault();

	deleteSpace(inputYear);

	inputYearValue = e.target.value;
	cardExpDate.textContent = inputMonthValue + "/" + inputYearValue;
});

inputCVC.addEventListener("input", (e) => {
	e.preventDefault();

	deleteSpace(inputCVC);

	inputCVCValue = e.target.value;
	cardCVC.textContent = inputCVCValue;
});

form.addEventListener("submit", (e) => {
	e.preventDefault();

	inputNameValue = "";
	inputNumberValue = "";
	inputMonthValue = "00";
	inputYearValue = "00";
	inputCVCValue = "";

	validateInput(inputName, 0);
	validateInput(inputNumber, 1, 19);
	validateInput(inputMonth, 2, 2);
	validateInput(inputYear, 2, 2);
	validateInput(inputCVC, 3, 3);

	if (
		inputNameValue &&
		inputNumberValue &&
		inputMonthValue &&
		inputYearValue &&
		inputCVCValue
	) {
		cardName.textContent = inputNameValue;
		cardNumber.textContent = inputNumberValue;
		cardExpDate.textContent = inputMonthValue + "/" + inputYearValue;
		cardCVC.textContent = inputCVCValue;

		form.classList.add("hidden");
		complete.classList.add("block");
		complete.classList.remove("hidden");
	}
});

complete.addEventListener("click", () => {
	location.reload(true);
});
