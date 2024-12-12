import { NextResponse } from 'next/server'
// import Stripe from 'stripe'

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2023-10-16',
// })

export async function POST(req: Request) {
  return NextResponse.json(
    { message: 'Checkout temporarily disabled' },
    { status: 503 }
  )
  
  // try {
  //   const body = await req.json()
  //   const { productId } = body

  //   // Map product IDs to Stripe prices
  //   const prices = {
  //     'sheets-crm': {
  //       price: 10000, // $100 in cents
  //       name: 'Sheets CRM',
  //     },
  //     'calendar-automations': {
  //       price: 10000,
  //       name: 'Calendar Automations',
  //     },
  //     'growth-playbook': {
  //       price: 10000,
  //       name: 'Growth Playbook',
  //     },
  //     'dashboard-template': {
  //       price: 10000,
  //       name: 'Dashboard Template',
  //     },
  //   }

  //   const product = prices[productId as keyof typeof prices]
    
  //   if (!product) {
  //     return NextResponse.json(
  //       { error: 'Invalid product ID' },
  //       { status: 400 }
  //     )
  //   }

  //   // Create Checkout Session
  //   const session = await stripe.checkout.sessions.create({
  //     payment_method_types: ['card'],
  //     line_items: [
  //       {
  //         price_data: {
  //           currency: 'usd',
  //           product_data: {
  //             name: product.name,
  //           },
  //           unit_amount: product.price,
  //         },
  //         quantity: 1,
  //       },
  //     ],
  //     mode: 'payment',
  //     success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop?success=true`,
  //     cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop?canceled=true`,
  //   })

  //   return NextResponse.json({ sessionId: session.id })
  // } catch (error) {
  //   console.error('Error creating checkout session:', error)
  //   return NextResponse.json(
  //     { error: 'Error creating checkout session' },
  //     { status: 500 }
  //   )
  // }
} 