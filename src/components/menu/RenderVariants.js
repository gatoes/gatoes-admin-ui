import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError, reset, FieldArray } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import renderRadio from '../FormFields/renderRadio';

class RenderVariants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      variants : props.variants
    }
    this.handleDefaultVariant = this.handleDefaultVariant.bind(this);
  }

  handleDefaultVariant(e){
    let chkindex = e.target.id ? e.target.id : 0;
    let formvariant = this.props.variants;
    formvariant.map((obj, index) => {
      if(chkindex != index){
        obj.isDefault = 0;
      } else {
        obj.isDefault = 1;
      }
    })

    console.log(chkindex, 'variants', this.props.variants);
  }

  componentWillMount(){
    if(this.props.fields.length == 0){
      this.props.fields.push({isDefault: '1', status: true});
    }
  }

  render() {
    const { fields, meta: { touched, error, submitFailed } } = this.props;

    return (
      <>
        {
          fields.map((variants, index) => {
            
            return(
            <div className="row mp-addon">
              <div className="col-sm-12 multiple-ui-addon">
                <Field
                  name={`${variants}.variantName`}
                  component={renderField}
                  type="text"
                  className="form-control"
                  label="Variant Name"
                  placeholder="Variant Name"
                  parentDivClass="v-price"
                />
                <Field
                  name={`${variants}.variantPrice`}
                  component={renderField}
                  type="number"
                  className="form-control"
                  label="Variant Price"
                  placeholder="Variant Price"
                  parentDivClass="v-price"
                />

                <div className="form-group v-action">
                  <label>Status</label>
                  <div className="checkbox-block">
                    <ul className="cs-check-box">
                      <li>
                        <div className="os-check-box">
                          <Field
                            name={`${variants}.status`}
                            id={"recommended-item" + index}
                            component="input"
                            type="checkbox"
                          />
                          <label for={"recommended-item" + index}></label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="form-group v-action">
                  <label>Default</label>
                  <div className="checkbox-block">
                    <ul className="cs-check-box">
                      <li>
                        <div className="os-check-box">
                          <Field 
                            type="radio" 
                            value="1" 
                            name={`${variants}.isDefault`}
                            label="" 
                            id={index}
                            component={renderRadio}
                            onChange={ this.handleDefaultVariant }
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
                  {
                    index > 0
                    ?
                    <div className="delete-varient">
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
        <div className="row add-more-blocks">
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
    variants: state.form.AddMenuItemValue && state.form.AddMenuItemValue.values && state.form.AddMenuItemValue.values.variants
  }
}

export default connect(mapStatesToProps)(RenderVariants);