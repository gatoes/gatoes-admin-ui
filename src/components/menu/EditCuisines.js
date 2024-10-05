import React, { Component, Suspense } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError, reset, FieldArray, formValueSelector } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import validate from './ValidateCuisines';
import { addCuisines, updateCuisinesSuccess } from '../../actions/shops';
import ShopCategoryImage from '../shops/ShopCategoryImage';
class EditCuisines extends Component {
  constructor(props){
    super(props);
    this.state = {
      detail: props.detail,
      itemIndex: props.itemIndex,
      itemImageUrl:null
    }
    this.getImage = this.getImage.bind(this);
  }

  getImage(imageId){
    this.props.change('image', imageId);
  }

  submitMenuForm(values){
    const {itemIndex} = this.state;
    console.log("values in frontend",values)
    const payload = {
      cuisinesName: values.cuisinesName,
      id: values.id
    }
    return addCuisines(payload)
    .then((result) => {
      this.props.updateCuisinesSuccess(result.data.data, itemIndex);
      toast.success('Cuisines updated Successfully.');
      this.props.reset();
      this.props.updateCuisineSlide(result.data.data);
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }

  render() {
    const {handleSubmit, pristine, submitting} = this.props;
    return (
      <form onSubmit={handleSubmit(this.submitMenuForm.bind(this))}>
        <div className="form-block">
          <div className="row">
            <div className="col-lg-12">
              <Field
                name="cuisinesName"
                component={renderField}
                type="text"
                className="form-control"
                label="Name"
                placeholder=""
              />
            </div>
          </div>
         </div> 
        <div className="row save-button-block">
          <div className="col-sm-12 align-self-center">
            <button type="submit" disabled={submitting} className="btn green-btn"><i className="material-icons">check_circle</i>Update{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
            
          </div>
        </div>
      </form>
    );
  }
}

EditCuisines = reduxForm({
  form: 'EditCuisinesValue',
  destroyOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(EditCuisines)

const mapStatesToProps = (state, ownProps) => {
  console.log('aaaa',ownProps);
  const initialValues = ownProps.detail;
  const id = ownProps.detail ? ownProps.detail.id : null;

  return {initialValues, id};
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCuisinesSuccess: (payload, index) => {
      dispatch(updateCuisinesSuccess(payload, index));
    },
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(EditCuisines);