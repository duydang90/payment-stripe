export interface StripeConfig {
  publicKey: string;
  options?: {
    locale?: string;
    apiVersion?: string;
  };
}

export interface PaymentMethodRequest {
  type: string;
  card?: any;
  billing_details?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: {
      line1?: string;
      line2?: string;
      city?: string;
      state?: string;
      postal_code?: string;
      country?: string;
    };
  };
}

export interface PaymentIntentRequest {
  amount: number;
  currency: string;
  payment_method_types?: string[];
  description?: string;
  metadata?: Record<string, string>;
}
