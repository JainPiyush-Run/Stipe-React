import axios from "axios";

export function submitAction(exp) {
  console.log("I am Checking the sUBMIT FUNCTION IN ACTION.JS");
console.log(exp);

// stripe.tokens.create({
//   card: {
//     "number": '4242424242424242',
//     "exp_month": 12,
//     "exp_year": 2018,
//     "cvc": '123'
//   }
// }, function(err, token) {
//   if(err){
//   console.log(err)
// }
// });

// Send a POST request 
axios({
  method: 'post',
  url: 'http://localhost:4567/submitToken',
  data: exp
  
}).then(function(response){
  console.log("This is response from server",response);
  alert(response.data);

            //window.location.href = "http://localhost:8080";

  
}).catch(function (error) {
    console.log(error);
  });

}
export function customerDetails(exp) {
  console.log("I am Checking the customerDetails FUNCTION IN ACTION.JS");
console.log(exp);
axios({
  method: 'post',
  url: 'http://localhost:4567/customerDetails',
  data: exp
  
}).then(function(response){
  console.log("This is response from server",response);
  alert(response.data);

            //window.location.href = "http://localhost:8080";

  
}).catch(function (error) {
    console.log(error);
  });

}


export function makePayment(exp) {
  console.log("I am Checking the makePayment FUNCTION IN ACTION.JS");
console.log(exp);
axios({
  method: 'post',
  url: 'http://localhost:4567/makePayment',
  data: exp
  
}).then(function(response){
  console.log("This is response from server",response);
  alert(response.data);

            //window.location.href = "http://localhost:8080";

  
}).catch(function (error) {
    console.log(error);
  });

}


export function AddCard(exp) {
  console.log("I am Checking the AddCard FUNCTION IN ACTION.JS");
console.log(exp);
axios({
  method: 'post',
  url: 'http://localhost:4567/AddCard',
  data: exp
  
}).then(function(response){
  console.log("This is response from server",response);
  alert(response.data);

            //window.location.href = "http://localhost:8080";

  
}).catch(function (error) {
    console.log(error);
  });

}


 // let customerArray = []
 //  customerArray.push(customer.sources.data[0])
 //            db.customers.insert({customer: customerArray },function(err,doc){