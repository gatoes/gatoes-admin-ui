import React, { Component } from 'react';
import { reduxForm, Field, SubmissionError, reset, FieldArray, formValueSelector } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import renderReactSelect from '../FormFields/renderReactSelect';
import { businessZoneListing } from '../../actions/regions';
import RenderRestaurantCategoryOption from './RenderRestaurantCategoryOption';

class PromoCodeCondition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businessZoneList: []
    }
  }

  componentDidMount(){
    businessZoneListing().then((response) => {
      this.setState({
        businessZoneList: response.data.data
      })
    });
  }

  render() {
    const {businessZoneList} = this.state;
    return (    
      <div className="fields-ui-block promocode-ui">
        <div className="basic-details">
          <div className="heading">
            <h4>Conditions</h4>
          </div>
          <div className="form-block">
            <div className="row">
              <div className="col-lg-6">
                <Field
                  label="Business Zone"
                  name='business_zone'
                  optionLabel='name'
                  optionValue='id'
                  options={businessZoneList}
                  component={renderReactSelect}
                  placeholder="Select Promotion Zone"
                  multi={true}
                  className="select-ui"
                  parentDivClass="form-group w-100"
                />
              </div>
              <div className="col-lg-6">
                <Field
                  name="minimum_subtotal"
                  component={renderField}
                  type="number"
                  className="form-control"
                  label="Minimum Subtotal"
                  placeholder="eg. 300"
                />
              </div>
            </div>

             <FieldArray name="restcategory" component={RenderRestaurantCategoryOption} formProps = {this.props.formProps} />

          </div>
        </div>
      </div>
    );
  }
}

export default PromoCodeCondition;
