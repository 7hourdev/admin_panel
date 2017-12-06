import React from 'react';
import {Link} from 'react-router-dom';
import {observer} from 'mobx-react';
import { Route } from 'react-router-dom'

import SiteStore from 'stores/site'
import AppStore from 'stores/app'

export default @observer class websitelist extends React.Component{
    render() {
        var self = this;
        var website = AppStore.website;
        var admin;
        if (AppStore.user.type==1){
            admin=<Route render={({ history}) => (
                <div>
                    <button 
                        className="btn btn-primary add-section" 
                        onClick={()=>history.push("/"+website.id+"/add")}>
                        Add
                    </button>
                    <button 
                        className="btn btn-primary add-section" 
                        onClick={()=>history.push("/"+website.id+"/edit")}>
                        Edit
                    </button>
                </div>
            )}/>;
        }
        return (
            <div className="">
                {admin}
                <p>Modify your site's content below</p>
                {website.contents?website.contents.map((content) => 
                    <Route key = {content.id} render={({ history}) => (
                        <div className="edit-item" onClick = {()=>history.push("/"+website.id+"/"+content.id)}>
                            <h3 className="inner">{content.name}</h3>
                            <i className="icon ion-chevron-right"/>
                        </div>
                    )}/>):"N/A"}

            </div>
        );
    }
}