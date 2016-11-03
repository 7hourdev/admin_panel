import React from 'react';
import {Link, browserHistory} from 'react-router';
import {Navbar, Nav, MenuItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import URL from './../helper/url';

export default React.createClass({
  logout() {
    $.ajax({
      url:URL("/logout"),
      method:"post",
      success:function(){
        window.location.href = URL("/");
      }
    })
  },
  render() {
    var admin_button = 
              <Nav pullRight>
                <LinkContainer to="/profile" activeClassName="active">
                  <MenuItem  eventKey={2} >Profile</MenuItem>
                </LinkContainer>
                <MenuItem onClick={this.logout} eventKey={3} >Log Out</MenuItem>
              </Nav>;
    if (this.props.admin){
      admin_button = 
              <Nav pullRight>
                <LinkContainer to="/add_site" activeClassName="active">
                  <MenuItem  eventKey={3} >Add Site</MenuItem>
                </LinkContainer>
                <LinkContainer to="/profile" activeClassName="active">
                  <MenuItem  eventKey={2} >Profile</MenuItem>
                </LinkContainer>
                <MenuItem onClick={this.logout} eventKey={3} >Log Out</MenuItem>
              </Nav>;
    }
    return (
    	<div className="home-header">
         <Navbar className="navbar navbar-normal-pages navbar-show">
            <Navbar.Header>
              <Navbar.Brand>
                <Link className="navbar-brand" to="/">
                  <p>7hourdev Admin Panel</p>
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              {admin_button}
            </Navbar.Collapse>
          </Navbar>
    	</div>
    	)
  }
})