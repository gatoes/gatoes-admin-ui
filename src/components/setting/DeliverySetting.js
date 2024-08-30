import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deliverySettingList, deliverySettingListSuccess } from '../../actions/settings';
import Modal from '../../Modal';
//import DeliveryListSlide from './DeliveryListSlide';
import DeliverySettingSlide from './DeliverySettingSlide';
//import AddDeliverySettingFooter from './AddDeliverySettingFooter';

class DeliverySetting extends Component {
  constructor(props){
    super(props);
    this.state = {
      deliveryListing: props.deliveryListing,
      status: props.status
    };
  }
 
  componentDidMount(){
    this.fetchRecords();
  }

  fetchRecords(){
    deliverySettingList().then((response) => {
      this.props.deliverySettingListSuccess(response.data.data);
    })
  }

  componentWillReceiveProps(nextProps){
    if(this.props.status != nextProps.status && nextProps.compName == 'deliverysetting'){
      this.setState({
        deliveryListing: nextProps.deliveryListing,
        status: nextProps.status
      });
    }
  }

  render() {
    const {deliveryListing} = this.state;
    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">

            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Delivery Settings</h4>
              </div>
              <div className="col-sm-7 tr-block text-right align-self-center">
                 <Link className="btn green-btn" to="/dashboard/adddeliverysettings" ><span className="icon-ic_plus"></span>ADD Delivery Rule</Link>
                {/*
                <a href="javscript:void(0);" className="add-text-btn" onClick={this.addDeliverySetting.bind(this)}><button className="btn green-btn"><i className="material-icons">add_circle_outline</i>ADD Delivery Rule</button></a>
                */}
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="result-listing">
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Sr.no.</th>
                        <th>Rule-Id</th>
                        <th>Type</th>
                        <th>Rule</th>
                        <th>Restaurants</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        deliveryListing && deliveryListing.length > 0 && deliveryListing.map((obj, index) => (
                          <DeliverySettingSlide key={obj.id} slideData = {obj} index={index}  />
                        ))
                      }
                    </tbody>
                  </table>
                  </div>
                </div>
              </div>
            </div>
                  
          </div>
        </div>
      </div>
    );
  }
}

const mapStatesToProps = (state, ownProps) => {
  return {
    deliveryListing: state.Setting.delivery_list,
    status: state.Setting.status,
    compName: state.Setting.compName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deliverySettingListSuccess: (payload) => {
      dispatch(deliverySettingListSuccess(payload));
    },
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(DeliverySetting);

