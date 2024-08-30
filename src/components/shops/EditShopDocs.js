import React, { Component, Suspense } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError, reset, FieldArray, formValueSelector } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderDatePicker from '../FormFields/renderDatePicker';
import renderField from '../FormFields/renderField';
import validate from './ValidateDocs';
import { addShopDocs, updateShopDocsSuccess } from '../../actions/shops';
import renderReactSelect from '../FormFields/renderReactSelect';

class EditShopDocs extends Component {
  constructor(props){
    super(props);
    this.state = {
      docsDetail: props.docsDetail,
      itemIndex: props.itemIndex
    }
  }

  componentWillMount(){
    this.props.initialize(this.state.docsDetail);
  }
  
  submitMenuForm(values){
    console.log('formssssss', values);
    return addShopDocs(values)
    .then((result) => {
      this.props.updateShopDocsSuccess(result.data.data, this.state.itemIndex);
      toast.success('Docs updated Successfully.');
      this.props.reset();
      this.props.updateDocsSlide(result);
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
                name="docs_type"
                component={renderField}
                type="text"
                className="form-control"
                label="Name"
                placeholder=""
              />
            </div>

            <div className="col-lg-12">
              <Field
               name="expiry_date"
               component={renderDatePicker}
               label="Expiry Date"
               className="form-control"
               innerParentDivClass="col-sm-8 col-lg-8"
               labelClass="control-label col-sm-4 col-lg-4"
             />
           </div>
            
            <div className="form-group ri-block col-lg-12">
              <label></label>
              <ul className="cs-check-box">
                <li>
                  <div className="os-check-box">
                    <Field
                      name="is_suspended"
                      id="is_suspended"
                      component="input"
                      type="checkbox"
                      dateFormat="Y-m-d"
                    />
                    <label for="is_suspended">Suspend Restaurant aftr docs expiry date</label>
                  </div>
                </li>
              </ul>
            </div>
            
          </div>
          
        </div>
        <div className="row save-button-block">
          <div className="col-sm-12 align-self-center">
            <button type="submit" disabled={submitting} className="btn green-btn"><i className="material-icons">check_circle</i>SUBMIT DETAILS{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
          </div>
        </div>
      </form>
    );
  }
}

EditShopDocs = reduxForm({
  form: 'EditShopDocsValue',
  destroyOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(EditShopDocs)

const mapDispatchToProps = (dispatch) => {
  return {
    updateShopDocsSuccess: (payload, index) => {
      dispatch(updateShopDocsSuccess(payload, index));
    },
  };
}

export default connect(null, mapDispatchToProps)(EditShopDocs);