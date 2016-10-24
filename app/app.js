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
            websites : [{
                id : "1",
                name : "Hello World Website",
                url : "http://gofuckyourself.com",
                contents : [{
                	id:"1",
                    name : "About Page",
                    content : "<h1>Hello World</h1>"
                },{
                	id:"2",
                    name : "Another Page",
                    content : "<h1>Hello Lorem</h1>"
                }
                ]
            }]
        }
	},
	componentDidMount(){
		this.load();
	},
	navigateTo(url){
		browserHistory.push(url);
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
				console.log(err)
			}
		})
	},
	render() {
		var self = this;
		return (
			<div>
				<Header/>
				{React.Children.map(this.props.children,
					(child) => React.cloneElement(child, {
						websites:self.state.websites,
						navigateTo:self.navigateTo,
						load:self.load
					})
				)}
				<Footer/>
			</div>
		)
	}
})