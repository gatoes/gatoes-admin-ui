import React, { Component, Suspense } from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import {toast} from 'react-toastify';
import { deleteUser, deleteUserSuccess, recoverUser, recoverUserSuccess } from '../../actions/users';
import {  ACCEPT_REQUEST_SUCCESS, COUPONS_ACTION, COUPONS_STATUS, DELETE_CONFIRMATION, DELETE_SUCCESS, RECOVER_USER_SUCCESS, REJECT_REQUEST_SUCCESS, REQUEST_REJECTED_SUCCESS, REQUEST_SUCCESS, RESTORE_SUCCESS } from '../../constants';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { connect } from 'react-redux';
import { couponActionUsingMicroservice } from '../../actions/newpromocodes';
import { Link } from 'react-router-dom';

class CouponRequestSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      index: props.index,
      srno: props.srno
    };
  }

  rejectItem(itemId, index){
    confirmAlert({
      title: '',
      message: REJECT_REQUEST_SUCCESS,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            couponActionUsingMicroservice({couponId: itemId, stage:"admin", action:COUPONS_ACTION.REJECTED_BY_ADMIN}).then((response) => {
              this.props.isUpdate()
              // this.props.reloadOrder(1)
              window.location.reload()

              toast.success(REQUEST_REJECTED_SUCCESS, {
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

  acceptItem(itemId, index){
    confirmAlert({
      title: '',
      message: ACCEPT_REQUEST_SUCCESS,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            couponActionUsingMicroservice({couponId: itemId, stage:"admin", action:COUPONS_ACTION.APPROVED_BY_ADMIN}).then((response) => {
              this.props.isUpdate()
              // this.props.reloadOrder(1)
              window.location.reload()
              toast.success(REQUEST_SUCCESS, {
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
  
	render() {
    const { location } = this.props;

    const { slideData, index, srno } = this.state;
    console.log(slideData,location,"slideDataCoupon")
    return (
      <tr key={slideData.id}>
        <td>{ parseInt(parseInt(index+1) + srno)}</td>
        <td>
        <Link to={"/dashboard/newpromodetail/" + slideData.id}>
            {slideData.title}
          </Link>

        </td>
        {location.pathname.includes("couponrequests") && (
          <>
        <td>{slideData.couponTypeTitle && slideData.couponTypeTitle }</td>
        
        <td>{slideData.shopName ?  slideData.shopName : "N.A" }</td>
        </>
        )}
        <td>{slideData.discountTypeTitle && slideData.discountTypeTitle }</td>
        {/* <td>{slideData.phone_number ? "+" + slideData.country_code + ' ' +slideData.phone_number : null}</td> */}
        {!location.pathname.includes("broadcastrequests") && (
      <td>{slideData.isApprovalRequired && !slideData.isApproved && (slideData.status == COUPONS_STATUS.PENDING || slideData.status == COUPONS_STATUS.CREATED)  ? "Pending" : slideData.isApproved && slideData.status !== COUPONS_STATUS.PENDING ? "Accepted" : slideData.status !== COUPONS_STATUS.PENDING && slideData.status !== COUPONS_STATUS.CREATED   && !slideData.isApproved && slideData.isApprovalRequired ? "Rejected":""}</td>
       
        )}
      <td>
          {slideData.startDate
            ? moment.utc(slideData.startDate).local().format("MMM Do YYYY, h:mm A") 
            : "-"}
        </td>
        <td>
          {slideData.endDate
            ? moment.utc(slideData.endDate).local().format("MMM Do YYYY, h:mm A") 
             : "-"}
        </td>

        {/* <td>
          {slideData.startTime == null
            ? "24 hrs"
            : slideData.endTime == null
            ? slideData.startTime + " - " + "day end"
            : slideData.startTime + " - " + slideData.endTime}
        </td> */}

        <td>
        {!location.pathname.includes("broadcastrequests") && (

        <div className="table-btn-block">
            {slideData.isApprovalRequired && !slideData.isApproved && (slideData.status == COUPONS_STATUS.PENDING || slideData.status == COUPONS_STATUS.CREATED) && (
              <>
              <button className="btn edit-btn" onClick={() => this.acceptItem(slideData.id, index)}>Accept</button>
            <button className="btn delete-btn" onClick={() => this.rejectItem(slideData.id, index)}>Reject</button>
            </>
            )}  
            {slideData.isApproved && slideData.status !== COUPONS_STATUS.PENDING ? (
              <td>Accepted</td>
            ):(
              <>
              {slideData.status !== COUPONS_STATUS.PENDING && slideData.status !== COUPONS_STATUS.CREATED   && !slideData.isApproved && slideData.isApprovalRequired && (
                <td>Rejected</td>

              )}
              </>
            )}
          </div>
        )}
        </td>
      </tr>
  	);
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUserSuccess: (payload) => {
      dispatch(deleteUserSuccess(payload));
    },
   

  };
}
export default connect(null, mapDispatchToProps)(CouponRequestSlide);