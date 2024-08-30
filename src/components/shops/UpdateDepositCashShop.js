import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSentCashToShop } from '../../actions/shops';
//import Error from '../common/Error';
import { Redirect } from 'react-router-dom';
import renderReactSelect from '../FormFields/renderReactSelect';
import { reduxForm, Field, SubmissionError, reset } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import validate from './ValidateCash';
import { toast } from 'react-toastify';

class UpdateDepositCashShop extends Component {
  constructor(props){
    super(props);
    this.state= {
      shopId: props.shopId,
      index: props.index,
      oldAmount: props.oldAmount,
      id: props.id
    }
  }

  componentDidMount(){
    this.props.change('shopId', this.state.shopId);
    this.props.change('id', this.state.id);
    this.props.change('oldAmount', this.state.oldAmount);
  }

  submitMenuForm(values){
    return updateSentCashToShop(values)
    .then((result) => {
      
      this.props.removePanel();
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
                  name="newAmount"
                  component={renderField}
                  type="text"
                  className="form-control"
                  label="Amount"
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

UpdateDepositCashShop = reduxForm({
  form: 'DepositCashShopValue',
  destroyOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(UpdateDepositCashShop)

export default UpdateDepositCashShop;