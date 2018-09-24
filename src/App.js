import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {Route, Switch} from 'react-router-dom'

import NavBar from './components/NavBar.js'
import LogIn from './components/LogIn.js'
import Signup from './components/Signup.js'
import Member from './components/Member.js'
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
              console.log("member id props", props);
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
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
