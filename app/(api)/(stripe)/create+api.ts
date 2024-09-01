import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, amount, address, postalCode, city } = body;

  if (!name || !email || !amount) {
    return new Response(
      JSON.stringify({ error: "Missing required fields", status: 400 }),
    );
  }

  let customer;

  const existingCustomer = await stripe.customers.list({
    email: email,
  });

  if (existingCustomer.data.length > 0) {
    customer = existingCustomer.data[0];
  } else {
    customer = await stripe.customers.create({
      email: email,
      name: name,
      address: {
        line1: address,
        postal_code: postalCode,
        city: city,
        state: "CA",
        country: "US",
      },
    });
  }

  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2023-10-16" },
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: parseInt(amount) * 100,
    currency: "usd",
    customer: customer.id,
    description: "Uber ride services",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter
    // is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: "never",
    },
    shipping: {
      name: customer.id,
      address: {
        line1: address,
        postal_code: postalCode,
        city: city,
        state: "CA",
        country: "US",
      },
    },
  });

  return new Response(
    JSON.stringify({
      paymentIntent: paymentIntent,
      ephemeralKey: ephemeralKey,
      customer: customer.id,
    }),
  );
}
