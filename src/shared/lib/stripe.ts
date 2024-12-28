import Stripe from 'stripe';
import config from './config';

const stripe = new Stripe(config.STRIPE_SECRET_KEY, {
  apiVersion: '2024-10-28.acacia'
});

export default stripe;
