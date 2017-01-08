import React from 'react'
import Header from './modules/header'
import Footer from './modules/footer'
import {browserHistory} from 'react-router'
import URL from './helper/url'

export default React.createClass({
	componentDidUpdate(){
		window.scrollTo(0,0);
	},
	getInitialState(){
        return {
            websites : [],
            user : {
                username : "Loading",
                email: "Loading",
                type:0,
                sites: []
            }
        }
	},
	componentDidMount(){
		this.load();
	},
	navigateTo(url, reload = false){
		browserHistory.push(url);
		if(reload){
			this.load();
		}
	},
	load(){
		var self = this;
		$.ajax({
			url:URL("/api/site"),
			method:"get",
			success:function(data){
				console.log(data);
				self.setState({websites:data})
			},
			error:function(err){
				window.location.href = URL("/login");
			}
		})
        var self = this;
        $.ajax({
            url:URL("/api/me"),
            method:"get",
            success:function(data){
                self.setState({user:data})
            },
            error:function(err){
                window.location.href = URL("/login");
            }
        })
	},
	render() {
		var self = this;
		return (
			<div>
				<Header admin={self.state.user.type==1}/>
				{React.Children.map(this.props.children,
					(child) => React.cloneElement(child, {
						websites:self.state.websites,
						user:self.state.user,
						navigateTo:self.navigateTo,
						load:self.load
					})
				)}
				<Footer/>
			</div>
		)
	}
})