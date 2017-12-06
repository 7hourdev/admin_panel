import React from 'react';

export default class footer extends React.Component{
	render() {
		return (
		    <div className="container footer">
		      <p>7hourdev admin panel &#169; 7hourdev {new Date().getFullYear()}</p>
		    </div>
			)
	}
}