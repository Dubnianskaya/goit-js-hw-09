
const refs = {
  form: document.querySelector(".form"),
  submitBtn: document.querySelector("button"),
}

refs.form.addEventListener("submit", onFormData);

function onFormData(event) {
  event.preventDefault()
  const {
    elements: { delay, step, amount}
  } = event.currentTarget;
  const firstDelay = delay.value;
  let totalDelay = firstDelay;
  let numberOfPosition = 0;
  for (let i = 0; i < amount.value; i += 1) {
    totalDelay += step.value;
    numberOfPosition += 1;
    createPromise(numberOfPosition, totalDelay);
    createPromise().then(value => {
    console.log(value);
  })
  .catch(error => {
    console.log(error);
  });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
  //   resolve(i), firstDelay);
  // }).then(value => console.log(value));
  if (shouldResolve) {
    resolve(`✅ Fulfilled promise ${position} in ${delay}ms`)
  } else {
    reject(`❌ Rejected promise ${position} in ${delay}ms`)
  }
}, delay);
  });
}

