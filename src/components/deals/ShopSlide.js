import React, { Component, Suspense } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {deleteShop, deleteShopSuccess, deactivateShop, deactivateShopSuccess} from '../../actions/shops';
import {DELETE_CONFIRMATION, DELETE_SUCCESS, DEACTIVATE_SUCCESS, ACTIVATE_CONFIRMATION, ACTIVATE_SUCCESS, SHOP_TYPE, SHOP_DELIVERY_TYPE} from '../../constants';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import Tooltip from '../common/Tooltip';
import Modal from '../../Modal';
import moment from 'moment';
import {getAclChecks} from '../../utilities';
import { renderToString } from 'react-dom/server';
import { removePlan } from '../../actions/plans';
import { Link } from 'react-router-dom';
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
    this.activateShopStatus = this.activateShopStatus.bind(this);
    this.updateShopData = this.updateShopData.bind(this);
    this.updateShop = this.updateShop.bind(this);
    this.downloadSvg = this.downloadSvg.bind(this);
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

  

 

 
	render() {
    
      const { slideData, index, srno } = this.state;
      let planName = slideData && slideData.plan ? slideData.plan.plan_name : null;
      console.log('slideData', slideData.shopId);
    	return (
        <tr>
          <td>{ parseInt(srno + parseInt(index+1)) }</td>
          {/* <td>{slideData.unique_id}</td> */}
          <td><Link to={`/dashboard/deals/add/${slideData.shopId}`}>{slideData.shopName}</Link></td>
         
          {/* <td>
            {planName} 
          </td> */}
       
          <td>{slideData.accountManager ? slideData.accountManager : null}</td>
          
          <td>{slideData.name}</td>
          {/* <td>{slideData.email}</td> */}
          <td>{slideData.contactNumber}</td>
          {/* <td>{slideData.shopAddres}</td> */}
          <td>{slideData.zone}</td>
          <td>{slideData.regionName}</td>

          
          {/* <td>
            {
              slideData.averageRating 
              ? 
              <>{slideData.averageRating.toFixed(1)}</> 
              : 
              null
            }
          </td> */}
        <td>
          <div className="table-btn-block">
           
              <>
              <Link to={`/dashboard/deals/add/${slideData.shopId}`} className="btn edit-btn">Create Deal</Link>
            <Link to={`/dashboard/deals/view/${slideData.shopId}` } className="btn edit-btn">View Deal</Link>
            </>
           
          </div>
          </td>
            
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