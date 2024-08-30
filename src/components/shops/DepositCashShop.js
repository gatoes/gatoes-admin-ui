import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sentCashToShop } from '../../actions/shops';
//import Error from '../common/Error';
import { Redirect } from 'react-router-dom';
import renderReactSelect from '../FormFields/renderReactSelect';
import { reduxForm, Field, SubmissionError, reset } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import validate from './ValidateCashDeposit';
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class DepositCashShop extends Component {
  constructor(props){
    super(props);
    this.state= {
      shopId: props.shopId,
      index: props.index,
      depositDate: ''
    }
    this.handleChangeStart = this.handleChangeStart.bind(this);
  }

  handleChangeStart(sdate){
    this.setState({
      depositDate: sdate
    });
    this.props.change("depositDate", sdate); 
  }

  componentDidMount(){
    this.props.change('shopId', this.state.shopId);
  }

  submitMenuForm(values){
    return sentCashToShop(values)
    .then((result) => {
      toast.success('Cash has been deposit to restaurant successfully.', {
        position: toast.POSITION.TOP_RIGHT
      }); 
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
               <div className="col-lg-6">
                <Field
                  name="amount"
                  component={renderField}
                  type="text"
                  className="form-control"
                  label="Amount"
                />
              </div>
              <div className="col-lg-6">
                <Field
                  name="referenceNumber"
                  component={renderField}
                  type="text"
                  className="form-control"
                  label="Reference Number"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <DatePicker
                    name="depositDate"
                    selected={this.state.depositDate}
                    selectsStart
                    startDate={this.state.depositDate}
                    endDate={this.state.depositDate}
                    onChange={this.handleChangeStart}
                    dateFormat= "yyyy-MM-dd"
                    placeholderText="Choose deposit date"
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
      </form>
  	);
  }
}

DepositCashShop = reduxForm({
  form: 'DepositCashShopValue',
  destroyOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(DepositCashShop)

export default DepositCashShop;