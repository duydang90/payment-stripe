# payment-stripe-v2

A reusable Stripe payments wrapper for NextJS and EmberJS projects.

## Installation

```bash
npm install payment-stripe-v2
```

## Usage

### NextJS TypeScript Example

```typescript
  import { StripeClient } from 'payment-stripe-v2';

  const stripeClient = new StripeClient({
    publicKey: process.env.NEXT_PUBLIC_STRIPE_KEY!,
  });

  // Create payment method
  const { paymentMethod, error } = await stripeClient.createPaymentMethod({
    type: 'card',
    card: elements.getElement('card'),
    billing_details: {
      name: 'John Doe',
    },
  });
  // Confirm payment
  const { paymentIntent } = await stripeClient.confirmCardPayment(clientSecret, {
    payment_method: paymentMethod.id,
  });
```

### EmberJS Example
```javascript
  import Component from '@glimmer/component';
  import { StripeClient } from 'payment-stripe-v2';
  export default class PaymentComponent extends Component {
      stripeClient = new StripeClient({
      publicKey: config.stripeKey,
    });
    async handlePayment() {
      const { paymentMethod } = await this.stripeClient.createPaymentMethod({
        type: 'card',
        card: this.cardElement,
      });
      // Handle payment confirmation
    }
  }
```

To use this package:

1. Build and publish to npm:

```bash
npm run build
npm publish
```

2. Install in your project:

```bash
npm install payment-stripe-v2
```

3. Usage in NextJS:

```typescript
  import { StripeClient } from 'payment-stripe-v2';
  const stripeClient = new StripeClient({
    publicKey: process.env.NEXT_PUBLIC_STRIPE_KEY!,
  });
  // Use the client methods
```

4. Usage in EmberJS:
```javascript
  import { StripeClient } from 'payment-stripe-v2';
  const stripeClient = new StripeClient({
    publicKey: config.stripeKey,
  });
  // Use the client methods
```

This package provides a consistent interface for both frameworks while handling the Stripe.js initialization and common payment operations. The TypeScript types ensure type safety in TypeScript projects while still being usable in JavaScript projects like EmberJS.
