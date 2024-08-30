import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { deleteCommunicationType, deleteCommunicationTypeSuccess } from '../../actions/communication';
import Tooltip from '../common/Tooltip';
import { DELETE_CONFIRMATION, DELETE_SUCCESS, NOTIFICATION_TYPE, NOTIFICATION_USER} from '../../constants';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {getAclChecks} from '../../utilities';

class ManageCommunicationMediumSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      index: props.index,
      srno : props.srno
    };
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      slideData: nextProps.slideData,
      index: nextProps.index
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
            deleteCommunicationType({staffId: dId}).then((response) => {
              this.props.deleteCommunicationTypeSuccess(index);
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
      const stats = slideData.status ? 0 : 1;
      var zones = '';
      slideData.zones && slideData.zones.length > 0 && slideData.zones.map((obj, index) => (
        zones += obj.zone+','
      ))
      zones = zones.slice(0,-1);

    	return (
        <tr>
          <td>{ parseInt(parseInt(index+1) + srno)}</td>
          <td>{NOTIFICATION_TYPE[slideData.notificationType].label}</td>
          <td>{NOTIFICATION_USER[slideData.notificationUser].label}</td>
          <td>{slideData.subject}</td>
          <td>{zones}</td>
          <td>
            <div className="table-btn-block">
              <div className="table-btn-block">
                {
                  getAclChecks('BROADCAST_MESSAGE_ADD_EDIT')
                  ?
                  <Link className="btn edit-btn" to={"/dashboard/editcommunicationmedium/"+ slideData._id}>Edit</Link>
                  :
                  null
                }
                {/*
                <Tooltip title="Delete">
                  <button className="btn delete-btn" onClick={() => this.deleteItem(slideData._id, index)}>Delete</button>
                </Tooltip>
                */}
              </div>
              </div>
          </td>
        </tr>
    	);
  	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCommunicationTypeSuccess: (payload) => {
      dispatch(deleteCommunicationTypeSuccess(payload));
    },
  };
}

export default connect(null, mapDispatchToProps)(ManageCommunicationMediumSlide);