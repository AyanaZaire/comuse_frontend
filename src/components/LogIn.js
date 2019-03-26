import React, {Component} from 'react'
// import { Form, Button } from 'semantic-ui-react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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
      <React.Fragment>
      {/*<div>*/}
        {/*<Form
          onSubmit={this.handleSubmit}
        ><h3>Log In</h3>*/}
        {/* <Form.Group widths='equal'> */}
          {/*<Form.Field>
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
          </Form.Field>*/}
        {/*<Button type='submit'>Login</Button>*/}
      {/*</Form>
      </div>*/}

      <div class="loader">
      <div class="loading-animation"></div>
    </div>

    <section class="min-vh-100 py-5">
      <div class="container">
        <div class="row justify-content-center mb-md-6">
          <div class="col-auto">
            <a href="/">
              {/*<img src="assets/img/logo.svg" alt="Leap" />*/}
              Co.muse
            </a>
          </div>
        </div>
        <div class="row justify-content-center pt-6">
          <div class="col-xl-4 col-lg-5 col-md-6">
            <div class="text-center mb-4">
              <h1 class="mb-1">Welcome back</h1>
              <span>Enter your account details below</span>
            </div>
            {/*<form>*/}
            <Form
              onSubmit={this.handleSubmit}>
              {/*<div class="form-group">*/}
              <Form.Group>
                <Form.Control
                name="email"
                type="email"
                placeholder="Email Address" />
                {/*<input type="email" name="login-email" placeholder="Email Address" class="form-control"/>*/}
              </Form.Group>
              {/*</div>*/}
              {/*<div class="form-group">*/}
              <Form.Group>
                <Form.Control
                name="password"
                type="password"
                placeholder="Password" />
                {/*<input type="password" name="login-password" placeholder="Password" class="form-control"/>*/}
                <small><a href="#">Forgot your password?</a>
                </small>
              </Form.Group>
              {/*</div>*/}
              <div class="form-group">
              {/*<Form.Group>*/}
                {/*<Button variant="primary" type="submit">Sign In</Button>*/}
                <button class="btn-block btn btn-primary" type="submit">Sign In</button>
              {/*</Form.Group>*/}
              </div>
              {/*<div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="login-remember"/>
                <label class="custom-control-label text-small text-muted" for="login-remember">Keep me signed in</label>
              </div>*/}
              <hr/>
              <div class="text-center text-small text-muted">
                <span>Don't have an account yet? <a href="#">Create one</a>
                </span>
              </div>
              </Form>
            {/*</form>*/}
          </div>
        </div>
        </div>
    </section>
      </React.Fragment>
    );
  }
}

export default withRouter(LogIn)
