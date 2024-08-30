import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError, reset, FieldArray } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import renderReactSelect from '../FormFields/renderReactSelect';
import { driverRegionGroupList } from '../../actions/deliveryagent';
import {OPENING_CLOSING_ONLY_DAY, OPENING_CLOSING_TIME, OPENING_TIME} from '../../constants';
import { createNumberMask, createTextMask } from 'redux-form-input-masks';
import {getCurrencySymbol, getCurrencyCode} from '../../utilities';
import renderRadio from '../FormFields/renderRadio';

class RenderDriverFareSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      driverfare : props.driverfare,
      distanceunit: props.distanceunit,
      regionGroupList: []
    }
  }

  componentDidMount(){
    driverRegionGroupList().then((response) => {
      this.setState({
        regionGroupList : response.data.data
      })
    })
  }

  componentWillMount(){
    console.log('9999', this.props.fields.length);
    if(this.props.fields.length == 0){
      this.props.fields.push();
    }
  }

  render() {
    const { fields, meta: { touched, error, submitFailed }, distanceunit } = this.props;
    const {regionGroupList} = this.state;

    const currencyMask = createNumberMask({
      prefix: getCurrencySymbol(),
      decimalPlaces: 2,
      locale: getCurrencyCode(),
    })
    return (
      <>
        {
          fields.map((driverfare, index) => {
            return(
            <div className="row mp-addon">
              <div className="col-sm-12 multiple-ui-addon">
              <div className="setting-ui-fields ">
                <div className="row">
                  <div className="col-sm-12 mile-heading">
                  {/*
                  <div className="mile-switcher">
                    <label className="switch">
                    <input type="checkbox" name="mile"  /><div className="switch-icon"></div> Mile 1 </label>
                  </div>
                  <span className="info-icon" >i</span> 
                  */}
                </div>
                <div className="col-lg-6">
                    <Field
                      name={`${driverfare}.driver_restaurant_customer_unit_amount`}
                      component={renderField}
                      type="text"
                      className="form-control"
                      label={"Additional price per " + distanceunit}
                      placeholder="eg. 5"
                      {...currencyMask}
                    />    
                  </div>
                  <div className="col-lg-6">
                    <Field
                      name={`${driverfare}.incentive`}
                      component={renderField}
                      type="text"
                      className="form-control"
                      label="Incentive"
                      placeholder="eg. 5"
                      {...currencyMask}
                    />    
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group item-type-ui">
                      <label>Commission Percentage</label>
                      <ul className="cs-check-box">
                        <li>
                          <div className="os-check-box">
                            <Field 
                              type="radio" 
                              value="1"
                              name={`${driverfare}.commission_percentage`}
                              label="Yes" 
                              component={renderRadio}
                            />
                          </div>
                        </li>
                        <li>
                          <div className="os-check-box">
                            <Field 
                              type="radio" 
                              value="0"
                              name={`${driverfare}.commission_percentage`}
                              component={renderRadio}
                              label="No"
                            />
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <Field
                      name={`${driverfare}.incentive_percentage`}
                      component={renderField}
                      type="text"
                      className="form-control"
                      label="Incentive Percentage(%)"
                      placeholder="eg. 2"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                     <Field
                      label="Start Time"
                      name={`${driverfare}.start_time`}
                      optionLabel='label'
                      optionValue='value'
                      options={OPENING_TIME}
                      component={renderReactSelect}
                      placeholder="Start Time"
                      multi={false}
                    />    
                  </div>
                  <div className="col-lg-6">
                     <Field
                      label="End Time"
                      name={`${driverfare}.end_time`}
                      optionLabel='label'
                      optionValue='value'
                      options={OPENING_CLOSING_TIME}
                      component={renderReactSelect}
                      placeholder="End Time"
                      multi={false}
                    />    
                  </div>

                  <div className="col-lg-6">
                    <Field
                      label="Choose Days"
                      name={`${driverfare}.days`}
                      options={OPENING_CLOSING_ONLY_DAY}
                      component={renderReactSelect}
                      placeholder="Choose Days"
                      multi={true}
                      parentDivClass="form-group w-100"
                    />    
                  </div>
                  <div className="col-lg-6">
                    <Field
                      label="Choose Region Group"
                      name={`${driverfare}.region_group`}
                      optionLabel='name'
                      optionValue='id'
                      options={regionGroupList}
                      component={renderReactSelect}
                      placeholder="Choose Region Group"
                      multi={true}
                      parentDivClass="form-group w-100"
                    />    
                  </div>
                </div>

                <div className="form-group v-action">
                  
                  <div className="delete-varient">
                      <a href="javscript:void(0);" onClick={() => fields.remove(index)}>Delete</a>
                  </div>
                </div>
                </div>
              </div>
            </div>
          )})
        }
        <div className="row add-more-blocks">
            <div className="col-sm-12">
              <a href="javascript:void(0);" className="btn add-text-btn ad-btn" onClick={() => fields.push({})}><span className="icon-ic_plus"></span>Add more</a>
            </div>
          </div>
      </>
    )
  }

}

const mapStatesToProps = (state, ownProps) => {
  return {
    driverfare: state.form.SettingsValue && state.form.SettingsValue.values && state.form.SettingsValue.values.driverfare
  }
}

export default connect(mapStatesToProps)(RenderDriverFareSetting);