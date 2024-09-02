// import React, { Component, Suspense } from 'react';
// import { toast } from 'react-toastify';
// import { connect } from 'react-redux';
// import { reduxForm, Field, SubmissionError, reset, FieldArray, formValueSelector } from 'redux-form';
// import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
// import renderDatePicker from '../FormFields/renderDatePicker';
// import renderField from '../FormFields/renderField';
// import validate from './ValidateDocs';
// import { addDriverDocs, addDriverDocsSuccess } from '../../actions/deliveryagent';
// import renderReactSelect from '../FormFields/renderReactSelect';
// //import DatePicker from "react-datepicker";
// //import "react-datepicker/dist/react-datepicker.css";

// class AddRiderDocs extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       driver_id: props.driver_id
//     }
//   }

//   componentDidMount(){
//     this.props.change('driver_id', this.state.driver_id);
//   }
  
//   submitMenuForm(values){
//     //console.log('formssssss', values);
//     return addDriverDocs(values)
//     .then((result) => {
//       this.props.addDriverDocsSuccess(result.data.data);
//       toast.success('Docs added Successfully.');
//       this.props.reset();
//       this.props.updateDocs(result);
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
//                innerParentDivClass="expirydate"
//                labelClass="control-label"
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
//                     <label for="is_suspended">Send notification after docs expiry date</label>
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

// AddRiderDocs = reduxForm({
//   form: 'AddRiderDocsValue',
//   destroyOnUnmount: true,
//   enableReinitialize: true,
//   keepDirtyOnReinitialize: true,
//   validate
// })(AddRiderDocs)

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addDriverDocsSuccess: (payload) => {
//       dispatch(addDriverDocsSuccess(payload));
//     },
//   };
// }

// export default connect(null, mapDispatchToProps)(AddRiderDocs);


import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import renderDatePicker from '../FormFields/renderDatePicker';
import renderField from '../FormFields/renderField';
import validate from './ValidateDocs';
import { addDriverDocs, addDriverDocsSuccess } from '../../actions/deliveryagent';

class AddRiderDocs extends Component {
  constructor(props){
    super(props);
    this.state = {
      driver_id: props.driver_id
    }
  }

  componentDidMount(){
    this.props.change('driver_id', this.state.driver_id);
  }
  
  submitMenuForm(values){
    return addDriverDocs(values)
      .then((result) => {
        this.props.addDriverDocsSuccess(result.data.data);
        toast.success('Docs added Successfully.');
        this.props.reset();
        this.props.updateDocs(result);

        // Reload the page to refresh everything
        window.location.reload();
      }).catch(error => {
        // Handle error here
      });
  }

  render() {
    const { handleSubmit, submitting } = this.props;
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
                innerParentDivClass="expirydate"
                labelClass="control-label"
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
                    <label htmlFor="is_suspended">Send notification after docs expiry date</label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row save-button-block">
          <div className="col-sm-12 align-self-center">
            <button type="submit" disabled={submitting} className="btn green-btn">
              <i className="material-icons">check_circle</i> SUBMIT DETAILS
              {submitting && <i className="fa fa-spinner fa-spin"></i>}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

AddRiderDocs = reduxForm({
  form: 'AddRiderDocsValue',
  destroyOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(AddRiderDocs);

const mapDispatchToProps = (dispatch) => {
  return {
    addDriverDocsSuccess: (payload) => {
      dispatch(addDriverDocsSuccess(payload));
    },
  };
}

export default connect(null, mapDispatchToProps)(AddRiderDocs);
