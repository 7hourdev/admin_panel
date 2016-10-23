import React from 'react'
import Header from './modules/header'
import Footer from './modules/footer'

export default React.createClass({
	componentDidUpdate(){
		window.scrollTo(0,0);
	},
	render() {
		return (
			<div>
				<Header/>
				{this.props.children}
				<Footer/>
			</div>
		)
	}
})