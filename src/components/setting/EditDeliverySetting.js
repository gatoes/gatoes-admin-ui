import React, { Component } from 'react';
import { reduxForm, Field, reset, FieldArray, formValueSelector } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import renderReactSelect from '../FormFields/renderReactSelect';
//import RenderCategoryTime from './RenderCategoryTime';
//import validate from './validateMenuCategory';
import { connect } from 'react-redux';
import renderRadio from '../FormFields/renderRadio';
import {getShopListing} from '../../actions/shops';
import RenderDeliveryRule from './RenderDeliveryRule';
import { saveDeliveryRule, getDeliveryRuleById } from '../../actions/settings';
import { toast } from 'react-toastify';
import { regionListing } from '../../actions/regions';

class EditDeliverySetting extends Component {
  constructor(props){
    super(props);
    this.state = {
      is_submitting: false,
      restaurantList: [],
      detailedForm: 0,
      regionListing: [],
      restaurantOption: 0
    }
    this.handleAllChecked = this.handleAllChecked.bind(this);
    this.handleAllRestaurant = this.handleAllRestaurant.bind(this);
  }

  componentDidMount(){
    getShopListing({is_all: true}).then((response) => {
      this.setState({
        restaurantList: response.data.data
      })
    });

    regionListing({status: 1, ruleId: this.props.match.params.index}).then((response) => {
      this.setState({
        regionListing: response.data.data.region
      });
    });
  }

  componentWillMount(){
    getDeliveryRuleById({ruleId : this.props.match.params.index}).then((response) => {
      this.props.initialize(response.data.data);
      this.setState({
        detailedForm: response.data.data.delivery_type,
        restaurantOption: response.data.data.is_all_restaurant
      })
    });
  }

  handleAllChecked (e) {
    const chkval = e.target.value;
    this.setState({
      detailedForm : chkval
    });
  }

  handleAllRestaurant (e) {
    const chkvalue = e.target.value;
    this.setState({
      restaurantOption : chkvalue
    });
  }

  submitDeliveryRuleForm(values){
    console.log('form', values);

    if(values.is_all_restaurant == '0'){
      delete(values.shopIds);
    } else {
      delete(values.regionId);
    }

    return saveDeliveryRule(values)
    .then((result) => {
      toast.success('Delivery rule set Successfully.');
      this.props.reset();
      this.props.history.push('/dashboard/deliverysettings');
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }

	render() {
      const {handleSubmit, pristine, submitting } = this.props;
      const {detailedForm, restaurantList, restaurantOption, regionListing} = this.state;
      console.log('www', restaurantList);
    	return ( 
        <div className="container ani-ui-block shop-manager">
          <div className="row menu-top-block">
            <div className="col-sm-12 tl-block align-self-center">
              <h4 className="heading">Edit Delivery Rule</h4>
            </div>
            <form onSubmit={handleSubmit(this.submitDeliveryRuleForm.bind(this))}>
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="add-left-block">
                  
                    <div className="fields-ui-block edit-delivery-ui">
                      <div className="basic-details">
                        <div className="heading">
                          <h4>Delivery Rules</h4>
                        </div>
                        <div className="form-block">
                          <div className="row">
                            <div className="col-lg-6">
                              <Field 
                                type="radio" 
                                value="0"
                                name="delivery_type"
                                id="s-varient" 
                                label="Free Delivery" 
                                component={renderRadio}
                                onChange={ this.handleAllChecked }
                              />
                            </div>
                            <div className="col-lg-6">
                              <Field 
                                type="radio" 
                                value="1"
                                name="delivery_type"
                                id="d-item" 
                                label="Paid Delivery" 
                                component={renderRadio}
                                onChange={ this.handleAllChecked }
                              />
                            </div>
                          </div>

                          {
                            detailedForm && detailedForm == 1
                            ?
                              <FieldArray name="rule" component={RenderDeliveryRule} />
                            :
                            null
                          }


                          <div className="row">
                            <div className="col-lg-6">
                              <Field 
                                type="radio" 
                                value="1"
                                id="e-varient" 
                                name="is_all_restaurant"
                                label="All Restaurant" 
                                component={renderRadio}
                                onChange={ this.handleAllRestaurant }
                              />
                            </div>
                            <div className="col-lg-6">
                              <Field 
                                type="radio" 
                                value="0"
                                name="is_all_restaurant"
                                id="s-item" 
                                label="Choose Zones" 
                                component={renderRadio}
                                onChange={ this.handleAllRestaurant }
                              />
                            </div>
                          </div>

                          {
                            restaurantOption && restaurantOption == 0
                            ?
                              <div className="col-sm-12">
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
                            :
                            null
                          }

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
        </div>
      );
  }
}

EditDeliverySetting = reduxForm({
  form: 'EditDeliverySettingForm',
  destroyOnUnmount: false
  //validate
})(EditDeliverySetting)


export default EditDeliverySetting;