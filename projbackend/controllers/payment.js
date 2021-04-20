const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "vsq2zwsd6tfw9y9j",
  publicKey: "mky3r68ywnc2kpn8",
  privateKey: "c36370a4a619a85c977245401d410a8b"
});

exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, function(err, response) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.send(response);
      }
    });
  };


exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;


    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
          if(err){
            res.status(500).json(err)
          }else{
              res.json(result)
          }
      });

}