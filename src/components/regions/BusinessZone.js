import React, { Component, Suspense } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AddBusinessZone from './AddBusinessZone';
import Modal from '../../Modal';
import { businessZoneListing, businessZoneListingSuccess, regionDetailById } from '../../actions/regions';
import BusinessZoneSlide from './BusinessZoneSlide';
import {getAclChecks} from '../../utilities';

class BusinessZone extends Component {
  constructor(props){
    super(props);
    this.state = {
      detail : {},
      businessZoneList: props.businessZoneList,
      status: props.status,
      lang: window.localStorage.contentlanguage ? window.localStorage.contentlanguage : 'en'
    }
    this.updateBusinessZone = this.updateBusinessZone.bind(this);
  }
 
  componentDidMount(){
    this.fetchRecords();
  }

  fetchRecords(){
    businessZoneListing({regionId : this.props.match.params.index}).then((response) => {
      this.props.businessZoneListingSuccess(response.data.data);
    })
  }

  componentWillReceiveProps(nextProps){
    if(this.props.status != nextProps.status && nextProps.compName == 'businesszonelist'){
      this.setState({
        businessZoneList: nextProps.businessZoneList,
        status: nextProps.status
      });
    }
  }

  addBusinessZonePanel(e){
    window.getFooter().setState({
      renderElement: <Modal 
              id="business-detail-modal"
              show={true}
              onHide={this.hide}
              header={<h4 className="modal-title">Business Zone</h4>}
              body={<AddBusinessZone regionDetail={this.state.detail} updateBusinessZone={this.updateBusinessZone} />}
            />
    });
  }

  updateBusinessZone(result){
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
    const {detail, businessZoneList, status, lang} = this.state;
    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            
            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Business Zone</h4>
              </div>
              <div className="col-sm-7 tr-block text-right align-self-center">
                {
                  getAclChecks('BUSINESS_ZONE_ADD_EDIT') && lang == 'en'
                  ?
                  <a href="javascript:void(0);" onClick={this.addBusinessZonePanel.bind(this)}><button className="btn green-btn"><i className="material-icons">add_circle_outline</i>Add Business Zone</button></a>
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
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        businessZoneList && businessZoneList.length > 0 && businessZoneList.map((obj, index) => (
                          <BusinessZoneSlide slideData={obj} index={index} key={`${obj.id}-${status}`} />
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
    businessZoneList: [...state.Region.business_zone_list],
    status: state.Region.status,
    compName: state.Region.compName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    businessZoneListingSuccess: (payload) => {
      dispatch(businessZoneListingSuccess(payload));
    },
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(BusinessZone);