import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reduxForm, Field, SubmissionError, reset } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import renderReactSelect from '../FormFields/renderReactSelect';
import {toast} from 'react-toastify';
import validate from './ValidateTaxes';
import { addTax, taxCategoryListing } from '../../actions/taxes';
import {TAX_TYPE} from "../../constants";

class AddTaxes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catListing: []
    }
  }

  componentDidMount(){
    taxCategoryListing().then((response) => {
      this.setState({
        catListing: response.data.data && response.data.data.rows ? response.data.data.rows : []
      });
    })
  }

  submitMenuForm(values){
    console.log('values', values);
    return addTax(values)
    .then((result) => {
      toast.success('Taxes added Successfully.');
      this.props.reset();
      this.props.history.push('/dashboard/managetaxes');
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }


  render() {
    const {handleSubmit, pristine, submitting} = this.props;
    const {catListing} = this.state;

    return (
      <div className="container ani-ui-block shop-manager">
        <div className="row menu-top-block">
          <div className="col-sm-12 tl-block align-self-center">
            <h4 className="heading">Add Tax</h4>
          </div>

          <form onSubmit={handleSubmit(this.submitMenuForm.bind(this))}>
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="add-left-block">
                  
                  <div className="fields-ui-block">
                    <div className="basic-details">
                      <div className="heading">
                        <h4>Detail</h4>
                      </div>
                      <div className="form-block">
                        <div className="row">
                          <div className="col-lg-6">
                            <Field
                              name="taxName"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Tax title"
                              placeholder="Eg. GST"
                            />
                          </div>
                          <div className="col-lg-6">
                            <Field
                              name="taxAmount"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Amount"
                              placeholder="Eg. 2.5"
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-6 selectbox-block">
                            <Field
                              label="Tax Type"
                              name='taxType'
                              options={TAX_TYPE}
                              component={renderReactSelect}
                              placeholder="Select Tax Type"
                              multi={false}
                              className="select-ui"
                              parentDivClass="form-group w-100"
                            />
                          </div>
                          <div className="col-lg-6 selectbox-block">
                            <Field
                              label="Tax Category"
                              name='taxCategory'
                              options={catListing}
                              component={renderReactSelect}
                              placeholder="Select Tax Type"
                              optionLabel='tax_category'
                              optionValue='id'
                              multi={false}
                              className="select-ui"
                              parentDivClass="form-group w-100"
                            />
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                  
                  <div className="row save-button-block">
                    <div className="col-sm-12 align-self-center">
                      <button type="submit" disabled={submitting} className="btn green-btn">Submit details{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
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

AddTaxes = reduxForm({
  form: 'AddTaxesValue',
  destroyOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(AddTaxes)

export default AddTaxes;
