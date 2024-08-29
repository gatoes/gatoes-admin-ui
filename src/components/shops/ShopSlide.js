import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {deleteShop, deleteShopSuccess, deactivateShop, deactivateShopSuccess} from '../../actions/shops';
import {DELETE_CONFIRMATION, DELETE_SUCCESS, DEACTIVATE_SUCCESS, ACTIVATE_CONFIRMATION, ACTIVATE_SUCCESS, SHOP_TYPE, SHOP_DELIVERY_TYPE} from '../../constants';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import Tooltip from '../common/Tooltip';
import ChangeShopStatusForm from './ChangeShopStatusForm';
import ShopRatingDetail from './ShopRatingDetail';
import Modal from '../../Modal';
import ChangePasswordForm from '../users/ChangePasswordForm';
import moment from 'moment';
import {getAclChecks} from '../../utilities';
import ShopOnlineOfflineAnalytics from './ShopOnlineOfflineAnalytics';
import ShopTransactionDetail from './ShopTransactionDetail';
import DepositCashShop from './DepositCashShop';
import AssignPlanToMerchant from './AssignPlanToMerchant';
import { renderToString } from 'react-dom/server';
import { removePlan } from '../../actions/plans';
var QRCode = require('qrcode.react');


class ShopSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      index: props.index,
      srno: props.srno,
      activePage: props.activePage
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.changeShopStatus = this.changeShopStatus.bind(this);
    this.activateShopStatus = this.activateShopStatus.bind(this);
    this.updateShopData = this.updateShopData.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.updateShop = this.updateShop.bind(this);
    this.collectCash = this.collectCash.bind(this);
    this.downloadSvg = this.downloadSvg.bind(this);
    this.assignPlan = this.assignPlan.bind(this);
    this.reload = this.reload.bind(this);
    this.removePlan = this.removePlan.bind(this);
  }

  removePlan(shopId){
    confirmAlert({
      title: '',
      message: "Are you sure, you want to remove this plan?",
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            removePlan({'status': 0}, shopId).then((response) => {
              toast.success('Plan has been removed successfully');
              this.props.fetchRecords(this.props.activePage);   
            });
          }
        },
        {
          label: 'No'
        }
      ]
    })



    // removePlan({'status': 0}, shopId).then((response) => {
    //   toast.success('Plan has been removed successfully');
    //   this.props.fetchRecords(this.props.activePage);
    //   // window.location.reload();
    // })
  }

  assignPlan(shopId, name, regionId, index){
    window.getFooter().setState({
      renderElement: <Modal 
              id="add-new-category"
              show={true}
              onHide={this.hide}
              header={<h4 className="modal-title">{name}</h4>}
              body={<AssignPlanToMerchant shopId={shopId} regionId={regionId} index={index} reload={this.reload}  />}
            />
    });
  }

  reload(){
    toast.success("Record has been updated successfully.", {
      position: toast.POSITION.TOP_RIGHT
    });
    window.$$('body').removeClass('modal-open');
    window.$$('body').find('.modal-backdrop').removeClass('modal-backdrop');
    this.hide();
    setTimeout(function() {
      window.location.reload();
    }, 800);
  }

  downloadSvg(svgImage) { 
    let svgData = `<?xml version="1.0" encoding="UTF-8"?>\n${svgImage.replace(/^\<svg\s/, '<svg  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ')}`; //'<?xml version="1.0" encoding="UTF-8"?>'+svgImage; 
    console.log('svgImage', svgData);
    /// Create a fake <a> element 
    let fakeLink = document.createElement("a"); 
    /// Add image data as href 
    fakeLink.setAttribute('href', 'data:image/svg+xml;base64,' + window.btoa(svgData)); 
    /// Add download attribute 
    fakeLink.setAttribute('download', 'qrcode.svg'); 
    /// Simulate click 
    fakeLink.click(); 
  }

  changeShopStatus(shopId, index){
    window.getFooter().setState({
      renderElement: <Modal 
              id="stock-modal"
              show={true}
              onHide={this.hide}
              header={<h4 className="modal-title">Set Restaurant Status for user?</h4>}
              body={<ChangeShopStatusForm shopId={shopId} index={index} updateShopData={this.updateShopData} panel="shop"  />}
            />
    });
  }

  changePassword(shopId){
    window.getFooter().setState({
      renderElement: <Modal 
              id="stock-modal"
              show={true}
              onHide={this.hide}
              header={<h4 className="modal-title">Change Password</h4>}
              body={<ChangePasswordForm shopId={shopId} updateShop={this.updateShop}  />}
            />
    });
  }

  updateShopData(shopId, status){
    const { slideData} = this.state;
    this.setState({
      slideData: {...this.state.slideData, shopStatus: status}
    })
    //slideData.shop_status = status;
    toast.success(DEACTIVATE_SUCCESS, {
      position: toast.POSITION.TOP_RIGHT
    });  

    window.$$('body').removeClass('modal-open');
    window.$$('body').find('.modal-backdrop').removeClass('modal-backdrop');
    this.hide();
  }

  updateShop(result){
    toast.success("Password has been updated successfully.", {
      position: toast.POSITION.TOP_RIGHT
    });
    window.$$('body').removeClass('modal-open');
    window.$$('body').find('.modal-backdrop').removeClass('modal-backdrop');
    this.hide();
  }

  activateShopStatus(shopId, index){
    //const { shopId } = this.state;
    confirmAlert({
      title: '',
      message: ACTIVATE_CONFIRMATION,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deactivateShop({shopStatus: 1, shopId: shopId}).then((response) => {
              this.setState({
                slideData: {...this.state.slideData, shopStatus: 1}
              })
              //this.props.deactivateShopSuccess(shopId, 1);
              toast.success(ACTIVATE_SUCCESS, {
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
    window.getFooter().setState({
        renderElement: null
    });
  }

  deleteItem(itemId, index){
    confirmAlert({
      title: '',
      message: DELETE_CONFIRMATION,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteShop({shopId: itemId}).then((response) => {
              this.props.deleteShopSuccess(index)
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
      slideData: nextProps.slideData
    });
  }

  shopOnlineOfflineAnalytics(){
    const {slideData} = this.state;
    window.getFooter().setState({
      renderElement: <Modal 
              id="business-detail-modal"
              show={true}
              onHide={this.hide}
              header={<h4 className="modal-title">Restaurant Availability Analytics - "{slideData.shopName}"</h4>}
              body={<ShopOnlineOfflineAnalytics shopId={slideData.shopId} />}
            />
    });
  }


  showPendingModal(shopId, index) {
    confirmAlert({
      title: '',
      message: "The shop is currently in Pending status. Do you want to keep it in Pending or change it to Online?",
      buttons: [
        {
          label: 'Keep Pending',
          onClick: () => {
            toast.success("Shop status remains in Pending.", {
              position: toast.POSITION.TOP_RIGHT
            });
          }
        },
        {
          label: 'Change to Offline',
          onClick: () => {
            deactivateShop({shopStatus: 2, shopId: shopId}).then((response) => {
              this.setState({
                slideData: {...this.state.slideData, shopStatus: 1}
              });
              toast.success("Shop status has been changed to Online.", {
                position: toast.POSITION.TOP_RIGHT
              });
            });
          }
        }
      ]
    });
  }
  

  showRatingFeedback(shopId, shopName, index){
    window.getFooter().setState({
      renderElement: <Modal 
              id="business-detail-modal"
              show={true}
              onHide={this.hide}
              header={<h4 className="modal-title">{shopName} Ratings & Feedback</h4>}
              body={<ShopRatingDetail shopId={shopId} index={index}  />}
            />
    });
  }

  showTransaction(shopId, index){
    window.getFooter().setState({
      renderElement: <Modal 
              id="business-detail-modal"
              show={true}
              onHide={this.hide}
              header={<h4 className="modal-title">Transactions</h4>}
              body={<ShopTransactionDetail shopId={shopId} index={index}  />}
            />
    });
  }

  collectCash(shopId, index){
    window.getFooter().setState({
      renderElement: <Modal 
              id="add-new-category"
              show={true}
              onHide={this.hide}
              header={<h4 className="modal-title">Collect Cash</h4>}
              body={<DepositCashShop shopId={shopId} index={index}  />}
            />
    });
  }

	render() {
    
      const { slideData, index, srno } = this.state;
      let planName = slideData && slideData.plan ? slideData.plan.plan_name : null;
      console.log('slideData', slideData.shopId);
    	return (
        <tr>
          <td>{ parseInt(srno + parseInt(index+1)) }</td>
          <td>{slideData.unique_id}</td>
          <td>{slideData.shopName}</td>
          <td>
            {planName} 
          </td>
          <td>
            <a href="javascript:void(0)" className="add-money" onClick={() => this.assignPlan(slideData.shopId, slideData.shopName, slideData.regionId, index)}>{ planName ? 'Update' : 'Assign'} plan</a>
            <a href="javascript:void(0)" className="add-money" onClick={() => this.removePlan(slideData.shopId)}>{ planName ? ' | Remove plan' : null} </a>
          </td>
          <td>{slideData.accountManager ? slideData.accountManager : null}</td>
          
          <td>{slideData.name}</td>
          <td>{slideData.email}</td>
          <td>{slideData.contactNumber}</td>
          <td>{slideData.shopAddres}</td>
          <td>{slideData.zone}</td>
          <td>{slideData.regionName}</td>
          
          <td>
            {
              slideData.averageRating 
              ? 
              <a href="javascript:void(0)" onClick={() => this.showRatingFeedback(slideData.shopId, slideData.shopName, index)}>{slideData.averageRating.toFixed(1)}</a> 
              : 
              null
            }
          </td>
          <td>
            {
              getAclChecks('SHOP_MENU_VIEW_ONLY')
              ?
              <Link to={"/dashboard/menu/"+ slideData.shopId}>Manage</Link>
              :
              null
            }
          </td>
          <td>{ slideData.activation_date ? moment(slideData.activation_date).format('ll') : null }</td>
          <td onClick={slideData.shopStatus === 3 ? this.showPendingModal.bind(this, slideData.shopId, index) : this.shopOnlineOfflineAnalytics.bind(this)}>
  {slideData.shopStatus === 1 && slideData.isDelivering ? (
    <span className='rider-online'>Online</span>
  ) : slideData.shopStatus === 2 ? (
    <span className='rider-offline'>Offline</span>
  ) : slideData.shopStatus === 3 ? (
    <span className='rider-pending'>Pending</span>
  ) : null}
</td>

          {
            getAclChecks('MARK_ORDER_UNASSIGN')
            ?
            <>
              <td><a href="javascript:void(0)" className="add-money" onClick={() => this.collectCash(slideData.shopId, index)}>Deposit Cash</a></td>
              <td><a href="javascript:void(0)" className="add-money" onClick={() => this.showTransaction(slideData.shopId, index)}>View Transactions</a></td>
            </>
            :
            null
          }
          
          {
            getAclChecks('SHOPS_STATUS')
            ?
            <td>
              {
                slideData.shopStatus && slideData.shopStatus == 1
                ?
                <Tooltip title="Click to Suspend">
                  <div className="stock-field on-btn" onClick={() => this.changeShopStatus(slideData.shopId, index)}>
                    <label className="switch" >
                      <div className="switch-slider"></div>
                         Active
                    </label>
                  </div>
                </Tooltip>
                :
                <Tooltip title="Click to Activate">
                  <div className="stock-field off-btn" onClick={() => this.activateShopStatus(slideData.shopId, index)}>
                    <label className="switch" >
                      <div className="switch-slider"></div>
                        {slideData.shopStatus == 2 ? 'Suspended' : 'Hide'}
                    </label>
                  </div>
                </Tooltip>
              }
            </td>
            :
            <td>
              {
                slideData.shopStatus && slideData.shopStatus == 1
                ?
                <div className="stock-field on-btn">
                  <label className="switch" >
                    <div className="switch-slider"></div>
                       Active
                  </label>
                </div>
                :
                <div className="stock-field off-btn">
                  <label className="switch" >
                    <div className="switch-slider"></div>
                      {slideData.shopStatus == 2 ? 'Suspended' : 'Hide'}
                  </label>
                </div>
              }
            </td>
          }

          <td>
            <a href="javascript: void(0)" onClick={() => this.downloadSvg(renderToString(<QRCode value={slideData.shopId.toString()} renderAs="svg" />))}>Download QRCode</a>
          </td>
          
          <td>
            <div className="table-btn-block">
              {
                getAclChecks('SHOPS_ADD_EDIT')
                ?
                <Link  className="btn edit-btn" to={"/dashboard/editshop/"+ slideData.shopId}>Edit</Link>
                :
                null
              }
              {
                getAclChecks('SHOPS_DELETE')
                ?
                <button className="btn delete-btn" onClick={() => this.deleteItem(slideData.shopId, index)}>Delete</button>
                :
                null
              }
              <div className="more-btn-ui"><button className="btn more-btn" data-toggle="dropdown" aria-expanded="false">More</button>
                <ul className="dropdown-menu">
                  {
                    getAclChecks('SHOPS_DOCUMENTS')
                    ?
                    <li><Link  to={"/dashboard/shopdocuments/"+ slideData.shopId}>Documents</Link></li>
                    :
                    null
                  }
                  {
                    getAclChecks('SHOPS_ADD_EDIT')
                    ?
                    <li><a href="javascript:void(0)" onClick={() => this.changePassword(slideData.shopId)}>Change Password</a></li>
                    :
                    null
                  }
                </ul>
              </div>
              {/*<Tooltip title="Documents">
                <Link className="btn delete-btn" to={"/dashboard/shopdocuments/"+ slideData.shopId}><i class="material-icons">library_books</i></Link>
              </Tooltip>
              <Tooltip title="Change Password">
                <a href="javascript:void(0)" onClick={() => this.changePassword(slideData.shopId)}><button className="btn edit-btn"><i class="material-icons">lock</i></button></a>
              </Tooltip>*/}
            </div></td>
            
        </tr>
    	);
  	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteShopSuccess: (payload) => {
      dispatch(deleteShopSuccess(payload));
    },
    deactivateShopSuccess: (payload, status) => {
      dispatch(deactivateShopSuccess(payload, status));
    }

  };
}

export default connect(null, mapDispatchToProps)(ShopSlide);