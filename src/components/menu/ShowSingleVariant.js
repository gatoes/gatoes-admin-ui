import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import {currencyFormat} from '../../constants';
export default class ShowSingleVariant extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row all-taxes final-price-block active">
        <div className="col-lg-12">
          <Field
            name="itemPrice"
            component={renderField}
            type="number"
            className="form-control"
            label="Item Pricing"
            placeholder={currencyFormat(0)}
            notes="(Excluding all taxes)"
            parentDivClass="w-24"
          />
            {/* <Field
            name="Offer Price"
            component={renderField}
            type="number"
            className="form-control"
            label="Offer Price"
            placeholder={currencyFormat(0)}
            parentDivClass="w-24"
          /> */}
          <Field
            name="packaging_charges"
            component={renderField}
            type="number"
            className="form-control"
            label="Packaging Charges"
            placeholder={currencyFormat(0)}
            parentDivClass="w-24"
          />
        </div>
        <div className="col-lg-12"> 
          <div className="form-group">
            <label>Final Price</label>
            <div className="price-block">
              <sup></sup>
              <p className="price-text">{ this.props.fullPrice }</p>
              <span>Including all taxes</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

}