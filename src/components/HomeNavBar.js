import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Image } from 'semantic-ui-react'

// const HOST_URL = 'https://comuse-backend.herokuapp.com'
const HOST_URL = 'http://localhost:3000'

const HomeNavBar = props => {
  props.member_obj ? console.log(props.member_obj) : null

  return (
    <div className={`ui inverted secondary pointing menu navbar`}>
      {/* <a className="item">
        <h2 className="ui header">
          <i className={`${props.icon} icon`} /> */}
          {/* <div className="content">{props.title}</div>
          <div className="sub header">{props.subtitle}</div> */}
        {/* </h2>
      </a> */}

      <NavLink
        exact
        to="/"
        className="ui item"
        activeClassName="ui active item"
      >
        <h2 className="ui header">
          <i className={`${props.icon} icon`} />
          {/* <div className="content">{props.title}</div>
          <div className="sub header">{props.subtitle}</div> */}
        </h2>
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
            <Image
              style={{width: "30px", height: "30px", overflow: "hidden", borderRadius: "50%", backgroundPosition: "center", backgroundSize: "cover", borderStyle: "solid", borderWidth: "1px", backgroundImage: `url(${props.member_obj ? HOST_URL + props.member_obj.photo_url : null})`}}
            />
            <span> &nbsp; Logged in as: {props.member.name}</span>
            <i class="dropdown icon"></i>
            <div class="menu">
              <a class="item">
                {props.member ? (
                  <NavLink
                    exact
                    to={`/member/${props.member.id}`}
                    // className="ui item"
                    // activeClassName="ui active item"
                  >
                    <i class="id card outline"></i>My profile
                  </NavLink>
                ) : (null)}
              </a>

              <a class="item">
                {props.member ? (
                  <NavLink
                    exact
                    to={`/stripe/member/${props.member.id}`}
                  >
                    <i class="dollar"></i>Payments Dashboard
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

export default HomeNavBar;
