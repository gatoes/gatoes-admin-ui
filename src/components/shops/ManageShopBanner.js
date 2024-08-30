import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { reduxForm, Field, SubmissionError, reset } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import { shopBannerDetailById, addShopBannerDetail } from '../../actions/shops';
import {toast} from 'react-toastify';
import validate from './ValidateShopBanner';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MenuItemImage from '../menu/MenuItemImage';
import renderDatePicker from '../FormFields/renderDatePicker';

class ManageShopBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_submitting: false,
      status: props.status,
      shopId: props.shopId,
      itemImageUrl: null
    }
    this.getItemImage = this.getItemImage.bind(this);

  }

  componentWillMount(){
    shopBannerDetailById({shopId : this.state.shopId}).then((response) => {
      this.props.initialize(response.data.data);
      this.setState({
        itemImageUrl: response.data.data.image
      })
    });
    this.props.change('shopId', this.state.shopId);
  }

  getItemImage(imageId){
    this.props.change('bannerImage', imageId);
    this.props.change('image_chk', imageId);
  }

  submitBannerForm(values){
    return addShopBannerDetail(values)
    .then((result) => {
      toast.success('Restaurant banner added Successfully.');
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }

  render() {
    const {handleSubmit, pristine, submitting, cuisineList, shopId} = this.props;
    const {itemImageUrl} = this.state;
    console.log('aa', this.props.shopId);
    return (
      <form onSubmit={handleSubmit(this.submitBannerForm.bind(this))}>
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="add-left-block">
              
              <div className="fields-ui-block">
                <div className="basic-details">
                  <div className="heading">
                    <h4>Basic Info</h4>
                  </div>
                  <div className="form-block">
                    <div className="row">
                      <div className="form-group ri-block col-lg-6">
                        <ul className="cs-check-box">
                          <li>
                            <div className="os-check-box">
                              <Field
                                name="is_activate"
                                id="promocode_other"
                                component="input"
                                type="checkbox"
                              />
                              <label for="promocode_other">Enable Banner ?</label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <Field
                             name="start_date"
                             component={renderDatePicker}
                             label="Start Date"
                             className="form-control"
                             innerParentDivClass="expirydate"
                             labelClass="control-label"
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <Field
                             name="end_date"
                             component={renderDatePicker}
                             label="End Date"
                             className="form-control"
                             innerParentDivClass="expirydate"
                             labelClass="control-label"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-12 col-md-12">
                <MenuItemImage getItemImage={this.getItemImage} itemImageUrl={itemImageUrl} />
                <Field name="image_chk" component={renderField} type="hidden" />
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
    );
  }
}

ManageShopBanner = reduxForm({
  form: 'ManageShopBannerValue',
  destroyOnUnmount: false,
  enableReinitialize: false,
  keepDirtyOnReinitialize: false,
  validate
})(ManageShopBanner)

export default ManageShopBanner;
