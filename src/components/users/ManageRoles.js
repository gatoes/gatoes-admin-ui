import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { roleListing, roleListingSuccess } from '../../actions/users';
import RoleSlide from './RoleSlide';
import {getAclChecks} from '../../utilities';

class ManageRoles extends Component {
  constructor(props){
    super(props);
    this.state = {
      roleList: props.roleList,
      status: props.status,
      lang: window.localStorage.contentlanguage ? window.localStorage.contentlanguage : 'en'
    };
  }

  componentDidMount(){
    roleListing().then((response) => {
      this.props.roleListingSuccess(response.data.data);
    })
  }

  componentWillReceiveProps(nextProps){
    if(this.props.status != nextProps.status && nextProps.compName == 'rolelist'){
      this.setState({
        roleList: nextProps.roleList,
        status: nextProps.status
      });
    }
  }

  render() {
    const {roleList, lang} = this.state;
    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            
            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Roles</h4>
              </div>
              <div className="col-sm-7 tr-block text-right align-self-center">
                {
                  getAclChecks('ROLES_ADD_EDIT') && lang == 'en'
                  ?
                  <Link  className="btn green-btn" to="/dashboard/addrole"><span className="icon-ic_plus"></span>Add New</Link>
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
                        <th>Permission</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        roleList && roleList.length > 0 && roleList.map((obj, index) => (
                          <RoleSlide slideData={obj} index={index} key={obj.roleId} />
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
    roleList: [...state.User.role_list],
    status: state.User.status,
    compName: state.User.compName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    roleListingSuccess: (payload) => {
      dispatch(roleListingSuccess(payload));
    },
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(ManageRoles);