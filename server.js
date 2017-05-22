//const keyPublishable = 'pk_test_jt7MldthCF2iiYGy8UhmKNym';
const keySecret = 'sk_test_xfzQdrCT8JoslGHnxxXi179I';
var mongojs = require('mongojs');

var db = mongojs('Stripe', ['charges']);
const app = require("express")();
const stripe = require("stripe")(keySecret);
var bodyParser= require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});




// app.post("/submitToken", (req, res) => {
 
//   //console.log('req.body===============',req.body.email)
//   //console.log('req.body===============',req.body.id)
  

//   stripe.customers.create({
//     email: req.body.email,
//     source: req.body.id
//   })
//    .then(customer =>{

//      //console.log('customer=======',customer.sources.data[0].fingerprint)
//      const FPrint=customer.sources.data[0].fingerprint
//      db.charges.findOne({
//       fingerPrint: FPrint 
//      },function(err,doc){
//       if(doc){
//         //----if CARD fOUND IN THE DATAbASE
//         //console.log('FOUND THE CARD===',doc)
//         res.send("CARD ALREADY EXISTS WITH THAT ENTRY")

//       }
//       if(!doc){
//        //IF CARD WASN'T FOUND IN THE DATABASE
//         let cardArray=[]
//   cardArray.push(customer.sources.data[0].fingerprint)
//             db.charges.insert({customerID: customer.id, customerEmail: customer.email,
//     fingerPrint: cardArray},function(err,doc){
//        if(doc){

//          //console.log('Saved to DataBase');
//          res.send(customer.id);
//        }
//        if(!doc){
//           //console.log('Saved to DataBase');
//          res.send("Unable to save in DataBase");
//        }
     
//     }); //==DB insert Customer email and ID====================
//       }
//      })
//    });
   

// });//-------post method=================


app.post('/customerDetails', (req,res)=>{

  console.log('request.body====',req.body)
db.customers.findOne({
      customerName: req.body.card.name 
     },function(err,doc){
      if(doc){
        //----if CARD fOUND IN THE DATAbASE
        console.log('FOUND THE User===',doc)
        res.send("USER ALREADY EXISTS WITH THAT EMAIL")

      }
      if(!doc){
       //IF CARD WASN'T FOUND IN THE DATABASE
       stripe.customers.create({
  email: req.body.card.name,
  source: req.body.id,
}).then(function(customer) {
  let cardArray=[]
  cardArray.push({fingerPrint:customer.sources.data[0].fingerprint,
    last4:customer.sources.data[0].last4});
 

  // YOUR CODE: Save the customer ID and other info in a database for later.
            db.customers.insert({customerID: customer.sources.data[0].customer,
             customerName: customer.sources.data[0].name,
             Card1: cardArray },function(err,doc){
       if(doc){

         //console.log('Saved to DataBase');
         res.send("Your Details Saved Successfully");
       }
       if(!doc){
          //console.log('unable to save in DataBase');
         res.send("Unable to save in DataBase");
       }

     });

    });
            

          }

        });
 }); 


app.post('/AddCard', (req,res)=>{

  console.log('request.body====',req.body)
db.customers.findOne({
      customerName: req.body.card.name 
     },function(err,doc){
      if(doc){
        //----if CARD fOUND IN THE DATAbASE
        console.log('FOUND THE CustomerID===',doc.customerID)
        var cusId=doc.customerID;
        stripe.customers.createSource(
  cusId,
  { source: req.body.id },
  function(err, card) {
    // asynchronously called
    if(err){
      console.log('Error=====',err)
    }
    else{
      console.log('Card=====',card)
db.customers.findOne({
  fingerPrint: card.fingerprint
},function(err,doc){
  if(doc){
    res.send("Card Already EXISTS with That Account")
  }
  else{
    let cardArray=[]
  cardArray.push({fingerPrint:card.fingerprint,last4:card.last4});
   
  db.customers.findAndModify({
     query: { customerName: card.name },
    update: { $set: { Card2: cardArray } },
    new: false
  },function(err,doc){
       if(doc){

         //console.log('Saved to DataBase');
        res.send("New Card Added to your Account")
       }
       if(!doc){
          //console.log('unable to save in DataBase');
         res.send("Unable to Add Card");
       }

     });


  }//else above
})
    }
  }
);

}
  
  
      if(!doc){
       //IF CARD WASN'T FOUND IN THE DATABASE
       stripe.customers.create({
  email: req.body.card.name,
  source: req.body.id,
}).then(function(customer) {
  // YOUR CODE: Save the customer ID and other info in a database for later.
            db.customers.insert({customerID: customer.sources.data[0].customer,
             customerName: customer.sources.data[0].name,
             cardLast4: customer.sources.data[0].last4,
             fingerPrint: customer.sources.data[0].fingerprint },function(err,doc){
       if(doc){

         //console.log('Saved to DataBase');
         res.send("Your Details Saved Successfully");
       }
       if(!doc){
          //console.log('unable to save in DataBase');
         res.send("Unable to save in DataBase");
       }

     });

    });
            

          }
});


 }); 




app.listen(4567,function(){
  console.log('Stripe is running on 4567')
});