import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {deleteShopBanner } from '../../actions/shops';
import {DELETE_CONFIRMATION, DELETE_SUCCESS } from '../../constants';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import {getAclChecks} from '../../utilities';

class ManageRestaurantBannerSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      srno: props.srno,
      index: props.index,
      activePage: props.activePage
    };
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      slideData: nextProps.slideData
    });
  }

  deleteItem(dId, index){
    confirmAlert({
      title: '',
      message: DELETE_CONFIRMATION,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteShopBanner({id: dId}).then((response) => {
              this.props.updateList(this.state.activePage);
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
      const { slideData, index, srno } = this.state;
      
      return (
        <tr className="drag-promo-element">
          {this.props.component}
          
          <td>{slideData.name}</td>
          <td>{slideData.restaurant.toString()}</td>
          <td>
            <div className="table-btn-block">
              <Link  className="btn edit-btn" to={"/dashboard/editrestaurantbanner/"+ slideData.id}>Edit</Link>
              <button className="btn delete-btn" onClick={() => this.deleteItem(slideData.id, index)}>Delete</button>
            </div>
          </td>
        </tr>
    	);
  	}
}

export default ManageRestaurantBannerSlide;