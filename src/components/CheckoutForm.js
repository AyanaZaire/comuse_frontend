import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

const options = [
    { key: '10', text: '10%', value: 0.10 },
    { key: '15', text: '15%', value: 0.15 },
    { key: '20', text: '20%', value: 0.20 }
    // { key: 'other', text: 'Other', value: '' }
  ]

const CHARGE_URL = "https://comuse-backend.herokuapp.com/api/v1/charge"
// const CHARGE_URL = "http://localhost:3000/api/v1/charge"

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
    let response = await fetch(CHARGE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({charges: {
          donation_percentage: 0.10,
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
        // <Form
        // onSubmit={ e => {
        //   e.preventDefault()
        //   // this.props.handleNewSection(this.props.currentMember.id, this.state.sectionValue, e)
        //   // this.props.history.push('/')
        // }}>
        // <Form.Group widths='equal'>
        // <Form.Select
        //   name='category_id'
        //   onChange={(e, data) => this.handleCategoryId(e, data)}
        //   fluid label='Category'
        //   options={options}
        //   placeholder='Category'/>
          <p>Would you like to complete the purchase?</p>
          <CardElement />
          <button onClick={this.submit}>Purchase Class</button>
        </div>
      )

  }

}

export default injectStripe(CheckoutForm);
