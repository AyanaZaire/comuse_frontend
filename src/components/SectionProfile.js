import React, {Component} from 'react'
import { Icon, Form, Image, Header, Segment, Button, Card } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom';

class SectionProfile extends Component {

  state = {
    courses: [],
    teachers: [],
    value: {
      title:'',
      duration: '',
      description: '',
      location: '',
      price: '',
      materials_provided: '',
      materials_to_bring: '',
      faqs: ''
    }
  }

  fetchCourses = () => {
    fetch('http://localhost:3000/api/v1/course')
    .then(res => res.json())
    .then(courses => {
        this.setState({
          courses: courses
        })
      })
    }

  fetchTeachersSections = () => {
    fetch('http://localhost:3000/api/v1/members')
    .then(res => res.json())
    .then(members => {
        // console.log("Members fetch", members, this.props.session)
        // let teacherSection = members.map(member => {
        //   if (member.id === this.props.session.id) {
        //     return members
        //   } else {
        //     return member
        //   }
        // })
        this.setState({
          teachers: members
        })
      })
  }

  componentDidMount() {
    this.fetchCourses()
    this.fetchTeachersSections()
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
    console.log("Section state", this.state)
    console.log("Props", this.props)
    return this.props.section ? (
    <React.Fragment>
    <div className='section_profile_topheader'>
      <Button floated='left'>View Photos</Button>
    </div>
    <div className="App">
      <div className="section_profile_container">
      {/* // <React.Fragment>
      // <Grid.Column width={4}> */}
        <div>
          <h1>{this.props.section.title}</h1>
          <div><Icon name='lightbulb outline' /> {`${this.props.section.category.name}`}</div>
          <div><Icon name='map pin' /> {`${this.props.section.location}`}</div>
          <div><Icon name='user' /> {`${this.props.section.teacher.name}`}</div>
        </div>
      {/* </Grid.Column>
      <Grid.Column width={9}> */}
        <div>
          <Header
            as='h3'
            onClick={() => this.props.history.push(`/member/${this.props.section.teacher.id}`)}>
             {/* <Image src='' size='tiny' circular /> */}
             <Image circular src='https://react.semantic-ui.com/images/wireframe/square-image.png' /> About {this.props.section.teacher.name}
          </Header>
          <div>{this.props.section.teacher.bio}</div>
        {/* </div>
        <div> */}
          <h3>About {this.props.section.title}</h3>
            <p>{this.props.section.description}</p>
          <h3>Materials Provided</h3>
            <p>{this.props.section.materials_provided}</p>
          <h3>Materials to Bring</h3>
            <p>{this.props.section.materials_to_bring}</p>
          <h3>FAQs</h3>
            <p>{this.props.section.faqs}</p>
          <h3>Reviews</h3>
            <p>From students who took this class</p>
          <a id="courses"/>
          <h3>Available Class Times</h3>
          <Segment.Group>
            {this.state.courses.map(course => {
              if (this.props.section.id === course.section.id) {
                return <Segment key={course.section.id}>
                  {course.date} — {course.time}

                {this.props.currentMember && this.props.currentMember.id === this.props.section.teacher.id ? (
                    <Button color='black' size='mini' floated='right'>Edit</Button>
                  ) : (
                    <Button color='black' size='mini' floated='right'>Enroll</Button>
                  )}

                </Segment>
              } else {
                return null
              }
            })}
          </Segment.Group>

          <h3>Other Classes from {this.props.section.teacher.name}</h3>
          <React.Fragment>
          <Card.Group>
            {this.state.teachers.map(member => {
              console.log('Member map', member)
              return member.sections.map(section => {
                console.log('Section map', section)

                if (this.props.section.teacher_id === section.teacher_id) {
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

              })
            }
            )}
        </Card.Group>
        </React.Fragment>

           {this.props.currentMember && this.props.currentMember.id === this.props.section.teacher.id ? (
             <Form
             onSubmit={ e => {
               e.preventDefault()
               this.props.handleEditSection(this.state.value, this.props.section.id, e)
               this.props.history.push(`/class/${this.props.section.id}`)
             }}><h3>Edit Class:</h3>
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
           </div>
        <div>
         {/* <Grid.Column width={3}> */}
            <Segment.Group>
              <Segment inverted size='big'><Icon name='dollar' />{this.props.section.price} per person</Segment>
              <Segment>Duration {this.props.section.duration}</Segment>
              <Segment.Group>
                {this.state.courses.map(course => {
                  if (this.props.section.id === course.section.id) {
                    return <Segment key={course.section.id}>{course.date} — {course.time}</Segment>
                  } else {
                    return null
                  }
                })}
              </Segment.Group>
              <a href="#courses">
              <Button fluid>See Availibility</Button>
              </a>
            </Segment.Group>
        {/* </Grid.Column> */}
      </div>
    </div>
  </div>
    </React.Fragment>
    ) : (
      <div>Loading...</div>
    )
  }
}

export default withRouter(SectionProfile)
