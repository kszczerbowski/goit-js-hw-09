import { Notify } from 'notiflix/build/notiflix-notify-aio';
const inputs = document.querySelectorAll('input');
const createBtn = document.querySelector('button');
let i;
let firstDelay;
let delay;
let promiseAmount;
let promiseInterval;
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
    setTimeout(() => {
      createPromise(1, firstDelay)
        .then(({ position, delay }) => Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`))
        .catch(({ position, delay }) => Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`));
      i = 2;
      if (i <= promiseAmount) {
        promiseInterval = setInterval(() => {
          createPromise(i, delay)
          .then(({ position, delay }) => {
            delay = firstDelay + delay*(i-2);
            Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
          })
          .catch(({ position, delay }) => {
            delay = firstDelay + delay*(i-2);
            Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
          });
          i++;
          if (i > promiseAmount) clearInterval(promiseInterval);
        }, delay);
      }
    }, firstDelay)
  }
})