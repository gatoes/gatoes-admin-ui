import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reduxForm, Field, SubmissionError, reset } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import renderReactSelect from '../FormFields/renderReactSelect';
import { addSuperMerchant, getShopListing, getSuperMerchantById } from '../../actions/shops';
import {toast} from 'react-toastify';
import validate from './ValidateSuperShop';

class EditSuperMerchant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shops : []
    }
  }

  componentDidMount(){
    getShopListing({'is_all': true}).then((response) => {
      this.setState({
        shops: response.data.data
      })
    });
  }

  componentWillMount(){
    getSuperMerchantById({id : this.props.match.params.index}).then((response) => {
      this.props.initialize(response.data.data);
    });
  }

  submitMenuForm(values){
    return addSuperMerchant(values)
    .then((result) => {
      toast.success('Merchant updated Successfully.');
      this.props.reset();
      this.props.history.push('/dashboard/managesupermerchant');
    }).catch(error => {
      throw new SubmissionError(error.response.data.error);
    })
  }

  render() {
    const {handleSubmit, pristine, submitting, cuisineList} = this.props;
    const {shops} = this.state;
    return (
      <div className="container ani-ui-block shop-manager">
        <div className="row menu-top-block">
          <div className="col-sm-12 tl-block align-self-center">
            <h4 className="heading">Edit Super Merchant</h4>
          </div>
          <form onSubmit={handleSubmit(this.submitMenuForm.bind(this))}>
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="add-left-block">

                  <div className="fields-ui-block">
                    <div className="basic-details">
                      <div className="heading">
                        <h4>Super Merchant Detail</h4>
                      </div>
                      <div className="form-block">
                        <div className="row">
                          <div className="col-lg-6">
                            <Field
                              name="name"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Owner Name"
                              placeholder=""
                            />
                          </div>
                          <div className="col-lg-6">
                            <Field
                              name="email"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Email"
                              placeholder="Email for login"
                            />
                          </div>
                        </div>
                        
                        <div className="row">
                          <div className="col-lg-6">
                            <Field
                              name="contactNumber"
                              component={renderField}
                              type="number"
                              className="form-control"
                              label="Contact Number"
                              placeholder=""
                            />
                          </div>
                          <div className="col-lg-6">
                            <Field
                              name="firstAlertnateContactNumber"
                              component={renderField}
                              type="number"
                              className="form-control"
                              label="Alternate Contact Number"
                              placeholder="Alternate Contact Number"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12 selectbox-block multi-region-selection">
                            <Field
                              label="Choose Restaurant"
                              name='shops'
                              optionLabel='shopName'
                              optionValue='id'
                              options={shops}
                              component={renderReactSelect}
                              placeholder="Select Restaurants"
                              multi={true}
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
                      <button type="submit" disabled={submitting} className="btn green-btn">Save{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
                    
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

EditSuperMerchant = reduxForm({
  form: 'EditSuperMerchantValue',
  destroyOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(EditSuperMerchant)


export default EditSuperMerchant;
