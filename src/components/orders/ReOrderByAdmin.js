import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { orderDetailById, reorderByAdmin } from '../../actions/orders';
//import ReAssignRiderSlide from './ReAssignRiderSlide';
import {REORDER_REASON, REORDER_TYPE, currencyFormat, WHO_BEAR_COST, REORDER_TYPE_FULL} from '../../constants';
import { reduxForm, Field, SubmissionError, reset } from 'redux-form';
import renderReactSelect from '../FormFields/renderReactSelect';
import {toast} from 'react-toastify';
import CheckboxGroup2 from '../FormFields/CheckboxGroup2';
import validate from './ValidateReorder';

class ReOrderByAdmin extends Component {
  constructor(props){
    super(props);
    this.state = {
      shopId: props.shopId,
      orderId: props.orderId,
      orderDetail: [],
      orderStatus: props.orderStatus,
      showItems: 1
    };
    this.changeReorderType = this.changeReorderType.bind(this);
  }

  changeReorderType(e){
    if(e != 0){
      this.setState({
        showItems: 1
      })
    } else {
      this.setState({
        showItems: 0
      })
    }
  }
 
  componentDidMount(){
    orderDetailById({orderId: this.state.orderId}).then((response) => {
      this.setState({
        orderDetail: response.data.data.items
      })
    })
  }

  componentWillMount(){
    this.props.change('orderId', this.state.orderId);
  }

  submitReassignForm(values){
    console.log('values', values);
    return reorderByAdmin(values)
    .then((result) => {
      toast.success('Order has been placed Successfully.');
      this.props.reset();
      this.props.updateSlide(values);
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }

  render() {
    const {orderDetail, orderId, showItems, orderStatus} = this.state;
    const {handleSubmit, pristine, submitting} = this.props;

    var itemsChk = [];
    orderDetail && orderDetail.length > 0 && orderDetail.map((obj, index) => (
      itemsChk.push({
        'id': obj.id,
        'title' : obj.quantity + 'x' + obj.itemName + '.' + currencyFormat(obj.finalPrice)
      })
    ))


    return (
      <form onSubmit={handleSubmit(this.submitReassignForm.bind(this))}>
        <div className="fields-ui-block">
          <div className="basic-details">
            
            <div className="form-block">
              <div className="row">
                <div className="col-lg-4 selectbox-block">
                  <Field
                    label="Reorder Reason"
                    name='reorder_reason'
                    options={REORDER_REASON}
                    component={renderReactSelect}
                    placeholder="Select Reason"
                    multi={false}
                    parentDivClass="form-group w-100"
                  />
                </div>
                <div className="col-lg-4 selectbox-block">
                  {
                    orderStatus == 4
                    ?
                    <Field
                      label="Reorder Type"
                      name='reorder_type'
                      options={REORDER_TYPE}
                      component={renderReactSelect}
                      placeholder="Select Type"
                      multi={false}
                      parentDivClass="form-group w-100"
                      onChange={this.changeReorderType}
                    />
                    :
                    <Field
                      label="Reorder Type"
                      name='reorder_type'
                      options={REORDER_TYPE_FULL}
                      component={renderReactSelect}
                      placeholder="Select Type"
                      multi={false}
                      parentDivClass="form-group w-100"
                      onChange={this.changeReorderType}
                    />
                  }
                  
                </div>
                <div className="col-lg-4 selectbox-block">
                  <Field
                    label="Who Bear the Cost"
                    name='who_bear_cost'
                    options={WHO_BEAR_COST}
                    component={renderReactSelect}
                    placeholder="Select"
                    multi={false}
                    parentDivClass="form-group w-100"
                  />
                </div>
              </div>
              {/*
              <div className="row selectbox-block">
                <div className="col-lg-12 margin-fromtop">
                  <div className="form-group ri-block">
                    <label></label>
                    <ul className="cs-check-box">
                      <li>
                        <div className="os-check-box">
                          <Field
                            name="notify"
                            id="notify-item"
                            component="input"
                            type="checkbox"
                          />
                          <label for="notify-item">Notify Customer?</label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
             */}

              {
                showItems
                ?
                <div className="row">
                  <div className="col-lg-6 selectbox-block reorder-list">
                    <Field
                     name="items"
                     component={CheckboxGroup2}
                     type="checkbox"
                     options={itemsChk}
                   />
                  </div>
                </div>
                :
                null
              }
              
            </div>
          </div>
        </div>
        
        <div className="row save-button-block">
          <input type="hidden" name="driverchk" />
          <div className="col-sm-12 align-self-center">
            <button type="submit" disabled={submitting} className="btn green-btn"><i className="material-icons">check_circle</i>SUBMIT DETAILS{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
          </div>
        </div>
      </form>
    );
  }
}

ReOrderByAdmin = reduxForm({
  form: 'ReOrderByAdminValue',
  destroyOnUnmount: false,
  validate
})(ReOrderByAdmin)

export default ReOrderByAdmin;