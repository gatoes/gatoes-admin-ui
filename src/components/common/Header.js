import React, { Component } from 'react';
import HeaderLogo from './HeaderLogo';
import HeaderNavigation from './HeaderNavigation';
import HeaderLanguageNavigation from './HeaderLanguageNavigation';
import $ from 'jquery';

class Header extends Component {
	constructor(props){
	    super(props);
	    
	}

	render() {
    	return (
    		<header className="header-main">
				<div className="header-top-block">
				    <div className="container">
				        <div className="row">
				           	<div className="col-sm-4 align-self-center">
				              	<HeaderLogo />
				           	</div>
				           	
				           	<div className="col-sm-8 online-block align-self-center">
				              <HeaderNavigation />	
				           	</div>
				           	
				        </div>
				    </div>
				</div>
				<div className="header-bottom-block" id="header-sticky">
				    <div className="container">
				        <div className="row">
				           	<div className="col-sm-4 align-self-center">
				              	<div className="order-tabs-block">
				                 	
				              	</div>
				           	</div>
				           	<div className="col-sm-8 align-self-center">
				              	
				           	</div>
				        </div>
				    </div>
				</div>
				<div className="n-overlay"></div>
			</header>
    	)
	}
}

export default Header;