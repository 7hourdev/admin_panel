import React from 'react';
import {Link, browserHistory} from 'react-router';
import {Button, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import Select from 'react-select';
import URL from '../../helper/url'

function FieldGroup({ id, label, help, props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl props />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default React.createClass({
    getInitialState(){
        return {
            users : [],
            selected: []
        }
    },
    changed(data){
        this.setState({selected:data});
    },
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
                browserHistory.push("/");
            },
            error:function(err){
                window.location.href = URL("/login");
            }
        })
    },
    componentDidMount(){
        var self = this;
        $.ajax({
            url:URL("/api/user"),
            method:"get",
            success:function(data){
                console.log(data);
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
    },
    render() {
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
                    onChange={this.changed}
                />
                <button className="btn btn-secondary btn-lg" onClick={this.open}>Back</button>
                <button className="btn btn-primary btn-lg" onClick={this.add} style={{float:"right"}}>Add</button>

            </div>
        );
    }
})