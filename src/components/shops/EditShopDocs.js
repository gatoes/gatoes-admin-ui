// import React, { Component, Suspense } from 'react';
// import { toast } from 'react-toastify';
// import { connect } from 'react-redux';
// import { reduxForm, Field, SubmissionError, reset, FieldArray, formValueSelector } from 'redux-form';
// import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
// import renderDatePicker from '../FormFields/renderDatePicker';
// import renderField from '../FormFields/renderField';
// import validate from './ValidateDocs';
// import { addShopDocs, updateShopDocsSuccess } from '../../actions/shops';
// import renderReactSelect from '../FormFields/renderReactSelect';

// class EditShopDocs extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       docsDetail: props.docsDetail,
//       itemIndex: props.itemIndex
//     }
//   }

//   componentWillMount(){
//     this.props.initialize(this.state.docsDetail);
//   }
  
//   submitMenuForm(values){
//     console.log('formssssss', values);
//     return addShopDocs(values)
//     .then((result) => {
//       this.props.updateShopDocsSuccess(result.data.data, this.state.itemIndex);
//       toast.success('Docs updated Successfully.');
//       this.props.reset();
//       this.props.updateDocsSlide(result);
//     }).catch(error => {
//       //throw new SubmissionError(error.response.data.error);
//     })
    
//   }

//   render() {
//     const {handleSubmit, pristine, submitting} = this.props;
//     return (
//       <form onSubmit={handleSubmit(this.submitMenuForm.bind(this))}>
//         <div className="form-block">
//           <div className="row">
//             <div className="col-lg-12">
//               <Field
//                 name="docs_type"
//                 component={renderField}
//                 type="text"
//                 className="form-control"
//                 label="Name"
//                 placeholder=""
//               />
//             </div>

//             <div className="col-lg-12">
//               <Field
//                name="expiry_date"
//                component={renderDatePicker}
//                label="Expiry Date"
//                className="form-control"
//                innerParentDivClass="col-sm-8 col-lg-8"
//                labelClass="control-label col-sm-4 col-lg-4"
//              />
//            </div>
            
//             <div className="form-group ri-block col-lg-12">
//               <label></label>
//               <ul className="cs-check-box">
//                 <li>
//                   <div className="os-check-box">
//                     <Field
//                       name="is_suspended"
//                       id="is_suspended"
//                       component="input"
//                       type="checkbox"
//                       dateFormat="Y-m-d"
//                     />
//                     <label for="is_suspended">Suspend Restaurant aftr docs expiry date</label>
//                   </div>
//                 </li>
//               </ul>
//             </div>
            
//           </div>
          
//         </div>
//         <div className="row save-button-block">
//           <div className="col-sm-12 align-self-center">
//             <button type="submit" disabled={submitting} className="btn green-btn"><i className="material-icons">check_circle</i>SUBMIT DETAILS{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
//           </div>
//         </div>
//       </form>
//     );
//   }
// }

// EditShopDocs = reduxForm({
//   form: 'EditShopDocsValue',
//   destroyOnUnmount: true,
//   enableReinitialize: true,
//   keepDirtyOnReinitialize: true,
//   validate
// })(EditShopDocs)

// const mapDispatchToProps = (dispatch) => {
//   return {
//     updateShopDocsSuccess: (payload, index) => {
//       dispatch(updateShopDocsSuccess(payload, index));
//     },
//   };
// }

// export default connect(null, mapDispatchToProps)(EditShopDocs);

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
import renderFileInput from '../FormFields/renderFileInput';

// Validation regex functions
const validateAadhar = value => value && !/^[2-9]{1}[0-9]{11}$/.test(value)
  ? 'Invalid Aadhar Number. It should have 12 digits and should not start with 0 or 1.'
  : undefined;

const validatePAN = value => value && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)
  ? 'Invalid PAN Number. It should be 10 characters long (first five letters, next four digits, last one letter).'
  : undefined;

const validateGST = value => value && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{1}$/.test(value)
  ? 'Invalid GST Number. It should be 15 characters long with the correct format.'
  : undefined;

const validateFSSAI = value => value && !/^[0-9]{5}[A-Z]{2}[0-9]{5}[A-Z]{2}$/.test(value)
  ? 'Invalid FSSAI Number. It should be 14 characters long with the correct format.'
  : undefined;

const validateURL = value => value && !/^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}(\/[^\s]*)?$/.test(value)
  ? 'Invalid URL. Please provide a valid link with a domain (e.g., .com, .org, etc.).'
  : undefined;

// Simple required validation
const required = value => (value ? undefined : 'This field is required');

// Custom validation to ensure either a link or a file is provided
const validateLinkOrFile = (values) => {
  const errors = {};

  if (!values.link_to_file && (!values.files || values.files.length === 0)) {
    errors.link_to_file = 'You must provide either a link or upload a file.';
  }

  return errors;
};

