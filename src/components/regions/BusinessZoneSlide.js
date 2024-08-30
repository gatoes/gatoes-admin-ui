import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import EditBusinessZone from './EditBusinessZone';
import Modal from '../../Modal';
import { getBusinessZoneById, deleteBusinessZone, deleteBusinessZoneSuccess } from '../../actions/regions';
import Tooltip from '../common/Tooltip';
import {DELETE_CONFIRMATION, DELETE_SUCCESS} from '../../constants';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {getAclChecks} from '../../utilities';

class BusinessZoneSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      index: props.index
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.editBusinessZonePanel = this.editBusinessZonePanel.bind(this);
  }

  deleteItem(itemId, index){
    confirmAlert({
      title: '',
      message: DELETE_CONFIRMATION,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteBusinessZone({id: itemId}).then((response) => {
              this.props.deleteBusinessZoneSuccess(index);
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

  editBusinessZonePanel(itemIndex){
    const {slideData} = this.state;
    getBusinessZoneById({'id' : slideData.id}).then((response) => {
        window.getFooter().setState({
          renderElement: <Modal 
                  id="business-detail-modal"
                  show={true}
                  onHide={this.hide}
                  header={<h4 className="modal-title">Edit Business Zone</h4>}
                  body={<EditBusinessZone regionDetail={response.data.data} updateBusinessZoneSlide={this.updateBusinessZoneSlide.bind(this)} itemIndex={itemIndex} />} 
                />
        });
    })
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      slideData: nextProps.slideData,
      index: nextProps.index
    });

  }

  updateBusinessZoneSlide(result){
    window.$$('body').removeClass('modal-open');
    window.$$('body').find('.modal-backdrop').removeClass('modal-backdrop');
    window.getFooter().setState({
        renderElement: null
    });
  }

  hide(){
    window.getFooter().setState({
        renderElement: null
    });
  }

	render() {
      const { slideData, index } = this.state;
    	return (
        <tr>
          <td>{ parseInt(index+1) }</td>
          <td>{slideData.name}</td>
          <td>
            {
              getAclChecks('BUSINESS_ZONE_ADD_EDIT')
              ?
              <div className="table-btn-block">
                <Tooltip title="Edit">
                  <a href="javascript:void(0);"  onClick={() => this.editBusinessZonePanel(index)}><button className="btn edit-btn"><i className="material-icons">edit</i></button></a>
                </Tooltip>
                <Tooltip title="Delete">
                  <button className="btn delete-btn" onClick={() => this.deleteItem(slideData.id, index)}><i className="material-icons">delete</i></button>
                </Tooltip>
              </div>
              :
              null
            }
          </td>
        </tr>
    	);
  	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteBusinessZoneSuccess: (payload) => {
      dispatch(deleteBusinessZoneSuccess(payload));
    },

  };
}

const mapStateToProps = (state, ownProps) => {
  return {...ownProps};
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessZoneSlide);