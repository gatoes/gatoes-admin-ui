import React, { Component, Suspense } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AddDeliveryRegion from './AddDeliveryRegion';
import Modal from '../../Modal';
import { deliveryRegionListing, deliveryRegionListingSuccess, regionDetailById } from '../../actions/regions';
import DeliveryRegionSlide from './DeliveryRegionSlide';
import {getAclChecks} from '../../utilities';

class DeliveryRegion extends Component {
  constructor(props){
    super(props);
    this.state = {
      detail : {},
      deliveryRegListing: props.deliveryRegListing,
      status: props.status,
      lang: window.localStorage.contentlanguage ? window.localStorage.contentlanguage : 'en'
    }
    this.updateRegion = this.updateRegion.bind(this);
  }
 
  componentDidMount(){
    this.fetchRecords();
  }

  fetchRecords(){
    deliveryRegionListing({regionId : this.props.match.params.index}).then((response) => {
      this.props.deliveryRegionListingSuccess(response.data.data);
    })
  }

  componentWillReceiveProps(nextProps){
    if(this.props.status != nextProps.status && nextProps.compName == 'deliveryregionlist'){
      this.setState({
        deliveryRegListing: nextProps.deliveryRegListing,
        status: nextProps.status
      });
    }
  }

  addDeliveryRegionPanel(e){
    window.getFooter().setState({
      renderElement: <Modal 
              id="business-detail-modal"
              show={true}
              onHide={this.hide}
              header={<h4 className="modal-title">Delivery Region</h4>}
              body={<AddDeliveryRegion regionDetail={this.state.detail} updateRegion={this.updateRegion} />}
            />
    });
  }

  updateRegion(result){
    window.$$('body').removeClass('modal-open');
    window.$$('body').find('.modal-backdrop').removeClass('modal-backdrop');
    this.hide();
  }

  hide(){
    window.getFooter().setState({
        renderElement: null
    });
  }

  componentWillMount(){
    regionDetailById({regionId : this.props.match.params.index}).then((response) => {
      this.setState({
        detail : response.data.data
      })
    });
  }

  render() {
    const {detail, deliveryRegListing, lang} = this.state;
    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            
            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Delivery Region</h4>
              </div>
              <div className="col-sm-7 tr-block text-right align-self-center">
                {
                getAclChecks('DELIVERY_REGION_ADD_EDIT') && lang == 'en'
                ?
                <a href="javascript:void(0);" className="btn green-btn" onClick={this.addDeliveryRegionPanel.bind(this)}>Add Delivery Region</a>
                :
                null
                }
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="result-listing">
                  <table>
                    <thead>
                      <tr>
                        <th>Sr.no.</th>
                        <th>Name</th>
                        <th>Normal Surge</th>
                        <th>Weather Surge</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        deliveryRegListing && deliveryRegListing.length > 0 && deliveryRegListing.map((obj, index) => (
                          <DeliveryRegionSlide slideData={obj} index={index} key={obj.id} />
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
    );
  }
}
const mapStatesToProps = (state, ownProps) => {
  return {
    deliveryRegListing: [...state.Region.delivery_region_list],
    status: state.Region.status,
    compName: state.Region.compName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deliveryRegionListingSuccess: (payload) => {
      dispatch(deliveryRegionListingSuccess(payload));
    },
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(DeliveryRegion);