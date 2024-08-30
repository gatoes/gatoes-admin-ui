import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';
import moment from 'moment';

export default class TimeStopWatch extends Component {
	constructor(props){
	    super(props);
	    this.state = {
	        prepTime: props.prepTime,
	        duration: props.duration | 0
	    }
    }

	renderer({ hours, minutes, seconds, completed }){
	    if (completed) {
	      return <label className="time">-</label>;
	    } else {
	      return <label className="time">{minutes} mins</label>;
	    }
	}

	render() {
		const chkduration = parseInt(this.state.duration) * 60 * 1000;
    	return (
    		<Countdown
              date={moment(moment.utc(this.state.prepTime).toDate()).local().valueOf() + parseInt(chkduration)}
              renderer={this.renderer}
            />
    	)
	}
}