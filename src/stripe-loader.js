let stripeInstance = null;

/**
 * Load Stripe.js script dynamically
 * @returns {Promise<void>}
 */
const loadStripeScript = () => {
  return new Promise((resolve, reject) => {
    if (document.querySelector('script[src="https://js.stripe.com/v3/"]')) {
      resolve(); // Already loaded
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.async = true;

    script.onload = resolve;
    script.onerror = () => reject(new Error('Failed to load Stripe.js'));

    document.head.appendChild(script);
  });
};

/**
 * Initialize Stripe.js with a publishable key
 * @param {string} publishableKey - Stripe publishable key
 * @returns {Promise<Stripe>} - The initialized Stripe instance
 */
export const initializeStripe = async (publishableKey) => {
  if (!publishableKey) {
    throw new Error('Publishable key is required to initialize Stripe');
  }

  // Load the Stripe.js script
  await loadStripeScript();

  // Initialize Stripe instance
  if (!stripeInstance) {
    stripeInstance = window.Stripe(publishableKey);
  }

  return stripeInstance;
};

/**
 * Get the initialized Stripe instance
 * @returns {Stripe | null} - Stripe instance if initialized, null otherwise
 */
export const getStripeInstance = () => {
  return stripeInstance;
};
