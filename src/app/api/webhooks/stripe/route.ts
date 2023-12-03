import Stripe from "stripe"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { stripe } from "@/libs/stripe"
import { firestore } from "@/service/firestore"
import { SUBSCRIPTION_TABLE } from "@/libs/table-name"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      "whsec_dYX90uo9wjEVKflhL3dhK75D1JD866Mg"
    )
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    if (!session?.metadata?.userId) {
      return new NextResponse("User id is required", { status: 400 })
    }

    console.log("session", session)

    await firestore
      .collection(SUBSCRIPTION_TABLE)
      .doc(session?.metadata?.userId)
      .set({
        userId: session.metadata.userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      })
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    if (!session?.metadata?.userId) {
      return new NextResponse("User id is required", { status: 400 })
    }
    console.log("session", session)

    await firestore
      .collection(SUBSCRIPTION_TABLE)
      .doc(session?.metadata?.userId)
      .set({
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      })
  }

  return new NextResponse(null, { status: 200 })
}
