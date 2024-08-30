import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, reset, FieldArray, formValueSelector } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import renderReactSelect from '../FormFields/renderReactSelect';
import validate from './ValidateRejectItem';
import { getItemRejectedReasonList, updateRequestedItemStatus } from '../../actions/menus';
import { updateRequiredCounterSuccess} from '../../actions/settings';
//import { connect } from 'react-redux';

class RejectShopItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      is_submitting: false,
      itemId: props.itemId,
      itemIndex: props.itemIndex,
      reasonList: [],
      showDetail: false
    }
    this.handleReason = this.handleReason.bind(this);
  }

  handleReason(e){
    let status = false;
    if(e.id < 0){
      status = true;
    } else {
      status=false;
    }
    this.setState({
      showDetail: status
    })

  }

  componentDidMount(){
    var other = {id:-1, reason :'Other'};
    getItemRejectedReasonList().then((response) => {
      this.setState({
        reasonList : [...response.data, other]
      });
    });
    console.log('aaa', this.state.reasonList);
    this.props.change('itemId', this.state.itemId);
    this.props.change('isRejected', true);
  }

  submitSettingForm(values){
    return updateRequestedItemStatus(values).then((result) => {
      this.props.updateItemList(this.state.itemIndex);
      this.props.updateRequiredCounterSuccess('requesteditems');
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }

	render() {
      const {handleSubmit, pristine, submitting } = this.props;
      const {reasonList, showDetail} = this.state;
      console.log(' ', reasonList);
    	return ( 
        <div className="row popup-content-block">
          <form onSubmit={handleSubmit(this.submitSettingForm.bind(this))}>
            <div className="col-sm-12 selectbox-block">
              <Field
                label="Reason"
                name='reasonid'
                optionLabel='reason'
                optionValue='id'
                options={reasonList}
                component={renderReactSelect}
                placeholder="Select Reason"
                multi={false}
                parentDivClass="form-group w-100"
                parentCallback={ this.handleReason }
              />
            </div>
            {
              showDetail == true
              ?
              <div className="col-sm-12">
                <Field
                  name="comment"
                  component={renderField}
                  type="text"
                  className="form-control"
                  label="Comment"
                  placeholder=""
                />
              </div>
              :
              null
            }
            <div className="row save-button-block">
              <div className="col-sm-12 align-self-center">
                <button type="submit" disabled={submitting} className="btn green-btn"><i className="material-icons">check_circle</i>SUBMIT DETAILS{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
                
              </div>
            </div> 
          </form>
        </div>
        
    	);
    }
}

RejectShopItem = reduxForm({
  form: 'RejectShopItemForm',
  destroyOnUnmount: false,
  validate
})(RejectShopItem)

export default connect(null, {updateRequiredCounterSuccess})(RejectShopItem);