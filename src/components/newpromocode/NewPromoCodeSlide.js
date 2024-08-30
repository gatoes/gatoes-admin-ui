import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {DELETE_CONFIRMATION, DELETE_SUCCESS, STATUS_UPDATE_SUCCESS, ACTIVATE_CONFIRMATION, DEACTIVATE_CONFIRMATION, DISCOUNT_TYPE, COUPONS_STATUS} from '../../constants';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import Tooltip from '../common/Tooltip';
import moment from 'moment';
import {getAclChecks} from '../../utilities';
import { changeCouponRestaurantStatusUsingMicroservice, changeCouponStatusUsingMicroservice, deletePromoCode, deletePromoCodeSuccess, setFullScreenPromoStatus } from '../../actions/newpromocodes';

class NewPromoCodeSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      index: props.index,
      lang: window.localStorage.contentlanguage ? window.localStorage.contentlanguage : 'en'
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.setRuleStatus = this.setRuleStatus.bind(this);
    this.displayRestaurantScreenStatus = this.displayRestaurantScreenStatus.bind(this);
  }

  setRuleStatus(dId, index, stats,status){
    console.log(status,"status")
    const { slideData } = this.state;
    confirmAlert({
      title: '',
      message: status !== 2 ? ACTIVATE_CONFIRMATION : DEACTIVATE_CONFIRMATION,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            changeCouponStatusUsingMicroservice({couponId: dId, status: status == 2 ? COUPONS_STATUS.DEACTIVE : COUPONS_STATUS.ACTIVE}).then((response) => {
              this.setState({
                slideData: {...slideData, status: response.data.responseData.data.status}
              });
              toast.success(STATUS_UPDATE_SUCCESS, {
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

  displayRestaurantScreenStatus(dId, index, stats){
    const { slideData } = this.state;
    confirmAlert({
      title: '',
      message: stats === 1 ? ACTIVATE_CONFIRMATION : DEACTIVATE_CONFIRMATION,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            changeCouponRestaurantStatusUsingMicroservice({couponId: dId, showOnRestaurant: stats}).then((response) => {
              this.setState({
                slideData: {...slideData, isRestaurantDetail: response.data.responseData.data.isRestaurantDetail}
              });
              toast.success(STATUS_UPDATE_SUCCESS, {
                position: toast.POSITION.TOP_RIGHT
              });
              this.props.updatePromoFullScreen();
            });
          }
        },
        {
          label: 'No'
        }
      ]
    })
  }

  deleteItem(itemId, index){
    confirmAlert({
      title: '',
      message: DELETE_CONFIRMATION,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deletePromoCode({couponId: itemId}).then((response) => {
              this.props.deletePromoCodeSuccess(index)
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
      const { slideData, index, lang } = this.state;
      const stats = slideData.status ? 0 : 1;

      const fullScreenStats = slideData && slideData.showOnRestaurant ? 0 : 1;

     console.log(slideData,"STTTAus")

    	return (
        <tr className="drag-promo-element">
          {this.props.component}
          <td>{ parseInt(parseInt(index+1)) }</td>
          <td>
          <Link to={"/dashboard/newpromodetail/"+ slideData.id }>
            {slideData.isCreatedByAdmin ? "Admin" : "Merchant"}
            </Link>
            </td>
         <td>
          {/* <Link to={"/dashboard/newpromodetail/"+ slideData.id }> */}
         {slideData.discountTypeTitle}
         {/* </Link> */}
         </td> 
            <td>{slideData.totalAppliedCount ? slideData.totalAppliedCount : 0}</td>
            <td>{slideData.shopName ? slideData.shopName : "N.A"}</td>
         <td>{slideData.merchantBearPercentage ? `${slideData.merchantBearPercentage}` : 0}%</td>
         <td>{slideData.adminBearPercentage ? `${slideData.adminBearPercentage}` : 0}%</td>

            <td>{slideData.discount
                        ? slideData.discountTypeTitle.includes("Fixed")
                          ? `₹${slideData.discount}`
                          : `${slideData.discount}%`
                        : 0}</td>
          <td>
            {slideData.title}
          </td>
          <td>{slideData.couponTypeTitle}</td>
          <td>
            {
              slideData.couponType == 1
              ?
              "-"
              :
              <>
                { slideData.code }
                </>
            }
          </td>

          <td>
            {
              slideData.isAdminPromo == 0 ? "Admin" : slideData.isAdminPromo == 1 ? "Merchant" : slideData.isAdminPromo == 2 ? "Both" : ""
              ?
              "Merchant"
              :
              "Admin"
            }
          </td>

          <td>{slideData.startDate ? moment.utc(slideData.startDate).local().format("MMM Do YYYY, h:mm A") : "-" }</td>
          <td>{slideData.endDate ? moment.utc(slideData.endDate).local().format("MMM Do YYYY, h:mm A") : "-" }</td>
          {/* <td>
            {
              slideData.startTime == null 
              ?
              '24 hrs' 
              : 
              slideData.endTime == null
              ?
              slideData.startTime + ' - ' + 'day end'
              :
              slideData.startTime + ' - ' + slideData.endTime
            }
          </td> */}
          <td>
            {
              getAclChecks('PROMOCODE_STATUS')
              ?
              <div className="status-ui" onClick={() => this.setRuleStatus(slideData.id, index, stats,slideData.status)}>
                  {
                     slideData.status == 2
                    
                     ? 
                    <Tooltip title="Click to deactivate"><div className="stock-field on-btn"><label className="switch"><div className="switch-slider"></div></label></div></Tooltip>
                      :
                    <Tooltip title="Click to activate"><div className="stock-field off-btn"><label className="switch"><div className="switch-slider"></div></label></div></Tooltip>
                  }
                </div>
                   :
                <div className="status-ui">
                {
                   slideData.status == 2
                   ? 
                  <div className="stock-field on-btn"><label className="switch"><div className="switch-slider"></div></label></div>
                    : 
                  <div className="stock-field off-btn"><label className="switch"><div className="switch-slider"></div></label></div>
                }
              </div>
            }

          </td>

          <td>
            {
              slideData.couponType == 3
              ?
              <div className="status-ui" onClick={() => this.displayRestaurantScreenStatus(slideData.id, index, fullScreenStats)}>
                {
                  slideData && slideData.showOnRestaurant
                  ? 
                  <Tooltip title="Click to remove"><div className="stock-field on-btn"><label className="switch"><div className="switch-slider"></div></label></div></Tooltip>
                  :
                  <Tooltip title="Click to Set"><div className="stock-field off-btn"><label className="switch"><div className="switch-slider"></div></label></div></Tooltip>
                }
              </div>
              :
              null
            }
            
          </td>

         

          <td>
            <div className="table-btn-block">
              {
                getAclChecks('PROMOCODE_DELETE')
                ?
                <Tooltip title="Delete">
                  <button className="btn delete-btn" onClick={() => this.deleteItem(slideData.id, index)}>Delete</button>
                </Tooltip>
                :
                null
              }
           
              {/* {
                !slideData.isFirstTimeActive 
                ?
                <Link className="btn edit-btn" to={"/dashboard/editnewpromocode/"+slideData.id}>Edit</Link>
                :
                null
              } */}
            </div></td>
        </tr>
    	);
  	}
}


const mapDispatchToProps = (dispatch) => {
  return {
    deletePromoCodeSuccess: (payload) => {
      dispatch(deletePromoCodeSuccess(payload));
    },

  };
}

export default connect(null, mapDispatchToProps)(NewPromoCodeSlide);