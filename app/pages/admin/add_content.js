import React from 'react';
import {Link, browserHistory} from 'react-router';
import {Button} from 'react-bootstrap';
import Select from 'react-select';
import URL from '../../helper/url';
import FieldGroup from './form-group';

export default React.createClass({
    getInitialState(){
        return {
            users : [],
            selected: []
        }
    },
    componentDidMount(){
        $('#content').trumbowyg({
            btns: [
                ['viewHTML'],
                ['formatting'],
                'btnGrp-semantic',
                ['superscript', 'subscript'],
                ['link'],
                'btnGrp-justify',
                'btnGrp-lists',
                ['horizontalRule'],
                ['removeformat'],
                ['fullscreen']
            ]
        });
    },
    add(){
        var self = this;
        $.ajax({
            url:URL("/api/site/"+this.props.params.id),
            method:"post",
            data:{
                name:$("#name").val(),
                content:$("#content").trumbowyg('html'),
            },
            success:function(data){
                browserHistory.push("/");
            },
            error:function(err){
                window.location.href = URL("/login");
            }
        })
    },
    render() {
        return (
            <div className="">
                <h3>Add Content</h3>
                <FieldGroup
                  id="name"
                  type="text"
                  label="Name"
                  placeholder="Name of Page"
                />
                <label>Content</label>
                <p
                  id="content"
                  type="text"
                  label="Content"
                  placeholder="Content of Page"
                />
                <button className="btn btn-secondary btn-lg" onClick={this.open}>Back</button>
                <button className="btn btn-primary btn-lg" onClick={this.add} style={{float:"right"}}>Add</button>

            </div>
        );
    }
})