const express = require('express');
const app = express();
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const uuid = require("uuid");
// const router = express.Router();
const axios = require('axios');
// const sessionMiddleware = require('./modules/session-middleware');

const bodyParser = require('body-parser');
const port = 50001;

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

app.post('/order', (req,res)=>{
    const {product, token} = req.body;
    console.log(product);
    console.log("product price", product.price);
    const idempotencyKey = uuid();

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
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});