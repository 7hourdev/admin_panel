import React from 'react'
import Header from './modules/header'
import Footer from './modules/footer'
import {browserHistory} from 'react-router'

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
	navigateTo(url){
		browserHistory.push(url);
	},
	load(){

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