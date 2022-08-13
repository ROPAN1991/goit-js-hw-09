const delayInput = document.querySelector('[name="delay"]')
const stepInput = document.querySelector('[name="step"]')
const amountInput = document.querySelector('[name="amount"]')
const form = document.querySelector('[class="form"]')

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return new Promise((resolve, reject) => {
      return setInterval(() => resolve({ position, delay }), delay)
    })
  } else {
    return new Promise((resolve, reject) => {
      return setInterval(() => reject({ position, delay }), delay)
    })
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const { value: firstDelay } = delayInput
  const { value: stepDelay } = stepInput
  const { value: amount } = amountInput
  let lastDelay = Number(firstDelay)

  for (let i = 0; i < amount; i++) {
    setTimeout(() => {
      createPromise(i + 1, lastDelay)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`)
        }).catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`)
      });
      lastDelay += Number(stepDelay)
    }, lastDelay)
  }
})