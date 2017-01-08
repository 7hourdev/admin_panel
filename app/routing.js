import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import Home from './pages/home';
import Profile from './pages/profile';
import Website from './pages/website/';
import AddSite from './pages/admin/add_site';
import EditSite from './pages/admin/edit_site';
import AddContent from './pages/admin/add_content';
import ListView from './pages/website/list-view';
import EditContent from './pages/website/edit';
import App from './app';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="profile" component={Profile}/>
      <Route path="add_site" component={AddSite}/>
      <Route path=":id" component={Website}>
	      <IndexRoute component={ListView}/>
        <Route path="add" component={AddContent}/>
        <Route path="edit" component={EditSite}/>
        <Route path=":contentid" component={EditContent}/>
      </Route>
    </Route>
  </Router>
), document.getElementById('app'))