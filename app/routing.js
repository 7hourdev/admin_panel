import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import Home from './pages/home';
import Profile from './pages/profile';
import Website from './pages/website/';
import ListView from './pages/website/list-view';
import EditContent from './pages/website/edit';
import App from './app';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="profile" component={Profile}/>
      <Route path=":id" component={Website}>
	      <IndexRoute component={ListView}/>
	      <Route path=":contentid" component={EditContent}/>
      </Route>
    </Route>
  </Router>
), document.getElementById('app'))