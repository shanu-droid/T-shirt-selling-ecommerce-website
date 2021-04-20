const stripe = require("stripe")("sk_test_51IcqR5SEWXl2FzuQLVdRClg7IDiTFwyNaB2Tg6zrYWzRKpCpwzqQt7RQMnTxXgdM8jF5D2UBCzXRDEzLhXJeTgOf00KiLhbq1m")
const { v4: uuid } = require('uuid');



exports.makepayment = (req, res) => {

 const {products, token} = req.body;
 console.log("PRODUCTS", products)

 let amount = 0;
  products.map(p => {
      amount = amount + p.price;
  })

  const idempotencyKey = uuid();

  return stripe.customers.create({
      email: token.email,
      source: token.id
  }).then(customer => {
        return stripe.charges.create({
          amount:amount,
          currency:'INR',
          customer: customer.id,
          recipet_email: token.email,
          description:"a test account",
          shipping: {
              name: token.card.name,
              address:{
                  line1: token.card.address_line1,
                  line2: token.card.address_line2,
                  city: token.card.address_city,
                  country: token.card.address_country,
                  postal_code: token.card.address_zip
              }
          }
      }, {idempotencyKey})
      .then(result => res.status(200).json(result))
      .catch(err => console.log(err))
      
  })
}