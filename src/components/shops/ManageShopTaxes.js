import React, { Component } from 'react';
import { reduxForm, Field, reset, FieldArray, formValueSelector } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import renderReactSelect from '../FormFields/renderReactSelect';
import RenderShopTaxes from './RenderShopTaxes';
import validate from './validateOrderingTaxes';
import { connect } from 'react-redux';
import { addshoptaxes, gettshoptaxes } from '../../actions/shops';
import {toast} from 'react-toastify';

class ManageShopTaxes extends Component {
  constructor(props){
    super(props);
    this.state = {
      is_submitting: false,
      shopId : props.shopId
    }
  }

  componentDidMount(){
    this.props.change('shopId', this.state.shopId);
  }

  submitShopTimeForm(values){
    return addshoptaxes(values)
    .then((result) => {
      toast.success('Restaurant taxes updated Successfully.');
      this.props.setMenuStatus('pics');
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }

  
  componentWillMount(){
    gettshoptaxes({shopId : this.state.shopId}).then((response) => {
      if(response.data.data != null){
        this.props.initialize(response.data.data);
        this.props.change('shopId', this.state.shopId);
      }
    });
  }

	render() {
    const {handleSubmit, pristine, submitting } = this.props;
  	return ( 
      <div className="col-sm-12 popup-content-block">
      <div className="fields-ui-block">
        <form>
          <FieldArray name="tax" component={RenderShopTaxes} />

          <button type="button" className="btn btn2" onClick={this.props.handleSubmit(this.submitShopTimeForm.bind(this))}>Save
          </button> 
        </form>
        </div>
      </div>
  	);
  }
}

ManageShopTaxes = reduxForm({
  form: 'ManageShopTaxesForm',
  destroyOnUnmount: false,
  validate
})(ManageShopTaxes)

export default ManageShopTaxes;