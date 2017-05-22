import React from "react";
import {submitAction} from '../actions/action.js';
import StripeCheckout from 'react-stripe-checkout';
import Form from "../components/Form";
import MakePayment from "../components/MakePayment";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';



export default class Layout extends React.Component {
  constructor(props) {
    super(props);
  }


   onToken(token){
    //console.log("Data====",this.state)

    action : submitAction(token);
       }


  render() {
    const style = {
  marginRight: 20,
  marginBottom: 10
};
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div className="container">
       
          
          <h2><b>Example to check that StripeJS Works with React+Node+MongoDB+...Whatever</b></h2>
          <div className="col-lg-6">
          <Form/>
</div>

             
<div className="col-lg-6">
<Link to="/about">
      <RaisedButton label="Add Card to Existing Account" secondary={true} 
 

      style={style} /></Link>
<img src="https://softwareengineeringdaily.com/wp-content/uploads/2017/03/stripe.png"/>
<br/><br/>
         <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_jt7MldthCF2iiYGy8UhmKNym"
        name="PETA"
  description="Asking for fund"
  image="http://www.app-nw.org/wp-content/uploads/2012/09/app_logo-500x500.png"
  ComponentClass="div"
  panelLabel="Resgister Yourself"
  
  currency="USD"
      />
      
      
      <MakePayment/>

      </div>
      </div>
      </MuiThemeProvider>
    );
  }
}