class EditShopDocs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      docsDetail: props.docsDetail,
      itemIndex: props.itemIndex,
    };
  }

  // Arrow function for submitMenuForm to automatically bind `this`
  submitMenuForm = (values) => {
    console.log('formssssss', values);
    return addShopDocs(values)
      .then((result) => {
        this.props.updateShopDocsSuccess(result.data.data, this.state.itemIndex);
        toast.success('Docs updated Successfully.');
        this.props.reset();
        this.props.updateDocsSlide(result);
      })
      .catch((error) => {
        // Handle error here
      });
  };

  renderFields() {
    const { docsDetail } = this.props;

    switch (docsDetail.docs_type) {
      case 'Aadhar Card':
        return (
          <>
            <div className="col-lg-12">
              <Field
                name="aadhar_number"
                component={renderField}
                type="text"
                className="form-control"
                label="Aadhar Number"
                validate={[required, validateAadhar]}
              />
            </div>
            <div className="col-lg-12">
              <Field
                name="link_to_file"
                component={renderField}
                type="text"
                className="form-control"
                label="Link to File"
                validate={[validateURL]}
              />
            </div>
            <div className="col-lg-12">
              <Field
                name="files"
                component={renderFileInput}
                label="Upload Files"
              />
            </div>
          </>
        );

      case 'PAN Card':
        return (
          <>
            <div className="col-lg-12">
              <Field
                name="pan_number"
                component={renderField}
                type="text"
                className="form-control"
                label="PAN Number"
                validate={[required, validatePAN]}
              />
            </div>
            <div className="col-lg-12">
              <Field
                name="link_to_file"
                component={renderField}
                type="text"
                className="form-control"
                label="Link to File"
                validate={[validateURL]}
              />
            </div>
            <div className="col-lg-12">
              <Field
                name="files"
                component={renderFileInput}
                label="Upload Files"
              />
            </div>
          </>
        );

      case 'GST':
        return (
          <>
            <div className="col-lg-12">
              <Field
                name="gst_number"
                component={renderField}
                type="text"
                className="form-control"
                label="GST Number"
                validate={[required, validateGST]}
              />
            </div>
            <div className="col-lg-12">
              <Field
                name="tax_bracket"
                component={renderReactSelect}
                label="Tax Bracket"
                validate={required}
                options={[
                  { value: 'GST - 5%(CGST - 5% ,SGST- 5%)', label: 'GST - 5%(CGST - 5% ,SGST- 5%)' },
                  { value: 'GST-12%(CGST - 6% ,SGST- 6%)', label: 'GST-12%(CGST - 6% ,SGST- 6%)' },
                  { value: 'GST-18%(CGST - 9% ,SGST- 9%)', label: 'GST-18%(CGST - 9% ,SGST- 9%)' },
                  { value: 'GST-28%(CGST - 14% ,SGST- 14%)', label: 'GST-28%(CGST - 14% ,SGST- 14%)' },
                ]}
                placeholder="Select Tax Bracket"
              />
            </div>
            <div className="col-lg-12">
              <Field
                name="link_to_file"
                component={renderField}
                type="text"
                className="form-control"
                label="Link to File"
                validate={[validateURL]}
              />
            </div>
            <div className="col-lg-12">
              <Field
                name="files"
                component={renderFileInput}
                label="Upload Files"
              />
            </div>
          </>
        );

      case 'FSSAI':
        return (
          <>
            <div className="col-lg-12">
              <Field
                name="fssai_number"
                component={renderField}
                type="text"
                className="form-control"
                label="FSSAI Number"
                validate={[required, validateFSSAI]}
              />
            </div>
            <div className="col-lg-12">
              <Field
                name="expiry_date"
                component={renderDatePicker}
                label="Expiry Date"
                className="form-control"
                validate={required}
              />
            </div>
            <div className="col-lg-12">
              <Field
                name="link_to_file"
                component={renderField}
                type="text"
                className="form-control"
                label="Link to File"
                validate={[validateURL]}
              />
            </div>
            <div className="col-lg-12">
              <Field
                name="files"
                component={renderFileInput}
                label="Upload Files"
              />
            </div>
          </>
        );

      case 'Upload Menu':
        return (
          <>
            <div className="col-lg-12">
              <Field
                name="links_to_menu"
                component={renderField}
                type="text"
                className="form-control"
                label="Links to Menu"
                validate={[validateURL]}
              />
            </div>
            <div className="col-lg-12">
              <Field
                name="files"
                component={renderFileInput}
                label="Upload Files"
              />
            </div>
          </>
        );

      default:
        return (
          <div className="col-lg-12">
            <Field
              name="docs_type"
              component={renderField}
              type="text"
              className="form-control"
              label="Name"
              placeholder=""
              validate={required}
            />
          </div>
        );
    }
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.submitMenuForm)}>
        <div className="form-block">
          <div className="row">
            {this.renderFields()}
          </div>
        </div>
        <div className="row save-button-block">
          <div className="col-sm-12 align-self-center">
            <button
              type="submit"
              disabled={submitting}
              className="btn green-btn"
            >
              <i className="material-icons">check_circle</i> SUBMIT DETAILS
              {submitting && <i className="fa fa-spinner fa-spin"></i>}
            </button>
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
  validate: validateLinkOrFile, // Apply custom validation
})(EditShopDocs);

const mapDispatchToProps = (dispatch) => {
  return {
    updateShopDocsSuccess: (payload, index) => {
      dispatch(updateShopDocsSuccess(payload, index));
    },
  };
};

export default connect(null, mapDispatchToProps)(EditShopDocs);
