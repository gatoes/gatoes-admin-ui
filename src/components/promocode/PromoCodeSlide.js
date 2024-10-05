import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {deletePromoCode, deletePromoCodeSuccess, setRuleStatus, setFullScreenPromoStatus} from '../../actions/promocodes';
import {DELETE_CONFIRMATION, DELETE_SUCCESS, STATUS_UPDATE_SUCCESS, ACTIVATE_CONFIRMATION, DEACTIVATE_CONFIRMATION, DISCOUNT_TYPE} from '../../constants';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import Tooltip from '../common/Tooltip';
import moment from 'moment';
import {getAclChecks} from '../../utilities';

class PromoCodeSlide extends Component {
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

  setRuleStatus(dId, index, stats){
    const { slideData } = this.state;
    confirmAlert({
      title: '',
      message: stats === 1 ? ACTIVATE_CONFIRMATION : DEACTIVATE_CONFIRMATION,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            setRuleStatus({ruleId: dId, status: stats}).then((response) => {
              this.setState({
                slideData: {...slideData, status: response.data.data.status}
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
            setFullScreenPromoStatus({ruleId: dId, isRestaurantDetail: stats}).then((response) => {
              this.setState({
                slideData: {...slideData, isRestaurantDetail: response.data.data.isRestaurantDetail}
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
            deletePromoCode({ruleId: itemId}).then((response) => {
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
      console.log('slideData', slideData);
      const stats = slideData.status ? 0 : 1;

      const fullScreenStats = slideData && slideData.isRestaurantDetail ? 0 : 1;

      var couponType = '';
      var couponVal = '';
      if(slideData.coupon == 1){
        couponVal = slideData.coupon_code.length > 1 ? slideData.coupon_code.length + " coupons" : slideData.coupon_code.length + " coupon";
        couponType = 'specific coupon';
      } else if(slideData.coupon == 2){
        couponVal = "1 coupon";
        couponType = 'featured coupon';
      }  else if(slideData.coupon == 3){
        couponVal = "1 coupon";
        couponType = 'Promo coupon';
      }  else if(slideData.coupon == 4){
        couponVal = '1 coupon';
        couponType = 'Super Promo';
      } else {
        couponType = 'no coupon';
        //couponVal = slideData.discount + " " + DISCOUNT_TYPE[slideData.discount_type].label;  
        if(slideData.discount_type == null){
          couponVal = slideData.discount;
        } else {
          couponVal = slideData.discount + " " + DISCOUNT_TYPE[slideData.discount_type].label;  
        }
      } 

    	return (
        <tr className="drag-promo-element">
          {this.props.component}
          <td>{ parseInt(parseInt(index+1)) }</td>
          <td>
            <Link to={ "/dashboard/promodetail/"+ slideData.id }>{slideData.name}</Link>
          </td>
          <td>{couponType}</td>
          <td>
            {
              couponType == 'no coupon'
              ?
              couponVal
              :
              <Link to={ "/dashboard/getcouponlistbyruleid/"+ slideData.id }>{ couponVal }</Link>
            }
          </td>

          <td>
            {
              slideData.isMerchantPromo && slideData.isMerchantPromo
              ?
              "Merchant"
              :
              "Admin"
            }
          </td>

          <td>{slideData.start_date ? moment.utc(slideData.start_date).local().format("MMM Do YYYY") + " : " + moment.utc(slideData.end_date).local().format("MMM Do YYYY") : 'All Days' }</td>

          <td>
            {
              slideData.start_time == null 
              ?
              '24 hrs' 
              : 
              slideData.end_time == null
              ?
              slideData.start_time + ' - ' + 'day end'
              :
              slideData.start_time + ' - ' + slideData.end_time
            }
          </td>
          <td>
            {
              getAclChecks('PROMOCODE_STATUS')
              ?
              <div className="status-ui" onClick={() => this.setRuleStatus(slideData.id, index, stats)}>
                  {
                    slideData.status == 1
                    ? 
                    <Tooltip title="Click to deactivate"><div className="stock-field on-btn"><label className="switch"><div className="switch-slider"></div></label></div></Tooltip>
                    :
                    <Tooltip title="Click to activate"><div className="stock-field off-btn"><label className="switch"><div className="switch-slider"></div></label></div></Tooltip>
                  }
                </div>
                :
                <div className="status-ui">
                {
                  slideData.status == 1
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
      (slideData.coupon == 3 || slideData.coupon == 4)
              ?
              <div className="status-ui" onClick={() => this.displayRestaurantScreenStatus(slideData.id, index, fullScreenStats)}>
                {
                  slideData && slideData.isRestaurantDetail
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

              {
                lang == 'ar'
                ?
                <Link className="btn edit-btn" to={"/dashboard/editpromocode/"+slideData.id}>Edit</Link>
                :
                null
              }
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

export default connect(null, mapDispatchToProps)(PromoCodeSlide);