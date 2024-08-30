import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {deleteDriver, deleteDriverSuccess, setDriverStatus, freeDriverFromOrder} from '../../actions/deliveryagent';
import {DELETE_CONFIRMATION, DELETE_SUCCESS, ACTIVATE_CONFIRMATION, DEACTIVATE_CONFIRMATION, STATUS_UPDATE_SUCCESS, SHOP_TYPE, RIDER_TYPE, RIDER_WORK_STATUS} from '../../constants';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import Tooltip from '../common/Tooltip';
import ChangePasswordForm from '../users/ChangePasswordForm';
import Modal from '../../Modal';
import RiderTransactionDetail from './RiderTransactionDetail';
import {getAclChecks} from '../../utilities';
import RiderOnlineOfflineAnalytics from './RiderOnlineOfflineAnalytics';

class DriverSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      index: props.index,
      srno: props.srno
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.setDriverStatus = this.setDriverStatus.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.updateShop = this.updateShop.bind(this);
    this.setRiderFree = this.setRiderFree.bind(this);
  }

  setRiderFree(dId, index){
    confirmAlert({
      title: '',
      message: "Is tis rider stuck & you want to free it?",
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            freeDriverFromOrder({driverId: dId}).then((response) => {
              toast.success("Driver has been set free successfully.", {
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
      slideData: nextProps.slideData,
      index: nextProps.index
    });
  }

  changePassword(riderId){
    window.getFooter().setState({
      renderElement: <Modal 
              id="stock-modal"
              show={true}
              onHide={this.hide}
              header={<h4 className="modal-title">Change Password</h4>}
              body={<ChangePasswordForm shopId={riderId} updateShop={this.updateShop} panel="rider"  />}
            />
    });
  }

  updateShop(result){
    toast.success("Password has been updated successfully.", {
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

  deleteItem(dId, index){
    confirmAlert({
      title: '',
      message: DELETE_CONFIRMATION,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteDriver({driverId: dId}).then((response) => {
              this.props.deleteDriverSuccess(index);
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

  setDriverStatus(dId, index, stats){
    const { slideData } = this.state;
    confirmAlert({
      title: '',
      message: stats === true ? ACTIVATE_CONFIRMATION : DEACTIVATE_CONFIRMATION,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            setDriverStatus({driverId: dId, isActive: stats}).then((response) => {
              this.setState({
                slideData: {...slideData, isActive: response.data.data.isActive}
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

  showTransaction(riderId, index){
    window.getFooter().setState({
      renderElement: <Modal 
              id="business-detail-modal"
              show={true}
              onHide={this.hide}
              header={<h4 className="modal-title">Transactions</h4>}
              body={<RiderTransactionDetail riderId={riderId} index={index}  />}
            />
    });
  }

  riderOnlineOfflineAnalytics(){
    const {slideData} = this.state;
    window.getFooter().setState({
      renderElement: <Modal 
              id="business-detail-modal"
              show={true}
              onHide={this.hide}
              header={<h4 className="modal-title">Rider Availability Analytics - "{slideData.name}"</h4>}
              body={<RiderOnlineOfflineAnalytics driverId={slideData.driverId} />}
            />
    });
  }

	render() {
      const { slideData, index, srno } = this.state;
      const stats = slideData.isActive ? false : true;

      return (
        <tr key={slideData.driverId}>
          <td>{ parseInt(srno + parseInt(index+1)) }</td>
          <td>{slideData.unique_id}</td>
          <td>{slideData.name}</td>
          <td>{slideData.rider_type >= 0 ? RIDER_TYPE[slideData.rider_type].label : null}</td>
          <td>
            {
              slideData.isActive 
              ?
              slideData.status == null ? 'Free' : RIDER_WORK_STATUS[slideData.status].label
              :
              'Blocked'
            }

          </td>
          <td onClick={this.riderOnlineOfflineAnalytics.bind(this)}>{slideData.isAvailable ? <span className='rider-online'>Online</span> : <span className='rider-offline'>Offline</span>}</td>
          <td>{slideData.vehicle_brand ? slideData.vehicle_brand : ''  + " " + slideData.vehicle_model ? slideData.vehicle_model : '' }</td>
          <td>{slideData.phoneNumber}</td>
          <td>{slideData.region}</td>
          <td>{slideData.deliveryRegion}</td>

          
          <td><a href="javascript:void(0)" className="add-money" onClick={() => this.showTransaction(slideData.driverId, index)}>View Transactions</a></td>
          <td>
            {
              getAclChecks('RIDERS_STATUS')
              ?
              <div className="status-ui" onClick={() => this.setDriverStatus(slideData.driverId, index, stats)}>
                {
                  slideData.isActive 
                  ? 
                  <Tooltip title="Click to deactivate"><div className="stock-field on-btn"><label className="switch"><div className="switch-slider"></div></label></div></Tooltip>
                  :
                  <Tooltip title="Click to activate"><div className="stock-field off-btn"><label className="switch"><div className="switch-slider"></div></label></div></Tooltip>
                }
              </div>
              :
              <div className="status-ui">
                {
                  slideData.isActive 
                  ? 
                  <div className="stock-field on-btn"><label className="switch"><div className="switch-slider"></div></label></div>
                  :
                  <div className="stock-field off-btn"><label className="switch"><div className="switch-slider"></div></label></div>
                }
              </div>
            }

          </td>
          <td>
            <div className="table-btn-block">
              {
                getAclChecks('RIDERS_ADD_EDIT')
                ?
                <Link  className="btn edit-btn" to={"/dashboard/editdeliveryagent/"+ slideData.driverId}>Edit</Link>
                :
                null
              }
              {
                getAclChecks('RIDERS_DELETE')
                ?
                <button className="btn delete-btn" onClick={() => this.deleteItem(slideData.driverId, index)}>Delete</button>
                :
                null
              }
              <div className="more-btn-ui"><button className="btn more-btn" data-toggle="dropdown" aria-expanded="false">More</button>
                <ul className="dropdown-menu">
                  {
                    getAclChecks('RIDERS_ADD_EDIT')
                    ?
                    <li><a href="javascript:void(0)" onClick={() => this.changePassword(slideData.driverId)}>Change Password</a></li>
                    :
                    null
                  }
                  
                  {
                    getAclChecks('RIDERS_DOCUMENTS')
                    ?
                    <li><Link to={"/dashboard/riderdocuments/"+ slideData.driverId}>Documents</Link></li>
                    :
                    null
                  }
                  <li><a href="javascript:void(0)" onClick={() => this.setRiderFree(slideData.driverId)}>Free Rider</a></li>
                </ul>
              </div>
                {/*<Link className="btn delete-btn" to={"/dashboard/riderdocuments/"+ slideData.driverId}><i class="material-icons">library_books</i></Link>
              </Tooltip>*/}
            </div>
          </td>
        </tr>
    	);
  	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteDriverSuccess: (payload) => {
      dispatch(deleteDriverSuccess(payload));
    },
  };
}

export default connect(null, mapDispatchToProps)(DriverSlide);