import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError, reset, FieldArray } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import Select from 'react-select';
import {VEG_CATEGORY} from '../../constants';
import renderReactSelect from '../FormFields/renderReactSelect';
import renderRadio from '../FormFields/renderRadio';
import {getDieteryStatus} from '../../utilities';

export default class RenderSemiAddons extends Component {
  constructor(props) {
    super(props);
    this.handleDefaultAddon = this.handleDefaultAddon.bind(this);
  }

  handleDefaultAddon(e){
    let chkindex = e.target.id ? e.target.id : 0;
    
  }

  componentWillMount(){
    if(this.props.fields.length == 0){
      this.props.fields.push({status: true});
    }
  }

  render() {
    const { fields, meta: { touched, error, submitFailed } } = this.props;
    const visibleStat = getDieteryStatus();
    return (
      <>
        
        {
          fields.map((addons, index) => (
            <div className="col-lg-12 col-md-12 no-margin multiple-ui-addon" key={index}>
              <Field
                name={`${addons}.name`}
                component={renderField}
                type="text"
                className="form-control"
                label="Addon Item"
                placeholder="ex. Black Olives"
                parentDivClass="w-30"
              />
              {
                visibleStat && (visibleStat == 1)
                ?
                <Field
                  label="Addon Type"
                  name={`${addons}.type`}
                  optionLabel='label'
                  optionValue='value'
                  options={VEG_CATEGORY}
                  component={renderReactSelect}
                  placeholder="Select Type"
                  additionalClassName="addon-text"
                  multi={false}
                  parentDivClass="form-group w-20"
                />
                :
                null
              }
              
              <Field
                name={`${addons}.price`}
                component={renderField}
                type="text"
                className="form-control"
                label="Addon Item Price"
                placeholder="ex. 40"
                parentDivClass="w-20"
              />

              <div className="form-group v-action">
                <label>Status</label>
                <div className="checkbox-block">
                  <ul className="cs-check-box">
                    <li>
                      <div className="os-check-box">
                        <Field
                          name={`${addons}.status`}
                          id={"addons-item" + index}
                          component="input"
                          type="checkbox"
                        />
                        <label for={"addons" + index}></label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="form-group w-25">
                <label>Actions</label>
                <div className="checkbox-block">
                   <ul className="cs-check-box">
                      <li>
                        <div className="os-check-box">
                          <Field
                            name={`${addons}.isDefault`}
                            id={"addonsdefault-item" + index}
                            component="input"
                            type="checkbox"
                          />
                          <label for={"addonsdefault-item" + index}></label>
                        </div>
                        {/*}
                         <div className="os-check-box">
                            <Field 
                              type="radio" 
                              value="1" 
                              name={`${addons}.isDefault`}
                              label="" 
                              component={renderRadio}
                              id={"default_addon" + index }
                              onChange={ this.handleDefaultAddon }
                            />
                         </div>
                       */}
                      </li>
                   </ul>
                </div>
                <div className="delete-varient"><a href="javascript: void(0);" className="btn addon-btn-block remove-btn" onClick={() => fields.remove(index)}><i className="material-icons">clear</i></a>
                  </div>
              </div>
            </div>
          ))
        }
        
          <div className="col-sm-12">
             <a href="javascript:void(0);" className="btn add-text-btn ad-btn" onClick={() => fields.push({status: true})}><span className="icon-ic_plus"></span>ADD ANOTHER ITEM</a>
          </div>
       
      </>
    )
  }

}