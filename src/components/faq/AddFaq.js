import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reduxForm, Field, SubmissionError, reset } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import renderTextarea from '../FormFields/renderTextarea';
import {toast} from 'react-toastify';
import validate from './ValidateFaq';
import { addFaq } from '../../actions/users';

class AddFaq extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.props.change('status', false);
  }

  submitMenuForm(values){
    return addFaq(values)
    .then((result) => {
      toast.success('Faq added Successfully.');
      this.props.reset();
      this.props.history.push('/dashboard/managefaq');
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
            <h4 className="heading">Add FAQ</h4>
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
                          <div className="col-lg-12">
                            <Field
                              name="question"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Question"
                            />
                          </div>
                          <div className="col-lg-12">
                            <Field
                              name="answer"
                              component={renderTextarea}
                              type="text"
                              className="form-control"
                              label="Answer"
                            />
                          </div>
                        </div>

                         <div className="form-group ri-block col-lg-12">
                          <label></label>
                          <ul className="cs-check-box">
                            <li>
                              <div className="os-check-box">
                                <Field
                                  name="status"
                                  id="is_suspended"
                                  component="input"
                                  type="checkbox"
                                />
                                <label for="is_suspended">Publish</label>
                              </div>
                            </li>
                          </ul>
                        </div>


                      </div>
                    </div>
                  </div>
                  
                  <div className="row save-button-block">
                    <div className="col-sm-12 align-self-center">
                      <button type="submit" disabled={submitting} className="btn green-btn"><i className="material-icons">check_circle</i>SUBMIT DETAILS{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
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

AddFaq = reduxForm({
  form: 'AddFaqValue',
  destroyOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(AddFaq)

export default AddFaq;