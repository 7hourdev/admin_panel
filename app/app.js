import React from 'react'
import {render} from 'react-dom'
import Header from './modules/header'
import Footer from './modules/footer'
import {browserHistory} from 'react-router'
import URL from './helper/url'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
  withRouter
} from 'react-router-dom';

import AppStore from 'stores/app';

import Home from './pages/home';
import Profile from './pages/profile';
import Website from './pages/website/';
import AddSite from 'pages/admin/add_site';

import Login from './pages/auth/login';
import Register from './pages/auth/register';

import Page from 'pages/abstract/page';

class App extends Page{
	componentDidUpdate(){
		window.scrollTo(0,0);
	}
	renderNoAuth(){
		return (
			<Router>
				<div>
					<Header/>
                 	<Switch>
				        <Route exact path="/login" component={Login} />
				        <Route exact path="/register" component={Register} />
				        <Route path = "*" component={(match)=>{
				          if (match.location.pathname.indexOf("/register") == -1 
				            	&& match.location.pathname.indexOf("/login") == -1){
				            	AppStore.prevUrl = match.location.pathname;
				          	}
			          		return <Redirect to="/login"/>
				        }} />
			        </Switch>
				<Footer/>
				</div>
			</Router>
		);
	}
	renderUser() {
		return this.renderSections();
	}
	renderAdmin() {
		var sections = [];
		sections.push(<Route key={1} exact path="/add_site" component={AddSite}/>);
		return this.renderSections(sections);
	}
	renderSections(sections){
		return (
			<Router>
				<div>
					<Header/>
					<Switch>
						<Route exact path="/" component={Home}/>
						<Route exact path="/profile" component={Profile}/>
						{sections}
				        <Route exact path="/login" component={()=>{
				          var redirect = AppStore.prevUrl;
				          AppStore.prevUrl = undefined;
				          return <Redirect to={redirect?redirect:"/"}/>
				        }} />
						<Route path="/:id" component={Website}/>
					</Switch>
					<Footer/>
				</div>
			</Router>
		)
	}
}
render(<App/> , document.getElementById('app'));