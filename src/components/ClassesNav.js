import React, {Component} from 'react'
import { NavLink } from "react-router-dom";
import {Navbar, Nav, NavDropdown, Form, FormControl, Button, Image} from 'react-bootstrap';

// const HOST_URL = 'https://comuse-backend.herokuapp.com'
const HOST_URL = 'http://localhost:3000'
const IMAGE = <Image
  style={{width: "30px", height: "30px"}}
  src="https://avatars1.githubusercontent.com/u/892860?s=460&v=4"
  roundedCircle
/>


class ClassesNav extends Component {

  render() {
    return (
      <React.Fragment>
        <div
        className="navbar-container"
        style={{backgroundColor: "#FFFFFF"}}
        >
          <Navbar
            data-overlay
            expand="lg"
            className="navbar-dark"
            data-sticky="top"
          >
            <div className="container">
              <Navbar.Brand href="/">Co.muse</Navbar.Brand>
              {/*<a className="navbar-brand fade-page" href="/">
                <img src="assets/img/logo-white.svg" alt="Co.muse" />
              </a>*/}
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/classes">Classes</Nav.Link>
                  {/*<Nav.Link href="#link">Link</Nav.Link>*/}
                  {this.props.member ? (null) : (
                    <Nav.Link href="/signup">Sign Up</Nav.Link>
                  )}

                  {this.props.member ? (
                    <NavDropdown
                        title={`Logged in as: ${this.props.member.name}`}
                        id="basic-nav-dropdown">

                      {this.props.member ? (
                        <NavDropdown.Item>
                        <NavLink
                          exact
                          to={`/member/${this.props.member.id}`}
                        >
                          My profile
                        </NavLink>
                        </NavDropdown.Item>
                      ) : (null)}

                        {this.props.member ? (
                          <NavDropdown.Item>
                          <NavLink
                            exact
                            to={`/stripe/member/${this.props.member.id}`}
                          >
                            <i class="dollar"></i>Payments Dashboard
                          </NavLink>
                          </NavDropdown.Item>
                        ) : (null)}
                      <NavDropdown.Divider />
                              {this.props.member ? (
                                <NavDropdown.Item
                                onClick={e=>{
                                  this.props.handleLogOut(e)
                                }}>Log Out
                                </NavDropdown.Item>
                              ) : (null)}
                    </NavDropdown>
                ) : (
                  <Nav.Link href="/login">Login</Nav.Link>
                )}
                </Nav>
              </Navbar.Collapse>
            </div>
          </Navbar>
        </div>

      </React.Fragment>
    );
  }
}

export default ClassesNav;
