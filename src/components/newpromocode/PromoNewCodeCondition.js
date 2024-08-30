import React, { Component } from 'react';
import { reduxForm, Field, SubmissionError, reset, FieldArray, formValueSelector } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import renderReactSelect from '../FormFields/renderReactSelect';
import { businessZoneListing } from '../../actions/regions';
import RenderNewRestaurantCategoryOption from './RenderNewRestaurantCategoryOption';
import RenderCondition from './RenderCondition';
import { connect } from 'react-redux';

class PromoNewCodeCondition extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    const { fields,updateItem } = this.props;
    console.log(this.props.conditionpromo,"CondtionRendering")

    // console.log(fields,"fields1")
    return (    
      <>
     
          <FieldArray name="conditionpromo" component={RenderCondition} formProps={this.props.formProps}/>
        
          
     
      </>
    );
  }
}

const mapStatesToProps = (state, ownProps) => {
  return {
    restcategory:
      state.form.AddNewPromoCodeValue &&
      state.form.AddNewPromoCodeValue.values &&
      state.form.AddNewPromoCodeValue.values.restcategory,
    conditionpromo: state.form.AddNewPromoCodeValue && state.form.AddNewPromoCodeValue.values && state.form.AddNewPromoCodeValue.values.conditionpromo,
  };
};

export default connect(mapStatesToProps)(PromoNewCodeCondition);

