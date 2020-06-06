const currencyElementOne = document.getElementById('currency-one');
const currencyElementTwo = document.getElementById('currency-two');
const amountElementOne = document.getElementById('amount-one');
const amountElementTwo = document.getElementById('amount-two');
const rateElement = document.getElementById('rate');
const swap = document.getElementById('swap');

function calculate() {
  const currencyOne = currencyElementOne.value;
  const currencyTwo = currencyElementTwo.value;

  fetch(
    `https://api.exchangeratesapi.io/latest?base=${currencyOne}&symbols=${currencyTwo}`
  )
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[currencyTwo];
      rateElement.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
      amountElementTwo.value = (amountElementOne.value * rate).toFixed(2);
    });
}
calculate();
currencyElementOne.addEventListener('change', calculate);
currencyElementTwo.addEventListener('change', calculate);

amountElementOne.addEventListener('input', calculate);
amountElementTwo.addEventListener('input', calculate);

swap.addEventListener('click', () => {
  const temp = currencyElementTwo.value;
  currencyElementTwo.value = currencyElementOne.value;
  currencyElementOne.value = temp;
  calculate();
});
