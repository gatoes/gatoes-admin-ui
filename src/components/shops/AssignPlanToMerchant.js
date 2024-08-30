import React, { Component } from 'react';
import { connect } from 'react-redux';
import { planListingWithShop, assignPlanToMerchant } from '../../actions/plans';
//import Error from '../common/Error';
import { Redirect } from 'react-router-dom';
import renderReactSelect from '../FormFields/renderReactSelect';
import { reduxForm, Field, SubmissionError, reset } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import validate from './ValidatePlanAssignment';
import { toast } from 'react-toastify';

class AssignPlanToMerchant extends Component {
  constructor(props){
    super(props);
    this.state= {
      shopId: props.shopId,
      regionId: props.regionId,
      index: props.index,
      planListing: []
    }
  }

  componentDidMount(){
    const {shopId, regionId} = this.props;
    planListingWithShop({'zoneId': regionId, 'shopId': shopId }).then((response) => {
      console.log('0000000', response);
      this.setState({
        planListing: response.data.data
      });
    })
  }

  submitForm(values){
    const {shopId} = this.props;
    return assignPlanToMerchant({'planId': values.planId, 'merchantId': shopId })
    .then((result) => {
      this.props.reload();
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }

	render() {
    const {handleSubmit, pristine, submitting } = this.props;
    const {planListing} = this.state;
    return ( 
       <form onSubmit={handleSubmit(this.submitForm.bind(this))}>
        <div className="modal-body">
          <div className="popup-content-block">
            <div className="row">
               <div className="col-lg-12 selectbox-block">
                  <Field
                    label="Plan"
                    name='planId'
                    optionLabel='name'
                    optionValue='planId'
                    options={planListing}
                    component={renderReactSelect}
                    placeholder="Select Plan"
                    multi={false}
                    className="select-ui"
                    parentDivClass="form-group w-100"
                  />
                </div>
            </div>

            

          </div>
        </div>
        <div className="row save-button-block">
          <div className="col-sm-12 align-self-center">
            <button type="submit" disabled={submitting} className="btn green-btn">Save{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
          </div>
        </div>
      </form>
  	);
  }
}

AssignPlanToMerchant = reduxForm({
  form: 'AssignPlanToMerchantValue',
  destroyOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(AssignPlanToMerchant)

export default AssignPlanToMerchant;