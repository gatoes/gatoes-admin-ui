import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {ASSIGN_ORDER_TO_DRIVER_TEXT, ASSIGN_ORDER_TO_DRIVER_SUCCESS, RIDER_ONLINE_STATUS, SHOP_TYPE, RIDER_CURRENT_STATUS, DISTANCE_UNIT, TRIP_STATUS, RIDER_AUTO_ACCEPT} from '../../constants';
import { assignDriverToOrder } from '../../actions/deliveryagent';
import {toast} from 'react-toastify';
import { updateRequiredCounterSuccess} from '../../actions/settings';
import {getCurrencySymbol} from '../../utilities';

class AssignRiderSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      orderId: props.orderId,
      index: props.index,
      maxCashLimit: props.maxCashLimit,
      maxRiderTrips: props.maxRiderTrips
    };
    this.handleRider = this.handleRider.bind(this);
  }

  handleRider(e){
    this.hide();
    var objProps = this.props;
    const driveId = e.target.value;
    const orderId = this.state.orderId;
    confirmAlert({
      title: '',
      message: ASSIGN_ORDER_TO_DRIVER_TEXT,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            assignDriverToOrder({orderId: orderId, driverId: driveId}).then((response) => {
              objProps.updateOrderList(orderId);
              objProps.updateRequiredCounterSuccess('unassignedorder');
              toast.success(ASSIGN_ORDER_TO_DRIVER_SUCCESS, {
                position: toast.POSITION.TOP_RIGHT
              });   
            });
          }
        },
        {
          label: 'No'
        }
      ]
    })
  }

  hide(){
    window.$$('body').removeClass('modal-open');
    window.$$('body').find('.modal-backdrop').removeClass('modal-backdrop');
    window.getFooter().setState({
        renderElement: null
    });
  }

  render() {
    const {slideData, index, maxCashLimit, maxRiderTrips} = this.state;
    let currecySymbol = getCurrencySymbol();
    var ridertype = '';
    slideData.driverType && slideData.driverType.length > 0 && slideData.driverType.map((obj, index) => (
      ridertype += SHOP_TYPE[obj].label+','
    )) 
    
    var newRidertype = ridertype.slice(0, -1);

    return (
      <>
        <tr>
          <td>{index+1}</td>
          <td>{slideData.name}</td>
          <td>{newRidertype}</td>
          <td>{slideData.isAvailable ? TRIP_STATUS[slideData.status] : 'Offline' }</td>
          <td>{RIDER_AUTO_ACCEPT[slideData.isAutoAccept]}</td>
          
          <td>{slideData.todayDeliveredOrder}</td>
          <td>{slideData.currentTrips}</td>
          <td>{slideData.vehicleNumber}</td>
          <td>{"+" + slideData.countryCode+ ' ' +slideData.phoneNumber}</td>
          <td>{slideData.distance + ' ' + DISTANCE_UNIT[slideData.distanceUnit].label}</td>
          <td>{currecySymbol} {slideData.cashCarried}</td>
          <td>
            {
              ((localStorage.getItem('hasAllAccess') == 'true') || ((parseFloat(slideData.cashCarried) < parseFloat(maxCashLimit)) && (parseInt(slideData.currentTrips) < maxRiderTrips)))
              ?
              <input type="radio" name="rider" defaultValue={slideData.id} onClick={ this.handleRider } />
              :
              null
            }

          </td>
        </tr>
      </>
    );
  }
}

export default connect(null, {updateRequiredCounterSuccess})(AssignRiderSlide);