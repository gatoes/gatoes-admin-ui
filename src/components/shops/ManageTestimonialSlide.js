import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {deleteFeedback } from '../../actions/shops';
import {DELETE_CONFIRMATION, DELETE_SUCCESS } from '../../constants';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import Tooltip from '../common/Tooltip';
import {getAclChecks} from '../../utilities';

class ManageTestimonialSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      index: props.index
    };
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      slideData: nextProps.slideData
    });
  }

  deleteItem(dId){
    confirmAlert({
      title: '',
      message: DELETE_CONFIRMATION,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteFeedback({id: dId}).then((response) => {
              this.props.reloadPanel();
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
      const { slideData, index } = this.state;
      
      return (
        <tr>
          <td>{ parseInt(index+1) }</td>
          <td>{slideData.shopName}</td>
          <td>{slideData.ownerName}</td>
          <td>
            <div className="table-btn-block">
              <Link  className="btn edit-btn" to={"/dashboard/edittestimonial/"+ slideData.id}>Edit</Link>
              <button className="btn delete-btn" onClick={() => this.deleteItem(slideData.id)}>Delete</button>
            </div>
          </td>
        </tr>
    	);
  	}
}


export default ManageTestimonialSlide;