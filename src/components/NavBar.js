import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from 'semantic-ui-react'

const NavBar = props => {
  // console.log('Nav bar member props', props.member)

  return (
    <div className={`ui inverted ${props.color} menu navbar`}>
      <a className="item">
        <h2 className="ui header">
          <i className={`${props.icon} icon`} />
          <div className="content">{props.title}</div>
          <div className="sub header">{props.subtitle}</div>
        </h2>
      </a>
      {/* <NavLink activeClassName="ui active item" className="ui item" to="/about">
        About
      </NavLink> */}
      <NavLink
        exact
        to="/"
        className="ui item"
        activeClassName="ui active item"
      >
        Home
      </NavLink>

      {props.member ? (null) : (
        <NavLink
          exact
          to="/signup"
          className="ui item"
          activeClassName="ui active item"
        >
          Sign Up
        </NavLink>
      )}

      {props.member ? (
        <span className="ui item">Logged in as: {props.member.name}</span>
      ) : (
        <NavLink
          exact
          to="/login"
          className="ui item"
          activeClassName="ui active item"
        >
          Login
        </NavLink>
      )}

      {props.member ? (
        <NavLink
          exact
          to={`/member/${props.member.id}`}
          className="ui item"
          activeClassName="ui active item"
        >
          My profile
        </NavLink>
      ) : (null)}

      {props.member ? (
        <Button
          onClick={e=>{
            props.handleLogOut(e)
          }}>Log Out</Button>
      ) : (null)}
    </div>
  );
};

export default NavBar;
