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
import { deletePromotionSuccess, deletePromotionUsingMicroservice } from '../../actions/newpromotion';
import { Link } from 'react-router-dom';

class ListingSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      index: props.index,
      srno: props.srno
    };
  }

  deleteItem(itemId, index){
    confirmAlert({
      title: '',
      message: DELETE_CONFIRMATION,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deletePromotionUsingMicroservice({promotionId: itemId, }).then((response) => {
              this.props.deletePromotionSuccess(index)

              toast.success(DELETE_SUCCESS, {
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

  componentWillReceiveProps(nextProps){
    this.setState({
      slideData: nextProps.slideData,
      index: nextProps.index
    });
  }
  
	render() {
    const { slideData, index, srno } = this.state;
    console.log(slideData,"slideDataCoupon")
    return (
      <tr key={slideData.id}>
        <td>{ parseInt(parseInt(index+1) + srno)}</td>
        <td>{slideData.promotionName ? slideData.promotionName : null}</td>
        <td>{slideData.promotionTypeName && slideData.promotionTypeName }</td>
        <td>{slideData.perClickCharges ?  slideData.perClickCharges : "N.A" }</td>
        <td>{slideData.basePrice && slideData.basePrice }</td>
        <td>{slideData.minimumDays && slideData.minimumDays }</td>
        {/* <td>{slideData.phone_number ? "+" + slideData.country_code + ' ' +slideData.phone_number : null}</td> */}
        
      {/* <td>{slideData.isApprovalRequired && !slideData.isApproved && (slideData.status == COUPONS_STATUS.PENDING || slideData.status == COUPONS_STATUS.CREATED)  ? "Pending" : slideData.isApproved && slideData.status !== COUPONS_STATUS.PENDING ? "Accepted" : slideData.status !== COUPONS_STATUS.PENDING && slideData.status !== COUPONS_STATUS.CREATED   && !slideData.isApproved && slideData.isApprovalRequired ? "Rejected":""}</td>
       

      <td>
          {slideData.startDate
            ? moment.utc(slideData.startDate).local().format("MMM Do YYYY") +
              " : " +
              moment.utc(slideData.endDate).local().format("MMM Do YYYY")
            : "All Days"}
        </td>

        <td>
          {slideData.startTime == null
            ? "24 hrs"
            : slideData.endTime == null
            ? slideData.startTime + " - " + "day end"
            : slideData.startTime + " - " + slideData.endTime}
        </td> */}

        <td>
        <div className="table-btn-block">
        <Link className="btn edit-btn" to={`/dashboard/editpromotionsetting/${slideData.id}`}><span ></span>Edit</Link>
            <button className="btn delete-btn" onClick={() => this.deleteItem(slideData.id, index)}>Delete</button>
          
          </div>
            
        </td>
      </tr>
  	);
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletePromotionSuccess: (payload) => {
      dispatch(deletePromotionSuccess(payload));
    },
   

  };
}
export default connect(null, mapDispatchToProps)(ListingSlide);