import React from 'react'
import AppStore from 'stores/app';
import {observer} from 'mobx-react';

import URL from 'helper/url'

@observer
class LoginScreen extends React.Component {

    submitForm = (e) => {
        var self = this;
        e.preventDefault();
        AppStore.login($("#email").val(),$("#pass").val(), (success, data)=>{
            if (success){
                window.location.href = URL("/");
            }
        });
    }
    handleKeyPress(event){
        if(event.key == 'Enter'){
            this.submitForm(event);
        }
    }

    render() {
        return (
            <div className="container">
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="Email" onKeyPress={this.handleKeyPress.bind(this)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="pass">Password</label>
                    <input type="password" className="form-control" id="pass" placeholder="Password" onKeyPress={this.handleKeyPress.bind(this)}/>
                </div>
                <button className="btn btn-primary" onClick={this.submitForm}>Submit</button>
            </div>
        );
    }
};

export default LoginScreen;