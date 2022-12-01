import { Notify } from 'notiflix/build/notiflix-notify-aio';
const inputs = document.querySelectorAll('input');
const createBtn = document.querySelector('button');
let firstDelay;
let delay;
let promiseAmount;
const chosenValues = [firstDelay, delay, promiseAmount];

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return Promise.resolve({
      position: position,
      delay: delay
    });
  } else {
    return Promise.reject({
      position: position,
      delay: delay
    });
  }
}

inputs.forEach((input, i) => {
  input.addEventListener('input', () => {
    chosenValues[i] = parseFloat(input.value);
  })
})

createBtn.addEventListener('click', (event) => {
  [firstDelay, delay, promiseAmount] = chosenValues;
  event.preventDefault();
  if (chosenValues.some(chosenValue => chosenValue === undefined)) {
  Notify.failure("Please fill in all 3 fields!");
  } else {
    createBtn.setAttribute('disabled', '');
    for (let i = 1; i<= promiseAmount; i++) {
      setTimeout(() => {
        createPromise(i, delay)
        .then(({ position, delay }) => {
          delay = firstDelay + delay*(i-1);
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
        })
        .catch(({ position, delay }) => {
          delay = firstDelay + delay*(i-1);
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
        })
        if (i === promiseAmount) createBtn.removeAttribute('disabled');
      }, firstDelay + delay*(i-1))
    }
  }
})