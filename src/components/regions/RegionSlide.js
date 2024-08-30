import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {deleteRegion, deleteRegionSuccess, updateZoneStatus, updateZoneShopStatus} from '../../actions/regions';
import {DELETE_CONFIRMATION, DELETE_SUCCESS, DEACTIVATE_CONFIRMATION, DEACTIVATE_SUCCESS, ACTIVATE_SUCCESS, ACTIVATE_CONFIRMATION} from '../../constants';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import Modal from '../../Modal';
import Tooltip from '../common/Tooltip';
import {getAclChecks} from '../../utilities';
import ManageZoneServiceRadius from './ManageZoneServiceRadius';

class RegionalSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      index: props.index,
      srno: props.srno
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.changeZoneStatus = this.changeZoneStatus.bind(this);
    this.setZoneShopServiceRadis = this.setZoneShopServiceRadis.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  setZoneShopServiceRadis(zoneId, index){
    // alert('Hi');
    window.getFooter().setState({
      renderElement: <Modal 
              id="add-new-category"
              show={true}
              onHide={this.hide}
              header={<h4 className="modal-title">Set zone restaurants service radius</h4>}
              body={<ManageZoneServiceRadius regionId={zoneId} index={index} updateData={this.updateData}  />}
            />
    });
  }

  updateData(){
    window.$$('body').removeClass('modal-open');
    window.$$('body').find('.modal-backdrop').removeClass('modal-backdrop');
    this.hide();
  }

  hide(){
    window.getFooter().setState({
        renderElement: null
    });
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      slideData: nextProps.slideData,
      index: nextProps.index
    });
  }

  deleteItem(itemId, index){
    confirmAlert({
      title: '',
      message: DELETE_CONFIRMATION,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteRegion({regionId: itemId}).then((response) => {
              this.props.deleteRegionSuccess(index);
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

  changeZoneStatus(zoneId, status ,index){
    if(status){
      var confirmation = "Do you want to suspend restaurants of this zone?";
      var sucess = "Restaurants suspended successfully.";
    } else {
      var confirmation = "Do you want to activate restaurants of this zone?";;
      var sucess = "Restaurants activated successfully.";;
    }
    confirmAlert({
      title: '',
      message: confirmation,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            updateZoneStatus({status: status ? 0 : 1, id: zoneId}).then((response) => {
              this.setState({
                slideData: {...this.state.slideData, status: status ? 0 : 1}
              })
              toast.success(sucess, {
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


  changeZoneShopStatus(zoneId, status ,index){
    if(status == 1){
      var confirmation = DEACTIVATE_CONFIRMATION;
      var sucess = DEACTIVATE_SUCCESS;
      var stats = 2;
    } else {
      var confirmation = ACTIVATE_CONFIRMATION;
      var sucess = ACTIVATE_SUCCESS;
      var stats = 1;
    }
    confirmAlert({
      title: '',
      message: confirmation,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            updateZoneShopStatus({status: stats, id: zoneId}).then((response) => {
              this.setState({
                slideData: {...this.state.slideData, shopStatus: stats}
              })
              toast.success(sucess, {
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
      {/*
      const WrappedComponent = TooltipWrapped(Link, {to: "/dashboard/editnewregion/"+ slideData.id, title:"Edit", children: <button className="btn edit-btn"><i className="material-icons">edit</i></button>});
      */}
      return (
        <tr key={slideData.id}>
          <td>{ parseInt(srno + parseInt(index+1)) }</td>
          <td>{slideData.name}</td>
          <td>{slideData.cityName}</td>
          <td>{slideData.serviceOpeningTime}</td>
          <td>{slideData.serviceClosingTime}</td>

          <td>
            {
            getAclChecks('ZONE_ADD_EDIT')
            ?
            <Tooltip title={slideData.status == 1 ? "Click to Hide" : "Click to Activate"}>
              <div className={slideData.status == 1 ? 'stock-field on-btn' : 'stock-field off-btn'} onClick={() => this.changeZoneStatus(slideData.id, slideData.status, index)}>
                <label className="switch" >
                  <div className="switch-slider"></div>
                    {slideData.status == 1 ? 'Active' : 'Hide'}
                </label>
              </div>
            </Tooltip>
            :
            null
            }
          </td>

          <td>
            {
            getAclChecks('ZONE_ADD_EDIT')
            ?
            <Tooltip title={slideData.shopStatus == 1 ? "Click to Suspend" : "Click to Activate"}>
              <div className={slideData.shopStatus == 1 ? 'stock-field on-btn' : 'stock-field off-btn'} onClick={() => this.changeZoneShopStatus(slideData.id, slideData.shopStatus, index)}>
                <label className="switch" >
                  <div className="switch-slider"></div>
                    {slideData.shopStatus == 1 ? 'Active' : 'Suspended'}
                </label>
              </div>
            </Tooltip>
            :
            null
            }
          </td>

          <td>
            <a href="javascript:void(0)" onClick={() => this.setZoneShopServiceRadis(slideData.id, index)}>Set Service Radius</a>
          </td>

          <td>
            <div className="table-btn-block">
              {
                getAclChecks('ZONE_ADD_EDIT')
                ?
                <Link className="btn edit-btn" to={"/dashboard/editnewregion/"+ slideData.id} data-toggle="tooltip" title="Edit">Edit</Link>
                :
                null
              }
              
              <button className="btn delete-btn" onClick={() => this.deleteItem(slideData.id, index)}>Delete</button>
              
              <div className="more-btn-ui"><button className="btn more-btn" data-toggle="dropdown" aria-expanded="false">More</button>
                <ul className="dropdown-menu">
                  {
                    getAclChecks('DELIVERY_REGION_VIEW_ONLY')
                    ?
                    <li> <Link className="" to={"/dashboard/managedeliveryregion/"+ slideData.id}>Delivery Regions</Link></li>
                    :
                    null
                  }
                  {
                    getAclChecks('BUSINESS_ZONE_VIEW_ONLY')
                    ?
                    <li><Link  className="" to={"/dashboard/managebusinesszone/"+ slideData.id}>Business Zone</Link></li>
                    :
                    null
                  }
                </ul>
              </div>
              {/*<Tooltip title="Delivery Regions">
                <Link to={"/dashboard/managedeliveryregion/"+ slideData.id}><button ><i className="material-icons">edit_location</i></button></Link>
              </Tooltip>
              <Tooltip title="Business Zone">
                <Link to={"/dashboard/managebusinesszone/"+ slideData.id}><button className="btn edit-btn"><i className="material-icons">edit_location</i></button></Link>
              </Tooltip>*/}
            </div>
          </td>
        </tr>
      );
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteRegionSuccess: (payload) => {
      dispatch(deleteRegionSuccess(payload));
    },

  };
}

export default connect(null, mapDispatchToProps)(RegionalSlide);