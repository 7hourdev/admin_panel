import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
    getInitialState(){
        return {
            website : this.props.website
        }
    },
    componentWillReceiveProps(nextProps){
        this.setState({
            website : nextProps.website
        })
    },
    render() {
        var self = this;
        var website = this.state.website;
        var admin;
        if (this.props.user.type==1){
            admin=<div>
                <button 
                    className="btn btn-primary add-section" 
                    onClick={()=>self.props.navigateTo(self.state.website.id+"/add")}>
                    Add
                </button>
                <button 
                    className="btn btn-primary add-section" 
                    onClick={()=>self.props.navigateTo(self.state.website.id+"/edit")}>
                    Edit
                </button>
            </div>;
        }
        return (
            <div className="">
                {admin}
                <p>Modify your site's content below</p>
                {website.contents?website.contents.map((content) => 
                    <div key = {content.id} className="edit-item" onClick = {()=>self.props.navigateTo("/"+website.id+"/"+content.id)}>
                        <h3 className="inner">{content.name}</h3>
                        <i className="icon ion-chevron-right"/>
                    </div>):"N/A"}
            </div>
        );
    }
})