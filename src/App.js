import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {Route, Switch} from 'react-router-dom'
import { Button } from 'semantic-ui-react'

import HomeNavBar from './components/HomeNavBar.js'
import NavBar from './components/NavBar.js'
import LogIn from './components/LogIn.js'
import Signup from './components/Signup.js'
import Member from './components/Member.js'
import SectionProfile from './components/SectionProfile.js'
import Search from './components/Search.js'
import Categories from './components/Categories.js'

import {Elements, StripeProvider} from 'react-stripe-elements';
import StripeProfile from './components/StripeProfile';

import SectionContainer from './containers/SectionContainer.js'

const ME_URL = 'https://comuse-backend.herokuapp.com/api/v1/me'
const MEMBERS_URL = 'https://comuse-backend.herokuapp.com/api/v1/members'
const SECTIONS_URL = 'https://comuse-backend.herokuapp.com/api/v1/section'
const ENROLLED_URL = 'https://comuse-backend.herokuapp.com/api/v1/enrolled'
const CATEGORIES_URL = 'https://comuse-backend.herokuapp.com/api/v1/category'

// const ME_URL = 'http://localhost:3000/api/v1/me'
// const MEMBERS_URL = 'http://localhost:3000/api/v1/members'
// const SECTIONS_URL = 'http://localhost:3000/api/v1/section'
// const ENROLLED_URL = 'http://localhost:3000/api/v1/enrolled'
// const CATEGORIES_URL = 'http://localhost:3000/api/v1/category'
// npm run dev to run local version of frontend application

//other urls can be found in /SectionProfile., /Member.js, LogIn.js, CheckoutForm.js, NavBar.js, HomeNavBar.js

const requestHelper = url =>
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }).then(res => {
    if (res.status === 401) {
      alert("login failed");
    } else {
      return res.json();
    }
  });

class App extends Component {

  state = {
    member: null,
    allMembers: [],
    allSections: [],
    searchTerm: "",
    allCategories: [],
    clickedCategory: ""
  }

  fetchMembers = () => {
    fetch(MEMBERS_URL)
      .then(response => response.json())
      .then(allMembers => {
        console.log(allMembers)
        this.setState({ allMembers });
      });
  }

  fetchMember = () => {
    requestHelper(ME_URL).then(this.updateMember);
  };

  updateMember = member => {
    this.setState({ member });
  };

