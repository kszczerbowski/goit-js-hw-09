import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Notify.failure("Please choose a date in the future");
const inputs = document.querySelectorAll('input');
const createBtn = document.querySelector('button');
let firstDelay;
let delay;
let promiseAmount;
const chosenValues = [firstDelay, delay, promiseAmount];

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}

inputs.forEach((input, i) => {
  input.addEventListener('input', () => {
    chosenValues[i] = input.value;
  })
})

createBtn.addEventListener('click', (event) => {
  if (chosenValues.some((value) =>  value === 1 )) Notify.failure("Please fill in all 3 fields!");
  console.log(chosenValues.some(value => { value === 'undefined' }))
  console.log(delay === undefined)
  event.preventDefault();
  console.log(chosenValues)
  console.log(chosenValues.some((element, index, array) => {
    typeof element === undefined;
  }));
})
