import React, {Component} from 'react'
import { Icon, Form, Header, Segment, Card, Modal } from 'semantic-ui-react'
import {Button, Image, Container, Row, Col} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';

import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import SectionCard from './SectionCard.js'
import YouTube from 'react-youtube';

const COURSES_URL = 'https://comuse-backend.herokuapp.com/api/v1/course'
const MEMBERS_URL = 'https://comuse-backend.herokuapp.com/api/v1/members'
const HOST_URL = 'https://comuse-backend.herokuapp.com'
const REDIRECT_URI_URL = 'https://comuse-backend.herokuapp.com'

// const COURSES_URL = 'http://localhost:3000/api/v1/course'
// const MEMBERS_URL = 'http://localhost:3000/api/v1/members'
// const HOST_URL = 'http://localhost:3000'
// const REDIRECT_URI_URL = 'http://localhost:3000'

let counter = 1
let editCounter = 1

const options = [
    { key: 'art', text: 'Arts', value: 1 },
    { key: 'textile', text: 'Textile', value: 2 },
    { key: 'music', text: 'Music', value: 3 },
    { key: 'tech', text: 'Technology', value: 4 },
    { key: 'design', text: 'Design', value: 5 }
  ]

class SectionProfile2 extends Component {

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
    },
    video_id: null
  }

  fetchCourses = () => {
    fetch(COURSES_URL)
    .then(res => res.json())
    .then(courses => {
        this.setState({
          courses: courses
        }, () => this.setState({
          video_id: this.state.courses[0].video_url.split('/')[3]
        }))
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

    console.log(this.state.video_id)

    let enrolled
    if (this.props.section && this.props.currentMember) {
      console.log(this.props.section.enrolled.length == 0)
      this.props.section.enrolled.length == 0 ? null : enrolled = this.props.section.enrolled.find(enrolled => enrolled.student_id == this.props.currentMember.id)
    } else {
      enrolled = null
    }
    console.log(enrolled)

    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };

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
    <div class="loader">
      <div class="loading-animation"></div>
    </div>

    {/*<div class="navbar-container ">
      <nav class="navbar navbar-expand-lg navbar-dark" data-overlay data-sticky="top">

      </nav>
    </div>*/}

    <section class="bg-dark text-light header-inner p-0 jarallax o-hidden" data-overlay data-jarallax data-speed="0.2">
      <img src="https://images.unsplash.com/photo-1534511902651-6ab0ce131f2a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f1ff38d33bc2a28f5c08b7936e12c239&auto=format&fit=crop&w=1489&q=80" alt="Image" class="jarallax-img opacity-30"/>
      <div class="container py-0 layer-2">
        <div class="row my-3">
          <div class="col">
            <nav aria-label="breadcrumb" style={{paddingTop: "70px"}}>
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li class="breadcrumb-item">
                  <a href="/classes">Classes</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">{this.props.section.title}</li>
              </ol>
            </nav>
          </div>
        </div>
        <div class="row my-4 my-md-6">
        {/*data-aos="fade-up"*/}
          <div class="col-lg-9 col-xl-8">
            <h1 class="display-4">{this.props.section.title}</h1>
            <h6>{this.props.section.category.name}</h6>
            <p class="lead mb-0" style={{paddingBottom: "30px"}}>
             <Image
              style={{width: "30px", height: "30px"}}
              src="https://avatars1.githubusercontent.com/u/892860?s=460&v=4"
              roundedCircle/>
              <span style={{paddingLeft: "10px"}}>{this.props.section.teacher.name}</span>
            </p>
            {/*<Button variant="primary" size="lg">
              Enroll
            </Button>*/}
            { this.props.currentMember && this.props.currentMember.stripe_uid == null ? <Modal trigger={<Button size="lg">${this.props.section.price}0 to Enroll</Button>}>
                <Modal.Header>Connect with Stripe to Create Class</Modal.Header>
                <Modal.Content scrolling>
                  <Modal.Description>
                    <a href={stripeURL} class="stripe-connect light-blue"><span>Connect with Stripe</span></a>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
              : <Modal trigger={<Button
                size="sm"
                style={{float: "right"}}
                onClick={(e) => {
                      this.props.handleEnrollButton(e, this.props.currentMember.id, this.props.section)
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
              </Modal>}
          </div>
        </div>
      </div>
      <div class="decoration-wrapper">
        <div class="decoration bottom right d-none d-md-block" data-jarallax-element="100 100">
          <svg class="bg-primary-2" width="338" height="277" viewBox="0 0 338 277" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M136.018 0.775024C143.338 0.998024 150.311 2.86002 157.217 4.90402C161.951 6.30502 166.533 8.21602 171.238 9.72702C177.683 11.799 184.205 13.642 190.654 15.704C198.047 18.067 205.496 20.302 212.734 23.077C219.181 25.549 225.818 26.16 232.576 26.624C242.613 27.313 252.408 29.541 262.14 31.958C267.613 33.318 273.015 35.013 278.376 36.777C286.159 39.338 292.769 43.771 298.435 49.705C300.869 52.253 303.482 54.662 306.224 56.875C310.91 60.658 314.185 65.568 317.597 70.391C317.999 70.957 318.31 71.699 318.861 72.031C323.925 75.085 326.72 80.024 329.47 84.928C331.605 88.738 333.45 92.72 335.236 96.711C335.974 98.361 336.533 100.215 336.629 102.006C336.979 108.465 337.936 114.881 337.352 121.411C336.889 126.604 336.916 131.868 337.11 137.086C337.676 152.284 335.641 167.235 333.401 182.2C331.815 192.802 330.878 203.502 329.278 214.101C328.417 219.807 327.28 225.578 325.321 230.976C323.759 235.279 321.196 239.409 318.317 243.006C311.585 251.42 303.104 257.68 292.893 261.414C288.381 263.064 283.952 265.016 279.332 266.275C273.076 267.98 266.711 269.338 260.33 270.509C250.605 272.292 240.844 273.878 231.07 275.381C220.672 276.98 210.306 277.306 199.939 274.719C194.33 273.32 188.527 272.723 182.869 271.504C166.828 268.049 151.043 263.651 135.754 257.669C130.918 255.776 126.25 253.478 122.199 249.956C118.49 246.731 113.928 244.469 110.316 241.155C103.357 234.766 96.6579 228.074 90.1249 221.245C84.3729 215.231 79.0449 208.814 73.4259 202.671C71.6229 200.7 69.3989 199.121 67.5219 197.212C61.8789 191.478 56.3579 185.624 50.6959 179.909C48.0139 177.202 45.0629 174.763 42.3439 172.091C39.7309 169.523 37.2799 166.791 34.7229 164.164C30.1899 159.507 25.8419 154.642 21.0319 150.288C14.4459 144.325 9.29194 137.288 4.85794 129.733C1.90494 124.702 0.404932 119.126 0.994932 113.109C1.35393 109.453 1.56894 105.873 3.02594 102.364C4.82294 98.043 7.59594 94.544 11.0199 91.581C16.4609 86.871 22.0179 82.28 27.7129 77.881C34.4159 72.703 41.2719 67.718 48.1519 62.774C53.0819 59.232 58.3649 56.157 63.1269 52.411C72.1059 45.348 81.2339 38.467 89.4079 30.405C96.0349 23.868 102.898 17.54 110.002 11.527C115.279 7.06004 121.135 3.23104 128.049 1.65704C130.639 1.07104 133.357 1.05302 136.018 0.775024ZM19.8459 102.8C15.5139 101.001 13.7579 101.522 12.1429 105.364C13.5239 105.867 14.8829 106.363 16.5709 106.978C16.7739 105.683 16.8949 104.912 16.9929 104.287C17.9989 103.763 18.9229 103.281 19.8479 102.799C21.2859 101.622 23.0749 100.717 23.4099 98.469C20.4119 98.883 20.4119 98.883 19.8459 102.8ZM118.352 15.815C117.153 17.925 116.342 19.402 117.231 21.328C119.746 19.487 119.773 19.382 118.352 15.815ZM36.2909 86.69C35.4119 88.799 34.8089 90.248 34.0939 91.961C37.8889 90.785 37.8889 90.785 36.2909 86.69ZM129.395 162.873C128.641 162.383 128.006 161.799 127.858 161.903C127.292 162.306 126.881 162.927 126.413 163.468C126.843 163.712 127.337 164.224 127.684 164.138C128.211 164.009 128.639 163.465 129.395 162.873ZM137.797 163.645C137.248 164.305 136.658 164.709 136.697 165.036C136.763 165.591 137.228 166.097 137.525 166.623C137.986 166.255 138.761 165.928 138.818 165.505C138.881 165.033 138.287 164.477 137.797 163.645ZM137.221 207.492C137.242 207.855 137.264 208.219 137.285 208.582C138.129 208.456 138.973 208.33 139.816 208.205C139.787 207.967 139.757 207.73 139.73 207.492C138.895 207.492 138.057 207.492 137.221 207.492ZM110.674 30.56C110.768 30.297 110.862 30.035 110.957 29.772C110.123 29.451 109.291 29.13 108.457 28.809C108.357 29.097 108.256 29.386 108.154 29.674C108.994 29.969 109.834 30.265 110.674 30.56ZM116.773 160.416C116.58 160.891 116.285 161.258 116.357 161.528C116.435 161.827 116.851 162.037 117.121 162.285C117.336 161.902 117.652 161.535 117.713 161.129C117.736 160.968 117.193 160.722 116.773 160.416ZM124.658 162.574C123.793 162.347 123.324 162.142 122.863 162.152C122.707 162.156 122.562 162.708 122.414 163.009C122.768 163.15 123.127 163.408 123.473 163.392C123.754 163.381 124.02 163.036 124.658 162.574ZM133.973 165.672C133.819 165.484 133.664 165.297 133.51 165.11C133.348 165.387 133.151 165.654 133.059 165.954C133.039 166.011 133.434 166.196 133.637 166.322C133.748 166.105 133.861 165.89 133.973 165.672ZM115.15 24.039C114.955 23.876 114.759 23.714 114.566 23.552C114.468 23.778 114.254 24.034 114.302 24.223C114.353 24.418 114.656 24.549 114.849 24.708C114.949 24.486 115.051 24.263 115.15 24.039Z"
            fill="black" />
          </svg>

        </div>
      </div>
      {/*<div class="divider">
        <svg width="100%" height="100%" version="1.1" viewbox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none">
          <path d="M0,0 C6.83050094,50 15.1638343,75 25,75 C41.4957514,75 62.4956597,0 81.2456597,0 C93.7456597,0 99.9971065,0 100,0 L100,100 L0,100" fill="#ffffff"></path>
        </svg>
      </div>*/}

      <div className="divider">
        <svg className="bg-primary-alt" width="100%" height="96px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none">
          <path d="M0,0 C16.6666667,66 33.3333333,99 50,99 C66.6666667,99 83.3333333,66 100,0 L100,100 L0,100 L0,0 Z"></path>
        </svg>
      </div>

    </section>


    {/*<div
    // className='section_profile_topheader'
    // height: 300px;
    // background-image: url('https://images.unsplash.com/photo-1534511902651-6ab0ce131f2a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f1ff38d33bc2a28f5c08b7936e12c239&auto=format&fit=crop&w=1489&q=80');
    // background-position: center;
    // background-size: cover;
    style={{height: "300px", backgroundPosition: "center", backgroundSize: "cover", backgroundImage: `url(${HOST_URL + this.props.section.photo_url})`}}
    >*/}
      {/* <Button floated='left'>View Photos</Button> */}
    {/*</div>*/}


    <div className="App">

    <Container>
      <Row>
      <Col sm={7}>

      {this.state.video_id ? <YouTube
        videoId={this.state.video_id}
        opts={opts}
      /> : null}
      </Col>

      <Col sm={5}>
    <React.Fragment>
      {this.state.courses.map(course => {
        if (this.props.section.id === course.section.id) {
          return <Segment key={editCounter++} vertical>{course.title}

          {this.props.currentMember && this.props.currentMember.id === this.props.section.teacher.id ? (
              <Modal trigger={<Button size="sm" style={{float: "right"}}>Edit</Button>} >
                <Modal.Header>Edit Lesson</Modal.Header>
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
              //handling max_student validation in handleEnrollButton function RIGHT HERE


              //enrolled variable declared right after render()

              this.props.section.enrolled.length > 0 && enrolled.student_id === this.props.currentMember.id || this.props.section.teacher_id === this.props.currentMember.id ? <Button
              onClick={() => {
                this.setState({
                  video_id: course.video_url.split('/')[3]
                })
              }}
              size="sm"
              style={{float: "right"}}>View Lesson</Button> : this.props.currentMember.stripe_uid == null ? <Modal trigger={<Button size="sm" style={{float: "right"}}>Enroll</Button>}>
                  <Modal.Header>Connect with Stripe to Create Class</Modal.Header>
                  <Modal.Content scrolling>
                    <Modal.Description>
                      <a href={stripeURL} class="stripe-connect light-blue"><span>Connect with Stripe</span></a>
                    </Modal.Description>
                  </Modal.Content>
                </Modal>
                : <Modal trigger={<Button
                  size="sm"
                  style={{float: "right"}}
                  onClick={(e) => {
                        this.props.handleEnrollButton(e, this.props.currentMember.id, this.props.section)
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

          <span style={{float: "right", paddingRight: "10px"}}>{course.time}</span>

          </Segment>
        } else {
          return null
        }
      })}
    </React.Fragment>
    </Col>
    </Row>
    </Container>


      {/*<div className="section_profile_container">*/}
      {/* // <React.Fragment>
      // <Grid.Column width={4}> */}
        {/*<div className='section_profile'>*/}
        <Container style={{paddingTop: "50px"}}>
          <Row>
          <Col sm={9} style={{paddingRight: "50px", paddingBottom: "50px"}}>



          <h1>About {this.props.section.title}</h1>
          {/*<div><Icon name='lightbulb outline' /> {`${this.props.section.category.name}`}</div>
          <div><Icon name='map pin' /> {`${this.props.section.location}`}</div>
          <div><Icon name='user' /> {`${this.props.section.teacher.name}`}</div>*/}

        {/* </div>
        <div> */}
          {/*<h3>About {this.props.section.title}</h3>*/}
            <p>{this.props.section.description}</p>
          {/*<h3>Materials Provided</h3>
            <p>{this.props.section.materials_provided}</p>*/}
          <h3>Materials You'll Need</h3>
            <p>{this.props.section.materials_to_bring}</p>
          <h3>FAQs</h3>
            <p>{this.props.section.faqs}</p>
          {/* <h3>Reviews</h3>
            <p>From students who took this class</p> */}
          {/*<a id="courses"/>
          <h3>Available Class Times</h3>*/}


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
                  return <SectionCard
                            onClick={() => this.props.history.push(`/class/${section.id}`)}
                            parent="profile"
                            section={section}
                            key={section.id}

                            // clickedSectionFunction={clickedSectionFunction}
                            />


                  {/*<Card
                    onClick={() => this.props.history.push(`/class/${section.id}`)}
                    >
                    <Image src={HOST_URL + section.photo_url} />
                    <Card.Content>
                      <Card.Header>{section.title}</Card.Header>*/}
                      {/* <Card.Meta>
                        <span className='date'>{section.category}</span>
                      </Card.Meta> */}
                      {/*<Card.Description>*/}
                        {/* <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' avatar />
                          <span>{section.teacher.name}</span> */}
                      {/*</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <span className="right floated">
                          <Icon name='dollar'/>{fixedPrice} per person
                      </span>
                        <a>
                          <Icon name='map pin'/>{section.location}
                        </a>
                    </Card.Content>
                  </Card>*/}
                } else {
                  null
                }

              })
            }
            )}
        </Card.Group>
        </React.Fragment>
           {/*</div>*/}
           </Col>




        <Col sm={3}>

        <Header
          as='h3'
          // onClick={() => this.props.history.push(`/member/${this.props.section.teacher.id}`)}
          >
           {/* <Image src='' size='tiny' circular /> */}
           <Image
             style={{width: "75px", height: "75px", overflow: "hidden", borderRadius: "50%", backgroundPosition: "center", backgroundSize: "cover", backgroundImage: `url(${HOST_URL + this.props.section.teacher.photo_url})`}}
           />&nbsp; <a>{this.props.section.teacher.name}</a>
        </Header>
        <div>{this.props.section.teacher.bio.substring(0, 100)}...</div>

        <br></br>
        <Button onClick={() => this.props.history.push(`/member/${this.props.section.teacher.id}`)}>See Full Profile</Button>

        <br></br><br></br>

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

        {/*</div>*/}

        <br></br><br></br>

        {this.props.currentMember && this.props.currentMember.id === this.props.section.teacher.id ? ( <Button>Add Lesson</Button> ) : (null) }
        </Col>


        {/* </Grid.Column>
        <Grid.Column width={9}> */}
        {/*<div className='section_desc'>*/}

        </Row>


        {/*<div className='section_info_card'>
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
                  <Modal.Content scrolling>*/}
                    {/* <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' /> */}
                    {/*<Modal.Description>
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
      </div>*/}
    {/*</div>*/}
    </Container>
  </div>
    </React.Fragment>
    ) : (
      <div>Loading...</div>
    )
  }
}

export default withRouter(SectionProfile2)
