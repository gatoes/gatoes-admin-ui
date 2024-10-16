import React, { Component, Suspense } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError, reset, FieldArray, formValueSelector } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import validate from './ValidateCuisines';
import { addCuisines, addCuisinesSuccess } from '../../actions/shops';
import ShopCategoryImage from '../shops/ShopCategoryImage';

class AddCuisines extends Component {
  constructor(props){
    super(props);
    this.state = {
      itemImageUrl:null
    }
    this.getImage = this.getImage.bind(this);
  }


  getImage(imageId){
    this.props.change('image', imageId);
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
              <ShopCategoryImage getImage={this.getImage} />
              <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
 <Field
   name="popular"
   component="input"
   type="checkbox"
   id="popular"
   style={{
     position: 'relative',
     width: '24px',
     height: '24px',
     WebkitAppearance: 'none',
     MozAppearance: 'none',
     appearance: 'none',
     cursor: 'pointer',
     outline: 'none',
     transition: 'background-color 0.2s ease-in-out, border-color 0.2s ease-in-out',
   }}
 />
 <label
   htmlFor="popular"
   style={{
     marginLeft: '10px',
     marginTop: '5px',
   }}
 >
   Popular
 </label>

 {/* Style block for checkbox states */}
 <style>
   {`
   input[type="checkbox"]#popular {
     background-color: #f0f0f0; /* Default background */
     border: 2px solid #ccc; /* Default border */
     border-radius: 5px;
   }

   input[type="checkbox"]#popular:checked {
     background-color: #00c853 !important; /* Green background when checked */
     border-color: #00c853 !important; /* Green border when checked */
   }

   input[type="checkbox"]#popular:checked::after {
     content: '';
     position: absolute;
     top: 3px;
     left: 7px;
     width: 6px;
     height: 12px;
     border: solid white; /* White tick mark */
     border-width: 0 2px 2px 0;
     transform: rotate(45deg);
   }
   `}
 </style>
</div>
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