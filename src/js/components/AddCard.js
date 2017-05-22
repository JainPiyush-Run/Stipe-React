import React from 'react';
import Formsy from 'formsy-react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup,
    FormsySelect, FormsyText, FormsyTime, FormsyToggle, FormsyAutoComplete } from 'formsy-material-ui/lib';
import {customerDetails} from '../actions/action.js';
import {AddCard} from '../actions/action.js';

const Form = React.createClass({

  /**
   * As an alternative to `MuiThemeProvider` you can add a theme directly into context.
   * See the [Material-UI themes](http://www.material-ui.com/#/customization/themes) docs for details.
   *
   * childContextTypes: {
   *   muiTheme: React.PropTypes.object,
   * },
   * getChildContext(){
   *   return {
   *     muiTheme: getMuiTheme(),
   *   }
   * },
   */

  getInitialState() {
    return {
      canSubmit: false,
    };
  },

  errorMessages: {
    wordsError: "Please only use letters",
    numericError: "Invalid Number",
    urlError: "Please provide a valid Email"
  },

  styles: {
    paperStyle: {
      color: 'pink',
      width: 300,
      margin: 'auto',
      padding: 20,
    },
    switchStyle: {
      marginBottom: 16,
    },
    submitStyle: {
      marginTop: 32,
    },
  },



  enableButton() {
    this.setState({
      canSubmit: true,
    });
  },

  disableButton() {
    this.setState({
      canSubmit: false,
    });
  },

  submitForm(data) {
    alert(JSON.stringify(data));
    console.log("data",data);
    Stripe.setPublishableKey('pk_test_jt7MldthCF2iiYGy8UhmKNym');
    Stripe.card.createToken({
  number: data.card_no,
  cvc: data.cvc,
  exp_month: data.month,
  exp_year: data.year,
  name: data.email
}, this.stripeResponseHandler);

  },
stripeResponseHandler(status, response) {

  if (response.error) { // Problem!

console.log('response-------',response)
alert('INVALID CARD DETAILS')
  } else { // Token was created!

    // Get the token ID:
    var token = response.id;
    console.log('token======',response)
    action : AddCard(response);


  }
},



  notifyFormError(data) {
    console.error('Form error:', data);
  },

  render() {
    let {paperStyle, switchStyle, submitStyle } = this.styles;
    let { wordsError, numericError, urlError } = this.errorMessages;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Paper style={paperStyle}>
          <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.submitForm}
            onInvalidSubmit={this.submitForm}
          >
            <FormsyText
              name="email"
              validations="isEmail"
              validationError={urlError}
              required
              hintText="example@me.com"
              floatingLabelText="Email Id"
              updateImmediately
            />

            
            <FormsyText
              name="card_no"
              validations="isNumeric,isLength:16"
              validationError={numericError}
              hintText="Type your card number"
              floatingLabelText="Card Number Here"
            />
            
            <FormsyText
              name="cvc"
              validations="isNumeric,isLength:3"
              validationError={numericError}
              hintText="CVC Number"
              floatingLabelText="CVC"
            />
              
              <FormsyText
              name="year"
              validations="isNumeric,isLength:4"
              validationError={numericError}
              hintText="Expiration Year"
              floatingLabelText="Expiration Year eg 2018"
            />
            <FormsyText
              name="month"
              validations="isNumeric,maxLength:2"
              validationError={numericError}
              hintText="Expiration Month"
              floatingLabelText="Expiration Month"
            />        
            
            
            
            <RaisedButton
              style={submitStyle}
              type="submit"
              label="Submit"
              disabled={!this.state.canSubmit}
            />
          </Formsy.Form>
        </Paper>
      </MuiThemeProvider>
    );
  },
});

export default Form;