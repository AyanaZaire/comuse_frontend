import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
  }

//To create the charge on your server, create an endpoint that receives the POST request, extracts the token from the body, and creates the charge.
  async submit(ev) {
    // Member clicked submit
    let {token} = await this.props.stripe.createToken({name: "Name"});
    let response = await fetch("http://localhost:3000/api/v1/charge", {
      method: "POST",
      headers: {"Content-Type": "text/plain"},
      body: token.id
    });

    if (response.ok) console.log("Purchase Complete!")
    // if (response.ok) this.setState({complete: true});
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;

    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Purchase Class</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
