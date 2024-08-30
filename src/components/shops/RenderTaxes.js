import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError, reset, FieldArray } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';

class RenderTaxes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taxes : props.taxes
    }
    this.handleDefaultVariant = this.handleDefaultVariant.bind(this);
  }

  handleDefaultVariant(e){
    let chkindex = e.target.id ? e.target.id : 0;
    let formtaxes = this.props.taxes;
  }

  render() {
    const { fields, meta: { touched, error, submitFailed } } = this.props;

    return (
      <>
        {
          fields.map((taxes, index) => {
            return(
            <div className="row mp-addon">
              <div className="col-sm-12 multiple-ui-addon">
                <Field
                  name={`${taxes}.name`}
                  component={renderField}
                  type="text"
                  className="form-control"
                  label="Name"
                  placeholder="eg. merchant charges or banner promotion"
                  parentDivClass="v-name"
                />
                <Field
                  name={`${taxes}.amount`}
                  component={renderField}
                  type="number"
                  className="form-control"
                  label="Amount(%)"
                  placeholder="ex. 5"
                  parentDivClass="v-price"
                />

                <div className="form-group v-action">
                  <label>Actions</label>
                  <div className="delete-varient">
                    <a href="javscript:void(0);" onClick={() => fields.remove(index)}><i className="material-icons">delete</i></a>
                  </div>
                </div>
              </div>
            </div>

          )})
        }
        <div className="row add-more-blocks">
            <div className="col-sm-12">
              <a href="javascript:void(0);" className="btn add-text-btn ad-btn" onClick={() => fields.push({})}>
                <i className="material-icons">add_circle_outline</i>ADD TAXES</a>
            </div>
          </div>
      </>
    )
  }

}

const mapStatesToProps = (state, ownProps) => {
  return {
    variants: state.form.AddShopValue && state.form.AddShopValue.values && state.form.AddShopValue.values.taxes
  }
}

export default connect(mapStatesToProps)(RenderTaxes);