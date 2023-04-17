import Notiflix from 'notiflix';

const firstDelay = document.querySelector('input[name=delay]');
const inputStepDelay = document.querySelector('input[name=step]');
const inputAmount = document.querySelector('input[name=amount]');
const form = document.querySelector('.form');

form.addEventListener('submit', submitForm);

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  }); return promise;
}

function submitForm(evt) {
  evt.preventDefault();

  let startDelay = Number(firstDelay.value);
  let amount = Number(inputAmount.value);
  let stepDelay = Number(inputStepDelay.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, startDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    startDelay += stepDelay;
  }
}