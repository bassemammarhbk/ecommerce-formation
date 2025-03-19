const express = require('express');
const router = express.Router();
const Stripe = require('stripe')('sk_test_51R1oQIBfO5fr7J699XaSTAJsb6S73UrS2Qu458MY9uHcIbCWtUzdwHxe0AkMZTPadMYI0BNJDkOX2fnNjNcXTkgu006p40j3kr');
router.post('/', async (req, res) => {
    try {
    const session = await Stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: Object.values(req.body.cartDetails).map(item => ({
    price_data: {
    currency: "usd",
    product_data: {
    name: item.title,
    images:[item.image]
    },
    unit_amount: item.price * 100,
    },
    quantity: item.quantity,
    })),
    success_url: `${process.env.CLIENT_URL}`,
    cancel_url: `${process.env.CLIENT_URL}`,
    })
    res.json({ sessionId: session.id })
    } catch (e) {
    res.status(500).json({ error: e.message })
    }
    });
module.exports = router;