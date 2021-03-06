import React, {Component} from 'react'
import { Icon, Form, Image, Header, Segment, Button, Card, Modal } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom';

import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

// const COURSES_URL = 'https://comuse-backend.herokuapp.com/api/v1/course'
// const MEMBERS_URL = 'https://comuse-backend.herokuapp.com/api/v1/members'
// const HOST_URL = 'https://comuse-backend.herokuapp.com'
// const REDIRECT_URI_URL = 'https://comuse-backend.herokuapp.com'

const COURSES_URL = 'http://localhost:3000/api/v1/course'
const MEMBERS_URL = 'http://localhost:3000/api/v1/members'
const HOST_URL = 'http://localhost:3000'
const REDIRECT_URI_URL = 'http://localhost:3000'

let counter = 1
let editCounter = 1

const options = [
    { key: 'art', text: 'Arts', value: 1 },
    { key: 'textile', text: 'Textile', value: 2 },
    { key: 'music', text: 'Music', value: 3 },
    { key: 'tech', text: 'Technology', value: 4 },
    { key: 'design', text: 'Design', value: 5 }
  ]

class SectionProfile extends Component {

  state = {
    courses: [],
    teachers: [],
    courseValue: {
      time:'',
      date: '',
      student_max: ''
    },
    courseEditValue: {
      time:'',
      date: '',
      student_max: ''
    },
    value: {
      title:'',
      duration: '',
      category_id: null,
      description: '',
      location: '',
      price: '',
      materials_provided: '',
      materials_to_bring: '',
      faqs: '',
      img_url: ''
    }
  }

  fetchCourses = () => {
    fetch(COURSES_URL)
    .then(res => res.json())
    .then(courses => {
        this.setState({
          courses: courses
        })
      })
    }

