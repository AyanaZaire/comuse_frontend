import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {Route, Switch} from 'react-router-dom'

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

const URL = 'http://localhost:3000/api/v1/members'

class App extends Component {

  state = {
    member: null,
    allMembers: [],
    allSections: [],
    searchTerm: "",
    allCategories: []
  }

  fetchMembers = () => {
    fetch(URL)
      .then(response => response.json())
      .then(allMembers => {
        console.log(allMembers)
        this.setState({ allMembers });
      });
  }

  fetchMember = () => {
    requestHelper("http://localhost:3000/api/v1/me").then(this.updateMember);
  };

  updateMember = member => {
    this.setState({ member });
  };

  handleNewMember = (e, value) => {
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: value.name,
        email: value.email,
        password: value.password,
        skill: value.skill,
        location: value.location,
        website: value.website,
        bio: value.bio,
        img_url: value.img_url
      })
    })
    .then(response => response.json())
    .then(data => {
      this.setState({
        allMembers: [...this.state.allMembers, data]
      })
    })
    e.currentTarget.reset()
  }

  handleEditMember = (value, id, e) => {
    // console.log("Edit Section", value, id)
    fetch(URL + `/${id}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: value.name,
        email: value.email,
        password: value.password,
        skill: value.skill,
        location: value.location,
        website: value.website,
        bio: value.bio,
        img_url: value.img_url
      })
    })
    .then(response => response.json())
    .then(data => {
      // console.log("response data", data)
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

  handleNewSection = (teacher_id, value, e) => {
    // console.log("Handle New Section", teacher_id, value, e)
    const {title, duration, category_id, description, location, price, materials_provided, materials_to_bring, faqs, img_url} = value
    // debugger
    fetch('http://localhost:3000/api/v1/section', {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({section: {
        title: title,
        duration: duration,
        category_id: category_id,
        teacher_id: teacher_id,
        description: description,
        location: location,
        price: price,
        materials_provided: materials_provided,
        materials_to_bring: materials_to_bring,
        faqs: faqs,
        img_url: img_url
        }
      })
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
    fetch('http://localhost:3000/api/v1/section')
      .then(response => response.json())
      .then(allSections => {
        this.setState({ allSections });
      });
  }

  handleEditSection = (value, id, e) => {
    console.log("Edit Section", value, id)
    fetch('http://localhost:3000/api/v1/section' + `/${id}`, {
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

  handleEnrollButton = (e, student_id, section_id) => {
    console.log("Enroll button", e, student_id, section_id)
    fetch('http://localhost:3000/api/v1/enrolled', {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        student_id: student_id,
        section_id: section_id
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

  sectionComponentLogic = () => {
    if (this.state.allSections !== null) {
      let results = this.state.searchTerm === '' ? this.state.allSections : this.filterSection();
      return <SectionContainer sections={results} />
    } else {
      return <SectionContainer sections={this.state.allSections} />
    }
  }

  fetchCategories = () => {
    fetch('http://localhost:3000/api/v1/category')
      .then(response => response.json())
      .then(allCategories => {
        this.setState({ allCategories });
      });
  }

  // patchStripeMember = () => {
  //   fetch('http://localhost:3000/api/v1/oauth/callback' + `/${this.state.member.id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Authorization": `Bearer ${localStorage.getItem("token")}`,
  //       "Content-Type": "application/json",
  //       "Accept": "application/json"
  //     })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log("STRIPE response data", data)
  //   })
  // }

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
    return (
      <React.Fragment>

        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return(
                <React.Fragment>
                  <div className='home_top_header'>
                      <HomeNavBar
                        icon="lightbulb outline"
                        member={this.state.member}
                        handleLogOut={this.handleLogOut}
                      />
                    <Search  onSearchHandler={this.onSearchHandler} value={this.state.searchTerm}/>
                  </div>
                  <div className="App">
                    <Categories categories={this.state.allCategories}/>
                    {sectionComponent}
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
                  member={this.state.member}
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
