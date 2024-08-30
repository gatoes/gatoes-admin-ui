import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError, reset, FieldArray, formValueSelector } from 'redux-form';
import {disableInvalidOptions, OPENING_CLOSING_TIME, OPENING_TIME, OPENING_CLOSING_DAY, disableDaysInvalidOptions} from '../../constants';
import renderReactSelect from '../FormFields/renderReactSelect';

class RenderOrderingTime extends Component {
  constructor(props) {
    super(props);
    this.categoryUpdate = this.categoryUpdate.bind(this);
  }

  componentWillMount(){
    if(this.props.fields.length == 0){
      this.props.fields.push({});
    }
  }

  categoryUpdate(val){
    //alert(val);
  }

  componentDidMount(){
    //console.log('ttttttt', this.props);
    //this.props.initialValues(this.props.categoryTimeOptions);
  }

  render() {
    const { fields, meta: { touched, error, submitFailed } } = this.props;
    //console.log(OPENING_CLOSING_TIME, 'this.props.timing', this.props.timing);

    return (
      <>
        {
          fields.map((timing, index) => (
            <div className="col-sm-12 add-more-category" key={index}>
              <div className="available-block">
                {/*               
                <Field
                  label="When it will available"
                  name={`${timing}.category_label`}
                  optionLabel='label'
                  optionValue='value'
                  options={disableInvalidOptions(this.props.timing)}
                  component={renderReactSelect}
                  placeholder="Choose Day"
                  multi={false}
                  onChange={this.categoryUpdate}
                  className="select-ui"
                />
              */}
                <Field
                  label="When it will available"
                  name={`${timing}.category_label`}
                  optionLabel='label'
                  optionValue='value'
                  options={disableDaysInvalidOptions(this.props.timing)}
                  component={renderReactSelect}
                  placeholder="Choose Day"
                  multi={false}
                  onChange={this.categoryUpdate}
                  className="select-ui"
                />
                <Field
                  label="Opening Time"
                  name={`${timing}.category_opening_time`}
                  optionLabel='label'
                  optionValue='value'
                  options={OPENING_TIME}
                  component={renderReactSelect}
                  placeholder="Open"
                  multi={false}
                  className="select-ui"
                />
                <div className="form-group">
                  <label className="b-label"></label>
                  <div className="select-label">to</div>
                </div>
                <Field
                  label="Closing Time"
                  name={`${timing}.category_closing_time`}
                  optionLabel='label'
                  optionValue='value'
                  options={OPENING_CLOSING_TIME}
                  component={renderReactSelect}
                  placeholder="Close"
                  multi={false}
                  className="select-ui"
                />

                {
                  index > 0
                  ?
                  <div className="form-group"><label className="b-label"></label>
                    <div className="delete-icon">
                      <a href="javscript:void(0);" onClick={() => fields.remove(index)}><i className="material-icons">clear</i></a>
                    </div>
                  </div>
                  :
                  ''
                }
                
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
  //console.log('state.form.ManageOrderingTimeForm', state.form.ManageOrderingTimeForm);
  
  if(typeof state.form.ManageOrderingTimeForm !== 'undefined' && typeof state.form.ManageOrderingTimeForm.values !== 'undefined'){
    values = state.form.ManageOrderingTimeForm.values.timing;
  }
  const states = {
    timing: values
  };

  //console.log('states', states);

  return states;
}


export default connect(mapStatesToProps)(RenderOrderingTime);