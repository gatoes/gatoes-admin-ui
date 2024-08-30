import React, { Component } from 'react';
import { reduxForm, Field, reset, FieldArray, formValueSelector } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import renderReactSelect from '../FormFields/renderReactSelect';
import { connect } from 'react-redux';
import renderRadio from '../FormFields/renderRadio';
import {getShopListing} from '../../actions/shops';
import RenderDeliveryRule from './RenderDeliveryRule';
import { saveDeliveryRule } from '../../actions/settings';
import { regionListing } from '../../actions/regions';
import { toast } from 'react-toastify';

class AddDeliverySetting extends Component {
  constructor(props){
    super(props);
    this.state = {
      is_submitting: false,
      restaurantList: [],
      regionListing: [],
      detailedForm: 0,
      restaurantOption: 1
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

    regionListing({status: 1}).then((response) => {
      this.setState({
        regionListing: response.data.data.region
      });
    });

    this.props.change('delivery_type', parseInt(0));
    this.props.change('is_all_restaurant', parseInt(1));
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
            <h4 className="heading">Add New Delivery Rule</h4>
          </div>


            <form onSubmit={handleSubmit(this.submitDeliveryRuleForm.bind(this))}>
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="add-left-block delivery-rules-ui">
                  
                    <div className="fields-ui-block">
                      <div className="basic-details">
                        <div className="heading">
                          <h4>Delivery Rules</h4>
                        </div>
                        <div className="form-block">
                          <div className="row">
                             <div className="col-lg-4 col-md-4">
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
                            <div className="col-lg-4 col-md-4">
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
                            <div className="col-lg-4 col-md-4">
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
                            <div className="col-lg-4 col-md-4">
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
                              <div className="col-sm-12 no-padding">
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

AddDeliverySetting = reduxForm({
  form: 'AddDeliverySettingForm',
  destroyOnUnmount: false
})(AddDeliverySetting)


export default AddDeliverySetting;