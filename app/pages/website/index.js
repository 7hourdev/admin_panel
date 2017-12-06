import React from 'react';
import { Route, Switch } from 'react-router-dom'
import {observer} from 'mobx-react';

import SiteStore from 'stores/site'
import AppStore from 'stores/app'

import EditSite from 'pages/admin/edit_site';
import AddContent from 'pages/admin/add_content';
import ListView from 'pages/website/list-view';
import EditContent from 'pages/website/edit';

@observer class website extends React.Component{
    componentWillMount(){
        var self = this;
        if (!SiteStore.loaded){
            SiteStore.getSites((data)=>{
                AppStore.website = data.filter(website => website.id == self.props.match.params.id)[0];
            });
        } else {
            AppStore.website = SiteStore.data.filter(website => website.id == self.props.match.params.id)[0];
        }
    }
    render() {
        var self = this;
        var website = AppStore.website;
        if (website==null){
            return(
                <div className="container content">
                    <h1>Sorry you do not seem to have access to this website!</h1>
                    <Route render={({ history}) => ( <a onClick={() =>history.push("/")}>Go Back to Homepage</a>)}/>
                </div>
            );
        }
        var match = this.props.match;
        return (
            <div className="container content">
                <h1>Site Name: {website.name}</h1>
                <a href={website.url}>Visit Site</a>
                <hr/>
                <Switch>
                    <Route path={`${match.url}/add`}render={()=><AddContentm {...self.props}/> }/>
                    <Route path={`${match.url}/edit`} rcomponent={EditSite}/>
                    <Route path={`${match.url}/:contentid`} component={EditContent}/>
                    <Route path={`${match.url}/`} render={()=><ListView {...self.props}/>}/>
                </Switch>
            </div>
        );
    }
}

export default website;