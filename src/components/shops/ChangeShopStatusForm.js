import React, { Component } from 'react';
import { connect } from 'react-redux';
import {deactivateShop, deactivateShopSuccess} from '../../actions/shops';
import Error from '../common/Error';

class ChangeShoptatusForm extends Component {
  constructor(props){
    super(props);
    this.state= {
      shopId: props.shopId,
      errors: {},
      index: props.index
    }
    this.chkItemStatus = this.chkItemStatus.bind(this);
    //this.handleChange = this.handleChange.bind(this);
  }

  chkItemStatus(e){
    this.setState({
        shopStatus: e.target.value
    }); 
  }

  submit(e){
    e.preventDefault();
    let data = {};
    const {shopStatus, shopId, index} = this.state;
    const formData = window.$$(e.target).serializeArray();
    formData.map(item => {
      data = {...data, [item.name]: item.value}
    });
    console.log('data', data);
    if(shopStatus == null){
      this.setState({
        errors: {status_validate: 'Please choose atleast one option!'}
      });
    } else {
      this.setState({
        errors: {}
      });
      
      deactivateShop({shopStatus: data.shopStatus, shopId: shopId}).then((response) => {
        console.log('resp', response);
        //this.props.deactivateShopSuccess(shopId, data.shopStatus);
        this.props.updateShopData(shopId, data.shopStatus);
      });

    }
  }

	render() {
    const { itemAvailabilityStatus, errors,  shopId} = this.state;
    console.log('errors', itemAvailabilityStatus);
    return ( 
       <form className="travelot-popup-panel" onSubmit={this.submit.bind(this)}>
        <div className="modal-body">
          <div className="popup-content-block">
            <ul className="radio-block">
              <li>
                <input type="radio" id="stock1" name="shopStatus" defaultValue="0" onClick={this.chkItemStatus} />
                <label htmlFor="stock1">
                  <span>Hide</span>
                </label>
              </li>
              <li>
                <input type="radio" id="stock2" name="shopStatus" defaultValue="2" onClick={this.chkItemStatus} />
                <label htmlFor="stock2">
                  <span>Out of Service</span>
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div className="modal-footer">
          <input type="hidden" name="shopId" value={this.state.shopId} />
          { typeof errors.status_validate !== 'undefined' && <Error text={errors.status_validate} />}
          <button type="button" className="btn btn1" data-dismiss="modal">CANCEL</button>
          <button type="submit" className="btn btn2"><i className="material-icons">
          check_circle</i>SAVE</button>
        </div>
      </form>
  	);
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deactivateShopSuccess: (payload, status) => {
      dispatch(deactivateShopSuccess(payload, status));
    },
  };
}

export default connect(null, mapDispatchToProps)(ChangeShoptatusForm);