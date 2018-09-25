import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {Route, Switch} from 'react-router-dom'

import NavBar from './components/NavBar.js'
import LogIn from './components/LogIn.js'
import Signup from './components/Signup.js'
import Member from './components/Member.js'
import SectionProfile from './components/SectionProfile.js'
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
    allSections: []
  }

  fetchMembers = () => {
    fetch(URL)
      .then(response => response.json())
      .then(allMembers => {
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
        bio: value.bio
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
    // console.log("Edit User", value, id)
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
        bio: value.bio
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
        faqs: value.faqs
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

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.fetchMember();
    }
    this.fetchMembers();
    this.fetchSections();
  }


  render() {
    console.log('Current app state', this.state)
    return (
      <React.Fragment>
        <NavBar
          title="Co.muse"
          icon="lightbulb outline"
          color="light red"
          subtitle="Stay Curious"
          member={this.state.member}
          handleLogOut={this.handleLogOut}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return(
                <div className="App">
                  <SectionContainer
                    sections={this.state.allSections}
                  />
                </div>
              )
            }}
          />
          <Route
            path="/login"
            render={() => {
              return(
                <div className="App">
                  <LogIn
                    updateMember={this.updateMember}
                  />
                </div>
              )
            }}
          />
          <Route
            path="/signup"
            render={props => {
              return(
                <div className="App">
                  <Signup
                    handleNewMember={this.handleNewMember}
                  />
                </div>
              )
            }}
          />
          <Route
            path="/member/:memberId"
            render={props => {
              // console.log("member id props", props);
              return(
                <div className="App">
                  <Member
                    currentMember={this.state.member}
                    handleEditMember={this.handleEditMember}
                    // member={this.state.member}
                    member={this.state.allMembers.find(member => {
                      // console.log('in find', typeof member.id, typeof props.match.params.memberId);
                      return member.id == props.match.params.memberId
                    }
                  )}
                  />
                </div>
              )
            }}
          />
          <Route
            path="/class/:classId"
            render={props => {
              // console.log("class id props", props);
              return(
                // <div className="App">
                  <SectionProfile
                    currentMember={this.state.member}
                    handleEditSection={this.handleEditSection}
                    section={this.state.allSections.find(section => {
                      return section.id == props.match.params.classId
                    }
                  )}
                  />
                // </div>
              )
            }}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
