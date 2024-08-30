import React, { Component } from 'react';
import { reduxForm, Field, reset, FieldArray, formValueSelector } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import renderReactSelect from '../FormFields/renderReactSelect';
import RenderCategoryTime from './RenderCategoryTime';
import validate from './validateMenuCategory';
import { connect } from 'react-redux';

class AddMenuCategory extends Component {
  constructor(props){
    super(props);
    console.log('aaaa', props);
    this.state = {
      shopId: props.shopId,
      is_submitting: false
    }
  }

  componentWillMount(){
    console.log('asas', this.state.shopId);
    this.props.change('shopId', this.state.shopId);
  }

	render() {
      const {handleSubmit, pristine, submitting } = this.props;
    	return ( 
        <div className="row popup-content-block">
          <form>
            <div className="col-sm-12">
              <Field
                name="categoryName"
                component={renderField}
                type="text"
                className="form-control"
                label="Category Name"
                placeholder="Eg. Breakfast"
              />
            </div>
            <FieldArray name="timing" id={this.props.id} component={RenderCategoryTime} />
          </form>
        </div>
        
    	);
    }
}

AddMenuCategory = reduxForm({
  form: 'AddMenuCategoryForm',
  destroyOnUnmount: false,
  validate
})(AddMenuCategory)

const mapStatesToProps = (state, ownProps) => {
  const initialValues = ownProps.data;
  const id = ownProps.data ? ownProps.data.id : null;

  return {initialValues, id};
}

export default connect(mapStatesToProps)(AddMenuCategory);