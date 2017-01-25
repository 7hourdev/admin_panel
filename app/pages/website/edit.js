import React from 'react';
import URL from '../../helper/url'
import {Link} from 'react-router';
import {Modal, Button} from 'react-bootstrap';

export default React.createClass({
    getInitialState(){
        return {
            website : this.props.website,
            content : {},
            showModal: false,
            admin: this.props.user.type==1
        }
    },
    componentWillReceiveProps(nextProps){
        var section = nextProps.website.contents.filter(content => content.id == nextProps.params.contentid);
        if (!section||section.length==0){
            this.props.navigateTo("/"+nextProps.website.id);
        }
        section = section[0];
        this.setState({
            website : nextProps.website,
            content : section
        });
        $('#content').trumbowyg('html',section?section.content:"");
    },
    close() {
        this.setState({ showModal: false });
    },
    open() {
        this.setState({ showModal: true });
    },
    save(){
        var self = this;
        $.ajax({
            url:URL("/api/site/"+this.state.website.id+"/"+this.state.content.id),
            method:"post",
            data:{
                name:$("#name").val(),
                content:$("#content").trumbowyg('html'),
            },
            success:function(data){
                self.props.navigateTo("/"+self.state.website.id, true);
            },
            error:function(err){
                console.log(err);
            }
        })
    },
    delete(){
        var self = this;
        $.ajax({
            url:URL("/api/site/"+this.state.website.id+"/"+this.state.content.id),
            method:"delete",
            success:function(data){
                self.props.navigateTo("/"+self.state.website.id, true);
            },
            error:function(err){
                console.log(err);
            }
        })
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
        this.componentWillReceiveProps(this.props);
    },
    render() {
        var section = this.state.website.contents.filter(content => content.id == this.props.params.contentid);
        if (!section||section.length==0){
            return <h3>The currenta section you are looking for does not exist</h3>
        }

            console.log(this.props.user);
        var removeSection;
        if (this.state.admin){
            removeSection = <button className="btn btn-secondary btn-lg" onClick={this.delete}>Delete</button>;
        }
        section = section[0];
        return (
            <div className="editor-section">
                <h3>Section: {section.name}</h3>
                {removeSection}
                <p id = "content"></p>
                <button className="btn btn-secondary btn-lg" onClick={this.open}>Back</button>
                <button className="btn btn-primary btn-lg" style={{float:"right"}} onClick={this.save}>Finish</button>
                <Modal show={this.state.showModal} onHide={this.close}>
                  <Modal.Header closeButton>
                    <Modal.Title>Are You Sure?</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>Make sure you have saved your changes before exiting</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <button className="btn btn-secondary" onClick={this.close} style={{float:"left"}}>Close</button>
                    <button className="btn btn-secondary" onClick={()=>this.props.navigateTo("/"+this.props.params.id)} style={{float:"left"}}>Exit Without Saving</button>
                    <button className="btn btn-primary" onClick={this.save}>Save and Exit</button>
                  </Modal.Footer>
                </Modal>
            </div>
        );
    }
})