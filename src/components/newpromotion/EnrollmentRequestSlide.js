import React, { Component, Suspense } from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import {toast} from 'react-toastify';
import {  ACCEPT_REQUEST_SUCCESS, COUPONS_ACTION, COUPONS_STATUS, DELETE_CONFIRMATION, DELETE_SUCCESS, RECOVER_USER_SUCCESS, REJECT_REQUEST_SUCCESS, REQUEST_REJECTED_SUCCESS, REQUEST_SUCCESS, RESTORE_SUCCESS } from '../../constants';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { connect } from 'react-redux';
import { activateAdsForShop, couponActionUsingMicroservice, updateEnrollmentStatusUsingMicroservice } from '../../actions/newpromocodes';
import Modal from '../../Modal';
import AcceptEnrollmentRequest from './AcceptEnrollmentRequest';

class EnrollmentRequestSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      index: props.index,
      srno: props.srno
    };
    this.hide = this.hide.bind(this); 
  }

  rejectItem(itemId, index){
    confirmAlert({
      title: '',
      message: REJECT_REQUEST_SUCCESS,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            updateEnrollmentStatusUsingMicroservice({id: itemId, status:2}).then((response) => {
              this.props.isUpdate()
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
  hide() {
    window.getFooter().setState({ renderElement: null });
  }
  
  acceptItem(e){
    console.log(e,"eacceptItem")

    if(e.promotionCategoryId == 3){
      activateAdsForShop({startDate:e.startDate,endDate:e.endDate, shopId:e.shopId }).then((response) => {  
        toast.success("Request Accepted Successfully", {
            position: toast.POSITION.TOP_RIGHT
          });
          updateEnrollmentStatusUsingMicroservice({id:e.id, status:1}).then((response) => { 
            window.$$('body').removeClass('modal-open');
            window.$$('body').find('.modal-backdrop').removeClass('modal-backdrop'); 
            setTimeout(window.location.reload(),600)
          });
    });
    }else{
      window.getFooter().setState({
        renderElement: <Modal
               id="accept-request"
                show={true}
                onHide={this.hide}
                header={<h4 className="modal-title">Accept Request</h4>}
                body={<AcceptEnrollmentRequest isUpdate={this.props.isUpdate} onHide={this.hide} reloadOrder={this.props.reloadOrder} requestInfo={e}/>}
              />
      });
    }

   
  }

	render() {
    const { slideData, index, srno } = this.state;
    console.log(slideData,"slideDataCoupon")
    return (
      <tr key={slideData.id}>
        <td>{ parseInt(parseInt(index+1) + srno)}</td>
        <td>{slideData.shopName ? slideData.shopName : "N.A"}</td>

        <td>{slideData.categoryName ? slideData.categoryName : null}</td>
        <td>{slideData.budget ? slideData.budget : "N.A" }</td>
       
        <td>{slideData.status == 0 ? "Pending" : slideData.status == 1 ? "Accepted" : "Rejected"}</td>
       

      <td>
          {slideData.startDate
            ? moment.utc(slideData.startDate).local().format("MMM Do YYYY, h:mm A") : "-"}
             
        </td>

        <td>
        {slideData.endDate
            ? moment.utc(slideData.endDate).local().format("MMM Do YYYY, h:mm A") : "-"}
        </td>

        <td>
        <div className="table-btn-block">
              <>
              {slideData.status == 0 ? (
                <>
              <a href="javascript:void(0);" className="btn edit-btn" onClick={() => this.acceptItem(slideData)}>Accept</a>
            <button className="btn delete-btn" onClick={() => this.rejectItem(slideData.id, slideData.promotionId, index)}>Reject</button>
            </>
          ): slideData.status == 1 ? "Accepted" : slideData.status == 2  ? "Rejected" : ""}
   
            </>
           
          </div>
            
        </td>
      </tr>
  	);
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
   
   

  };
}
export default connect(null, mapDispatchToProps)(EnrollmentRequestSlide);