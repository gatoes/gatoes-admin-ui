import React, { Component } from 'react';
import { connect } from 'react-redux';
import { collectCashFromRider } from '../../actions/users';
//import Error from '../common/Error';
import { Redirect } from 'react-router-dom';
import renderReactSelect from '../FormFields/renderReactSelect';
import { reduxForm, Field, SubmissionError, reset } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import validate from './ValidateCashDeposit';

class CollectCashRider extends Component {
  constructor(props){
    super(props);
    this.state= {
      driverId: props.driverId,
      amount_dues: props.amount_dues,
      index: props.index
    }
  }

  componentDidMount(){
    this.props.change('driverId', this.state.driverId);
    this.props.change('amount_dues', this.state.amount_dues);
  }

  submitMenuForm(values){
    const {driverId, index} = this.state;
    return collectCashFromRider(values)
    .then((result) => {
      this.props.updateUserData(driverId, result.data.data.cash_pending);
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }

	render() {
    const {handleSubmit, pristine, submitting } = this.props;
    return ( 
       <form onSubmit={handleSubmit(this.submitMenuForm.bind(this))}>
        <div className="modal-body">
          <div className="popup-content-block">
            <div className="row">
              
              <div className="col-lg-12">
                <Field
                  name="amount"
                  component={renderField}
                  type="text"
                  className="form-control"
                  label="Amount"
                  placeholder="5"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row save-button-block">
          <Field
            name="amount_dues"
            component={renderField}
            type="hidden"
          />
          <div className="col-sm-12 align-self-center">
            <button type="submit" disabled={submitting} className="btn green-btn">Save{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
          </div>
        </div>
      </form>
  	);
  }
}

CollectCashRider = reduxForm({
  form: 'CollectCashRiderValue',
  destroyOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(CollectCashRider)

export default CollectCashRider;