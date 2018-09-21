import React, {Component} from 'react'
// import { Link } from "react-router-dom";
import { Icon, Form } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom';

class Member extends Component {

  state = {
    value: {
      name:'',
      email: '',
      password: '',
      skill: '',
      bio: '',
      location: '',
      website: ''
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


  render() {
    // console.log("Edit form authentication", this.props.currentMember.id === this.props.member.id)
    return this.props.member ? (
      <div className="container">
        <div>
          <h1>{this.props.member.name}</h1>
          <div><Icon name='lightbulb outline' /> {`${this.props.member.skill}`}</div>
          <div><Icon name='map pin' /> {`${this.props.member.location}`}</div>
          <div><Icon name='globe' /> {`${this.props.member.website}`}</div>

        </div>
        <div>
          <h3>Bio</h3>
          <div>{`${this.props.member.bio}`}</div>
          <h3>Classes</h3>
            <p>Taught</p>
            <p>Taken</p>
          <h3>Reviews</h3>
            <p>From Students</p>
            <p>From Teachers</p>
           {this.props.currentMember && this.props.currentMember.id === this.props.member.id ? (
             <Form
             onSubmit={ e => {
               e.preventDefault()
               this.props.handleEditMember(this.state.value, this.props.member.id, e)
               this.props.history.push(`/member/${this.props.member.id}`)
             }}><h3>Edit User Profile:</h3>
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
             <Form.TextArea
               name='bio'
               value={this.state.value.bio}
               onChange={this.handleChange}
               label='Bio'
               placeholder='Tell us more about you...' />
             <Form.Checkbox
               label='I agree to the Terms and Conditions' />
             <Form.Button>Edit</Form.Button>
           </Form>
         ) : (null)}
           </div>
        {/* <Link to="/" className="ui button">
          Back Home
        </Link> */}
      </div>
    ) : (
      <div>Loading...</div>
    )
  }
}

export default withRouter(Member)
