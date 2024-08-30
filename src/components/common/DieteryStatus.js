import React, { Component } from 'react';
import {getDieteryStatus} from '../../utilities';

class DieteryStatus extends Component {
	constructor(props){
	    super(props);
	    this.state = {
            is_veg: props.is_veg
        };
	}

	render() {
		const {is_veg} = this.state;
		const visibleStat = getDieteryStatus();
    	return (
    		<>
    			{
	    			visibleStat && (visibleStat == 1)
	    			?
		    		<>
		    			{
	    					is_veg == 1
	                  		?
		                  	<div className="v-icon"></div>
		                  	:
		                  	is_veg == 2
		                  	?
		                  	<div className="env-icon"></div>
		                  	:
		                  	<div className="nv-icon"></div>
		                }
		    		</>	
		    		:
		    		null
	    		}
    		</>
    	)
	}
}
export default DieteryStatus;