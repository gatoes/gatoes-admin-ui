import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { DELETE_CONFIRMATION, DELETE_SUCCESS} from '../../constants';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify';
import {categoryDetailById, deleteMenuCategory } from '../../actions/menus';
import AddMenuCategory from './AddMenuCategory';
import AddCategoryFooter from './AddCategoryFooter';
import Modal from '../../Modal';
import {menuListing, menuListingSuccess} from '../../actions/menus';
import {getAclChecks} from '../../utilities';

class MenuCategorySlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      index: props.index,
      shopId: props.shopId
    };
    this.deleteCategory = this.deleteCategory.bind(this);
    this.reloadMenuListing = this.reloadMenuListing.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      slideData: nextProps.slideData,
      index: nextProps.index
    });
  }

  deleteCategory(catId){
    const {confirmOrder, index, shopId} = this.state;
    confirmAlert({
      title: '',
      message: DELETE_CONFIRMATION,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteMenuCategory({categoryId: catId, shopId: shopId}).then((response) => {
              this.props.reloadMenuListing(index);
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

  reloadMenuListing(){
    menuListing({shopId: this.state.shopId}).then((response) => {
      this.props.menuListingSuccess(response.data.data.menu);
      this.setState({
        menuListing: response.data.data.menu
      });
    })
    this.hide();
  }

  editMenuCategory(e){
    const {slideData, shopId} = this.state;
    categoryDetailById({'categoryId' : slideData.id, 'shopId': shopId}).then((response) => {
        window.getFooter().setState({
          renderElement: <Modal 
                  id="add-new-category"
                  show={true}
                  onHide={this.hide}
                  header={<h4 className="modal-title">Edit Category</h4>}
                  body={<AddMenuCategory data={response.data.data} />}
                  footer={<AddCategoryFooter reloadMenuListing={this.reloadMenuListing} />} 
                />
        });
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
      const { slideData, index } = this.state;
      //const dragHanlder = this.props.component;
      const counter = (slideData.nonVegItem && slideData.nonVegItem.length) + (slideData.vegItem && slideData.vegItem.length);
    	return (
    	  <li className="drag-drop-category">
          {this.props.component}
          <a className="list-group-item" href={"#list-item-" + index}>
            <p>{ slideData.category_name }</p>
            <span className="item-no">{counter}</span>
            <div className="ed-btn">
              {
              getAclChecks('SHOP_MENU_ADD_EDIT')
              ?
                <>
                <button className="edit-btn-ui" data-toggle="tooltip" title="Edit" onClick={this.editMenuCategory.bind(this)}><i className="material-icons">edit</i></button> 
                <button className="delete-btn-ui" data-toggle="tooltip" title="Delete" onClick={() => this.deleteCategory(slideData.id)}><i className="material-icons">delete</i></button>
                </>
              :
                null
              }
            </div>
          </a>
        </li>
    	);
  	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    menuListingSuccess: (payload) => {
      dispatch(menuListingSuccess(payload));
    },

  };
}

export default connect(null, mapDispatchToProps)(MenuCategorySlide);