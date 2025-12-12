import Stripe from 'stripe';
import { ENV } from '@/config';

export class StripePayment {
  private stripe: Stripe;

  constructor(secretKey: string) {
    this.stripe = new Stripe(secretKey, {
      apiVersion: '2025-11-17.clover',
    });
  }

  public async createPaymentIntent(payload: {
    amount: number;
    currency: string;
    txrn_id: string;
    customer_email: string;
    customer_name: string;
    customer_phone: string;
  }) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: payload.amount * 100, // Stripe uses cents
        currency: payload.currency.toLowerCase(),
        metadata: {
          txrn_id: payload.txrn_id,
          customer_name: payload.customer_name,
          customer_phone: payload.customer_phone,
          product_name: 'Jobx Pro Features',
        },
        receipt_email: payload.customer_email,
        description: 'Jobx Pro Features - Lifetime Access',
      });

      return {
        status: 'SUCCESS',
        client_secret: paymentIntent.client_secret,
        payment_intent_id: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
      };
    } catch (error) {
      console.error('Stripe Payment Intent Error:', error);
      throw error;
    }
  }

  public async confirmPayment(paymentIntentId: string) {
    try {
      const paymentIntent =
        await this.stripe.paymentIntents.retrieve(paymentIntentId);
      return {
        status: paymentIntent.status,
        payment_intent: paymentIntent,
      };
    } catch (error) {
      console.error('Stripe Payment Confirmation Error:', error);
      throw error;
    }
  }

  public async verifyCheckoutSession(sessionId: string) {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId);
      return {
        status: session.status,
        payment_status: session.payment_status,
        session,
        metadata: session.metadata,
      };
    } catch (error) {
      console.error('Stripe Session Verification Error:', error);
      throw error;
    }
  }

  public async createCheckoutSession(payload: {
    amount: number;
    currency: string;
    txrn_id: string;
    customer_email: string;
    customer_name: string;
    customer_phone: string;
  }) {
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: payload.currency.toLowerCase(),
              product_data: {
                name: 'Jobx Pro Features',
                description:
                  'Lifetime access to premium job application features',
              },
              unit_amount: payload.amount * 100, // Stripe uses cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${ENV.FRONTEND_URL}/payment/succeed?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${ENV.FRONTEND_URL}/payment/canceled`,
        customer_email: payload.customer_email,
        metadata: {
          txrn_id: payload.txrn_id,
          customer_name: payload.customer_name,
          customer_phone: payload.customer_phone,
        },
      });

      return {
        status: 'SUCCESS',
        checkout_url: session.url,
        session_id: session.id,
      };
    } catch (error) {
      console.error('Stripe Checkout Session Error:', error);
      throw error;
    }
  }
}
