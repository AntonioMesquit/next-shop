import { stripe } from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req : NextApiRequest, res: NextApiResponse){
    const {priceId} = req.body
    if(req.method !== 'POST'){

        return res.status(405).json({error: 'METHOD not allowed'});

    }
    if(!priceId){
        return res.status(400).json({error: 'price not found'});
    }
    const sucessUrl = `${process.env.NEXT_URL}sucess?session_id={CHECKOUT_SESSION_ID}`
    const cancelurl = `${process.env.NEXT_URL}`
    const checkoutSession = await stripe.checkout.sessions.create({
        cancel_url: cancelurl,
        success_url: sucessUrl,
        mode: 'payment',
        line_items: [
            {
              price: priceId,
              quantity: 1,
            }
        ]
    }) 
    return res.status(201).json({
        checkoutUrl: checkoutSession.url,
    })
}
