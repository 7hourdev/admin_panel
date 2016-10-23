import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
    getInitialState(){
        return {
            website : this.props.websites?this.props.websites.filter(website => website.id == this.props.params.id):null
        }
    },
    componentWillReceiveProps(nextProps){
        this.setState({
            website : nextProps.websites?nextProps.websites.filter(website => website.id == this.props.params.id):null
        })
    },
    render() {
        var self = this;
        if (this.state.website==null||this.state.website.length==0){
            return(
                <div className="container content">
                    <h1>Sorry you do not seem to have access to this website!</h1>
                    <a onClick={() =>this.props.navigateTo("/")}>Go Back to Homepage</a>
                </div>
            );
        }
        var website = this.state.website[0];
        return (
            <div className="container content">
                <h1>Site Name: {website.name}</h1>
                <a href={website.url}>Visit Site</a>
                <p>Modify your site's content below</p>
                <hr/>
                {React.Children.map(this.props.children,
                    (child) => React.cloneElement(child, {
                        website:website,
                        navigateTo:self.props.navigateTo,
                    })
                )}
            </div>
        );
    }
})