  fetchTeachersSections = () => {
    fetch(MEMBERS_URL)
    .then(res => res.json())
    .then(members => {
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

  handleCategoryId = (e, data) => {
    // console.log("Category Id", data.value)
    this.setState({
      value: {
        ...this.state.value,
        category_id: data.value
      }
    })
  }

  handleEditSectionFile = (e) => {
    this.setState({
      value: {
        ...this.state.value,
        img_upload: e.currentTarget.files[0]
      }
    })
  }

  handleCourseFormChange = (e, value) => {
    console.log("New Course Value", this.state.courseValue)
      this.setState({
        courseValue: {
          ...this.state.courseValue,
          [e.target.name]: e.target.value
        }
      })
    }

    handleNewCourse = (value, e) => {
      console.log("New course", value)
      fetch(COURSES_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({course: {
          date: value.date,
          time: value.time,
          student_max: value.student_max,
          section_id: this.props.section.id
          }
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          courses: [...this.state.courses, data]
        })
      })
      e.currentTarget.reset()
    }

    handleEditCourseFormChange = (e, value) => {
      console.log("Course Edit Value", this.state.courseEditValue)
        this.setState({
          courseEditValue: {
            ...this.state.courseEditValue,
            [e.target.name]: e.target.value
          }
        })
      }

    handleEditCourse = (id, value, e) => {
      console.log("Edit Section", id, value, id)
      // fetch('http://localhost:3000/api/v1/course' + `/${id}`, {
      //   method: "PATCH",
      //   headers: {
      //     "Authorization": `Bearer ${localStorage.getItem("token")}`,
      //     "Content-Type": "application/json",
      //     "Accept": "application/json"
      //   },
      //   body: JSON.stringify({course: {
      //     date: value.date,
      //     time: value.time,
      //     student_max: value.student_max,
      //     section_id: this.props.section.id
      //     }
      //   })
      // })
      // .then(response => response.json())
      // .then(data => {
      //   // console.log("response data", data)
      //   let editedCourse = this.state.courses.map(course => {
      //     if (course.id === id) {
      //       return data
      //     } else {
      //       return course
      //     }
      //   })
      //   this.setState({
      //     courses: editedCourse
      //   })
      // })
      // e.currentTarget.reset()
    }


  render() {

    let stripeURL
    if (this.props.currentMember) {
      stripeURL = `https://connect.stripe.com/express/oauth/authorize?response_type=code&client_id=ca_DglFK9m4L867x3ngntwiPhwbFPvPzpCl&scope=read_write&redirect_uri=` + REDIRECT_URI_URL + `/api/v1/oauth/callback&state=${this.props.currentMember.id}`
    } else {
      stripeURL = null
    }
    // console.log("Section state", this.state)
    // console.log("Props", this.props)
    return this.props.section ? (
    <React.Fragment>
    <div
    // className='section_profile_topheader'
    // height: 300px;
    // background-image: url('https://images.unsplash.com/photo-1534511902651-6ab0ce131f2a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f1ff38d33bc2a28f5c08b7936e12c239&auto=format&fit=crop&w=1489&q=80');
    // background-position: center;
    // background-size: cover;
    style={{height: "300px", backgroundPosition: "center", backgroundSize: "cover", backgroundImage: `url(${HOST_URL + this.props.section.photo_url})`}}
    >
      {/* <Button floated='left'>View Photos</Button> */}
    </div>
    <div className="App">
      <div className="section_profile_container">
      {/* // <React.Fragment>
      // <Grid.Column width={4}> */}
        <div className='section_profile'>
          <h1>{this.props.section.title}</h1>
          <div><Icon name='lightbulb outline' /> {`${this.props.section.category.name}`}</div>
          <div><Icon name='map pin' /> {`${this.props.section.location}`}</div>
          <div><Icon name='user' /> {`${this.props.section.teacher.name}`}</div>

          <br></br>

          {this.props.currentMember && this.props.currentMember.id === this.props.section.teacher.id ? (
            <Modal trigger={<Button secondary>Edit Class</Button>} >
              <Modal.Header>Edit Class Details</Modal.Header>
              <Modal.Content scrolling>
                {/* <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' /> */}
                <Modal.Description>
                  <Form
                  onSubmit={ e => {
                    e.preventDefault()
                    const formData = new FormData()
                    this.props.handleEditSection(this.state.value, this.props.section.id, e, formData)
                    this.props.history.push(`/class/${this.props.section.id}`)
                  }}>
                  <Form.Group widths='equal'>
                    <Form.Input
                      name='title'
                      value={this.state.value.title}
                      onChange={this.handleChange}
                      fluid label='Title'
                      placeholder='Title' />
                   <Form.Select
                      name='category_id'
                      onChange={(e, data) => this.handleCategoryId(e, data)}
                      fluid label='Category'
                      options={options}
                      placeholder='Category'/>
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
                      icon='dollar'
                      iconPosition='left'
                      value={this.state.value.price}
                      onChange={this.handleChange}
                      fluid label='Price'
                      placeholder='Price' />
                  </Form.Group>
                  <Form.Input
                    name='img_upload'
                    type= 'file'
                    // value={this.state.value.img_url}
                    onChange={this.handleEditSectionFile}
                    fluid label='Upload Your Updated Section Display Photo'
                    placeholder='Include the image that will be your section display photo' />
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

                        <Form.TextArea
                          name='faqs'
                          value={this.state.value.faqs}
                          onChange={this.handleChange}
                          label='FAQs'
                          placeholder='Will there be food or bev provided? Are there age restrictions? Special directions to find you? etc...' />

                  <Form.Checkbox
                    label='I agree to the Terms and Conditions' />
                  <Form.Button>Edit</Form.Button>
                </Form>

              </Modal.Description>
            </Modal.Content>
          </Modal>
        ) : (null)}

        </div>
      {/* </Grid.Column>
      <Grid.Column width={9}> */}
        <div className='section_desc'>
          <Header
            as='h3'
            // onClick={() => this.props.history.push(`/member/${this.props.section.teacher.id}`)}
            >
             {/* <Image src='' size='tiny' circular /> */}
             <Image
               style={{width: "100px", height: "100px", overflow: "hidden", borderRadius: "50%", backgroundPosition: "center", backgroundSize: "cover", backgroundImage: `url(${HOST_URL + this.props.section.teacher.photo_url})`}}
             />&nbsp;  <a
                  style={{color: 'black', textDecoration: 'underline'}}
                  onClick={() => this.props.history.push(`/member/${this.props.section.teacher.id}`)}>
                 About {this.props.section.teacher.name}</a>
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
          {/* <h3>Reviews</h3>
            <p>From students who took this class</p> */}
          <a id="courses"/>
          <h3>Available Class Times</h3>
          <Segment.Group>
            {this.state.courses.map(course => {
              if (this.props.section.id === course.section.id) {
                return <Segment key={editCounter++}>
                  {course.date} — {course.time}

                {this.props.currentMember && this.props.currentMember.id === this.props.section.teacher.id ? (
                    <Modal trigger={<Button color='black' size='mini' floated='right'>Edit</Button>} >
                      <Modal.Header>Edit Session Time and Date to Class</Modal.Header>
                      <Modal.Content scrolling>
                        {/* <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' /> */}
                        <Modal.Description>
                          <Form
                          onSubmit={ e => {
                            e.preventDefault()
                            console.log('i was hit!')
                            this.handleEditCourse(course.id, this.state.courseEditValue, e)
                            this.props.history.push(`/class/${this.props.section.id}`)
                          }}>
                          <Form.Group widths='equal'>
                            <Form.Input
                              name='date'
                              type='date'
                              value={this.state.courseEditValue.date}
                              onChange={this.handleEditCourseFormChange}
                              fluid label='Date'
                              // placeholder='Title'
                            />
                            <Form.Input
                              name='time'
                              type='time'
                              value={this.state.courseEditValue.time}
                              onChange={this.handleEditCourseFormChange}
                              fluid label='Time'
                              // placeholder='Duration'
                            />
                            <Form.Input
                              name='student_max'
                              value={this.state.courseEditValue.student_max}
                              onChange={this.handleEditCourseFormChange}
                              fluid label='Maximum Number of Students for Session'
                              placeholder='Ex: 1'
                            />
                          </Form.Group>
                          <Form.Button>Edit Session</Form.Button>
                        </Form>

                      </Modal.Description>
                    </Modal.Content>
                  </Modal>
                  ) : (
                    //handling max_student validation in handleEnrollButton function
                      this.props.section.enrolled.length >= course.student_max ? <Button>Class is full!</Button> : this.props.currentMember.stripe_uid == null ? <Modal trigger={<Button secondary>Enroll</Button>}>
                        <Modal.Header>Connect with Stripe to Create Class</Modal.Header>
                        <Modal.Content scrolling>
                          <Modal.Description>
                            <a href={stripeURL} class="stripe-connect light-blue"><span>Connect with Stripe</span></a>
                          </Modal.Description>
                        </Modal.Content>
                      </Modal>
                      : <Modal trigger={<Button
                        color='black'
                        size='mini'
                        floated='right'
                        onClick={(e) => {
                              this.props.handleEnrollButton(e, this.props.currentMember.id, this.props.section, course)
                            }
                            // this.props.history.push(`/member/${this.props.currentMember.id}`)
                          }>Enroll</Button>}>
                        <Modal.Header>Purchase Class</Modal.Header>
                        <Modal.Content image scrolling>
                          <Image size='medium' src={this.props.section.img_url} wrapped />

                          <Modal.Description>
                            <Header>{this.props.section.title}</Header>
                            <StripeProvider apiKey="pk_test_Y74jXJxVrCcqTM2rMslT4mQV">
                                <Elements>
                                  <CheckoutForm
                                    section = {this.props.section}
                                   />
                                </Elements>
                            </StripeProvider>

                          </Modal.Description>
                        </Modal.Content>
                      </Modal>)}

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
              // console.log('Member map', member)
              return member.sections.map(section => {
                // console.log('Section map', section)
                let price = parseFloat(section.price)
                let fixedPrice = price.toFixed(2)

                if (this.props.section.teacher_id === section.teacher_id) {
                  return <Card
                    onClick={() => this.props.history.push(`/class/${section.id}`)}
                    >
                    <Image src={HOST_URL + section.photo_url} />
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
                          <Icon name='dollar'/>{fixedPrice} per person
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


           </div>
        <div className='section_info_card'>
            <Segment.Group>
              <Segment inverted size='big'><Icon name='dollar' />{this.props.section.price} per person</Segment>
              <Segment>Duration {this.props.section.duration}</Segment>
              <Segment.Group>
                {this.state.courses.map(course => {
                  if (this.props.section.id === course.section_id) {
                    return <Segment key={counter++}>{course.date} — {course.time}</Segment>
                  } else {
                    return null
                  }
                })}
              </Segment.Group>



              {this.props.currentMember && this.props.currentMember.id === this.props.section.teacher.id ? (
                <Modal trigger={<Button secondary fluid>Add Session</Button>} >
                  <Modal.Header>Add Session Time and Date to Class</Modal.Header>
                  <Modal.Content scrolling>
                    {/* <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' /> */}
                    <Modal.Description>
                      <Form
                      onSubmit={ e => {
                        e.preventDefault()
                        this.handleNewCourse(this.state.courseValue, e)
                        this.props.history.push(`/class/${this.props.section.id}`)
                      }}>
                      <Form.Group widths='equal'>
                        <Form.Input
                          name='date'
                          type='date'
                          value={this.state.courseValue.date}
                          onChange={this.handleCourseFormChange}
                          fluid label='Date'
                          // placeholder='Title'
                        />
                        <Form.Input
                          name='time'
                          type='time'
                          value={this.state.courseValue.time}
                          onChange={this.handleCourseFormChange}
                          fluid label='Time'
                          // placeholder='Duration'
                        />
                        <Form.Input
                          name='student_max'
                          value={this.state.courseValue.student_max}
                          onChange={this.handleCourseFormChange}
                          fluid label='Maximum Number of Students for Session'
                          placeholder='Ex: 1'
                        />
                      </Form.Group>
                      <Form.Button>Add Session</Form.Button>
                    </Form>

                  </Modal.Description>
                </Modal.Content>
              </Modal>
            ) : (null)}

              <a href="#courses">
              <Button fluid>See Availibility</Button>
              </a>
            </Segment.Group>
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
