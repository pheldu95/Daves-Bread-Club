const express = require('express');
const app = express();
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-08-01",
});
const { v4: uuidv4 } = require('uuid');
// const router = express.Router();
const axios = require('axios');
// const sessionMiddleware = require('./modules/session-middleware');

const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));
//serve static files from build folder instead of public folder
// app.use('/', express.static('build'));

//routes
app.get('/test', (req, res) => {
    // console.log(process.env.STRIPE_PRIVATE_KEY)
    res.send("working");
});

app.get("/config", (req, res) => {
    res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
});

app.post("/create-payment-intent", async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            currency: "eur",
            amount: 1999,
            automatic_payment_methods: {
                enabled: true,
            }
        });
        // console.log(paymentIntent.client_secret);
        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (e) {
        return res.status(400).send({
            error: {
                message: e.message,
            },
        })
    }
});

app.post('/order', (req,res)=>{
    console.log(req.body);
    const {product, token} = req.body;
    console.log(product);
    console.log("product price", product.price);
    const idempotencyKey = uuidv4();

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer =>{
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: `purchase of ${product.name}`
        }, {idempotencyKey})
    })
    .then(result=>res.sendStatus(200).json(result))
    .catch(err => console.log(err))
})

//listen
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});