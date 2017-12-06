import React from 'react';
import URL from '../../helper/url'
import {Modal, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {observer} from 'mobx-react';
import { Route } from 'react-router-dom'

import SiteStore from 'stores/site'
import AppStore from 'stores/app'

export default @observer class EditWebsite extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            content : {},
            showModal: false,
            admin: AppStore.user.type==1
        }
    }
    close() {
        this.setState({ showModal: false });
    }
    open() {
        this.setState({ showModal: true });
    }
    save(){
        var self = this;
        $.ajax({
            url:URL("/api/site/"+AppStore.website.id+"/"+self.props.match.params.contentid),
            method:"post",
            data:{
                name:self.state.admin?$("#name").val():"",
                content:$("#content").trumbowyg('html'),
            },
            success:function(data){
                window.location.href = "/"+AppStore.website.id;
            },
            error:function(err){
                console.log(err);
            }
        })
    }
    delete(){
        var self = this;
        $.ajax({
            url:URL("/api/site/"+AppStore.website.id+"/"+self.props.match.params.contentid),
            method:"delete",
            success:function(data){
                window.location.href ="/"+AppStore.website.id;
            },
            error:function(err){
                console.log(err);
            }
        })
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
    render() {
        var self = this;
        var section = AppStore.website.contents.filter(content => content.id == self.props.match.params.contentid)[0];
        if (!section){
            return <h3>The current section you are looking for does not exist</h3>
        }
        var removeSection;
        if (this.state.admin){
            removeSection = <button className="btn btn-secondary btn-lg" onClick={this.delete}>Delete</button>;
        }
        var sectionName = <input id = "name" type = "text" className = "form-control" defaultValue={section.name}/>
        return (
            <div className="editor-section">
                <h3>Section: {this.state.admin?sectionName:section.name}</h3>
                {removeSection}
                <p id = "content" dangerouslySetInnerHTML={{__html:section.content}}/>
                <button className="btn btn-secondary btn-lg" onClick={this.open.bind(this)}>Back</button>
                <button className="btn btn-primary btn-lg" style={{float:"right"}} onClick={this.save.bind(this)}>Finish</button>
                <Modal show={this.state.showModal} onHide={this.close}>
                  <Modal.Header closeButton>
                    <Modal.Title>Are You Sure?</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>Make sure you have saved your changes before exiting</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <button className="btn btn-secondary" onClick={this.close.bind(this)} style={{float:"left"}}>Close</button>
                    <Route render={({ history}) => (<button className="btn btn-secondary" onClick={()=>history.push("/"+AppStore.website.id)} style={{float:"left"}}>Exit Without Saving</button>)}/>
                    <button className="btn btn-primary" onClick={this.save.bind(this)}>Save and Exit</button>
                  </Modal.Footer>
                </Modal>
            </div>
        );
    }
}