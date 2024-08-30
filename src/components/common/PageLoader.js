import React, { Component } from 'react';

export default class PageLoader extends Component {
	constructor(props){
		super(props);
		this.state = {
			display: false
		};
	}

	componentWillMount(){
		window.globalPageLoader = this;
	}

	render() {
		const {display} = this.state;
		if(display === false)
			return null;

    	return (
    		<div className="loader-screen" id="loader">
	             <div className="loader-content">
	                <img src="/assets/images/GatoesLoader.svg" className="svg-animate" alt="Loading..."/>
	             </div>
	          </div>
    	);
    }
}


