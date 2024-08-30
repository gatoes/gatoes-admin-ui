import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError, reset, FieldArray, formValueSelector } from 'redux-form';
import {disableInvalidOptions, OPENING_CLOSING_TIME, OPENING_TIME} from '../../constants';
import renderReactSelect from '../FormFields/renderReactSelect';

class RenderCategoryTime extends Component {
  constructor(props) {
    super(props);
    this.categoryUpdate = this.categoryUpdate.bind(this);
  }

  componentWillMount(){
    if(this.props.id === null){
      this.props.fields.push({});
    }
  }

  categoryUpdate(val){
    //alert(val);
  }

  componentDidMount(){
    console.log('nnnn', this.props);
   
  }

  render() {
    const { fields, meta: { touched, error, submitFailed } } = this.props;
    console.log('this.props.categoryTimeOptions', this.props.categoryTimeOptions);
    return (
      <>
        {
          fields.map((timing, index) => (
            <div className="col-sm-12 add-more-category" key={index}>
              <div className="available-block">
                <Field
                  label="When it will available"
                  name={`${timing}.category_label`}
                  optionLabel='label'
                  optionValue='value'
                  options={disableInvalidOptions(this.props.categoryTimeOptions)}
                  component={renderReactSelect}
                  placeholder="Choose Day"
                  multi={false}
                  onChange={this.categoryUpdate}
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
                />

                {
                  index > 0
                  ?
                  <div className="form-group"><label className="b-label"></label>
                    <div className="delete-icon">
                      <a href="javscript:void(0);" onClick={() => fields.remove(index)}><i className="material-icons">delete</i></a>
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
            <a href="javascript:void(0);" className="btn add-text-btn ad-btn" onClick={() => fields.push({})}><i className="material-icons">add_circle_outline</i>ADD MORE</a>
          </div>
        </div>
      </>
    )
  }

}

const mapStatesToProps = (state, ownProps) => {
  let values = [];
  console.log('state.form.AddMenuCategoryForm', state.form.AddMenuCategoryForm);
  if(typeof state.form.AddMenuCategoryForm !== 'undefined' && typeof state.form.AddMenuCategoryForm.values !== 'undefined'){
    values = state.form.AddMenuCategoryForm.values.timing;
  }
  const states = {
    categoryTimeOptions: values
  };
  return states;
}


export default connect(mapStatesToProps)(RenderCategoryTime);