import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reduxForm, Field, SubmissionError, reset } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import renderReactSelect from '../FormFields/renderReactSelect';
import {toast} from 'react-toastify';
import validate from './ValidateDeliveryAgent';
import DeliveryAgentImage from './DeliveryAgentImage';
import { getDeliveryRegionWithZone } from '../../actions/regions';
import { addDeliveryAgent, driverDetailById } from '../../actions/deliveryagent';
import CheckboxGroup2 from '../FormFields/CheckboxGroup2';
import { getBankList } from '../../actions/shops';
import {RIDER_WORKING_SHIFT, RIDER_TYPE} from '../../constants';

class EditDeliveryAgent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regionListing : [],
      itemImageUrl: null,
      bankList: []
    }
    //this.handleDeliveryRegion = this.handleDeliveryRegion.bind(this);
    this.getAgentImage = this.getAgentImage.bind(this);
  }

  componentDidMount(){
    getDeliveryRegionWithZone().then((response) => {
      this.setState({
        regionListing: response.data.data
      });
    })

    getBankList().then((response) => {
      this.setState({
        bankList: response.data.data
      })
    })
  }

  getAgentImage(imageId){
    this.props.change('image', imageId);
  }

  // handleDeliveryRegion (e) {
  //   this.getDeliveryRegion(e.id);
  // }

  // getDeliveryRegion(id){
  //   deliveryRegionListing({regionId : id}).then((response) => {
  //     this.setState({
  //       deliveryRegion: response.data.data
  //     });
  //   })
  // }

  componentWillMount(){
    driverDetailById({agentId : this.props.match.params.index}).then((response) => {
      this.props.initialize(response.data.data);
      //this.getDeliveryRegion(response.data.data.region);
      this.setState({
        itemImageUrl: response.data.data.imageUrl == null ? null : response.data.data.imageUrl.thumbnail
      });
      this.props.change('imageId', response.data.data.image);
    });
  }

  submitMenuForm(values){
    //console.log('values', values);
    return addDeliveryAgent(values)
    .then((result) => {
      toast.success('Delivery agent updated Successfully.');
      this.props.reset();
      this.props.history.push('/dashboard/deliveryagentlisting');
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }


  render() {
    const {handleSubmit, pristine, submitting} = this.props;
    const {regionListing, bankList} = this.state;

    return (
      <div className="container ani-ui-block shop-manager">
        <div className="row menu-top-block">
          <div className="col-sm-12 tl-block align-self-center">
            <h4 className="heading">Edit Delivery Agent</h4>
          </div>

          <form onSubmit={handleSubmit(this.submitMenuForm.bind(this))}>
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="add-left-block">
                  
                  <div className="fields-ui-block">
                    <div className="basic-details">
                      <div className="heading">
                        <h4>Personal Detail</h4>
                      </div>
                      <div className="form-block">
                        <div className="row">
                          <div className="col-lg-6">
                            <Field
                              name="name"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Name as per IC"
                              placeholder="Eg. Ram"
                            />
                          </div>
                          <div className="col-lg-6">
                            <Field
                              name="nric"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="NRIC"
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <Field
                              name="phoneNumber"
                              component={renderField}
                              type="number"
                              className="form-control"
                              label="Phone Number"
                              placeholder=""
                            />
                          </div>
                          <div className="col-lg-6">
                            <Field
                              name="email"
                              component={renderField}
                              type="email"
                              className="form-control"
                              label="email"
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <Field
                              name="address"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Address"
                              placeholder=""
                            />
                          </div>
                          <div className="col-lg-6">
                            <Field
                              name="driving_license_class"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Driving License Class"
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <Field
                              name="employee_uid"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Employee UID"
                              placeholder=""
                            />
                          </div>
                          <div className="col-lg-6 selectbox-block">
                            <Field
                              label="Rider Type"
                              name='rider_type'
                              options={RIDER_TYPE}
                              component={renderReactSelect}
                              placeholder="Select Rider Type"
                              multi={false}
                              parentDivClass="form-group w-100"
                              className="select-ui"
                            />
                          </div>
                          
                        </div>
                       
                      </div>
                    </div>
                  </div>

                  <div className="fields-ui-block">
                    <div className="basic-details">
                      <div className="heading">
                        <h4>Vehicle Detail</h4>
                      </div>
                      <div className="form-block">
                        <div className="row">
                          <div className="col-lg-6">
                            <Field
                              name="vehicleDetails"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Vehicle Detail"
                              placeholder=""
                            />
                          </div>
                          <div className="col-lg-6">
                            <Field
                              name="vehicle_type"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Vehicle Type"
                              placeholder=""
                            />
                          </div>
                        </div>


                        <div className="row">
                          <div className="col-lg-6">
                            <Field
                              name="vehicle_brand"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Vehicle Brand"
                              placeholder=""
                            />
                          </div>
                          <div className="col-lg-6">
                            <Field
                              name="vehicle_model"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Vehicle Model"
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <Field
                              name="year_make"
                              component={renderField}
                              type="number"
                              className="form-control"
                              label="Year Make"
                              placeholder=""
                            />
                          </div>
                          <div className="col-lg-6">
                            <Field
                              name="plate_number"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Plate Number"
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <Field
                              name="insurance_company"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Insurance Company"
                              placeholder=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="fields-ui-block">
                    <div className="basic-details">
                      <div className="heading">
                        <h4>Payment Info</h4>
                      </div>
                      <div className="form-block">
                        <div className="row">
                          <div className="col-lg-6 selectbox-block">
                            <Field
                              label="Bank Name"
                              name='bank_name'
                              optionLabel='name'
                              optionValue='id'
                              options={bankList}
                              component={renderReactSelect}
                              placeholder="Select Bank"
                              multi={false}
                              className="select-ui"
                              parentDivClass="form-group w-100"
                            />
                          </div>
                          <div className="col-lg-6">
                            <Field
                              name="account_number"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Account Number"
                              placeholder=""
                            />
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>

                  <div className="fields-ui-block">
                    <div className="basic-details">
                      <div className="heading">
                        <h4>Emergency Contact</h4>
                      </div>
                      <div className="form-block">
                        <div className="row">
                          <div className="col-lg-6">
                            <Field
                              name="contact_person"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Contact Person"
                              placeholder=""
                            />
                          </div>
                          <div className="col-lg-6">
                            <Field
                              name="contact_number"
                              component={renderField}
                              type="number"
                              className="form-control"
                              label="Contact Number"
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <Field
                              name="relationship"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Relationship"
                              placeholder=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="fields-ui-block">
                    <div className="basic-details">
                      <div className="heading">
                        <h4>Rider Assignment</h4>
                      </div>
                      <div className="form-block">
                        <div className="row">
                          <div className="col-lg-12 selectbox-block multi-region-selection">
                            <Field
                              label="Delivery Region"
                              name='regionId'
                              optionLabel='name'
                              optionValue='id'
                              options={regionListing}
                              component={renderReactSelect}
                              placeholder="Select Delivery Region"
                              multi={true}
                              parentDivClass="form-group w-100"
                              className="select-ui"
                            />
                          </div>
                        </div>
                        
                        <div className="row">
                          <div className="col-lg-6 selectbox-block">
                            <Field
                              label="Rider Working Shift"
                              name='riderWorkShift'
                              options={RIDER_WORKING_SHIFT}
                              component={renderReactSelect}
                              placeholder="Select Working Shift"
                              multi={false}
                              parentDivClass="form-group w-100"
                              className="select-ui"
                            />
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12 col-md-12 order-lg-2">
                      <DeliveryAgentImage getAgentImage={this.getAgentImage} itemImageUrl={this.state.itemImageUrl} />
                    </div>
                  </div>
                  <div className="row save-button-block">
                    <div className="col-sm-12 align-self-center">
                      <button type="submit" disabled={submitting} className="btn green-btn">Submit details{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
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

EditDeliveryAgent = reduxForm({
  form: 'AddDeliveryAgentValue',
  destroyOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(EditDeliveryAgent)

export default EditDeliveryAgent;
