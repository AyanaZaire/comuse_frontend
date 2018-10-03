import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    console.log("Checkout Form Props", props.section.price)
    super(props);
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
  }

//To create the charge on your server, create an endpoint that receives the POST request, extracts the token from the body, and creates the charge.
  async submit(ev) {
    // Member clicked submit

    let price = parseFloat(this.props.section.price) * 100
    // let fixedPrice = price.toFixed(2)

    console.log("Fixed price", price)

    let {token} = await this.props.stripe.createToken({name: "Name"});
    let response = await fetch("http://localhost:3000/api/v1/charge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({charges: {
          stripeToken: token.id,
          amount: price,
          description: this.props.section.title,
          teacher: this.props.section.teacher
        }
      })
    });

    console.log(token)

    if (response.ok) {
      this.setState({complete: true})
    } else {
      alert("Oops. Purchase Incomplete!")
    }

  }

  render() {
    // if (this.state.complete) return <h1>Purchase Complete</h1>
    return this.state.complete ? (
        <h1>Purchase Complete — View Your Enrolled Classes</h1>
      ) : (
        <div className="checkout">
          <p>Would you like to complete the purchase?</p>
          <CardElement />
          <button onClick={this.submit}>Purchase Class</button>
        </div>
      )

  }

}

export default injectStripe(CheckoutForm);
