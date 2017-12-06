import React from 'react';
import {Route} from 'react-router-dom';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import URL from './../helper/url';
import { withRouter } from 'react-router';


import {observer} from 'mobx-react'

import Page from 'pages/abstract/page';

import SiteStore from 'stores/site'
import AppStore from 'stores/app';

@observer
class header extends Page{
  logout() {
    $.ajax({
      url:URL("/api/logout"),
      method:"get",
      success:function(){
        window.location.href = URL("/");
        SiteStore.loaded = false;
        AppStore.website = undefined;
      }
    })
  }
  renderAdmin(){
    return this.renderSections(<RouteNavItem href="/add_site" activeclassname="active">Add Site</RouteNavItem>);
  }
  renderUser(){
    return this.renderSections();
  }
  renderNoAuth(){
    var self = this;
    return (
      <div className="home-header">
         <Navbar className="navbar navbar-normal-pages navbar-show">
            <Navbar.Header>
              <Navbar.Brand>
                <a className="navbar-brand" onClick={()=>self.props.history.push("/")}>
                  <p>7hourdev Admin Panel</p>
                </a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <RouteNavItem href="/register" activeclassname="active">Register</RouteNavItem>
                <RouteNavItem href="/login" activeclassname="active">Login</RouteNavItem>
              </Nav>;
            </Navbar.Collapse>
          </Navbar>
      </div>
      )
  }
  renderSections(sections) {
    var self = this;
    return (
    	<div className="home-header">
         <Navbar className="navbar navbar-normal-pages navbar-show">
            <Navbar.Header>
              <Navbar.Brand>
                <a className="navbar-brand" onClick={()=>self.props.history.push("/")}>
                  <p>7hourdev Admin Panel</p>
                </a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <RouteNavItem href="/" activeclassname="active">Home</RouteNavItem>
                {sections}
                <RouteNavItem href="/profile" activeclassname="active">Profile</RouteNavItem>
                <RouteNavItem href="/logout" onClick={this.logout}>Log Out</RouteNavItem>
              </Nav>;
            </Navbar.Collapse>
          </Navbar>
    	</div>
    	)
  }
}

var RouteNavItem = (props) =>
  <Route
    path={props.href}
    exact
    children={({ match, history }) =>
      <NavItem
        onClick={e => {e.preventDefault();history.push(e.currentTarget.getAttribute("href"))}}
        {...props}
        active={match ? true : false}
      >
        {props.children}
      </NavItem>}
  />;

export default withRouter(header);