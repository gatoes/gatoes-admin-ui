import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reduxForm, Field, SubmissionError, reset } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import {toast} from 'react-toastify';
import validate from './ValidateShopCategory';
import ShopCategoryImage from './ShopCategoryImage';
import { addGallery } from '../../actions/shops';

class AddGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemImageUrl: null
    }
    this.getImage = this.getImage.bind(this);
  }

  getImage(imageId){
    this.props.change('image', imageId);
  }

  submitMenuForm(values){
    console.log('values', values);
    return addGallery(values)
    .then((result) => {
      toast.success('Gallery added Successfully.');
      this.props.reset();
      this.props.history.push('/dashboard/managegallery');
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }


  render() {
    const {handleSubmit, pristine, submitting} = this.props;

    return (
      <div className="container ani-ui-block shop-manager">
        <div className="row menu-top-block">
          <div className="col-sm-12 tl-block align-self-center">
            <h4 className="heading">Add Gallery</h4>
          </div>

          <form onSubmit={handleSubmit(this.submitMenuForm.bind(this))}>
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="add-left-block">
                  
                  <div className="fields-ui-block">
                    <div className="basic-details">
                      <div className="heading">
                        <h4>Detail</h4>
                      </div>
                      <div className="form-block">
                        <div className="row">
                          <div className="col-lg-12">
                            <Field
                              name="name"
                              component={renderField}
                              type="text"
                              className="form-control"
                              label="Caption"
                              placeholder="Eg. Healthy"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-md-12 order-lg-2">
                      <ShopCategoryImage getImage={this.getImage} />
                      <Field
                        name="catimage"
                        component={renderField}
                        type="hidden"
                        className="form-control"
                        label="Name"
                        placeholder="Eg. Healthy"
                      />
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
      </div>
    );
  }
}

AddGallery = reduxForm({
  form: 'AddGalleryValue',
  destroyOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(AddGallery)

export default AddGallery;
