import React from 'react';
import {Link} from 'react-router-dom';
import {observer} from 'mobx-react';

import SiteStore from 'stores/site'
import { Route } from 'react-router-dom'

export default @observer class home extends React.Component{
    componentWillMount(){
        if (!SiteStore.loaded){
            SiteStore.getSites();
        }
    }
    render() {
        return (
            <div className="container content home-content">
                <h1>Welcome to your dashboard</h1>
                {SiteStore.loaded&&SiteStore.data.length>0?
                    <div>
                        <p>Please select your website from below</p>
                        {SiteStore.data.map(website =>
                            <Route key={website.name} render={({ history}) => (
                                <div className="item" onClick = {()=>history.push("/"+website.id)}>
                                    <div className="inner">
                                        <h3>{website.name}</h3>
                                        <a href = {website.url}>{website.url}</a>
                                    </div>
                                    <i className="icon ion-chevron-right"/>
                                </div>
                            )}/>
                        )}
                    </div>
                    :<p>Sorry, You do not have access to any website yet!</p>}
            </div>
        );
    }
}