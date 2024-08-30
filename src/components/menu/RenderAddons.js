import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError, reset, FieldArray } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import RenderSemiAddons from './RenderSemiAddons';
import Select from 'react-select';
import {ADDONS_CATEGORY, VEG_CATEGORY} from '../../constants';
import renderReactSelect from '../FormFields/renderReactSelect';

export default class RenderAddons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectAddonCategory: null
    }
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    if(nextProps.fields.length == 0){
      nextProps.fields.push({});
    }
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
        <div className="heading">
           <div className="left-block"><h4>ADDONS Group </h4></div>
           <div className="right-block">
              <a href="javscript:void(0);" className="add-text-btn" onClick={() => fields.push({})}><i className="material-icons">add_circle_outline</i>NEW ADDON GROUP</a>
           </div>
        </div>
        {
          fields.map((addon, index) => (
            <div className="addon-group-block">
            <div className="form-block" key={index}>
              <div className="row addon-category">
                <div className="col-lg-12 col-md-12">
                  <Field
                    name={`${addon}.category_name`}
                    component={renderField}
                    type="text"
                    className="form-control"
                    label="Addon Group Name"
                    placeholder="ex. Toppings"
                    parentDivClass="addon-name"
                  />
                </div>
              </div>

              
              <div className="row addon-block">
                <FieldArray name={`${addon}.semiaddons`} component={RenderSemiAddons} />
              </div>

              {
                index > 0
                ?
                <div className="form-group group-del-btn"><a href="javascript: void(0);" className="btn addon-btn-block remove-btn" onClick={() => fields.remove(index)}>Delete</a></div>
                :
                ''
              }

              <div className="row">
                <div className="col-md-8 cc-item">
                  <label>How many items can user choose?</label>
                  <div className="right-block">
                    <Field
                      name={`${addon}.minRange`}
                      component={renderField}
                      type="text"
                      className="form-control"
                      label=""
                      placeholder="min"
                    />
                    <div className="form-group"> to</div>
                    <Field
                      name={`${addon}.maxRange`}
                      component={renderField}
                      type="text"
                      className="form-control"
                      label=""
                      placeholder="max"
                    />
                  </div>
                </div>


                
              </div>
              
            </div>
            </div>
          ))
        }
      </>
    )
  }

}