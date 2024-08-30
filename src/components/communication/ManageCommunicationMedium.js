import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { communitcationTypeListing, communitcationTypeListingSuccess } from '../../actions/communication';
import ManageCommunicationMediumSlide from './ManageCommunicationMediumSlide';
import Pagination from "react-js-pagination";
import BroadCastFilter from './BroadCastFilter';
import {getAclChecks} from '../../utilities';

class ManageCommunicationMedium extends Component {
  constructor(props){
    super(props);
    this.state = {
      msgTypeList: props.msgTypeList,
      status: props.status,
      activePage: 1,
      lang: window.localStorage.contentlanguage ? window.localStorage.contentlanguage : 'en'
    };
    this.getFilterFields = this.getFilterFields.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  getFilterFields(filters){
    this.setState({filters});
    //console.log('filters', filters);
    this.fetchRecords(1, filters);
  }
 
  componentDidMount(){
    this.fetchRecords(1);
  }

  fetchRecords(pageNumber, filters){
    communitcationTypeListing({pageNumber, ...filters}).then((response) => {
      this.props.communitcationTypeListingSuccess(response.data.data);
    })
  }

  componentWillReceiveProps(nextProps){
    if(this.props.status != nextProps.status && nextProps.compName == 'communicationtypelist'){
      this.setState({
        msgTypeList: nextProps.msgTypeList,
        status: nextProps.status
      });
    }
  }

  handlePageChange(pageNumber) {
    //console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
    this.fetchRecords(pageNumber, this.state.filters);
  }

  render() {
    const {msgTypeList, activePage, lang} = this.state;
    var limit = 20;
    var total = 0;
    if(msgTypeList && msgTypeList.limit){
      var srno = (activePage-1) * msgTypeList.limit;
      limit = msgTypeList.limit;
    } else {
      var srno = 0;   
      limit = 20;
    }

    if(msgTypeList && msgTypeList.total){
      total = msgTypeList.total;
    }

    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            
            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Broadcast Message</h4>
              </div>
              <div className="col-sm-7 tr-block text-right align-self-center">
                {
                  getAclChecks('BROADCAST_MESSAGE_ADD_EDIT') && lang == 'en'
                  ?
                  <Link  className="btn green-btn" to="/dashboard/addcommunicationmedium"><span className="icon-ic_plus"></span>Add New</Link>
                  :
                  null
                }
                
              </div>
            </div>

            <BroadCastFilter getFilterFields={this.getFilterFields} />

            <div className="row">
              <div className="col-sm-12">
                <div className="result-listing">
                  <table>
                    <thead>
                      <tr>
                        <th>Sr.no.</th>
                        <th>Notification Type</th>
                        <th>User Type</th>
                        <th>Subject</th>
                        <th>Zone</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        msgTypeList && msgTypeList.notification && msgTypeList.notification.length > 0 && msgTypeList.notification.map((obj, index) => (
                          <ManageCommunicationMediumSlide slideData={obj} index={index} key={obj._id} srno={srno} />
                        ))
                      }
                    </tbody>
                  </table>
                  <div className="pagination">
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={limit}
                      totalItemsCount={total}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange}
                    />
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
    msgTypeList: state.Communication.msg_type_list,
    status: state.Communication.status,
    compName: state.Communication.compName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    communitcationTypeListingSuccess: (payload) => {
      dispatch(communitcationTypeListingSuccess(payload));
    },
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(ManageCommunicationMedium);