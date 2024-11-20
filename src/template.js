export function createPaymentFormTemplate(options = {}) {
  const buttonText = options.buttonText || 'Pay Now';
  const labelText = options.labelText || 'Credit or debit card';

  return `
    <div class="stripe-payment-form">
      <form id="payment-form">
        <div class="form-row">
          <label for="card-element">${labelText}</label>
          <div id="card-element"></div>
          <div id="card-errors" role="alert"></div>
        </div>

        <button type="submit" id="submit-payment">
          <span id="button-text">${buttonText}</span>
          <div id="spinner" class="spinner hidden"></div>
        </button>
      </form>
    </div>
  `;
}

export const paymentFormStyles = `
  .stripe-payment-form {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
  }
  /* ... rest of the styles ... */
`;
