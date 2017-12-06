import React from 'react';
import {Button} from 'react-bootstrap';
import Select from 'react-select';
import URL from '../../helper/url';
import FieldGroup from './form-group';
import {Link} from 'react-router-dom';
import {observer} from 'mobx-react';

export default @observer class addcontent extends React.Component{
    getInitialState(){
        return {
            users : [],
            selected: []
        }
    }
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
    }
    add(){
        var self = this;
        $.ajax({
            url:URL("/api/site/"+self.props.match.params.id),
            method:"post",
            data:{
                name:$("#name").val(),
                content:$("#content").trumbowyg('html'),
            },
            success:function(data){
                window.location.href = URL("/"+self.props.match.params.id);
            },
            error:function(err){
                window.location.href = URL("/login");
            }
        })
    }
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
                <button className="btn btn-primary btn-lg" onClick={this.add.bind(this)} style={{float:"right"}}>Add</button>

            </div>
        );
    }
}