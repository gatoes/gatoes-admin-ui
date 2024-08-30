import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { staffListing, staffListingSuccess } from '../../actions/users';
import StaffSlide from './StaffSlide';
import {getAclChecks} from '../../utilities';

class ManageStaff extends Component {
  constructor(props){
    super(props);
    this.state = {
      staffList: props.staffList,
      status: props.status,
      lang: window.localStorage.contentlanguage ? window.localStorage.contentlanguage : 'en'
    };
  }

  componentDidMount(){
    staffListing().then((response) => {
      this.props.staffListingSuccess(response.data.data);
    })
  }

  componentWillReceiveProps(nextProps){
    if(this.props.status != nextProps.status && nextProps.compName == 'stafflist'){
      this.setState({
        staffList: nextProps.staffList,
        status: nextProps.status
      });
    }
  }

  render() {
    const {staffList, lang} = this.state;
    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            
            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Staff</h4>
              </div>
              <div className="col-sm-7 tr-block text-right align-self-center">
                {
                  getAclChecks('STAFF_ADD_EDIT') && lang == 'en'
                  ?
                  <Link className="btn green-btn" to="/dashboard/addstaff">Add New</Link>
                  :
                  null
                }
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
                        <th>Unique Id</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Zone</th>
                        <th>Contact Number</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        staffList && staffList.length > 0 && staffList.map((obj, index) => (
                          <StaffSlide slideData={obj} index={index} key={obj.id} />
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
    staffList: [...state.User.staff_list],
    status: state.User.status,
    compName: state.User.compName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    staffListingSuccess: (payload) => {
      dispatch(staffListingSuccess(payload));
    },
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(ManageStaff);