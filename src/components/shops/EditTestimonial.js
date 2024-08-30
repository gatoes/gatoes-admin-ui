import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reduxForm, Field, SubmissionError, reset } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import renderTextarea from '../FormFields/renderTextarea';
import {toast} from 'react-toastify';
import validate from './ValidateTestimonial';
import { addFeedback, getFeedbackById } from '../../actions/shops';

class EditTestimonial extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    getFeedbackById({id : this.props.match.params.index}).then((response) => {
      this.props.initialize(response.data.data);
    });
  }

  submitMenuForm(values){
    return addFeedback(values)
    .then((result) => {
      toast.success('Testimonial updated Successfully.');
      this.props.reset();
      this.props.history.push('/dashboard/managetestimonial');
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }


  render() {
    const {handleSubmit, pristine, submitting} = this.props;

    return (
      <div className="container ani-ui-block shop-manager">
        <div className="row menu-top-block">
          <div className="col-sm-12 tl-block align-self-center">
            <h4 className="heading">Edit Testimonial</h4>
          </div>

          <form onSubmit={handleSubmit(this.submitMenuForm.bind(this))}>
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="add-left-block">
                  <div className="fields-ui-block">
                    <div className="basic-details">
                      <div className="heading">
                        <h4>Info</h4>
                      </div>
                      <div className="form-block">
                        <div className="row">
                          <div className="col-lg-6">
                            <Field
                              name="shopName"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Restaurant Name"
                            />
                          </div>
                          <div className="col-lg-6">
                            <Field
                              name="ownerName"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Owner Name"
                            />
                          </div>
                          <div className="col-lg-12">
                            <Field
                              name="feedback"
                              component={renderTextarea}
                              type="text"
                              className="form-control"
                              label="Feedback"
                            />
                          </div>
                        </div>

                         


                      </div>
                    </div>
                  </div>
                  
                  <div className="row save-button-block">
                    <div className="col-sm-12 align-self-center">
                      <button type="submit" disabled={submitting} className="btn green-btn"><i className="material-icons">check_circle</i>Save{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
                    </div>
                  </div>
                    
                </div>
              </div>
            </div>

            
          </form>
        </div>
      </div>
    );
  }
}

EditTestimonial = reduxForm({
  form: 'EditTestimonialValue',
  destroyOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(EditTestimonial)

export default EditTestimonial;