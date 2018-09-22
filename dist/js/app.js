//------------------------------------------------->
//-- SUBMIT EVENT LISTENER -->
//------------------------------------------------->

document
  .querySelector('#loan-form')
  .addEventListener('submit', function(event) {
    // Hide Results
    document.querySelector('#results').style.display = 'none';

    // Show Loader
    document.querySelector('#loading').style.display = 'block';
    setTimeout(calculateResults, 1500);
    event.preventDefault();
  });

//------------------------------------------------->
//-- CALCULATOR FUNCTION -->
//------------------------------------------------->

// Calculate Results
function calculateResults() {
  // UI Variables
  const $amount = document.querySelector('#amount');
  const $interest = document.querySelector('#interest');
  const $years = document.querySelector('#years');
  const $monthlyPay = document.querySelector('#monthly-payment');
  const $totalPay = document.querySelector('#total-payment');
  const $totalInt = document.querySelector('#total-interest');

  // Math Variables
  const principal = parseFloat($amount.value);
  const calcInterest = parseFloat($interest.value) / 100 / 12;
  const calcPayments = parseFloat($years.value) * 12;

  // Compute Monthly Payments
  const x = Math.pow(1 + calcInterest, calcPayments);
  const monthly = (principal * x * calcInterest) / (x - 1);

  if (isFinite(monthly)) {
    $monthlyPay.innerHTML = '&#36;' + monthly.toFixed(2);
    $totalPay.innerHTML = '&#36;' + (monthly * calcPayments).toFixed(2);
    $totalInt.innerHTML =
      '&#36;' + (monthly * calcPayments - principal).toFixed(2);

    // Show Results
    document.querySelector('#results').style.display = 'block';

    // Hide Loader
    document.querySelector('#loading').style.display = 'none';
  } else {
    showError('Please check your numbers');
  }
}

//------------------------------------------------->
//-- ERROR HANDLING -->
//------------------------------------------------->

function showError(error) {
  // Show Results
  document.querySelector('#results').style.display = 'none';

  // Hide Loader
  document.querySelector('#loading').style.display = 'none';

  // Create Div
  const $error = document.createElement('div');

  // Get Elements
  const $card = document.querySelector('.card');
  const $form = document.querySelector('#loan-form');

  // Add Class
  $error.className = 'alert alert-danger';

  // Create Text Node
  $error.appendChild(document.createTextNode(error));

  // Insert Error
  $card.insertBefore($error, $form);

  // Clear Error
  setTimeout(clearError, 1500);
}

// Clear Error
function clearError() {
  document.querySelector('.alert').remove();
}
