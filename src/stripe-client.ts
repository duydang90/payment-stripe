import { loadStripe, Stripe, StripeConstructorOptions } from '@stripe/stripe-js';
import { StripeConfig, PaymentMethodRequest, PaymentIntentRequest } from './types';

export class StripeClient {
  private stripe: Promise<Stripe | null> | null = null;
  private config: StripeConfig;

  constructor(config: StripeConfig) {
    this.config = config;
  }

  private initStripe(): Promise<Stripe | null> {
    if (!this.stripe) {
      this.stripe = loadStripe(this.config.publicKey, {
        locale: this.config.options?.locale as StripeConstructorOptions['locale'],
        apiVersion: this.config.options?.apiVersion
      });
    }
    return this.stripe;
  }

  async getStripe(): Promise<Stripe> {
    const stripe = await this.initStripe();
    if (!stripe) {
      throw new Error('Failed to initialize Stripe');
    }
    return stripe;
  }

  async createPaymentMethod(data: PaymentMethodRequest) {
    const stripe = await this.getStripe();
    return stripe.createPaymentMethod(data as any);
  }

  async confirmCardPayment(clientSecret: string, data: any) {
    const stripe = await this.getStripe();
    return stripe.confirmCardPayment(clientSecret, data);
  }

  async handleCardAction(clientSecret: string) {
    const stripe = await this.getStripe();
    return stripe.handleCardAction(clientSecret);
  }

  async retrievePaymentIntent(clientSecret: string) {
    const stripe = await this.getStripe();
    return stripe.retrievePaymentIntent(clientSecret);
  }

  async createToken(tokenType: 'card' | 'bank_account' | 'pii' | 'account', data: any) {
    const stripe = await this.getStripe();
    return stripe.createToken(tokenType as any, data);
  }

  async elements(options?: any) {
    const stripe = await this.getStripe();
    return stripe.elements(options);
  }
}
