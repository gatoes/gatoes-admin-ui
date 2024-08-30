import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import RenderVariants from './RenderVariants';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import {currencyFormat} from '../../constants';
export default class ShowMultipleVariant extends Component {
  constructor(props) {
    super(props);

    
  }

  render() {
    return (
      <div className="multiple-variant active">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <Field
              name="variantCategory"
              component={renderField}
              type="text"
              className="form-control"
              label="Variant Category Name"
              placeholder="Eg. Choose Quantity or Choose Size"
            />
          </div>
        </div>
        <FieldArray name="variants" component={RenderVariants} formProps = {this.props.formProps} />

        <div className="row">
          <div className="col-sm-12">
            <Field
              name="packaging_charges"
              component={renderField}
              type="number"
              className="form-control"
              label="Packaging Charges"
              placeholder={currencyFormat(0)}
            />
          </div>
        </div>
      </div>
    )
  }

}