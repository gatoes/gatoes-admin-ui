import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCollectCashFromRider } from '../../actions/users';
//import Error from '../common/Error';
import { Redirect } from 'react-router-dom';
import renderReactSelect from '../FormFields/renderReactSelect';
import { reduxForm, Field, SubmissionError, reset } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import validate from './ValidateRiderCash';

class UpdateCollectCashRider extends Component {
  constructor(props){
    super(props);
    this.state= {
      driverId: props.driverId,
      oldAmount: props.amount,
      id: props.id,
      index: props.index
    }
  }

  componentDidMount(){
    this.props.change('driverId', this.state.driverId);
    this.props.change('oldAmount', this.state.oldAmount);
    this.props.change('id', this.state.id);
  }

  submitMenuForm(values){
    const {driverId, index} = this.state;
    return updateCollectCashFromRider(values)
    .then((result) => {
      this.props.updateUserData();
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }

	render() {
    const {handleSubmit, pristine, submitting } = this.props;

    console.log(this.state.driverId, "====", this.state.oldAmount);

    return ( 
       <form onSubmit={handleSubmit(this.submitMenuForm.bind(this))}>
        <div className="modal-body">
          <div className="popup-content-block">
            <div className="row">
              
              <div className="col-lg-12">
                <Field
                  name="newAmount"
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

UpdateCollectCashRider = reduxForm({
  form: 'CollectCashRiderValue',
  destroyOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(UpdateCollectCashRider)

export default UpdateCollectCashRider;