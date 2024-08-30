import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { deletePlan, deletePlanSuccess, updateStatus } from '../../actions/plans';
import { DELETE_CONFIRMATION, DELETE_SUCCESS, ACTIVATE_CONFIRMATION, DEACTIVATE_CONFIRMATION, STATUS_UPDATE_SUCCESS} from '../../constants';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {getAclChecks, getCurrencySymbol} from '../../utilities';
import ShowDetail from './ShowDetail';
import Modal from '../../Modal';

class ManagePlanSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      index: props.index
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.setStatus = this.setStatus.bind(this);
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
            deletePlan(dId).then((response) => {
              this.props.deletePlanSuccess(index);
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

  setStatus(dId, index, stats){
    const { slideData } = this.state;
    confirmAlert({
      title: '',
      message: stats == 1 ? ACTIVATE_CONFIRMATION : DEACTIVATE_CONFIRMATION,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            updateStatus({status: stats, id: dId}, dId).then((response) => {
              this.setState({
                slideData: {...slideData, status: stats}
              });
              toast.success(STATUS_UPDATE_SUCCESS, {
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

  showDetail(e){
    const {slideData} = this.state;
    window.getFooter().setState({
      renderElement: <Modal 
              id="add-new-category"
              show={true}
              onHide={this.hide}
              header={<><h4 className="modal-title">{slideData.name}</h4><span>{slideData.code}</span><button type="button" className="btn m-cancel-btn" data-dismiss="modal">Close</button></>}
              body={<ShowDetail slideData={this.state.slideData} />}
            />
    });
  }

  hide(){
    window.getFooter().setState({
        renderElement: null
    });
  }

	render() {
      const { slideData, index } = this.state;
       const stats = slideData.status ? 0 : 1;
       let currency = getCurrencySymbol();
    	return (
        <tr>
          <td>{ parseInt(index+1) }</td>
          <td><a href="javascript:void(0)" onClick={this.showDetail.bind(this)}>  {slideData.name}</a></td>
          <td>{slideData.code}</td>
          <td>{slideData.commission}%</td>
          <td>{currency+slideData.user_platform_fee}</td>
          
          <td>
            <div className="status-ui" onClick={() => this.setStatus(slideData.id, index, stats)}>
              {
                slideData.status 
                ? 
                <div className="stock-field on-btn"><label className="switch"><div className="switch-slider"></div></label></div>
                :
                <div className="stock-field off-btn"><label className="switch"><div className="switch-slider"></div></label></div>
              }
            </div>
          </td>
          <td>
            <div className="table-btn-block">
              <div className="table-btn-block">
                {
                  getAclChecks('PLAN_ADD_EDIT')
                  ?
                  <Link className="btn edit-btn" to={"/dashboard/editplan/"+ slideData.id}>Edit</Link>
                  :
                  null
                }
                {/*
                {
                  getAclChecks('PLAN_ADD_EDIT')
                  ?
                  <button className="btn delete-btn" onClick={() => this.deleteItem(slideData.id, index)}>Delete</button>
                  :
                  null
                }
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
    deletePlanSuccess: (payload) => {
      dispatch(deletePlanSuccess(payload));
    },
  };
}

export default connect(null, mapDispatchToProps)(ManagePlanSlide);