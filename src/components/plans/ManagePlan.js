import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { planListing, planListingSuccess } from '../../actions/plans';
import ManagePlanSlide from './ManagePlanSlide';
import {getAclChecks} from '../../utilities';

class ManagePlan extends Component {
  constructor(props){
    super(props);
    this.state = {
      planList: props.planList,
      status: props.status
    };
  }

  componentDidMount(){
    planListing().then((response) => {
      this.props.planListingSuccess(response.data.data);
    })
  }

  componentWillReceiveProps(nextProps){
    if(this.props.status != nextProps.status && nextProps.compName == 'planlist'){
      this.setState({
        planList: nextProps.planList,
        status: nextProps.status
      });
    }
  }

  render() {
    const {planList} = this.state;
    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            
            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Subscription Plan</h4>
              </div>
              <div className="col-sm-7 tr-block text-right align-self-center">
                <Link className="btn green-btn" to="/dashboard/addplan">Add</Link>
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
                        <th>Name</th>
                        <th>Code</th>
                        <th>Commission</th>
                        <th>Platform fees</th>
                        
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        planList && planList.rows && planList.rows.length > 0 && planList.rows.map((obj, index) => (
                          <ManagePlanSlide slideData={obj} index={index} key={obj.id} />
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
    planList: {...state.Plan.plan_list},
    status: state.Plan.status,
    compName: state.Plan.compName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    planListingSuccess: (payload) => {
      dispatch(planListingSuccess(payload));
    },
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(ManagePlan);