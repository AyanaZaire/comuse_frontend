import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import { Form } from 'semantic-ui-react'


const options = [
    { key: '10', text: '10%', value: 10 },
    { key: '15', text: '15%', value: 15 },
    { key: '20', text: '20%', value: 20 }
    // { key: 'other', text: 'Other', value: '' }
  ]

const CHARGE_URL = "https://comuse-backend.herokuapp.com/api/v1/charge"
// const CHARGE_URL = "http://localhost:3000/api/v1/charge"

class CheckoutForm extends Component {
  constructor(props) {
    console.log("Checkout Form Props", props.section.price)
    super(props);
    this.state = {complete: false, donationValue: null};
    this.submit = this.submit.bind(this);
  }

//To create the charge on your server, create an endpoint that receives the POST request, extracts the token from the body, and creates the charge.
  async submit(ev) {
    // Member clicked submit

    let price = parseFloat(this.props.section.price) * 100
    // let fixedPrice = price.toFixed(2)

    console.log("Fixed price", price)

    let {token} = await this.props.stripe.createToken({name: "Name"});
    let response = await fetch(CHARGE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({charges: {
          donation_percentage: this.state.donationValue,
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

  handleDonationPercentage = (e, data) => {
    console.log("Category Value", data.value)
    this.setState({
      donationValue: data.value
    })
  }

  render() {
    // if (this.state.complete) return <h1>Purchase Complete</h1>
    return this.state.complete ? (
        <h1>Purchase Complete — View Your Enrolled Classes</h1>
      ) : (
        <div className="checkout">
          <p>Co.muse has a 0% platform fee for artists and relies on the generosity of donors like you to operate our service.</p>
          <Form>
          <Form.Select
            name='donationValue'
            onChange={(e, data) => this.handleDonationPercentage(e, data)}
            fluid label='Thank you for including a tip of:'
            options={options}
            placeholder='Tip %'/>
          </Form>
          <p>Would you like to complete the purchase?</p>
          <CardElement />
          <button onClick={this.submit}>Purchase Class</button>
        </div>
      )

  }

}

export default injectStripe(CheckoutForm);
