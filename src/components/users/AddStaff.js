import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reduxForm, Field, SubmissionError, reset } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import renderReactSelect from '../FormFields/renderReactSelect';
import {toast} from 'react-toastify';
import validate from './ValidateStaff';
import { addStaff, roleListing } from '../../actions/users';
//import {getShopListing} from '../../actions/shops';
import { regionListing } from '../../actions/regions';

class AddStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roleList: [],
      restaurantList: [],
      regionListing: []
    }
  }

  componentDidMount(){
    // getShopListing({is_all: true}).then((response) => {
    //   this.setState({
    //     restaurantList: response.data.data
    //   })
    // });

    regionListing({status: 1}).then((response) => {
      this.setState({
        regionListing: response.data.data.region
      });
    });

    roleListing().then((response) => {
      this.setState({
        roleList: response.data.data
      });
    })
  }

  submitMenuForm(values){
    return addStaff(values)
    .then((result) => {
      toast.success('Staff added Successfully.');
      this.props.reset();
      this.props.history.push('/dashboard/managestaff');
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }


  render() {
    const {handleSubmit, pristine, submitting} = this.props;
    const { restaurantList, roleList, regionListing } = this.state;

    return (
      <div className="container ani-ui-block shop-manager">
        <div className="row menu-top-block">
          <div className="col-sm-12 tl-block align-self-center">
            <h4 className="heading">Add Staff</h4>
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
                          <div className="col-lg-6">
                            <Field
                              name="name"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Name"
                              placeholder="Eg. Rider manager"
                            />
                          </div>
                          <div className="col-lg-6">
                            <Field
                              name="email"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Email"
                              placeholder="Eg. a@xyz.com"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <Field
                              name="contactNumber"
                              component={renderField}
                              type="number"
                              className="form-control"
                              label="Contact Number"
                              placeholder="Eg. 9876545678"
                            />
                          </div>
                          <div className="col-lg-6">
                            <Field
                              name="password"
                              component={renderField}
                              type="password"
                              className="form-control"
                              label="Password"
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <Field
                              name="address"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Address"
                              placeholder="address"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12 selectbox-block">
                            <Field
                              label="Zones"
                              name='regionId'
                              optionLabel='name'
                              optionValue='id'
                              options={regionListing}
                              component={renderReactSelect}
                              placeholder="Select Zones"
                              multi={true}
                              className="select-ui"
                              parentDivClass="form-group w-100"
                            />
                          </div>
                        </div>

                        <div className="row">
                          
                          <div className="col-lg-6 selectbox-block">
                            <Field
                              label="Role"
                              name='role'
                              optionLabel='name'
                              optionValue='roleId'
                              options={roleList}
                              component={renderReactSelect}
                              placeholder="Select Role"
                              multi={true}
                              parentDivClass="form-group w-100"
                            />
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

AddStaff = reduxForm({
  form: 'AddStaffValue',
  destroyOnUnmount: false,
  validate
})(AddStaff)

export default AddStaff;