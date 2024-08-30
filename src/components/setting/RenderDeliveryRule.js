import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError, reset, FieldArray, formValueSelector } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';

class RenderDeliveryRule extends Component {
  constructor(props) {
    super(props);
  }

  // componentWillMount(){
  //   if(this.props.id === null){
  //     this.props.fields.push({});
  //   }
  // }
  
  componentWillMount(){
    if(this.props.fields.length == 0){
      this.props.fields.push({});
    }
  }


  render() {
    const { fields, meta: { touched, error, submitFailed } } = this.props;
    return (
      <>
        {
          fields.map((rule, index) => (
            <div className="col-sm-12 add-more-category" key={index}>
              <div className="available-block">
                <Field
                  name={`${rule}.order_amount_range`}
                  component={renderField}
                  type="text"
                  className="form-control"
                  label="Distance Range"
                  placeholder="Eg. 0-99"
                />

                <Field
                   name={`${rule}.amount`}
                  component={renderField}
                  type="text"
                  className="form-control"
                  label="Amount"
                  placeholder="Eg. 30"
                />

                <div className="form-group"><label className="b-label"></label>
                  <div className="delete-icon">
                    <a href="javscript:void(0);" onClick={() => fields.remove(index)}><i className="material-icons">clear</i></a>
                  </div>
                </div>
                
              </div>
            </div>
          
          ))
        }
        
        <div className="col-sm-12 no-padding">
          <div className="form-group addmore-btn">
            <a href="javascript:void(0);" className="btn add-text-btn ad-btn" onClick={() => fields.push({})}><span className="icon-ic_plus"></span>Add more</a>
          </div>
        </div>
      </>
    )
  }

}

const mapStatesToProps = (state, ownProps) => {
  let values = [];
  if(typeof state.form.AddMenuCategoryForm !== 'undefined' && typeof state.form.AddMenuCategoryForm.values !== 'undefined'){
    values = state.form.AddMenuCategoryForm.values.delivery;
  }
}


export default connect(mapStatesToProps)(RenderDeliveryRule);