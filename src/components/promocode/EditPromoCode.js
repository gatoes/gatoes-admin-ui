import React, { Component } from 'react';
import { reduxForm, Field, SubmissionError, reset, FieldArray, formValueSelector } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import {toast} from 'react-toastify';
import renderReactSelect from '../FormFields/renderReactSelect';
import validate from './ValidateUpdatedPromoCode';
import { getPromoCodeById, updatePromoLanguage } from '../../actions/promocodes';
import MenuItemImage from '../menu/MenuItemImage';

class EditPromoCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_submitting: false,
      status: props.status,
      itemImageUrl: null
    }
    this.getItemImage = this.getItemImage.bind(this);
  }

  getItemImage(imageId){
    this.props.change('image', imageId);
  }

  componentWillMount(){
    getPromoCodeById({id : this.props.match.params.index}).then((response) => {
      this.props.initialize(response.data.data);
      this.setState({
        itemImageUrl: response.data.data && response.data.data.imageToShow && response.data.data.imageToShow.thumbnail ? response.data.data.imageToShow.thumbnail : null
      });
      this.props.change('image', response.data.data.image);
    });
  }

  submitMenuForm(values){
    console.log('form', values);
    return updatePromoLanguage(values).then((result) => {
      toast.success('Promo code updated successfully.');
      this.props.reset();
      this.props.history.push('/dashboard/promocodes');
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }

  render() {
    const {handleSubmit, pristine, submitting, itemImageUrl} = this.props;
    return (
      <div className="container ani-ui-block">
        <div className="row menu-top-block">
          <div className="col-sm-12 tl-block align-self-center">
            <h4 className="heading">Edit Promocode</h4>
          </div>
        </div>
        <form onSubmit={handleSubmit(this.submitMenuForm.bind(this))}>
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="add-left-block">
                

                <div className="fields-ui-block promocode-ui">
                  <div className="basic-details">
                    <div className="heading">
                      <h4>Basic Information</h4>
                    </div>
                    <div className="form-block">
                      
                      <div className="row">
                        <div className="col-lg-6">
                          <Field
                            name="rule_name"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="Rule Name"
                            placeholder=""
                          />
                        </div>
                        <div className="col-lg-6">
                          <Field
                            name="rule_description"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="Rule Description"
                            placeholder=""
                          />
                        </div>
                      </div>

                      <div className="row">
                        <MenuItemImage getItemImage={this.getItemImage} itemImageUrl={itemImageUrl} />
                        <input type="hidden" name="promocodeImage" />
                      </div>

                    </div>
                  </div>
                </div>

                <div className="row save-button-block">
                  <div className="col-sm-12 align-self-center">
                    <button type="submit" disabled={submitting} className="btn green-btn">Submit details{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
                    
                  </div>
                </div>
                  
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

EditPromoCode = reduxForm({
  form: 'EditPromoCodeValue',
  destroyOnUnmount: false,
  enableReinitialize: false,
  keepDirtyOnReinitialize: false,
  validate
})(EditPromoCode)

export default EditPromoCode;