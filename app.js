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

const defaultLogo = document.querySelector("#default-logo");
const visaLogo = document.querySelector("#visa");
const masterLogo = document.querySelector("#master");
const amexLogo = document.querySelector("#amex");

const showErr = (input, arrErr, message) => {
	input.classList.add("input-err");
	infoErr[arrErr].classList.add("block");
	infoErr[arrErr].textContent = message;
};

const hideErr = (input, arrErr) => {
	input.classList.remove("input-err");
	infoErr[arrErr].classList.remove("block");
};

const detectCardType = (cardNumber) => {
	const firstFourDigits = cardNumber.substring(0, 4);
	let cardType = "";

	if (/^4/.test(firstFourDigits)) {
		cardType = "Visa";
	} else if (/^5[1-5]/.test(firstFourDigits)) {
		cardType = "Mastercard";
	} else if (/^3[47]/.test(firstFourDigits)) {
		cardType = "Amex";
	}
	return cardType;
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
	if (inputNumberValue === "") {
		cardNumber.textContent = "0000 0000 0000 0000";
	}

	const cardType = detectCardType(inputNumberValue);

	if (cardType === "") {
		if (defaultLogo.classList.contains("hidden")) {
			defaultLogo.classList.remove("hidden");
			visaLogo.classList.remove("block");
			visaLogo.classList.add("hidden");
			masterLogo.classList.remove("block");
			masterLogo.classList.add("hidden");
			amexLogo.classList.remove("block");
			amexLogo.classList.add("hidden");

			defaultLogo.classList.add("block");
		}
	}
	if (cardType === "Visa") {
		defaultLogo.classList.add("hidden");
		if (masterLogo.classList.contains("block")) {
			masterLogo.classList.remove("block");
			masterLogo.classList.add("hidden");
		}
		if (amexLogo.classList.contains("block")) {
			amexLogo.classList.remove("block");
			amexLogo.classList.add("hidden");
		}
		visaLogo.classList.remove("hidden");
		visaLogo.classList.add("block");
	}
	if (cardType === "Mastercard") {
		defaultLogo.classList.add("hidden");
		if (visaLogo.classList.contains("block")) {
			visaLogo.classList.remove("block");
			visaLogo.classList.add("hidden");
		}
		if (amexLogo.classList.contains("block")) {
			amexLogo.classList.remove("block");
			amexLogo.classList.add("hidden");
		}
		masterLogo.classList.remove("hidden");
		masterLogo.classList.add("block");
	}
	if (cardType === "Amex") {
		defaultLogo.classList.add("hidden");
		if (visaLogo.classList.contains("block")) {
			visaLogo.classList.remove("block");
			visaLogo.classList.add("hidden");
		}
		if (masterLogo.classList.contains("block")) {
			masterLogo.classList.remove("block");
			masterLogo.classList.add("hidden");
		}
		amexLogo.classList.remove("hidden");
		amexLogo.classList.add("block");
	}
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
