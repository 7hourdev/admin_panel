import React from 'react';
import {Button} from 'react-bootstrap';
import Select from 'react-select';
import FieldGroup from './form-group';
import URL from '../../helper/url'

import {Link} from 'react-router-dom';
import {observer} from 'mobx-react';

export default @observer class editsite extends React.Component{
    getInitialState(){
        return {
            users : [],
            selected: this.props.website.users.map(item => item.id),
            website : this.props.website,
        }
    }
    changed(data){
        this.setState({selected:data});
    }
    edit(){
        var self = this;
        $.ajax({
            url:URL("/api/site/"+this.props.params.id+"/edit"),
            method:"post",
            data:{
                name:$("#name").val(),
                url:$("#url").val(),
                users:self.state.selected.map((val)=>val.value)
            },
            success:function(data){
                self.props.navigateTo("/",true);
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
                    if(user.id!==self.props.user.id){
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
        return (
            <div className="container">
                <h3>Edit Website</h3>
                <label>Name</label>
                <input
                  className="form-control"
                  id="name"
                  type="text"
                  defaultValue={this.state.website.name}
                  placeholder="Name of site"
                />
                <br />
                <label>URL</label>
                <input
                  className="form-control"
                  id="url"
                  type="text"
                  value={this.state.website.url}
                  placeholder="Http url"
                />
                <br />
                <label>Users</label>
                <Select
                    name="users"
                    value={this.state.selected}
                    multi={true}
                    options={this.state.users}
                    onChange={this.changed}
                />
                <button className="btn btn-primary btn-lg" onClick={this.edit} style={{float:"right"}}>Add</button>

            </div>
        );
    }
}