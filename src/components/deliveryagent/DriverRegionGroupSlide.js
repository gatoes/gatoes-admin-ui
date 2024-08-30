import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {deleteDriverRegionGroup, deleteDriverRegionGroupSuccess} from '../../actions/deliveryagent';
import {DELETE_CONFIRMATION, DELETE_SUCCESS} from '../../constants';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import Tooltip from '../common/Tooltip';
import {getAclChecks} from '../../utilities';

class DriverRegionGroupSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      index: props.index
    };
    this.deleteItem = this.deleteItem.bind(this);
  }

  deleteItem(itemId, index){
    confirmAlert({
      title: '',
      message: DELETE_CONFIRMATION,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteDriverRegionGroup({groupId: itemId}).then((response) => {
              this.props.deleteDriverRegionGroupSuccess(index)
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
      const { slideData, index } = this.state;
    	return (
        <tr>
          <td>{ parseInt(parseInt(index+1)) }</td>
          <td>{ slideData.name }</td>
          <td><Tooltip title={slideData.deliveryRegion != null ? slideData.deliveryRegion.toString() : null}>{slideData.deliveryRegion != null ? slideData.deliveryRegion.length : null}</Tooltip></td>
          <td>
            <div className="table-btn-block">
              {
                getAclChecks('RIDER_REGION_GROUP_ADD_EDIT')
                ?
                <Link className="btn edit-btn" to={"/dashboard/editdriverregiongroup/"+ slideData.id}>Edit</Link>
                :
                null
              }
              {
                getAclChecks('RIDER_REGION_GROUP_DELETE')
                ?
                <button className="btn delete-btn" onClick={() => this.deleteItem(slideData.id, index)}>delete</button>
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
    deleteDriverRegionGroupSuccess: (payload) => {
      dispatch(deleteDriverRegionGroupSuccess(payload));
    },

  };
}

export default connect(null, mapDispatchToProps)(DriverRegionGroupSlide);