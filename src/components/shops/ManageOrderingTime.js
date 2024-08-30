import React, { Component } from 'react';
import { reduxForm, Field, reset, FieldArray, formValueSelector } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import renderReactSelect from '../FormFields/renderReactSelect';
import RenderOrderingTime from './RenderOrderingTime';
import validate from './validateOrderingTime';
import { connect } from 'react-redux';
import { addShopTiming, getShopTimingById } from '../../actions/shops';
import {toast} from 'react-toastify';

class ManageOrderingTime extends Component {
  constructor(props){
    super(props);
    this.state = {
      is_submitting: false,
      shopId : props.shopId
    }
    
  }

  componentDidMount(){
    console.log('shop', this.state.shopId);
    this.props.change('shopId', this.state.shopId);
  }

  submitShopTimeForm(values){
    console.log('values', values);
    return addShopTiming(values)
    .then((result) => {
      toast.success('Restaurant timing updated Successfully.');
      this.props.setMenuStatus('taxes');
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }

  
  componentWillMount(){
    getShopTimingById({shopId : this.state.shopId}).then((response) => {
      if(response.data.data.timing != null){
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
          <FieldArray name="timing" component={RenderOrderingTime} />

          <button type="button" className="btn btn2" onClick={this.props.handleSubmit(this.submitShopTimeForm.bind(this))}>Save
          </button> 
        </form>
        </div>
      </div>
  	);
  }
}

ManageOrderingTime = reduxForm({
  form: 'ManageOrderingTimeForm',
  destroyOnUnmount: false,
  validate
})(ManageOrderingTime)

// const mapStatesToProps = (state, ownProps) => {
//   const initialValues = ownProps.data;
//   return {initialValues};
// }

export default ManageOrderingTime;