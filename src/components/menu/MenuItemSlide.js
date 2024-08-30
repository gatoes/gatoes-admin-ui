import React, { Component, Suspense } from 'react';
import {currencyFormat, DELETE_CONFIRMATION, DELETE_SUCCESS, ACTIVATE_SUCCESS, ACTIVATE_CONFIRMATION, DEACTIVATE_SUCCESS} from '../../constants';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify';
import {deleteMenuItem, deleteMenuItemSuccess } from '../../actions/menus';
import { Link } from 'react-router-dom';
import ChangeItemStatusForm from './ChangeItemStatusForm';
import Modal from '../../Modal';
import {statusItemAvailability} from '../../actions/menus';
import moment from 'moment';
import DieteryStatus from '../common/DieteryStatus';
import {getDieteryStatus} from '../../utilities';
import { connect } from 'react-redux';
import {getAclChecks} from '../../utilities';

class MenuItemSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      menuListing: [...props.menuListing],
      items : props.items,
      shopId: props.shopId,
      status: props.status,
      index: props.index,
      catIndex: props.catIndex,
      vegStatus: props.vegStatus
    };

    this.filterData = {
        veg: [],
        name: ''
    };

    this.deleteItem = this.deleteItem.bind(this);
    this.changeItemStatus = this.changeItemStatus.bind(this);
    this.activateItemStatus = this.activateItemStatus.bind(this);
    this.updateMenuData = this.updateMenuData.bind(this);
    //this.filterResults = this.filterResults.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      menuListing: [...nextProps.menuListing],
      items: nextProps.items
    });
  }

  activateItemStatus(itemId, itemIndex, menuIndex, isVeg){
    console.log(itemIndex, '&&&' ,menuIndex, '##', itemId);
    const { menuListing, shopId} = this.state;
    confirmAlert({
      title: '',
      message: ACTIVATE_CONFIRMATION,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            statusItemAvailability({availability: true, itemId: itemId, shopId: shopId}).then((response) => {
              if(isVeg == "true"){
                menuListing[menuIndex].vegItem.map((obj, indexing) => {
                  if(obj.id == itemId){
                    menuListing[menuIndex].vegItem[indexing].availability = 1;
                  }
                });
              } else {
                menuListing[menuIndex].nonVegItem.map((obj, indexing) => {
                  if(obj.id == itemId){
                    menuListing[menuIndex].nonVegItem[indexing].availability = 1;
                  }
                });
              }
              
              this.props.deleteMenuItemSuccess(this.state.menuListing);

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

  changeItemStatus(itemId, itemIndex, menuIndex, isVeg){
    window.getFooter().setState({
      renderElement: <Modal 
              id="stock-modal"
              show={true}
              onHide={this.hide}
              header={<h4 className="modal-title">When the item will be available again?</h4>}
              body={<ChangeItemStatusForm itemId={itemId} itemIndex={itemIndex} menuIndex={menuIndex} isVeg={isVeg} updateMenuData={this.updateMenuData} shopId={this.state.shopId} />}
            />
    });
  }

  updateMenuData(itemId, itemIndex, menuIndex, isVeg, nextAvailableOn){
    const { menuListing} = this.state;
    if(isVeg == "true"){
      menuListing[menuIndex].vegItem.map((obj, indexing) => {
        if(obj.id == itemId){
          menuListing[menuIndex].vegItem[indexing].availability = 0;
           menuListing[menuIndex].vegItem[indexing].nextAvailableOn = nextAvailableOn;
        }
      });
      // menuListing[menuIndex].vegItem[itemIndex].availability = 0;
      // menuListing[menuIndex].vegItem[itemIndex].nextAvailableOn = nextAvailableOn;
    } else {
      menuListing[menuIndex].nonVegItem.map((obj, indexing) => {
        if(obj.id == itemId){
          menuListing[menuIndex].nonVegItem[indexing].availability = 0;
          menuListing[menuIndex].nonVegItem[indexing].nextAvailableOn = nextAvailableOn;
        }
      });
      // menuListing[menuIndex].nonVegItem[itemIndex].availability = 0;
      // menuListing[menuIndex].nonVegItem[itemIndex].nextAvailableOn = nextAvailableOn;
    }
    this.setState({
      menuListing: [...menuListing]
    });
    toast.success(DEACTIVATE_SUCCESS, {
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

  deleteItem(itemId, itemIndex, categoryIndex, isVeg){
    const {confirmOrder, menuListing, shopId} = this.state;
    console.log(itemId, '#', itemIndex, '#', categoryIndex, '#', isVeg);
    confirmAlert({
      title: '',
      message: DELETE_CONFIRMATION,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteMenuItem({itemId: itemId, shopId: shopId}).then((response) => {
              if(isVeg == "true"){
                menuListing[categoryIndex].vegItem.map((obj, indexing) => {
                  if(obj.id == itemId){
                    menuListing[categoryIndex].vegItem.splice(indexing, 1);
                  }
                });
              }else{
                menuListing[categoryIndex].nonVegItem.map((obj, indexing) => {
                  if(obj.id == itemId){
                    menuListing[categoryIndex].nonVegItem.splice(indexing, 1);
                  }
                });
              }
              this.setState({
                menuListing: [...menuListing]
              });
              this.props.deleteMenuItemSuccess(this.state.menuListing);
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

  

	render() {
    const visibleStat = getDieteryStatus();
    const {items, index, catIndex, vegStatus} = this.state;
    	return (
        <tr className="drag-promo-element">
          {this.props.component}
          <td>
            <div className="item-name">
              <DieteryStatus is_veg={items.isVeg} />
              <p>{items.itemName}</p>
              <span className="price">{currencyFormat(items.price, 'INR')}</span>
            </div>
          </td>
          {
            getAclChecks('SHOP_MANAGE_STOCK')
            ?
            <td>
              {
                items.availability
                ?
                <div className="stock-field on-btn" onClick={() => this.changeItemStatus(items.id, index, catIndex, vegStatus)}>
                  <label className="switch" >
                    <div className="switch-slider"></div>
                       In Stock
                  </label>
                </div>
                :
                <div className="stock-field off-btn" onClick={() => this.activateItemStatus(items.id, index, catIndex, vegStatus)}>
                  <label className="switch" >
                    <div className="switch-slider"></div>
                      <span>Next Available {moment.utc(items.nextAvailableOn).local().format('llll')}</span>
                  </label>
                </div>
              }
            </td>
            :
            <td>
              {
                items.availability
                ?
                <div className="stock-field on-btn">
                  <label className="switch" >
                    <div className="switch-slider"></div>
                       In Stock
                  </label>
                </div>
                :
                <div className="stock-field off-btn">
                  <label className="switch" >
                    <div className="switch-slider"></div>
                      <span>Next Available {moment.utc(items.nextAvailableOn).local().format('llll')}</span>
                  </label>
                </div>
              }
            </td>
          }
          <td>
            <div className="table-btn-block">
              {
                getAclChecks('SHOP_MENU_ADD_EDIT')
                ?
                <Link className="btn chk-edit-btn edit-btn" to={"/dashboard/editmenuitem/"+ this.state.shopId+'/'+ items.id}>EDIT</Link>
                :
                null
              }
              {
                getAclChecks('SHOP_MENU_DELETE')
                ?
                <button className="btn delete-btn" onClick={() => this.deleteItem(items.id, index, catIndex, vegStatus)}>DELETE</button>
                :
                null
              }
            </div>
          </td>
        </tr>
    	);
  	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteMenuItemSuccess: (payload) => {
      dispatch(deleteMenuItemSuccess(payload));
    },

  };
}

export default connect(null, mapDispatchToProps)(MenuItemSlide);