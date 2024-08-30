import React, { Component, Suspense } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {ASSIGN_ORDER_TO_DRIVER_TEXT, ASSIGN_ORDER_TO_DRIVER_SUCCESS, RIDER_ONLINE_STATUS, SHOP_TYPE, RIDER_CURRENT_STATUS, DISTANCE_UNIT, TRIP_STATUS, RIDER_AUTO_ACCEPT} from '../../constants';
import { assignDriverToOrder } from '../../actions/deliveryagent';
import {toast} from 'react-toastify';
import { reduxForm, Field, SubmissionError, reset, FieldArray, formValueSelector } from 'redux-form';
import renderRadio from '../FormFields/renderRadio';

class ReAssignRiderSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      orderId: props.orderId,
      maxCashLimit: props.maxCashLimit,
      maxTripLimit: props.maxTripLimit,
      index: props.index,
      deliveryBoy: props.deliveryBoy
    };
  }

  render() {
    
    const {slideData, index} = this.state;
    const {maxCashLimit, maxTripLimit, deliveryBoy} = this.props;
    var ridertype = '';
    slideData.driverType && slideData.driverType.length > 0 && slideData.driverType.map((obj, index) => (
      ridertype += SHOP_TYPE[obj].label+','
    )) 
    
    var newRidertype = ridertype.slice(0, -1);

    console.log(maxTripLimit, '==eeeeeee===', maxCashLimit);

    return (
      <>
        {
          ((deliveryBoy && deliveryBoy.id) != slideData.id)
          ?
          <tr>
            <td>{slideData.name}</td>
            <td>{newRidertype}</td>
            <td>{slideData.isAvailable ? TRIP_STATUS[slideData.status] : 'Offline' }</td>
            <td>{RIDER_AUTO_ACCEPT[slideData.isAutoAccept]}</td>
            <td>{slideData.totalOrders}</td>
            <td>{slideData.vehicleNumber}</td>
            <td>{"+"+slideData.countryCode+ ' ' +slideData.phoneNumber}</td>
            <td>{slideData.distance + ' ' + DISTANCE_UNIT[slideData.distanceUnit].label}</td>
            <td>

              {
                ((localStorage.getItem('hasAllAccess') == 'true') || ((parseFloat(slideData.cashCarried) < parseFloat(maxCashLimit)) && (parseInt(slideData.currentTrips) < maxTripLimit)))
                ?
                <Field 
                  type="radio" 
                  value={''+slideData.id}
                  name="rider"
                  id={"rider"+slideData.id} 
                  component={renderRadio}
                />
                :
                null
              }

            </td>
          </tr>
          :
          null
        }
        
      </>
    );
  }
}

export default reduxForm({
  form: 'ReAssignRiderValue'
})(ReAssignRiderSlide);