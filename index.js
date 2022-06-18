const billAmount = document.getElementById("bill-amount");
const amountRecieved = document.getElementById("amount-recieved");
const quantity = document.querySelectorAll(".quantity");
const value = document.querySelectorAll(".value");

const validateButton = document.getElementById("validate-button");
const changeButton = document.getElementById("change-button");

const errorMessageFirst = document.getElementById("error-message-first");
const errorMessageSecond = document.getElementById("error-message-second");

const secondContainer = document.getElementById("second-container");
const thirdContainer = document.getElementById("third-container");

const denomination = [2000, 500, 100, 20, 10, 5, 1];

secondContainer.style.display = "none";
thirdContainer.style.display = "none";

/*Validation of bill amount*/
function validateBillAmount() {
    errorMessageFirst.style.display = "none";
    if (Number(billAmount.value) > 0) {
        secondContainer.style.display = "block";
        changeButton.addEventListener("click", validateAmountRecieved);
    } else {
        firstErrorMessage();
    }
}

/*Validation of amount recieved*/
function validateAmountRecieved() {
    errorMessageSecond.style.display = "none";
    if (Number(amountRecieved.value) > Number(billAmount.value)) {
        thirdContainer.style.display = "block";
        const amountToReturn = Number(amountRecieved.value) - Number(billAmount.value);
        changeToBeGiven(amountToReturn);
    } else {
        secondErrorMessage();
    }
}

/*Calculation of minimum numbers of notes to be returned*/
function changeToBeGiven(amountToReturn) {
    for (let i = 0; i < denomination.length; i++) {
        const noOfNotes = Math.trunc(amountToReturn / denomination[i]);
        amountToReturn %= denomination[i];
        quantity[i].innerText = noOfNotes;
        value[i].innerText = denomination[i] * noOfNotes;
    }
    
}

/*Error message during validating bill amount phase*/
function firstErrorMessage() {
    secondContainer.style.display = "none";
    errorMessageFirst.style.display = "block";
    if (billAmount.value === "") {
        errorMessageFirst.innerText = "Enter the Bill Amount! smh!";
    } else {
        errorMessageFirst.innerText = "Enter a valid Bill Amount.";
    }
}

/*Error message during validating amount recieved phase*/
function secondErrorMessage() {
    thirdContainer.style.display = "none";
    errorMessageSecond.style.display = "block";
    if (Number(amountRecieved.value) == Number(billAmount.value)) {
        errorMessageSecond.innerText = "No Change to be given.";
    } else if (amountRecieved.value === "") {
        errorMessageSecond.innerText = "Enter the Amount Recieved! smh!";
    } else {
        errorMessageSecond.innerText = "Ask the customer to wash dishes :)";
    }
}

validateButton.addEventListener("click", validateBillAmount);