import React, { Component } from 'react';
import { reduxForm, Field, SubmissionError, reset, FieldArray, formValueSelector } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import {toast} from 'react-toastify';
import renderReactSelect from '../FormFields/renderReactSelect';
import validate from './ValidatePromoCode';
import { savePromoCode } from '../../actions/promocodes';
import PromoCodeInfo from './PromoCodeInfo';
import PromoCodeCondition from './PromoCodeCondition';
import PromoCodeAction from './PromoCodeAction';

class AddPromoCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_submitting: false,
      status: props.status,
      isAction: true
    }
    this.updateDateInfo = this.updateDateInfo.bind(this);
    this.isActionUpdate = this.isActionUpdate.bind(this);
  }

  componentDidMount(){
    this.props.change('days_type', '0'); 
    this.props.change('isMerchantPromo', '0');
  }

  updateDateInfo(datename, date){
    this.props.change(datename, date); 
  }

  isActionUpdate(type){
    this.setState({
      isAction: type == 4 ? false : true
    })
  }

  submitMenuForm(values){
    console.log('form', values);
    return savePromoCode(values).then((result) => {
      toast.success('Promo code added successfully.');
      this.props.reset();
      this.props.history.push('/dashboard/promocodes');
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }

  render() {
    const {handleSubmit, pristine, submitting} = this.props;
    const {isAction} = this.state;
    return (
      <div className="container ani-ui-block">
        <div className="row menu-top-block">
          <div className="col-sm-12 tl-block align-self-center">
            <h4 className="heading">Add Promocode</h4>
          </div>
        </div>
        <form onSubmit={handleSubmit(this.submitMenuForm.bind(this))}>
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="add-left-block">
                <PromoCodeInfo updateDateInfo={this.updateDateInfo} isActionUpdate={this.isActionUpdate} />
                <PromoCodeCondition />
                {
                  isAction == true
                  ?
                  <PromoCodeAction />
                  :
                  null
                }
                

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
    );
  }
}

AddPromoCode = reduxForm({
  form: 'AddPromoCodeValue',
  destroyOnUnmount: false,
  enableReinitialize: false,
  keepDirtyOnReinitialize: false,
  validate
})(AddPromoCode)

export default AddPromoCode;
