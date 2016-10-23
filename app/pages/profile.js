import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
    getInitialState(){
        return {
            user : {
                username : "David",
                email: "david@david.com",
                type: "Int:  Default",
                website: []
            }
        }
    },
    render() {
        return (
            <div className="container content">
                <h1>Profile</h1>
                <p>You cannot change any of your profile information yet, please contact <a href="mailto:7hourdev@gmail.com">7hourdev@gmail.com</a> concerning any issues you may have.</p>
                <label>Name</label>
                <p>{this.state.user.username}</p>
                <label>Email</label>
                <p>{this.state.user.email}</p>
                <label>Websites</label>
                {this.state.user.website.map(website => <p>website</p>)}
            </div>
        );
    }
})