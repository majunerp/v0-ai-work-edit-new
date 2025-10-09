import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    // Verify webhook signature (if Creem provides one)
    const signature = request.headers.get('x-creem-signature')

    // TODO: Implement signature verification when Creem documentation provides details

    const event = await request.json()

    console.log('Received Creem webhook:', event.type)

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data)
        break

      case 'subscription.created':
        await handleSubscriptionCreated(event.data)
        break

      case 'subscription.updated':
        await handleSubscriptionUpdated(event.data)
        break

      case 'subscription.cancelled':
        await handleSubscriptionCancelled(event.data)
        break

      case 'payment.succeeded':
        await handlePaymentSucceeded(event.data)
        break

      case 'payment.failed':
        await handlePaymentFailed(event.data)
        break

      default:
        console.log('Unhandled event type:', event.type)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 400 }
    )
  }
}

async function handleCheckoutCompleted(data: any) {
  const supabase = await createClient()

  const userId = data.metadata?.user_id
  if (!userId) return

  // Update user subscription status
  const { error } = await supabase
    .from('subscriptions')
    .upsert({
      user_id: userId,
      creem_customer_id: data.customer_id,
      creem_subscription_id: data.subscription_id,
      status: 'active',
      plan_type: data.price_id.includes('yearly') ? 'yearly' : 'monthly',
      current_period_start: new Date().toISOString(),
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date().toISOString()
    })

  if (error) {
    console.error('Error updating subscription:', error)
  }
}

async function handleSubscriptionCreated(data: any) {
  // Similar to checkout completed
  await handleCheckoutCompleted(data)
}

async function handleSubscriptionUpdated(data: any) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: data.status,
      current_period_end: data.current_period_end,
      updated_at: new Date().toISOString()
    })
    .eq('creem_subscription_id', data.id)

  if (error) {
    console.error('Error updating subscription:', error)
  }
}

async function handleSubscriptionCancelled(data: any) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'cancelled',
      cancelled_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('creem_subscription_id', data.id)

  if (error) {
    console.error('Error cancelling subscription:', error)
  }
}

async function handlePaymentSucceeded(data: any) {
  // Log successful payment or update payment history
  console.log('Payment succeeded:', data)
}

async function handlePaymentFailed(data: any) {
  // Handle failed payment - maybe notify user
  console.error('Payment failed:', data)
}
