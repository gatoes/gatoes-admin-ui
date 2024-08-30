import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reduxForm, Field, SubmissionError, reset } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import renderReactSelect from '../FormFields/renderReactSelect';
import CheckboxGroup2 from '../FormFields/CheckboxGroup2';
import {toast} from 'react-toastify';
import validate from './ValidateRole';
import { permissionListing, addStaffRoles, roleDetailById } from '../../actions/users';

class EditRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permissionList: []
    }
  }

  componentDidMount(){
    permissionListing().then((response) => {
      this.setState({
        permissionList: response.data.data
      });
    })
  }

  componentWillMount(){
    roleDetailById({roleId : this.props.match.params.index}).then((response) => {
      this.props.initialize(response.data.data);
    });
  }

  submitMenuForm(values){
    return addStaffRoles(values)
    .then((result) => {
      toast.success('Role added Successfully.');
      this.props.reset();
      this.props.history.push('/dashboard/manageroles');
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }


  render() {
    const {handleSubmit, pristine, submitting} = this.props;
    const { permissionList} = this.state;

    return (
      <div className="container ani-ui-block shop-manager">
        <div className="row menu-top-block">
          <div className="col-sm-12 tl-block align-self-center">
            <h4 className="heading">Add New Role</h4>
          </div>

          <form onSubmit={handleSubmit(this.submitMenuForm.bind(this))}>
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="add-left-block">
                  <div className="fields-ui-block">
                    <div className="basic-details">
                      <div className="heading">
                        <h4>Details</h4>
                      </div>
                      <div className="form-block">
                        <div className="row">
                          <div className="col-lg-12">
                            <Field
                              name="name"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Role"
                              placeholder="Eg. Rider manager"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <h5>Permissions</h5>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group ri-block custom-check-ui">
                              {
                                permissionList && permissionList.length > 0 && permissionList.map((obj, index) => (
                                  <>
                                  <label>{obj.title}</label>
                                  <Field
                                   name="permission"
                                   component={CheckboxGroup2}
                                   type="checkbox"
                                   options={obj.permissions}
                                   parentIndex={index}
                                 />
                                 </>
                                ))
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="row save-button-block">
                    <div className="col-sm-12 align-self-center">
                      <button type="submit" disabled={submitting} className="btn green-btn"><i className="material-icons">check_circle</i>SUBMIT DETAILS{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
                    </div>
                  </div>
                    
                </div>
              </div>
            </div>

            
          </form>
        </div>
      </div>
    );
  }
}

EditRole = reduxForm({
  form: 'AddRolesValue',
  destroyOnUnmount: false,
  validate
})(EditRole)

export default EditRole;