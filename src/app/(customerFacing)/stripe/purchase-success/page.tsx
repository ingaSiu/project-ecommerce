import Image from 'next/image';
import Stripe from 'stripe';
import { formatCurrency } from '@/lib/formatters';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function SuccessPage({ searchParams }: { searchParams: { payment_intent: string } }) {
  const paymentIntent = await stripe.paymentIntents.retrieve(searchParams.payment_intent);

  return (
    <div className="max-w-5xl w-full mx-auto space-y-8">
      <div className="flex gap-4 items-center">
        <div className="aspect-video flex-shrink-0 w-1/3 relative">
          <Image src={product.imagePath} fill alt={product.name} className="object-cover" />
        </div>

        <div>
          <div className="text-lg">{formatCurrency(product.priceInCents / 100)}</div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="line-clamp-3 text-muted-foreground">{product.description}</div>
        </div>
      </div>
    </div>
  );
}
