import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reduxForm, Field, SubmissionError, reset } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import renderReactSelect from '../FormFields/renderReactSelect';
import { cuisineListing, cuisineListingSuccess, addNewShop, shopDetailById, categoryListing, getBankList } from '../../actions/shops';
import {toast} from 'react-toastify';
import validate from './ValidateShop';
import ShopImage from './ShopImage';
import GooglePlacesAutocomplete from '../common/GooglePlacesAutocomplete';
import { regionListing, deliveryRegionListing, getDeliveryRegionWithZone } from '../../actions/regions';
import ExtraChargesTaxes from './ExtraChargesTaxes';
import {IS_WITH_RIDER_OPTION, ALLOW_DELIVER_STATUS, VENDOR_TYPE, SHOP_DELIVERY_TYPE,TAG,iswithGatoes} from '../../constants';
import renderDatePicker from '../FormFields/renderDatePicker';

class EditBasicDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regionListing : [],
      deliveryRegion: [],
      restaurant_region: [],
      categoryList: [],
      bankList:[],
      cuisineList: props.cuisineList,
      shopId: props.shopId,
      is_submitting: false,
      status: props.status,
      withoutRiderZone: '1'
    }
    this.updateFormattedAddress = this.updateFormattedAddress.bind(this);
    this.updateLatLng = this.updateLatLng.bind(this);
    this.handleDeliveryRegion = this.handleDeliveryRegion.bind(this);
    this.handleShopRider = this.handleShopRider.bind(this);
  }

  handleDeliveryRegion (e) {
    this.props.change('regionId', 0);
    this.getDeliveryRegion(e.id);
  }

  handleShopRider(e) {
    let stats = 1;
    if(e.value == '1'){
      stats = '1';
      this.props.change('restaurant_zone', []);
    } else {
      stats = '0';
    }

    this.setState({
      withoutRiderZone: stats
    })
  }

  getDeliveryRegion(id){
    deliveryRegionListing({regionId : id}).then((response) => {
      this.setState({
        deliveryRegion: response.data.data
      });
    })
  }

  componentDidMount(){
    cuisineListing().then((response) => {
      this.props.cuisineListingSuccess(response.data.data);
    });

    getDeliveryRegionWithZone().then((response) => {
      this.setState({
        restaurant_region: response.data.data
      });
    })

    regionListing({status: 1}).then((response) => {
      this.setState({
        regionListing: response.data.data.region
      });
    })

    categoryListing().then((response) => {
      this.setState({
        categoryList: response.data.data.category
      })
    })

    getBankList().then((response) => {
      this.setState({
        bankList: response.data.data
      })
    })
  }

  getShopImage(imageId){
    this.props.change('shop_image', imageId);
  }

  updateFormattedAddress(address){
    this.props.change('mapAddress', address);
    this.props.change('mapaddress_chk', address);
  }

  updateLatLng(latlng){
    this.props.change('latitude', latlng.lat);
    this.props.change('longitude', latlng.lng);
  }

  componentWillMount(){
    shopDetailById({shopId : this.state.shopId}).then((response) => {
      this.props.initialize(response.data.data);
      this.getDeliveryRegion(response.data.data.region);
      this.props.change('mapaddress_chk', response.data.data && response.data.data.mapAddress);
      this.setState({
        mapAddress : response.data.data.mapAddress,
        withoutRiderZone: response.data.data.rider_requirement
      });

      if(response.data.data.rider_requirement == 1){
        this.setState({
          withoutRiderZone: 1
        })
      }

    });
  }

  submitMenuForm(values){
    //console.log('values', values);
    return addNewShop(values)
    .then((result) => {
      toast.success('Restaurant basic info updated Successfully.');
      this.props.setMenuStatus('timing');
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }

  render() {
    const {handleSubmit, pristine, submitting, cuisineList} = this.props;
    const {regionListing, deliveryRegion, categoryList, bankList, withoutRiderZone, restaurant_region} = this.state;
    return (
      <div className="container ani-ui-block">
        
        <form onSubmit={handleSubmit(this.submitMenuForm.bind(this))}>
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="add-left-block">
                
                <div className="fields-ui-block">
                  <div className="basic-details">
                    <div className="heading">
                      <h4>Basic Details</h4>
                    </div>
                    <div className="form-block">
                      <div className="row">
                        <div className="col-lg-6">
                          <Field
                            name="shopName"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="Vendor Name"
                            placeholder=""
                          />
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Map Address</label>
                            <div className="textfield-block">
                              <GooglePlacesAutocomplete
                                updateFormattedAddress={this.updateFormattedAddress}
                                updateLatLng={this.updateLatLng}
                                placeholder="map address"
                                name="mapAddress"
                                address={this.state.mapAddress}
                              />
                              <Field name="mapaddress_chk" component={renderField} type="hidden" /> 
                            </div>
                          </div>
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
                        <div className="col-lg-6 selectbox-block">
                          <Field
                            label="Zone"
                            name='region'
                            optionLabel='name'
                            optionValue='id'
                            options={regionListing}
                            component={renderReactSelect}
                            placeholder="Select Zone"
                            multi={false}
                            parentDivClass="form-group w-100"
                            parentCallback={ this.handleDeliveryRegion }
                            className="select-ui"
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-6 selectbox-block">
                          <Field
                            label="Delivery Region"
                            name='regionId'
                            optionLabel='name'
                            optionValue='id'
                            options={deliveryRegion}
                            component={renderReactSelect}
                            placeholder="Select Delivery Region"
                            multi={false}
                            parentDivClass="form-group w-100"
                            className="select-ui"
                          />
                        </div>
                        <div className="col-lg-6">
                          <Field
                            name="avgCost"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="Avg. Cost"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <Field
                            name="avgPreparationTime"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="Avg. Preparation Time"
                            placeholder=""
                          />
                        </div>
                        <div className="col-lg-6">
                          <Field
                            label="Cuisines"
                            name='cuisine'
                            optionLabel='cuisinesName'
                            optionValue='id'
                            options={cuisineList}
                            component={renderReactSelect}
                            placeholder="Select cuisines"
                            multi={true}
                            parentDivClass="form-group w-100"
                            className="select-ui"
                          />
                        </div>
                      </div>
                      
                      <div className="row">
                        <div className="col-lg-6 selectbox-block">
                          <Field
                            label="Category"
                            name='category'
                            optionLabel='name'
                            optionValue='id'
                            options={categoryList}
                            component={renderReactSelect}
                            placeholder="Select Category"
                            multi={true}
                            className="select-ui"
                            parentDivClass="form-group w-100"
                          />
                        </div>
                        <div className="col-lg-6">
                          <Field
                            name="accountManager"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="Restaurant Manager Name"
                            placeholder="eg. Shah"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <Field
                            name="business_name"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="Business Name"
                            placeholder=""
                          />
                        </div>
                        <div className="col-lg-6">
                          <Field
                            name="location_detail"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="Location Detail"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <Field
                            name="minimum_order"
                            component={renderField}
                            type="number"
                            className="form-control"
                            label="Minimum Order Amount"
                            placeholder=""
                          />
                        </div>
                        <div className="col-lg-6">
                          <Field
                           name="activation_date"
                           component={renderDatePicker}
                           label="Activation Date"
                           className="form-control"
                           innerParentDivClass="date-detail"
                           labelClass=""
                           readOnly="readonly"
                         />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 selectbox-block">
                          <Field
                            label="Vendor Type"
                            name='vendor_type'
                            options={VENDOR_TYPE}
                            component={renderReactSelect}
                            placeholder="Select Vendor Type"
                            multi={false}
                            className="select-ui"
                            parentDivClass="form-group w-100"
                          />
                        </div>
                        <div className="col-lg-6 selectbox-block">
                          <Field
                            label="Order Delivery Type"
                            name='pickupType'
                            options={SHOP_DELIVERY_TYPE}
                            component={renderReactSelect}
                            placeholder="Select Delivery Type"
                            multi={false}
                            className="select-ui"
                            parentDivClass="form-group w-100"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <Field
                            name="shopDistanceView"
                            component={renderField}
                            type="number"
                            className="form-control"
                            label="Service Radius"
                            placeholder=""
                          />
                        </div>
                        <div className="col-lg-6">
                          <Field
                            name="gstNumber"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="GST Number"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <Field
                            name="fssaiNumber"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="FSSAI Number"
                            placeholder=""
                          />
                        </div>

                        <div className="col-lg-6 selectbox-block">
                        <Field
                        name="restaurantTag"
                        component={renderReactSelect}
                        options={TAG}
                        optionLabel='label' // Corrected to match the key in TAG
                        optionValue='value' // Corrected to match the key in TAG
                        label="Restaurant Tag"
                        placeholder="Select Restaurant Tags"
                        multi={true}
                        className="select-ui"
                        parentDivClass="form-group w-100"
                      />
                        </div>
                        <div className="col-lg-6 selectbox-block">
                        <Field
                        name="IsWithGatoes"
                        component={renderReactSelect}
                        options={iswithGatoes}
                        optionLabel='label' // Corrected to match the key in iswithGatoes
                        optionValue='value' // Corrected to match the key in iswithGatoes
                        label="Is Gatoes Choice ?"
                        placeholder="Select"
                        multi={false}
                        className="select-ui"
                        parentDivClass="form-group w-100"
                      />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="fields-ui-block">
                  <div className="basic-details">
                    <div className="heading">
                      <h4>BASIC & OTHER CHARGES</h4>
                    </div>
                    <div className="form-block">
                      <div className="row">
                        <div className="col-lg-6">
                          <Field
                            name="merchant_charges"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="Merchant Charges Cash Payment(%)"
                            placeholder="eg. 20"
                          />
                        </div>
                        <div className="col-lg-6">
                          <Field
                            name="merchant_charges_online"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="Merchant Charges Online Payment(%)"
                            placeholder="eg. 5"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <Field
                            name="banner_promotion"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="Banner Promotion(%)"
                            placeholder="eg. 5"
                          />
                        </div>
                        <div className="col-lg-6">
                          <Field
                            name="priority_charges"
                            component={renderField}
                            type="number"
                            className="form-control"
                            label="Featured Shop(%)"
                            placeholder="eg. 5"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div> 

                <div className="fields-ui-block">
                <div className="basic-details">
                  <div className="heading">
                    <h4>With Rider or Without Rider</h4>
                  </div>
                  <div className="form-block">
                    <div className="row">
                      <div className="col-lg-6 selectbox-block">
                        <Field
                          label="Rider Requirement"
                          name='rider_requirement'
                          options={IS_WITH_RIDER_OPTION}
                          component={renderReactSelect}
                          placeholder="Select"
                          multi={false}
                          parentDivClass="form-group w-100"
                          parentCallback={ this.handleShopRider }
                        />
                      </div>
                      {
                        withoutRiderZone == '0'
                        ?
                        <div className="col-lg-6 selectbox-block">
                          <Field
                            label="Allow Vendor to Set order delivered"
                            name='allow_delivered_status'
                            options={ALLOW_DELIVER_STATUS}
                            component={renderReactSelect}
                            placeholder="Select"
                            multi={false}
                            className="select-ui"
                            parentDivClass="form-group w-100"
                          />
                        </div>
                        :
                        null
                      }
                    </div>
                    {
                      withoutRiderZone == '0'
                      ?
                      <div className="row">
                        <div className="col-lg-12 selectbox-block multi-region-selection">
                          <Field
                            label="Choose Serving Region"
                            name='restaurant_region'
                            optionLabel='name'
                            optionValue='id'
                            options={restaurant_region}
                            component={renderReactSelect}
                            placeholder="Select Region"
                            multi={true}
                            className="select-ui"
                            parentDivClass="form-group w-100"
                          />
                        </div>
                      </div>
                      :
                      null
                    }
                  </div>
                </div>
              </div>

                <div className="fields-ui-block">
                  <div className="basic-details">
                    <div className="heading">
                      <h4>Assigned Manager Detail</h4>
                    </div>
                    <div className="form-block">
                      <div className="row">
                        <div className="col-lg-6">
                          <Field
                            name="assigned_manager_name"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="Manager Name"
                          />
                        </div>
                        <div className="col-lg-6">
                          <Field
                            name="assigned_manager_email"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="Email"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <Field
                            name="assigned_manager_contactnumber"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="Contact Number"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div> 

                <div className="fields-ui-block">
                  <div className="basic-details">
                    <div className="heading">
                      <h4>Owner Details</h4>
                    </div>
                    <div className="form-block">
                      <div className="row">
                        <div className="col-lg-6">
                          <Field
                            name="name"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="Owner Name"
                            placeholder=""
                          />
                        </div>
                        <div className="col-lg-6">
                          <Field
                            name="email"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="Email"
                            placeholder="Email for login"
                          />
                        </div>
                      </div>
                      
                      <div className="row">
                        <div className="col-lg-6">
                          <Field
                            name="notifyEmail"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="Correspondence Email"
                            placeholder="Email for notification"
                          />
                        </div>
                        <div className="col-lg-6">
                          <Field
                            name="contactNumber"
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
                            name="firstAlertnateContactNumber"
                            component={renderField}
                            type="number"
                            className="form-control"
                            label="Alternate Contact Number 1"
                            placeholder="First Alternate Contact Number"
                          />
                        </div>
                        <div className="col-lg-6">
                          <Field
                            name="secondAlertnateContactNumber"
                            component={renderField}
                            type="number"
                            className="form-control"
                            label="Alternate Contact Number 2"
                            placeholder="Second Alternate Contact Number"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="fields-ui-block">
                <div className="basic-details">
                  <div className="heading">
                    <h4>Account Detail</h4>
                  </div>
                  <div className="form-block">
                    <div className="row">
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
                      <div className="col-lg-6">
                        <Field
                          name="account_holder_name"
                          component={renderField}
                          type="text"
                          className="form-control"
                          label="Account Holder Name"
                          placeholder=""
                        />
                      </div>
                    </div>
                    
                    <div className="row">
                      <div className="col-lg-6 selectbox-block">
                        <Field
                          label="Bank Name"
                          name='bank_id'
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
                          name="ifsc"
                          component={renderField}
                          type="text"
                          className="form-control"
                          label="IFSC Code"
                          placeholder="Afsc code"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="fields-ui-block">
                <div className="basic-details">
                  <div className="heading">
                    <h4>Payout Charges</h4>
                  </div>
                  <div className="form-block">
                    <div className="row">
                      <div className="col-lg-6">
                        <Field
                          name="normalPayout"
                          component={renderField}
                          type="number"
                          className="form-control"
                          label="Merchant Normal Payout Charges"
                          placeholder="ex.0"
                        />
                      </div>
                      <div className="col-lg-6">
                        <Field
                          name="fastTrackPayout"
                          component={renderField}
                          type="number"
                          className="form-control"
                          label="Merchant Fast-track Payout Charges"
                          placeholder="ex.30"
                        />
                      </div>
                    </div>
                    
                    <div className="row">
                      <div className="col-lg-6">
                        <Field
                          name="payoutRequestLimit"
                          component={renderField}
                          type="number"
                          className="form-control"
                          label="Payout Request Limitation"
                          placeholder="ex.2"
                        />
                      </div>
                    </div>
                  </div>
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
    );
  }
}

EditBasicDetail = reduxForm({
  form: 'EditShopValue',
  destroyOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(EditBasicDetail)

const mapStatesToProps = (state, ownProps) => {
  const states = {
    cuisineList: [...state.Shop.cuisine_list],
    status: state.Shop.status
  };
  return states;
}

const mapDispatchToProps = (dispatch) => {
  return {
    cuisineListingSuccess: (payload) => {
      dispatch(cuisineListingSuccess(payload));
    },

  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(EditBasicDetail);