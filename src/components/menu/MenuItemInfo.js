import React, { Component, Suspense } from 'react';
import { updateRequestedItemStatus, updateRequestedItemStatusSuccess } from '../../actions/menus';
import { updateRequiredCounterSuccess} from '../../actions/settings';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import Modal from '../../Modal';
import RejectShopItem from './RejectShopItem';

class MenuItemInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      itemInfo: props.itemInfo,
      index: props.index
    };
    this.rejectItem = this.rejectItem.bind(this);
    this.acceptItem = this.acceptItem.bind(this);
    this.updateItemList = this.updateItemList.bind(this);
  }

  acceptItem(itemId, itemIndex){
    this.props.onCloseSlide();
    confirmAlert({
      title: '',
      message: 'Do you want to approve this item?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            updateRequestedItemStatus({itemId: itemId, isRejected: false}).then((response) => {
              this.props.updateRequestedItemStatusSuccess(itemIndex);
              this.props.updateRequiredCounterSuccess('requesteditems');
              toast.success('Items approved successfully', {
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

  rejectItem(itemId, itemIndex){
    this.props.onCloseSlide();
    window.getFooter().setState({
      renderElement: <Modal 
              id="business-detail-modal"
              show={true}
              onHide={this.hide}
              header={<h4 className="modal-title">Reject Items</h4>}
              body={<RejectShopItem itemId={itemId} itemIndex={itemIndex} updateItemList={this.updateItemList} />}
            />
    });
  }

  updateItemList(itemIndex){
    this.props.updateRequestedItemStatusSuccess(itemIndex);
    toast.success('Item rejected successfully.', {
      position: toast.POSITION.TOP_RIGHT
    });
    
    window.$$('body').removeClass('modal-open');
    window.$$('body').find('.modal-backdrop').removeClass('modal-backdrop');

    this.hide();
  }

  hide(){
    window.getFooter().setState({
        renderElement: null
    });
  }

	render() {
      const { itemInfo, index } = this.state;
      return (
        <>
          <tr>
            <td><a href="javscript:void(0);" className="add-text-btn"  onClick={() => this.acceptItem(itemInfo.id, index)}>Accept</a></td>
            <td><a href="javscript:void(0);" className="add-text-btn"  onClick={() => this.rejectItem(itemInfo.id, index)}>Reject</a></td>
          </tr>
          <tr></tr>
          <tr><td><h2>Restaurant Info</h2></td></tr>
          <tr></tr>
          <tr><td>Name: </td><td>{itemInfo.itemName}</td></tr>
          <tr><td>Price: </td><td>{itemInfo.currencySymbol +''+ itemInfo.itemPrice}</td></tr>
          <tr><td>Description: </td><td>{itemInfo.itemDescription}</td></tr>
          <tr><td>Packaging Charges: </td><td>{itemInfo.currencySymbol +''+ itemInfo.packaging_charges}</td></tr>
          {
            itemInfo && itemInfo.variants && itemInfo.variants.length > 0 &&
            <>
            <tr></tr>
            <tr><td><h2>Variants</h2></td></tr>
            <tr></tr>
            {
              itemInfo.variants.map((obj, index) => (
                <>
                  <tr><td>Name/Price: </td><td>{obj.variantName + '/' + itemInfo.currencySymbol + obj.variantPrice}</td></tr>
                </>
              ))
            }
            </>
          }
          
          {
            itemInfo && itemInfo.fulladdons && itemInfo.fulladdons.length > 0 && 
            <>
              <tr></tr>
              <tr><td><h2>Addons</h2></td></tr>
              <tr></tr>
              {
                itemInfo.fulladdons.map((obk, undex) => (
                  <>
                    <tr><td>Category: </td><td>{obk.category_name}</td></tr>
                  {
                    obk && obk.semiaddons && obk.semiaddons.length > 0 && obk.semiaddons.map((obm, endex) => (
                      <>
                        <tr><td>Name/Price: </td><td>{obm.name +'/'+ itemInfo.currencySymbol + obm.price}</td></tr>
                      </>
                    ))
                  }
                  </>
                ))
              }
            </>
          }

          {
            itemInfo.newItem && itemInfo.newItem !== 'null'
            ?
            <>
              <tr><td><h1>Updated Info</h1></td></tr>
              <tr><td><h2>Restaurant Info</h2></td></tr>
              <tr></tr>
              <tr><td>Name: </td><td>{itemInfo.newItem.itemName}</td></tr>
              <tr><td>Price: </td><td>{itemInfo.currencySymbol +''+itemInfo.newItem.itemPrice}</td></tr>
              <tr><td>Description: </td><td>{itemInfo.newItem.itemDescription}</td></tr>
              <tr><td>Packaging Charges: </td><td>{itemInfo.currencySymbol +''+ itemInfo.newItem.packaging_charges}</td></tr>
              
              {
                itemInfo.newItem && itemInfo.newItem.variants && itemInfo.newItem.variants.length > 0 && 
                <>
                  <tr></tr>
                  <tr><td><h2>Variants</h2></td></tr>
                  <tr></tr>
                  {
                    itemInfo.multipleVariant && itemInfo.newItem.variants.map((obj, index) => (
                      <>
                        <tr><td>Name/Price: </td><td>{obj.variantName + '/' + itemInfo.currencySymbol + obj.variantPrice}</td></tr>
                      </>
                    ))
                  }
                </>
              }
              {/*
              {
                itemInfo.newItem && itemInfo.newItem.fulladdons && itemInfo.newItem.fulladdons.length > 0 && 
                <>
                  <tr></tr>
                  <tr><td><h2>Addons</h2></td></tr>
                  <tr></tr>
                  {
                    itemInfo.newItem.fulladdons.map((obk, undex) => (
                      <>
                        <tr><td>Category: </td><td>{obk.category_name}</td></tr>
                        {
                          obk && obk.semiaddons && obk.semiaddons.length > 0 && obk.semiaddons.map((obm, endex) => (
                            <>
                              <tr><td>Name/Price: </td><td>{obm.name && obm.name +'/'+ itemInfo.currencySymbol + obm.price && obm.price}</td></tr>
                            </>
                          ))
                        }
                      </>
                    ))
                  }
                </>
              }
            */}
            </>
            :
            null
          }
        </>
    	);
  	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateRequestedItemStatusSuccess: (payload) => {
      dispatch(updateRequestedItemStatusSuccess(payload));
    },
    updateRequiredCounterSuccess: (payload) => {
      dispatch(updateRequiredCounterSuccess(payload));
    },
  };
}

export default connect(null, mapDispatchToProps)(MenuItemInfo);