import React, {Component} from 'react'
// import { Link } from "react-router-dom";
import { Icon, Form, Card, Image } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom';

class Member extends Component {

  state = {
    classesTaken: [],
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

  fetchClassesTaken = () => {
    fetch('http://localhost:3000/api/v1/enrolled')
    .then(res => res.json())
    .then(sections => {
        this.setState({
          classesTaken: sections
        })
      })
    }

  componentDidMount() {
    this.fetchClassesTaken()
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
    console.log("Member state", this.state)
    return this.props.member ? (
      <div className="member_profile_container">
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
            <h4>Taught</h4>

            <React.Fragment>
            <Card.Group>
              {this.props.member.sections.map(section => {
                // console.log('Member map', member)
                // return member.sections.map(section => {
                //   console.log('Section map', section)
                  if (this.props.member.id === section.teacher_id) {
                    return <Card
                      onClick={() => this.props.history.push(`/class/${section.id}`)}
                      >
                      <Image src='https://mistrzwitold.com/wp-content/uploads/2018/02/method-1024x768.jpg' />
                      <Card.Content>
                        <Card.Header>{section.title}</Card.Header>
                        {/* <Card.Meta>
                          <span className='date'>{section.category}</span>
                        </Card.Meta> */}
                        <Card.Description>
                          {/* <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' avatar />
                            <span>{section.teacher.name}</span> */}
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <span className="right floated">
                            <Icon name='dollar'/>{section.price} per person
                        </span>
                          <a>
                            <Icon name='map pin'/>{section.location}
                          </a>
                      </Card.Content>
                    </Card>
                  } else {
                    null
                  }

                // })
              }
              )}
          </Card.Group>
          </React.Fragment>

            <h4>Enrolled</h4>

            <React.Fragment>
            <Card.Group>
              {this.state.classesTaken.map(enrolls => {
                console.log('Enroll map', enrolls)
                // return enrolls.section.map(section => {
                //   console.log('Section map', section)
                  if (this.props.member.id === enrolls.student_id) {
                    return <Card
                      onClick={() => this.props.history.push(`/class/${enrolls.section.id}`)}
                      >
                      <Image src='https://mistrzwitold.com/wp-content/uploads/2018/02/method-1024x768.jpg' />
                      <Card.Content>
                        <Card.Header>{enrolls.section.title}</Card.Header>
                        {/* <Card.Meta>
                          <span className='date'>{section.category}</span>
                        </Card.Meta> */}
                        <Card.Description>
                          {/* <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' avatar />
                            <span>{section.teacher.name}</span> */}
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <span className="right floated">
                            <Icon name='dollar'/>{enrolls.section.price} per person
                        </span>
                          <a>
                            <Icon name='map pin'/>{enrolls.section.location}
                          </a>
                      </Card.Content>
                    </Card>
                  } else {
                    null
                  }

                // })
              }
              )}
          </Card.Group>
          </React.Fragment>

          <h3>Reviews</h3>
            <p>From Students</p>
            <p>From Teachers</p>


            {this.props.currentMember && this.props.currentMember.id === this.props.section.teacher.id ? (
              <Form
              onSubmit={ e => {
                e.preventDefault()
                this.props.handleEditSection(this.state.value, this.props.section.id, e)
                this.props.history.push(`/class/${this.props.section.id}`)
              }}><h3>Create a New Class:</h3>
              <Form.Group widths='equal'>
                <Form.Input
                  name='title'
                  value={this.state.value.title}
                  onChange={this.handleChange}
                  fluid label='Title'
                  placeholder='Title' />
                <Form.Input
                  name='duration'
                  value={this.state.value.duration}
                  onChange={this.handleChange}
                  fluid label='Duration'
                  placeholder='Duration' />
                <Form.Input
                  name='location'
                  value={this.state.value.location}
                  onChange={this.handleChange}
                  fluid label='Location'
                  placeholder='Location' />
                <Form.Input
                  name='price'
                  value={this.state.value.price}
                  onChange={this.handleChange}
                  fluid label='Price'
                  placeholder='Price' />
              </Form.Group>
              <Form.TextArea
                name='description'
                value={this.state.value.description}
                onChange={this.handleChange}
                label='Description'
                placeholder='Tell us about the class...' />

                <Form.TextArea
                  name='materials_provided'
                  value={this.state.value.materials_provided}
                  onChange={this.handleChange}
                  label='Materials Provided'
                  placeholder='Tell the students what you will provide for the class...' />

                  <Form.TextArea
                    name='materials_to_bring'
                    value={this.state.value.materials_to_bring}
                    onChange={this.handleChange}
                    label='Materials to Bring'
                    placeholder='Tell the students what they should bring to the session...' />

              <Form.Checkbox
                label='I agree to the Terms and Conditions' />
              <Form.Button>Edit</Form.Button>
            </Form>
           ) : (null)}


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
