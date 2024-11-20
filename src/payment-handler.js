export class StripePaymentHandler {
  constructor(options = {}) {
    this.publicKey = options.publicKey;
    this.amount = options.amount || 0;
    this.currency = options.currency || 'usd';
    this.onSuccess = options.onSuccess || (() => {});
    this.onError = options.onError || (() => {});
    this.stripe = null;
    this.elements = null;
    this.card = null;
  }

  async initialize() {
    if (!this.publicKey) {
      throw new Error('Stripe public key is required');
    }

    // Load Stripe.js
    this.stripe = await loadStripe(this.publicKey);
    this.elements = this.stripe.elements();

    // Create card element
    this.card = this.elements.create('card', {
      style: {
        base: {
          fontSize: '16px',
          color: '#32325d',
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          '::placeholder': {
            color: '#aab7c4'
          }
        },
        invalid: {
          color: '#dc3545',
          iconColor: '#dc3545'
        }
      }
    });

    // Mount card element
    this.card.mount('#card-element');
    this.attachListeners();
  }

  attachListeners() {
    const form = document.getElementById('payment-form');
    const submitButton = document.getElementById('submit-payment');
    const spinner = document.getElementById('spinner');
    const buttonText = document.getElementById('button-text');

    // Handle real-time validation errors
    this.card.addEventListener('change', (event) => {
      const displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    // Handle form submission
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      submitButton.disabled = true;
      spinner.classList.remove('hidden');
      buttonText.classList.add('hidden');

      try {
        const { paymentMethod, error } = await this.stripe.createPaymentMethod({
          type: 'card',
          card: this.card,
        });

        if (error) {
          throw error;
        }

        await this.onSuccess(paymentMethod);
      } catch (error) {
        const errorElement = document.getElementById('card-errors');
        errorElement.textContent = error.message;
        this.onError(error);
      } finally {
        submitButton.disabled = false;
        spinner.classList.add('hidden');
        buttonText.classList.remove('hidden');
      }
    });
  }
}
