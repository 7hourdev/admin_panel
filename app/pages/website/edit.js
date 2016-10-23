import React from 'react';
import {Link} from 'react-router';
import {Modal, Button} from 'react-bootstrap';

export default React.createClass({
    getInitialState(){
        return {
            website : this.props.website,
            showModal: false
        }
    },
    componentWillReceiveProps(nextProps){
        this.setState({
            website : nextProps.website
        })
    },
    close() {
        this.setState({ showModal: false });
    },
    open() {
        this.setState({ showModal: true });
    },
    save(){
        this.close()
    },
    componentDidMount(){
        var section = this.state.website.contents.filter(content => content.id == this.props.params.contentid);
        if (!section||section.length==0){
            return;
        }
        section = section[0];
        console.log(section.content);
        $('#editor').trumbowyg({
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
        $('#editor').trumbowyg('html',section.content);
    },
    render() {
        var section = this.state.website.contents.filter(content => content.id == this.props.params.contentid);
        if (!section||section.length==0){
            return <h3>The current section you are looking for does not exist</h3>
        }
        section = section[0]
        return (
            <div className="editor-section">
                <h3>Section: {section.name}</h3>
                <p id = "editor"></p>
                <button className="btn btn-secondary btn-lg" onClick={this.open}>Back</button>
                <button className="btn btn-primary btn-lg" style={{float:"right"}}>Finish</button>
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