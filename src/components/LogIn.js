import React, {Component} from 'react'
import { Form, Button } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom';

const BASE_URL = "https://comuse-backend.herokuapp.com/api/v1";
// const BASE_URL = "http://localhost:3000/api/v1";

class LogIn extends Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.history.push('/')

    let data = JSON.stringify({
      email: e.target.querySelector('input[name="email"]').value,
      password: e.target.querySelector('input[name="password"]').value
    });

    // debugger

    fetch(BASE_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: data
    })
      .then(res => {
        // if (res.status === 401) {
        //   alert("login failed");
        // } else {
          // debugger
          return res.json()
        // }
      })
      .then(json => {
        this.props.updateMember(json.member);
        localStorage.setItem("token", json.token);
      });
    };

  render() {
    return (
      <div>
        <Form
          onSubmit={this.handleSubmit}
        ><h3>Log In</h3>
        {/* <Form.Group widths='equal'> */}
          <Form.Field>
            <label>Email</label>
            <input
              placeholder="email"
              name="email"
              type="text"
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              placeholder="password"
              name="password"
              type="password"
            />
          </Form.Field>
        <Button type='submit'>Login</Button>
      </Form>
      </div>
    );
  }
}

export default withRouter(LogIn)
