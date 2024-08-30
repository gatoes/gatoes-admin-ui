import React, { Component, Suspense } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError, reset, FieldArray, formValueSelector } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import validate from './ValidateCuisines';
import { addCuisines, addCuisinesSuccess } from '../../actions/shops';

class AddCuisines extends Component {
  constructor(props){
    super(props);
  }
  
  submitMenuForm(values){
    return addCuisines(values)
    .then((result) => {
      this.props.addCuisinesSuccess(result.data.data);
      toast.success('Cuisines added Successfully.');
      this.props.reset();
      this.props.updateCuisines(result);
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
            <button type="submit" disabled={submitting} className="btn green-btn"><i className="material-icons">check_circle</i>Save{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
          </div>
        </div>
      </form>
    );
  }
}

AddCuisines = reduxForm({
  form: 'AddCuisinesValue',
  destroyOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(AddCuisines)

const mapDispatchToProps = (dispatch) => {
  return {
    addCuisinesSuccess: (payload) => {
      dispatch(addCuisinesSuccess(payload));
    },
  };
}

export default connect(null, mapDispatchToProps)(AddCuisines);