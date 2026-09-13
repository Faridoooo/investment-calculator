const form = document.querySelector('#savings-form');
const amountInput = document.querySelector('#amount');
const rateInput = document.querySelector('#rate');
const errorMessage = document.querySelector('#error-message');

const currencyFormatter = new Intl.NumberFormat('ar-SA', {
  style: 'currency',
  currency: 'SAR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatCurrency(value) {
  return currencyFormatter.format(value);
}

function displayResults(amount, rate) {
  const yearlyReturn = amount * (rate / 100);
  const dailyReturn = yearlyReturn / 365;
  const monthlyReturn = yearlyReturn / 12;
  const totalAfterYear = amount + yearlyReturn;

  document.querySelector('#daily-return').textContent = formatCurrency(dailyReturn);
  document.querySelector('#monthly-return').textContent = formatCurrency(monthlyReturn);
  document.querySelector('#yearly-return').textContent = formatCurrency(yearlyReturn);
  document.querySelector('#total-after-year').textContent = formatCurrency(totalAfterYear);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const amount = Number(amountInput.value);
  const rate = Number(rateInput.value);

  if (!Number.isFinite(amount) || !Number.isFinite(rate) || amount < 0 || rate < 0 || amountInput.value === '' || rateInput.value === '') {
    errorMessage.textContent = 'يرجى إدخال مبلغ ونسبة عائد صالحين (صفر أو أكثر).';
    return;
  }

  errorMessage.textContent = '';
  displayResults(amount, rate);
});
