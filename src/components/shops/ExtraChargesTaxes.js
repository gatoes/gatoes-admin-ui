import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import RenderTaxes from './RenderTaxes';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';

export default class ExtraChargesTaxes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="form-block multiple-variant active">
        <div className="row">

          <div className="col-lg-12 col-md-12">
            <div className="form-group ri-block basic-charge-ui">
              
              <ul className="cs-check-box">
                <li>
                  <div className="os-check-box">
                    <Field
                      name="is_include_price"
                      id="is_include_price"
                      component="input"
                      type="checkbox"
                    />
                    <label for="recommended-item">Is your item price include below charges ?</label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <FieldArray name="taxes" component={RenderTaxes} formProps = {this.props.formProps} />
      </div>
    )
  }

}