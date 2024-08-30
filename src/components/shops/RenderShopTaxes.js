import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError, reset, FieldArray, formValueSelector } from 'redux-form';
import renderField from '../FormFields/renderField';

class RenderShopTaxes extends Component {
  constructor(props) {
    super(props);
  }

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
          fields.map((tax, index) => (
            <div className="col-sm-12 add-more-category" key={index}>
              <div className="available-block">
                <Field
                  name={`${tax}.tax_name`}
                  component={renderField}
                  type="text"
                  className="form-control"
                  label="Tax Name"
                  placeholder=""
                />

                <Field
                  name={`${tax}.tax_amount`}
                  component={renderField}
                  type="text"
                  className="form-control"
                  label="Tax Amount(%)"
                  placeholder=""
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
        
        <div className="col-sm-12">
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
  
  if(typeof state.form.ManageShopTaxesForm !== 'undefined' && typeof state.form.ManageShopTaxesForm.values !== 'undefined'){
    values = state.form.ManageShopTaxesForm.values;
  }
  const states = {
    tax: values
  };

  return states;
}


export default connect(mapStatesToProps)(RenderShopTaxes);