import React, { Component } from 'react';
import { reduxForm, Field, SubmissionError, reset, FieldArray, formValueSelector } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import renderReactSelect from '../FormFields/renderReactSelect';
import {DISCOUNT_TYPE} from '../../constants';
import {getCurrencySymbol, getCurrencyCode} from '../../utilities';

class PromoCodeAction extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (    
      <div className="fields-ui-block">
        <div className="basic-details">
          <div className="heading">
            <h4>Actions</h4>
          </div>
          <div className="form-block">
            
            <div className="row">
              <div className="col-lg-6 selectbox-block">
                <Field
                  label="Discount Type"
                  name="discount_type"
                  optionLabel='label'
                  optionValue='value'
                  options={DISCOUNT_TYPE}
                  component={renderReactSelect}
                  placeholder="Choose type"
                  multi={false}
                  parentDivClass="form-group w-100"
                />
              </div>
              <div className="col-lg-6">
                <Field
                  name="discount"
                  component={renderField}
                  type="text"
                  className="form-control"
                  label="Discount"
                  placeholder="eg. 50"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <Field
                  name="max_discount"
                  component={renderField}
                  type="number"
                  className="form-control"
                  label={"Max discount in " + getCurrencyCode() }
                  placeholder="eg. 50"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default PromoCodeAction;
