import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import {getUser} from '../../utilities';
import {reBroadCastOrder, reBroadCastOrderSuccess} from '../../actions/orders';
import { updateRequiredCounterSuccess} from '../../actions/settings';

class RebroadcastOrder extends Component {
  constructor(props){
    super(props);
    this.state = {
      orderId: props.orderId,
      index: props.index
    }
    this.bindSlider = this.bindSlider.bind(this);
  }

  componentDidMount(){
    window.addEventListener('load', () => {
      this.bindSlider();
    });

    if(document.readyState === "complete" || document.readyState === "interactive"){
      this.bindSlider();
    }
  }

  bindSlider(){
    const $ = window.$$;
    $('.quanti-invitati-op').on('click', function() {
      var op = parseInt($(this).data('op'));
      
      var quantiInvitati = parseInt($('.quanti-invitati').val());
      var quantiInvitatiMin = parseInt($('.quanti-invitati').attr('min'));
      
       $('.quanti-invitati').val(Math.max(quantiInvitatiMin, quantiInvitati + op));
    });
  }

  submit(e){
    e.preventDefault();
    let data = {};
    const formData = window.$$(e.target).serializeArray();
    formData.map(item => {
      data = {...data, [item.name]: item.value}
    });
    reBroadCastOrder({timeOut: data.preparationTime, orderId: this.state.orderId}).then((response) => {
        this.props.reBroadCastOrderSuccess(this.state.index);
        this.props.updateRequiredCounterSuccess('unassignedorder');
        this.props.updateUnassignList(response);
    });
  }

	render() {
    let shopdata = getUser();
  	return ( 
      <form className="prep-time-panel" onSubmit={this.submit.bind(this)}>
        <div className="modal-body">
          <div className="popup-content-block">
            <div className="Prepration-modal-ui">
              <i className="material-icons">timer</i>
              <p>Timeout?</p>
              <div className="form-item">
                <span className="quanti-invitati-op minus-icon" data-op="-5">-</span>
                <input className="quanti-invitati" type="number" defaultValue="1" min="1" name="preparationTime" />
                <span className="time-title">mins</span>
                <span className="quanti-invitati-op plus-icon" data-op="1">+</span>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="submit" className="btn btn2">Done</button>
        </div>
      </form>
  	);
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reBroadCastOrderSuccess: (payload) => {
      dispatch(reBroadCastOrderSuccess(payload));
    },
    updateRequiredCounterSuccess: (payload) => {
      dispatch(updateRequiredCounterSuccess(payload));
    }

  };
}

export default connect(null, mapDispatchToProps)(RebroadcastOrder);