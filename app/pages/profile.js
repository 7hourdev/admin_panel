import React from 'react';
import {Link} from 'react-router';
import URL from '../helper/url'

export default React.createClass({
    getInitialState(){
        return {
            user : this.props.user
        }
    },
    componentWillReceiveProps(nextProps){
        this.setState({
            user : nextProps.user
        });
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
                {this.state.user.sites.map(website => <p>website</p>)}
            </div>
        );
    }
})