  handleNewMember = (e, value, formData) => {
    console.log('New member value', value)
    formData.append('name', value.name)
    formData.append('email', value.email)
    formData.append('password', value.password)
    formData.append('skill', value.skill)
    formData.append('location', value.location)
    formData.append('website', value.website)
    formData.append('bio', value.bio)
    // formData.append('img_url', value.img_url)
    formData.append('photo', value.img_upload)
    fetch(MEMBERS_URL, {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      //   "Accept": "application/json"
      // },
      body: formData
      // body: JSON.stringify({
      //   name: value.name,
      //   email: value.email,
      //   password: value.password,
      //   skill: value.skill,
      //   location: value.location,
      //   website: value.website,
      //   bio: value.bio,
      //   img_url: value.img_url,
      //   photo: formData,
      //   contentType: false,
      //   processData: false
      // })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      this.setState({
        allMembers: [...this.state.allMembers, data]
      })
    })
    e.currentTarget.reset()
  }

  handleEditMember = (value, id, e, formData) => {
    // console.log("Edit Section", value, id)
    formData.append('name', value.name)
    formData.append('email', value.email)
    formData.append('password', value.password)
    formData.append('skill', value.skill)
    formData.append('location', value.location)
    formData.append('website', value.website)
    formData.append('bio', value.bio)
    // formData.append('img_url', value.img_url)
    formData.append('photo', value.img_upload)
    fetch(MEMBERS_URL + `/${id}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
        // "Content-Type": "application/json",
        // "Accept": "application/json"
      },
      body: formData
      // body: JSON.stringify({
      //   name: value.name,
      //   email: value.email,
      //   password: value.password,
      //   skill: value.skill,
      //   location: value.location,
      //   website: value.website,
      //   bio: value.bio,
      //   img_url: value.img_url
      // })
    })
    .then(response => response.json())
    .then(data => {
      console.log("response data", data)
      let editedMember = this.state.allMembers.map(member => {
        if (member.id === id) {
          return data
        } else {
          return member
        }
      })
      this.setState({
        allMembers: editedMember
      })
    })
    e.currentTarget.reset()
  }

  handleNewSection = (teacher_id, value, e, formData) => {
    // console.log("Handle New Section", teacher_id, value, e)
    const {title, duration, category_id, description, location, price, materials_provided, materials_to_bring, faqs, img_url, img_upload} = value
    console.log('New member value', value)
    formData.append('name', title)
    formData.append('email', duration)
    formData.append('password', category_id)
    formData.append('skill', teacher_id)
    formData.append('location', description)
    formData.append('website', location)
    formData.append('bio', price)
    formData.append('bio', materials_provided)
    formData.append('bio', materials_to_bring)
    formData.append('bio', faqs)
    formData.append('img_url', img_url)
    formData.append('photo', img_upload)
    // debugger
    fetch(SECTIONS_URL, {
      method: "POST",
      // headers: {
      //   "Authorization": `Bearer ${localStorage.getItem("token")}`,
      //   "Content-Type": "application/json",
      //   "Accept": "application/json"
      // },
      body: {section: formData}
      // JSON.stringify({section: {
      //   title: title,
      //   duration: duration,
      //   category_id: category_id,
      //   teacher_id: teacher_id,
      //   description: description,
      //   location: location,
      //   price: price,
      //   materials_provided: materials_provided,
      //   materials_to_bring: materials_to_bring,
      //   faqs: faqs,
      //   img_url: img_url
      //   }
      // })
    })
    .then(response => response.json())
    .then(data => {
      console.log("Response", data)
      this.setState({
        allSections: [...this.state.allSections, data]
      })
    })
    // e.currentTarget.reset()
  }

  handleLogOut = (e) => {
    this.setState({
      member: null
    });
    localStorage.clear();
  }

  fetchSections = () => {
    fetch(SECTIONS_URL)
      .then(response => response.json())
      .then(allSections => {
        this.setState({ allSections });
      });
  }

  handleEditSection = (value, id, e) => {
    console.log("Edit Section", value, id)
    fetch(SECTIONS_URL + `/${id}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        title: value.title,
        duration: value.duration,
        description: value.description,
        location: value.location,
        price: value.price,
        materials_provided: value.materials_provided,
        materials_to_bring: value.materials_to_bring,
        faqs: value.faqs,
        img_url: value.img_url
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log("response data", data)
      let editedSection = this.state.allSections.map(section => {
        if (section.id === id) {
          return data
        } else {
          return section
        }
      })
      this.setState({
        allSections: editedSection
      })
    })
    // e.currentTarget.querySelectorAll('input').reset()
  }

  handleEnrollButton = (e, student_id, section, course) => {
    console.log("Enroll button", student_id, section, course, section.enrolled.length, course.student_max)
    console.log(section.enrolled.length >= course.student_max)
    // if(section.enrolled.length >= course.student_max) {
    //   alert('This class is full!')
    // } else {
      fetch(ENROLLED_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          student_id: student_id,
          section_id: section.id,
          course_id: course.id
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log("Enrolled response", data)
        // this.setState({
        //   allSections: [...this.state.allSections, data]
        // })
      })
  }

  onSearchHandler = event => {
    this.setState({ searchTerm: event.target.value });
  }

  filterSection = () => {
    return this.state.allSections.filter(section => section.location.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
  }

  fetchCategories = () => {
    fetch(CATEGORIES_URL)
      .then(response => response.json())
      .then(allCategories => {
        this.setState({ allCategories });
      });
  }

  onClickCategoryHandler = (event) => {
    let clicked = event.currentTarget.id
    this.setState({ clickedCategory: clicked });
  }

  filterCategory = () => {
    let currentCat = this.state.clickedCategory.toLowerCase()
    return this.state.allSections.filter(section => section.category.name.toLowerCase() == currentCat)
  }

  sectionComponentLogic = () => {
    if (this.state.searchTerm !== '') {
      let results = this.state.searchTerm === '' ? this.state.allSections : this.filterSection();
      return <SectionContainer sections={results} />
    } else if (this.state.clickedCategory !== '') {
      let results = this.state.clickedCategory === '' ? this.state.allSections : this.filterCategory();
      return <SectionContainer sections={results} />
    } else {
      return <SectionContainer sections={this.state.allSections} />
    }
  }

  resetState = () => {
    this.setState({ clickedCategory: '' });
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.fetchMember()
    }
    this.fetchMembers()
    this.fetchSections()
    this.fetchCategories()
  }


  render() {
    console.log('Current app state', this.state)
    const sectionComponent = this.sectionComponentLogic()
    // const categoryComponent = this.categoryComponentLogic()
    return (
      <React.Fragment>

        <Switch>
          <Route
            exact
            path="/"
            render={(props) => {
              return(
                <React.Fragment>
                  <div className='home_top_header'>
                      <HomeNavBar
                        icon="lightbulb outline"
                        member={this.state.member}
                      //   member_obj={this.state.allMembers.find(member => {
                      //     // console.log('in find', typeof member.id, typeof props.match.params.memberId);
                      //     return member.id == this.state.member.id
                      //   }
                      // )}
                        handleLogOut={this.handleLogOut}
                      />
                    <Search  onSearchHandler={this.onSearchHandler} value={this.state.searchTerm}/>
                  </div>
                  <div className="App">
                    {/* <Categories
                      categories={this.state.allCategories}
                      onClickCategoryHandler={this.onClickCategoryHandler}
                    /> */}
                    <Categories
                      categories={this.state.allCategories}
                      onClickCategoryHandler={this.onClickCategoryHandler}
                    />
                    {sectionComponent}
                    <br></br><br></br>
                    <Button secondary onClick={this.resetState}>All Classes</Button>
                  </div>
                </React.Fragment>
              )
            }}
          />
          <Route
            path="/login"
            render={() => {
              return(
                <React.Fragment>
                <NavBar
                  icon="lightbulb outline"
                  member={this.state.member}
                  handleLogOut={this.handleLogOut}
                />
                <div className="App">
                  <LogIn
                    updateMember={this.updateMember}
                  />
                </div>
                </React.Fragment>
              )
            }}
          />
          <Route
            path="/signup"
            render={props => {
              return(
                <React.Fragment>
                <NavBar
                  icon="lightbulb outline"
                  member={this.state.member}
                  handleLogOut={this.handleLogOut}
                />
                <div className="App">
                  <Signup
                    handleNewMember={this.handleNewMember}
                  />
                </div>
                </React.Fragment>
              )
            }}
          />
          <Route
            path="/member/:memberId"
            render={props => {
              // console.log("member id props", props);
              return(
                <React.Fragment>
                <NavBar
                  icon="lightbulb outline"
                  member={this.state.allMembers.find(member => {
                    // console.log('in find', typeof member.id, typeof props.match.params.memberId);
                    return member.id == props.match.params.memberId
                  }
                )}
                  handleLogOut={this.handleLogOut}
                />
                <div className="App">
                  <Member
                    currentMember={this.state.member}
                    handleEditMember={this.handleEditMember}
                    handleNewSection={this.handleNewSection}
                    // member={this.state.member}
                    member={this.state.allMembers.find(member => {
                      // console.log('in find', typeof member.id, typeof props.match.params.memberId);
                      return member.id == props.match.params.memberId
                    }
                  )}
                  />
                </div>
                </React.Fragment>
              )
            }}
          />
          <Route
            path="/class/:classId"
            render={props => {
              // console.log("class id props", props);
              return(
                <React.Fragment>
                <NavBar
                  icon="lightbulb outline"
                  member={this.state.member}
                  handleLogOut={this.handleLogOut}
                />
                  <SectionProfile
                    currentMember={this.state.member}
                    handleEditSection={this.handleEditSection}
                    handleEnrollButton={this.handleEnrollButton}
                    section={this.state.allSections.find(section => {
                      return section.id == props.match.params.classId
                    }
                  )}
                  />
                </React.Fragment>
              )
            }}
          />
          <Route
            exact
            path="/stripe/member/:memberId"
            render={props => {
              return(
                <React.Fragment>
                <NavBar
                  icon="lightbulb outline"
                  member={this.state.member}
                  handleLogOut={this.handleLogOut}
                />
                <StripeProfile
                  member={this.state.allMembers.find(member => {
                    // console.log('in find', typeof member.id, typeof props.match.params.memberId);
                    return member.id == props.match.params.memberId
                  }
                )}
                />
                </React.Fragment>
              )
            }}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
