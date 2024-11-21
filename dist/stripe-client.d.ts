import { Stripe } from '@stripe/stripe-js';
import { StripeConfig, PaymentMethodRequest } from './types';
export declare class StripeClient {
    private stripe;
    private config;
    constructor(config: StripeConfig);
    private initStripe;
    getStripe(): Promise<Stripe>;
    createPaymentMethod(data: PaymentMethodRequest): Promise<import("@stripe/stripe-js").PaymentMethodResult>;
    confirmCardPayment(clientSecret: string, data: any): Promise<import("@stripe/stripe-js").PaymentIntentResult>;
    handleCardAction(clientSecret: string): Promise<import("@stripe/stripe-js").PaymentIntentResult>;
    retrievePaymentIntent(clientSecret: string): Promise<import("@stripe/stripe-js").PaymentIntentResult>;
    createToken(tokenType: 'card' | 'bank_account' | 'pii' | 'account', data: any): Promise<import("@stripe/stripe-js").TokenResult>;
    elements(options?: any): Promise<import("@stripe/stripe-js").StripeElements>;
}
