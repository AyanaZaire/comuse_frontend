import React, {Component} from 'react'
// import { Link } from "react-router-dom";
import { Icon, Form, Card, Image, Divider, Select, Modal, Header, Button } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom';

const options = [
    { key: 'art', text: 'Arts', value: 1 },
    { key: 'textile', text: 'Textile', value: 2 },
    { key: 'music', text: 'Music', value: 3 },
    { key: 'tech', text: 'Technology', value: 4 },
    { key: 'design', text: 'Design', value: 5 }
  ]

const ENROLLED_URL = 'https://comuse-backend.herokuapp.com/api/v1/enrolled'
const REDIRECT_URI_URL = 'https://comuse-backend.herokuapp.com' //line 93
const HOST_URL = 'https://comuse-backend.herokuapp.com'

// const ENROLLED_URL = 'http://localhost:3000/api/v1/enrolled'
// const REDIRECT_URI_URL = 'http://localhost:3000' //line 93
// const HOST_URL = 'http://localhost:3000'

// const stripeURL = `https://dashboard.stripe.com/oauth/authorize?response_type=code&client_id=ca_DglFK9m4L867x3ngntwiPhwbFPvPzpCl&scope=read_write`

class Member extends Component {

  state = {
    classesTaken: [],
    sectionValue: {
      title:'',
      duration: '',
      category_id: null,
      description: '',
      location: '',
      price: null,
      materials_provided: '',
      materials_to_bring: '',
      faqs: '',
      img_url: '',
      img_upload: null
    },
    value: {
      name: '',
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

  // componentDidMount = () => {
  //   this.props.member ? (
  //     this.setState({
  //       value: {
  //         name: this.props.member.name,
  //         email: '',
  //         password: '',
  //         skill: '',
  //         bio: '',
  //         location: '',
  //         website: '',
  //         // img_url: '',
  //         img_upload: null
  //       }
  //     })
  //   ) : null
  // }

  fetchClassesTaken = () => {
    fetch(ENROLLED_URL)
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

  handleSectionFormChange = (e, value) => {
    // console.log("Section Value", this.state.sectionValue)
      this.setState({
        sectionValue: {
          ...this.state.sectionValue,
          [e.target.name]: e.target.value
        }
      })
    }

  handleCategoryId = (e, data) => {
    // console.log("Category Id", data.value)
    this.setState({
      sectionValue: {
        ...this.state.sectionValue,
        category_id: data.value
      }
    })
  }

  handleChange = (e) => {
    this.setState({
      value: {
        ...this.state.value,
        [e.target.name]: e.target.value
      }
    })
  }

  handleUpdateMemberFile = (e) => {
    this.setState({
      value: {
        ...this.state.value,
        img_upload: e.currentTarget.files[0]
      }
    })
  }

  handleNewSectionFile = (e) => {
    this.setState({
      sectionValue: {
        ...this.state.sectionValue,
        img_upload: e.currentTarget.files[0]
      }
    })
  }


  render() {
    // const UPLOADED_PHOTO = HOST_URL + `${this.props.member.photo_url}`
    // this.props.member ? console.log(UPLOADED_PHOTO) : null
    // console.log("Member state", this.state)
    let stripeURL
    if (this.props.member) {
      stripeURL = `https://connect.stripe.com/express/oauth/authorize?response_type=code&client_id=ca_DglFK9m4L867x3ngntwiPhwbFPvPzpCl&scope=read_write&redirect_uri=` + REDIRECT_URI_URL + `/api/v1/oauth/callback&state=${this.props.member.id}`
    } else {
      stripeURL = null
    }


    return this.props.member ? (
      <div className="member_profile_container">
        <div>

          <div
            style={{width: "175px", height: "175px", overflow: "hidden", borderRadius: "50%", backgroundPosition: "center", backgroundSize: "cover", backgroundImage: `url(${HOST_URL + this.props.member.photo_url})`}}
            >
            {/* <Image
              src={this.props.member.img_url}
            /> */}
        </div>
          <Header as='h1'
            // textAlign='center'
            >
            {this.props.member.name}
          </Header>
          <div><Icon name='lightbulb outline' /> {`${this.props.member.skill}`}</div>
          <div><Icon name='map pin' /> {`${this.props.member.location}`}</div>
          <div><Icon name='globe' /> {`${this.props.member.website}`}</div>

          <br></br>

          {this.props.currentMember && this.props.currentMember.id === this.props.member.id ? (
          <a href={stripeURL} class="stripe-connect light-blue"><span>Connect with Stripe</span></a>
          ) : (null)}

          <br></br><br></br>

          {this.props.currentMember && this.props.currentMember.id === this.props.member.id ? (
          <Modal trigger={<Button secondary>Create New Class</Button>} >
            <Modal.Header>Create a New Class</Modal.Header>
            <Modal.Content scrolling>
              {/* <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' /> */}
              <Modal.Description>
                {/* <Header>Default Profile Image</Header> */}
                  <Form
                  onSubmit={ e => {
                    e.preventDefault()
                    const formData = new FormData()
                    this.props.handleNewSection(this.props.currentMember.id, this.state.sectionValue, e, formData)
                    this.props.history.push('/')
                  }}>
                  <Form.Group widths='equal'>
                    <Form.Input
                      name='title'
                      value={this.state.sectionValue.title}
                      onChange={this.handleSectionFormChange}
                      fluid label='Title'
                      placeholder='Title' />
                    <Form.Select
                      name='category_id'
                      onChange={(e, data) => this.handleCategoryId(e, data)}
                      fluid label='Category'
                      options={options}
                      placeholder='Category'/>
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Form.Input
                      name='duration'
                      value={this.state.sectionValue.duration}
                      onChange={this.handleSectionFormChange}
                      fluid label='Duration'
                      placeholder='Duration' />
                    <Form.Input
                      name='location'
                      value={this.state.sectionValue.location}
                      onChange={this.handleSectionFormChange}
                      fluid label='Location'
                      placeholder='Location' />
                    <Form.Input
                      name='price'
                      icon='dollar'
                      iconPosition='left'
                      value={this.state.sectionValue.price}
                      onChange={this.handleSectionFormChange}
                      fluid label='Price'
                      placeholder='Price' />
                  </Form.Group>
                  <Form.Input
                    name='img_upload'
                    type= 'file'
                    // value={this.state.value.img_url}
                    onChange={this.handleNewSectionFile}
                    fluid label='Upload Your Section Display Photo'
                    placeholder='Include the image that will be your section display photo' />
                  <Form.TextArea
                    name='description'
                    value={this.state.sectionValue.description}
                    onChange={this.handleSectionFormChange}
                    label='Description'
                    placeholder='Tell us about the class...' />

                    <Form.TextArea
                      name='materials_provided'
                      value={this.state.sectionValue.materials_provided}
                      onChange={this.handleSectionFormChange}
                      label='Materials Provided'
                      placeholder='Tell the students what you will provide for the class...' />

                      <Form.TextArea
                        name='materials_to_bring'
                        value={this.state.sectionValue.materials_to_bring}
                        onChange={this.handleSectionFormChange}
                        label='Materials to Bring'
                        placeholder='Tell the students what they should bring to the session...' />

                        <Form.TextArea
                          name='faqs'
                          value={this.state.sectionValue.faqs}
                          onChange={this.handleSectionFormChange}
                          label='FAQs'
                          placeholder='Will there be food or bev provided? Are there age restrictions? Special directions to find you? etc...' />

                  <Form.Checkbox
                    label='I agree to the Terms and Conditions' />
                  <Form.Button>Create</Form.Button>
                </Form>

              </Modal.Description>
            </Modal.Content>
          </Modal>
          ) : (null)}

          <br></br><br></br>

          {this.props.currentMember && this.props.currentMember.id === this.props.member.id ? (
          <Modal trigger={<Button secondary>Edit Profile</Button>} >
            <Modal.Header>Edit User Profile</Modal.Header>
            <Modal.Content scrolling>
              {/* <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' /> */}
              <Modal.Description>
                {/* <Header>Default Profile Image</Header> */}
                <Form
                onSubmit={ e => {
                  e.preventDefault()
                  const formData = new FormData()
                  this.props.handleEditMember(this.state.value, this.props.member.id, e, formData)
                  this.props.history.push(`/member/${this.props.member.id}`)
                }}>
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
               </Form.Group>
               <Form.Group widths='equal'>
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
                      onChange={this.handleUpdateMemberFile}
                      fluid label='Upload Your Profile Photo'
                      placeholder='Include the image that will be your "profile photo"' />
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

              </Modal.Description>
            </Modal.Content>
          </Modal>
          ) : (null)}

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

                    let price = parseFloat(section.price)
                    let fixedPrice = price.toFixed(2)

                    return <Card
                      onClick={() => this.props.history.push(`/class/${section.id}`)}
                      >
                      <Image src={section.img_url} />
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

                // })
              }
              )}
          </Card.Group>
          </React.Fragment>

            <h4>Enrolled</h4>

            <React.Fragment>
            <Card.Group>
              {this.state.classesTaken.map(enrolls => {
                // console.log('Enroll map', enrolls)
                // return enrolls.section.map(section => {
                //   console.log('Section map', section)
                  if (this.props.member.id === enrolls.student_id) {
                    let price = parseFloat(enrolls.section.price)
                    let fixedPrice = price.toFixed(2)

                    return <Card
                      onClick={() => this.props.history.push(`/class/${enrolls.section.id}`)}
                      >
                      <Image src={enrolls.section.img_url} />
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
                            <Icon name='dollar'/>{fixedPrice} per person
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

          {/* <h3>Reviews</h3>
            <p>From Students</p>
            <p>From Teachers</p> */}



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
