import React, {Component} from 'react'
// import { Form } from 'semantic-ui-react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
// import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom';

class SignUp extends Component {

  state = {
    value: {
      name:'',
      email: '',
      password: '',
      skill: '',
      bio: '',
      location: '',
      website: '',
      // img_url: '',
      img_upload: null
    }
  }

  handleChange = (e) => {
    this.setState({
      value: {
        ...this.state.value,
        [e.target.name]: e.target.value
      }
    })
  }

  handleFile = (e) => {
    this.setState({
      value: {
        ...this.state.value,
        img_upload: e.currentTarget.files[0]
      }
    })
  }

  // handleBoolean = (e) => {
  //   let availabilityValue = e.target.parentNode.querySelector('input').value
  //   this.setState({
  //     value: {
  //       ...this.state.value,
  //       availability: availabilityValue
  //     }
  //   })
  // }

  render() {
    console.log('Sign up state', this.state)
    return (
      <React.Fragment>
      {/*<Form
        onSubmit={ e => {
          e.preventDefault()
          const formData = new FormData()
          this.props.handleNewMember(e, this.state.value, formData)
          this.props.history.push('/')
        }}
        ><h3>Create An Account</h3>
        <Form.Group widths='equal'>
          <Form.Input
            name='name'
            value={this.state.value.name}
            onChange={this.handleChange}
            fluid label='Name'
            placeholder='Name' />
          <Form.Input
            name='email'
            value={this.state.value.email}
            onChange={this.handleChange}
            fluid label='Email'
            placeholder='Email' />
          <Form.Input
            name='password'
            value={this.state.value.password}
            onChange={this.handleChange}
            fluid label='Password'
            placeholder='Password' />
          <Form.Input
            name='skill'
            value={this.state.value.skill}
            onChange={this.handleChange}
            fluid label='Skill'
            placeholder='Skill' />
          <Form.Input
            name='location'
            value={this.state.value.location}
            onChange={this.handleChange}
            fluid label='Location'
            placeholder='Location' />
          <Form.Input
            name='website'
            value={this.state.value.website}
            onChange={this.handleChange}
            fluid label='Website'
            placeholder='Website' />
        </Form.Group>
          <Form.Input
            name='img_upload'
            type= 'file'
            // value={this.state.value.img_url}
            onChange={this.handleFile}
            fluid label='Upload Your Profile Photo'
            placeholder='Include the image url that will be your "profile photo"' />
        <Form.TextArea
          name='bio'
          value={this.state.value.bio}
          onChange={this.handleChange}
          label='Bio'
          placeholder='Tell us more about you...' />
        <Form.Checkbox
          label='I agree to the Terms and Conditions' />
        <Form.Button>Submit</Form.Button>
      </Form>*/}


      <div class="loader">
      <div class="loading-animation"></div>
    </div>

    <section class="row no-gutters min-vh-100 p-0">
      <div class="col-lg-4 bg-primary-3 d-flex justify-content-end">
        <img src="https://leap.mediumra.re/assets/img/article-9.jpg" alt="Image" class="bg-image" />
        {/*<div class="divider divider-vertical d-none d-lg-block">
          <svg width="100%" height="100%" version="1.1" viewbox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none">
            <path d="M0,0 L100,0 L100,100 L0,100 C66.6666667,83.3333333 100,66.6666667 100,50 C100,33.3333333 66.6666667,16.6666667 0,0 Z" fill="#ffffff"></path>
          </svg>
        </div>*/}
      </div>
      <div class="col px-5 position-relative d-flex align-items-center">
        <div class="row justify-content-center w-100">
          <div class="col-md-8 col-lg-7 col-xl-6">
            <div class="text-center mb-4">
              <h1 class="mb-1">Create Account</h1>
              <span>No credit card required</span>
            </div>

            {/*<form>*/}
            <Form onSubmit={ e => {
              e.preventDefault()
              const formData = new FormData()
              this.props.handleNewMember(e, this.state.value, formData)
              this.props.history.push('/')
            }}>
              <Form.Row>
                <Form.Group as={Col}>
                {/*<div class="form-group">*/}
                  <Form.Control
                    type="name"
                    placeholder="Name"
                    name='name'
                    value={this.state.value.name}
                    onChange={this.handleChange}
                    />
                  {/*<input type="email" name="signup-email" placeholder="Email Address" class="form-control" />*/}
                {/*</div>*/}
                </Form.Group>
                {/*<div class="form-group">*/}
                <Form.Group as={Col}>
                  <Form.Control
                    name='email'
                    type="email"
                    value={this.state.value.email}
                    onChange={this.handleChange}
                    fluid label='Email'
                    placeholder='Email'
                  />
                  </Form.Group>
                </Form.Row>
                {/*<input type="password" name="signup-password" placeholder="Password" class="form-control" />*/}
              {/*</div>*/}
              {/*<div class="form-group">*/}
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Control
                    name='password'
                    type='password'
                    value={this.state.value.password}
                    onChange={this.handleChange}
                    fluid label='Password'
                    placeholder='Password'
                  />
                  {/*<input type="password" name="signup-password-confirm" placeholder="Confirm password" class="form-control" />*/}
                  <small class="text-muted">Must be at least 8 characters</small>
                </Form.Group>
                {/*</div>*/}
                <Form.Group as={Col}>
                  <Form.Control
                    name='skill'
                    type='text'
                    value={this.state.value.skill}
                    onChange={this.handleChange}
                    fluid label='Skill'
                    placeholder='Skill'
                  />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Control
                      name='location'
                      type='text'
                      value={this.state.value.location}
                      onChange={this.handleChange}
                      fluid label='Location'
                      placeholder='Location'
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Control
                      name='website'
                      value={this.state.value.website}
                      onChange={this.handleChange}
                      fluid label='Website'
                      placeholder='Website'
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Group>
                  <Form.Label>Upload Profile Photo</Form.Label>
                  <Form.Control
                    name='img_upload'
                    type= 'file'
                    // value={this.state.value.img_url}
                    onChange={this.handleFile}
                    fluid label='Upload Your Profile Photo'
                    placeholder='Include the image url that will be your "profile photo"'
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control as="textarea" rows="2"
                    name='bio'
                    value={this.state.value.bio}
                    onChange={this.handleChange}
                    placeholder='Tell us more about you...'
                  />
                </Form.Group>
              <div class="form-group">
                <button class="btn-block btn btn-primary" type="submit">Sign Up</button>
              </div>
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="signup-agree" />
                <label class="custom-control-label text-small text-muted" for="signup-agree">I agree to the <a href="#">Terms &amp;
        Conditions</a>
                </label>
              </div>
              <hr />
              <div class="text-center text-small text-muted">
                <span>Already have an account yet? <a href="/login">Sign In</a>
                </span>
              </div>
            {/*</form>*/}
            </Form>

          </div>
        </div>
      </div>
    </section>
      </React.Fragment>
    )
  }

}

export default withRouter(SignUp)
