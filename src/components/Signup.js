import React, {Component} from 'react'
import { Form } from 'semantic-ui-react'
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
      img_url: ''
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
      <div>
      <Form
        onSubmit={ e => {
          e.preventDefault()
          this.props.handleNewMember(e, this.state.value)
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
            name='img_url'
            value={this.state.value.img_url}
            onChange={this.handleChange}
            fluid label='Image Url'
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
      </Form>
      </div>
    )
  }

}

export default withRouter(SignUp)
