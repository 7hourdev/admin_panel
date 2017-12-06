import React from 'react';
import {Button} from 'react-bootstrap';
import Select from 'react-select';
import FieldGroup from './form-group';
import URL from '../../helper/url'

import {Link} from 'react-router-dom';
import {observer} from 'mobx-react';
import AppStore from 'stores/app';

export default @observer class addSite extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            users : [],
            selected: []
        }
    }
    changed(data){
        this.setState({selected:data});
    }
    add(){
        var self = this;
        $.ajax({
            url:URL("/api/site/"),
            method:"post",
            data:{
                name:$("#name").val(),
                url:$("#url").val(),
                users:self.state.selected.map((val)=>val.value)
            },
            success:function(data){
                window.location.href = URL("/");
            },
            error:function(err){
                window.location.href = URL("/login");
            }
        })
    }
    componentDidMount(){
        var self = this;
        $.ajax({
            url:URL("/api/user"),
            method:"get",
            success:function(data){
                data = data.reduce(function(previous,user){
                    if(user.id!==AppStore.user.id){
                        previous.push({value:""+user.id,label:user.email})
                    }
                    return previous;
                },[]);
                self.setState({users:data})
            },
            error:function(err){
                window.location.href = URL("/login");
            }
        })
    }
    render() {
        var self = this;
        return (
            <div className="container">
                <h3>Add Website</h3>
                <FieldGroup
                  id="name"
                  type="text"
                  label="Name"
                  placeholder="Name of site"
                />
                <FieldGroup
                  id="url"
                  type="text"
                  label="URL"
                  placeholder="Http url"
                />
                <Select
                    name="users"
                    value={this.state.selected}
                    multi={true}
                    options={this.state.users}
                    onChange={this.changed.bind(this)}
                />
                <button className="btn btn-primary btn-lg" onClick={this.add.bind(this)} style={{float:"right"}}>Add</button>
            </div>
        );
    }
}