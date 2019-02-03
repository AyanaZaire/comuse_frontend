import React, {Component} from 'react';
import { Header, Icon, Modal, Segment } from 'semantic-ui-react'

class StripeProfile extends Component {

  state = {
    account: null,
    accountData: [],
    availableBalance: [],
    pendingBalance: [],
    balanceHistory: []
    // charges: []
  }

  fetchStripeAccount = () => {
      fetch("https://api.stripe.com/v1/account", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer sk_test_vHtZZjoJQelgCTGZbnTUxDHM",
          "Stripe-Account": this.props.member.stripe_uid
        }
      })
      .then(response => response.json())
      .then(data => {
          this.setState({
            account: data
          })
        })
  }

  fetchExternalStripeAccount = () => {
      fetch(`https://api.stripe.com/v1/accounts/${this.props.member.stripe_uid}/external_accounts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer sk_test_vHtZZjoJQelgCTGZbnTUxDHM",
          "Stripe-Account": this.props.member.stripe_uid
        }
      })
      .then(response => response.json())
      .then(account => {
          this.setState({
            accountData: account.data
          })
        })
  }

  fetchStripeBalance = () => {
      fetch("https://api.stripe.com/v1/balance", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer sk_test_vHtZZjoJQelgCTGZbnTUxDHM",
          "Stripe-Account": this.props.member.stripe_uid
        }
      })
      .then(response => response.json())
      .then(data => {
          this.setState({
            availableBalance: data.available
          })
          this.setState({
            pendingBalance: data.pending
          })
        })
  }

  fetchStripeBalanceHistory = () => {
      fetch(`https://api.stripe.com/v1/balance/history`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer sk_test_vHtZZjoJQelgCTGZbnTUxDHM",
          "Stripe-Account": this.props.member.stripe_uid
        }
      })
      .then(response => response.json())
      .then(history => {
          this.setState({
            balanceHistory: history.data
          })
        })
  }

  // fetchStripeCharges = () => {
  //     fetch("https://api.stripe.com/v1/charges", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": "Bearer sk_test_vHtZZjoJQelgCTGZbnTUxDHM",
  //         "Stripe-Account": this.props.member.stripe_uid
  //       }
  //     })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data)
  //         // this.setState({
  //         //   account: data
  //         // })
  //       })
  // }

  componentDidMount() {
    if (this.props.member.stripe_uid) {
      this.fetchStripeBalance()
      this.fetchStripeAccount()
      this.fetchExternalStripeAccount()
      this.fetchStripeBalanceHistory()
      // this.fetchStripeCharges()
    } else {
      null
    }
  }

  timeConverter = (UNIX_timestamp) => {
    var a = new Date(UNIX_timestamp * 1000)
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }


  render() {
    console.log(this.props, this.state)

    let stripeURL
    if (this.props.member) {
      stripeURL = `https://connect.stripe.com/express/oauth/authorize?response_type=code&client_id=ca_DglFK9m4L867x3ngntwiPhwbFPvPzpCl&scope=read_write&redirect_uri=https://comuse-backend.herokuapp.com/api/v1/oauth/callback&state=${this.props.member.id}`
    } else {
      stripeURL = null
    }

    return this.props.member.stripe_uid === null ? (
      <div className="App">
        <Header as='h1'>
          <Icon name='stripe' />
          <Header.Content>
            Create a Connected Account
            <Header.Subheader>Connect with Stripe to View Dashboard</Header.Subheader>
          </Header.Content>
        </Header>
        <br></br><br></br>
        <a href={stripeURL} class="stripe-connect light-blue"><span>Connect with Stripe</span></a>
      </div>
    ): (
      this.state.account !== null ? <div className="App">
        <Header as='h1'>
          <Icon name='stripe' />
          <Header.Content>
            Stripe Dashboard
            <Header.Subheader>Keep track of your payment activity</Header.Subheader>
          </Header.Content>
        </Header>
        <br></br><br></br>
        <Segment.Group>
          <Segment color='red'>
            <Header as='h5'>
              <Icon name='user' /> Connected Account
            </Header>
          </Segment>
          <Segment.Group horizontal>
            <Segment><Icon name='mail' /> {this.state.account.email}</Segment>
            <Segment><Icon name='phone' /> {this.state.account.support_phone}</Segment>
            <Segment><Icon name='calendar' /> {this.timeConverter(this.state.account.created)}</Segment>
          </Segment.Group>
          {/* <Segment>Bottom</Segment> */}
        </Segment.Group>

        <Segment.Group>
          <Segment color='red'>
            <Header as='h5'>
              <Icon name='dollar' /> Balance
            </Header>
          </Segment>
          <Segment.Group horizontal>
            {this.state.availableBalance.map( balance => {
              let price = parseFloat(balance.amount)/100
              let fixedPrice = price.toFixed(2)
              return <Segment>In transit to bank: ${fixedPrice}</Segment>
            } )}

            {this.state.pendingBalance.map( balance => {
              let price = parseFloat(balance.amount)/100
              let fixedPrice = price.toFixed(2)
              return <Segment>Estimated future payouts: ${fixedPrice}</Segment>
            } )}

            {this.state.pendingBalance.map( balance => {
              let price = parseFloat(balance.amount)/100
              let fixedPrice = price.toFixed(2)
              return <Segment>Total: ${fixedPrice}</Segment>
            } )}
          </Segment.Group>
          {/* <Segment>Bottom</Segment> */}
        </Segment.Group>

        <Segment.Group>
          <Segment color='red'>
            <Header as='h5'>
              <Icon name='list' /> Balance Activity
            </Header>
          </Segment>
          <Segment.Group>
            {this.state.balanceHistory.map( history => {
              let price = parseFloat(history.amount)/100
              let fixedPrice = price.toFixed(2)
              return(
                <Segment.Group horizontal>
                  <Segment>Status: {history.status}</Segment>
                  <Segment>Created On: {this.timeConverter(history.created)}</Segment>
                  <Segment>Available On: {this.timeConverter(history.available_on)}</Segment>
                  <Segment>Amount: ${fixedPrice}</Segment>
                </Segment.Group>
              )
            } )}
          </Segment.Group>
          {/* <Segment>Bottom</Segment> */}
        </Segment.Group>

        <Segment.Group>
          <Segment color='red'>
            <Header as='h5'>
              <Icon name='credit card outline' /> Connected Cards
            </Header>
          </Segment>
          <Segment.Group>
            {this.state.accountData.map( data => {
              return(
                <Segment.Group horizontal>
                  <Segment>Card: {data.last4}</Segment>
                  <Segment>Type: {data.brand}</Segment>
                  <Segment>Card Exp. Data: {data.exp_month}/{data.exp_year}</Segment>
                  <Segment>Country: {data.country}</Segment>
                </Segment.Group>
              )
            } )}
          </Segment.Group>
          {/* <Segment>Bottom</Segment> */}
        </Segment.Group>

        <Segment.Group>
          <Segment color='red'>
            <Header as='h5'>
              <Icon name='address card outline' /> Account Details
            </Header>
          </Segment>
          <Segment.Group horizontal>
            <Segment>Account Type: {this.state.account.type}</Segment>
            <Segment>Default Currency: USD</Segment>
            <Segment>Payout Schedule: Daily — 2 day rolling basis</Segment>
          </Segment.Group>
          {/* <Segment>Bottom</Segment> */}
        </Segment.Group>

      </div> : null
    )

  }

}

export default StripeProfile;
