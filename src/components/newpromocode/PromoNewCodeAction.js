import React, { Component } from 'react';
import { reduxForm, Field, SubmissionError, reset, FieldArray, formValueSelector } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import renderReactSelect from '../FormFields/renderReactSelect';
import {DISCOUNT_TYPE} from '../../constants';
import {getCurrencySymbol, getCurrencyCode} from '../../utilities';
import { getDiscountTypesUsingMicroservice } from '../../actions/regions';

class PromoNewCodeAction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discountType: [],
      hideMaxDiscount: false,

    }
    this.couponChecked = this.couponChecked.bind(this);

  }

  componentDidMount() {
    getDiscountTypesUsingMicroservice({type:1}).then((response) => {
      // console.log(response,"responseData")
      this.setState({
        discountType: response.data.responseData.rows,
      });
    });
    
  }
  couponChecked(e){
    const chkval = e.value
    console.log(chkval,"chkvalError")
    if(chkval == 1 || chkval == 3){
      this.setState({
        hideMaxDiscount:true

      });
    } else {
      this.setState({
       hideMaxDiscount:false

      });
    }

    this.props.isActionUpdate(chkval);

  }

  render() {
    const {discountType,hideMaxDiscount} = this.state
    // console.log(discountType,"discountType")
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
                  options={discountType.map((item) => ({
                    label: item.title,
                    value: item.id
                  }))}
                  component={renderReactSelect}
                  placeholder="Choose type"
                  multi={false}
                  parentDivClass="form-group w-100"
                  parentCallback={this.couponChecked}

                />
              </div>
              <div className="col-lg-6">
                <Field
                  name="discount"
                  component={renderField}
                  type="text"
                  className="form-control"
                  label="Discount"
                  placeholder="e.g. 50"
                />
              </div>
            </div>
            <div className="row">
            <div className="col-lg-6">
                <Field
                  name="minimum_subtotal"
                  component={renderField}
                  type="number"
                  className="form-control"
                  label="Minimum Subtotal"
                  placeholder="e.g. 300"
                />
              </div>
             {!hideMaxDiscount && (
              <div className="col-lg-6">
                <Field
                  name="max_discount"
                  component={renderField}
                  type="number"
                  className="form-control"
                  label={"Max discount in " + getCurrencyCode() }
                  placeholder="e.g. 50"
                />
              </div>
              )}
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default PromoNewCodeAction;
