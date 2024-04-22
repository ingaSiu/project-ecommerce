import Stripe from 'stripe';
import db from '@/db/db';
import { notFound } from 'next/navigation';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function Purchase({ params: { id } }: { params: { id: string } }) {
  const product = await db.product.findUnique({ where: { id } });
  if (product == null) return notFound();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: product.priceInCents,
    currency: 'EUR',
    metadata: { productId: product.id },
  });

  if (paymentIntent.client_secret == null) {
    throw Error('Stripe failed to create payment intent');
  }

  return <h1>Hello</h1>;
}
