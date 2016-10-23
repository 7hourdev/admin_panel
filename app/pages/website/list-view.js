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
        return (
            <div className="">
                {website.contents.map(content => 
                    <div key = {content.name} className="edit-item" onClick = {()=>self.props.navigateTo("/"+website.id+"/"+content.id)}>
                        <h3 className="inner">{content.name}</h3>
                        <i className="icon ion-chevron-right"/>
                    </div>)}
            </div>
        );
    }
})