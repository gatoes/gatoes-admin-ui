import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {deleteDeliveryRule, deleteDeliveryRuleSuccess} from '../../actions/settings';
import {DELETE_CONFIRMATION, DELETE_SUCCESS} from '../../constants';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import Tooltip from '../common/Tooltip';

class DeliveryListSlide extends Component {
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
            deleteDeliveryRule({ruleId: itemId}).then((response) => {
              this.props.deleteDeliveryRuleSuccess(index)
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
      let rules = '';
      let restaurant =  '';
    
      slideData.rule 
      && 
      slideData.rule.length > 0
       && 
       slideData.rule.map((obj, index) => {
          rules += obj.order_amount_range + ':' + obj.amount + ',';
       }
      )


      slideData.shopIds 
      && 
      slideData.shopIds.length > 0
       && 
       slideData.shopIds.map((obk, undex) => {
          restaurant += obk.shopName+',';
       }
      )

      
    	return (
        <tr>
          <td>{ parseInt(parseInt(index+1)) }</td>
          <td>{slideData.id}</td>
          <td>{slideData.delivery_type == 1 ? 'paid' : 'free' }</td>
          <td>
             <Tooltip title={rules}>Rules</Tooltip>
          </td>
          <td>
            <Tooltip title={restaurant}>{slideData.shopIds.length}</Tooltip>
          </td>
          <td>
            <div className="table-btn-block">
                <Link className="btn edit-btn" to={"/dashboard/editdeliverysettings/"+ slideData.id}>Edit</Link>
              
                <button className="btn delete-btn" onClick={() => this.deleteItem(slideData.id, index)}>Delete</button>
            </div></td>
        </tr>
    	);
  	}
}


const mapDispatchToProps = (dispatch) => {
  return {
    deleteDeliveryRuleSuccess: (payload) => {
      dispatch(deleteDeliveryRuleSuccess(payload));
    },

  };
}

export default connect(null, mapDispatchToProps)(DeliveryListSlide);