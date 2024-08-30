import React, { Component, Suspense } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {getRequiredCounter, getRequiredCounterSuccess} from '../../actions/settings';
import { connect } from 'react-redux';

class RequestedCounter extends Component {
  constructor(props){
    super(props);
    this.state = {
      type: props.type,
      requiredCounter: props.requiredCounter,
      status: props.status,
    }
  }

  componentDidMount(){
    getRequiredCounter().then((response) => {
      this.props.getRequiredCounterSuccess(response.data.data);
    });
  }

  componentWillReceiveProps(nextProps){
    if(this.props.status != nextProps.status && nextProps.compName == 'requiredcounter'){
      this.setState({
        requiredCounter: nextProps.requiredCounter,
        status: nextProps.status
      });
    }
  }
  
  render() {
    const {requiredCounter, type} = this.state;
    return (
      <>
        {
          type == 'requestedMenuItems'
          ?
          requiredCounter && requiredCounter.requestedMenuItems ? <i className="count-no">{requiredCounter.requestedMenuItems}</i> : null
          :
          type == 'unassignedOrder'
          ?
          requiredCounter && requiredCounter.unassignedOrder ? <i className="count-no">{requiredCounter.unassignedOrder}</i> : null
          :
          requiredCounter && requiredCounter.outOfStockOrders ? <i className="count-no">{requiredCounter.outOfStockOrders}</i> : null
        }
      </>
    );
  }
}

const mapStatesToProps = (state, ownProps) => {
  return {
    requiredCounter: state.Setting.required_counter,
    status: state.Setting.status,
    compName: state.Setting.compName
  }
}

export default connect(mapStatesToProps, {getRequiredCounterSuccess})(RequestedCounter);