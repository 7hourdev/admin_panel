import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
    getInitialState(){
        return {
            websites:this.props.websites
        }
    },
    componentWillReceiveProps(nextProps){
        this.setState({
            websites:this.props.websites
        })
    },
    render() {
        return (
            <div className="container content home-content">
                <h1>Welcome to your dashboard</h1>
                {this.state.websites?<div>
                <p>Please select your website from below</p>
                {this.state.websites.map(website => 
                    <div className="item" key={website.name} onClick = {()=>this.props.navigateTo("/"+website.id)}>
                        <div className="inner">
                            <h3>{website.name}</h3>
                            <a href = {website.url}>{website.url}</a>
                        </div>
                        <i className="icon ion-chevron-right"/>
                    </div>
                )}</div>:<p>Sorry, You do not have access to any website yet!</p>}
            </div>
        );
    }
})