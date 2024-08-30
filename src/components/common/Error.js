import React, { Component } from 'react';

export default class Error extends Component {
	render() {
    	return (
    		<span className="field-error">
          		{this.props.text}
        	</span>
    	);
    }
}