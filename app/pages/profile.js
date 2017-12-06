import React from 'react';
import {Link} from 'react-router-dom';
import {observer} from 'mobx-react';

import AppStore from 'stores/app'

export default @observer class profile extends React.Component{
    render() {
        return (
            <div className="container content">
                <h1>Profile</h1>
                <p>You cannot change any of your profile information yet, please contact <a href="mailto:7hourdev@gmail.com">7hourdev@gmail.com</a> concerning any issues you may have.</p>
                <label>Name</label>
                <p>{AppStore.user.username}</p>
                <label>Email</label>
                <p>{AppStore.user.email}</p>
                <label>Websites</label>
                {AppStore.user.sites.map(website => <p key={website.name}>{website.name}</p>)}
            </div>
        );
    }
}