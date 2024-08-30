import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError, reset, FieldArray } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';

class AddPlanDeliveryCharges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weekly_plan_charges : props.weekly_plan_charges
    }
    // this.handleDefault = this.handleDefault.bind(this);
  }

  componentWillMount(){
    if(this.props.fields.length == 0){
      this.props.fields.push();
    }
  }

  render() {
    const { fields, meta: { touched, error, submitFailed } } = this.props;

    return (
      <>
        {
          fields.map((weekly_plan_charges, index) => {
            
            return(
            <div className="row mp-addon">
              <div className="col-sm-12 multiple-ui-addon">
                <Field
                  name={`${weekly_plan_charges}.order`}
                  component={renderField}
                  type="text"
                  className="form-control"
                  label="Order range"
                  placeholder="Order range"
                  parentDivClass="v-price v-delivery"
                />
                <Field
                  name={`${weekly_plan_charges}.charges`}
                  component={renderField}
                  type="number"
                  className="form-control"
                  label="Charges"
                  placeholder="Charges"
                  parentDivClass="v-price v-delivery"
                />

                <div className="form-group v-action">
                  {
                    index > 0
                    ?
                    <div className="delete-varient delete-charge">
                      <a href="javscript:void(0);" onClick={() => fields.remove(index)}><i className="material-icons">clear</i></a>
                    </div>
                    :
                    ''
                  }
                </div>
                
              </div>
            </div>

          )})
        }
        <div className="row add-more-check">
            <div className="col-sm-12">
              <a href="javascript:void(0);" className="btn add-text-btn ad-btn" onClick={() => fields.push({status: true})}><span className="icon-ic_plus"></span>ADD MORE</a>
            </div>
          </div>
      </>
    )
  }

}

const mapStatesToProps = (state, ownProps) => {
  return {
    weekly_plan_charges: state.form.AddPlanValue && state.form.AddPlanValue.values && state.form.AddPlanValue.values.weekly_plan_charges
  }
}

export default connect(mapStatesToProps)(AddPlanDeliveryCharges);