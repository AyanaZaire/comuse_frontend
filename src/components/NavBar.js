import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from 'semantic-ui-react'

const NavBar = props => {
  // console.log('Nav bar member props', props.member)

  return (
    <div className={`ui menu navbar`}>
      <a className="item">
        <h2 className="ui header">
          <i className={`${props.icon} icon`} />
          {/* <div className="content">{props.title}</div>
          <div className="sub header">{props.subtitle}</div> */}
        </h2>
      </a>

      <NavLink
        exact
        to="/"
        className="ui item"
        activeClassName="ui active item"
      >
        Home
      </NavLink>


      <div className='right menu'>

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
          // <span className="ui item">Logged in as: {props.member.name}</span>
          <div class="ui simple dropdown item">
            Logged in as: {props.member.name} <i class="dropdown icon"></i>
            <div class="menu">
              <a class="item">
                {props.member ? (
                  <NavLink
                    exact
                    to={`/member/${props.member.id}`}
                  >
                    <i class="id card outline"></i>My profile
                  </NavLink>
                ) : (null)}
              </a>

              {props.member ? (
                  <a
                    class="item"
                    onClick={e=>{
                      props.handleLogOut(e)
                    }}>Log Out</a>
              ) : (null)}
            </div>
          </div>
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

      </div>

    </div>
  );
};

export default NavBar;
