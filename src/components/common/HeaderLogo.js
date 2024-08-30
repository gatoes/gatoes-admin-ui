import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class HeaderLogo extends Component {
	render() {
    	return (
    		<div className="logo">
    			<Link to="/">
                    <img src="/assets/images/logo_white.png" alt="Gatoes" />
    			</Link>
			</div>
    	)
	}
}