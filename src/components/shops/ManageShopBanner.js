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
      itemImageUrl: null,
      showApprovalModal: false // State to control the modal visibility
    }
    this.getItemImage = this.getItemImage.bind(this);
    this.toggleApprovalModal = this.toggleApprovalModal.bind(this);
  }


  toggleApprovalModal() {
    this.setState({ showApprovalModal: !this.state.showApprovalModal });
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
      this.props.history.push('/dashboard/shoplisting');
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }

  render() {
    const {handleSubmit, pristine, submitting, cuisineList, shopId,isApprovalRequired} = this.props;
    const {itemImageUrl,showApprovalModal} = this.state;
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
                {
                  isApprovalRequired ? (
                    <button type="button" className="btn green-btn" onClick={this.toggleApprovalModal}>
                      Approve and Submit {submitting && <i className="fa fa-spinner fa-spin"></i>}
                    </button>
                  ) : (
                    <button type="submit" disabled={submitting} className="btn green-btn">
                      Submit Details {submitting && <i className="fa fa-spinner fa-spin"></i>}
                    </button>
                  )
                }
                  
                </div>
              </div>
                
            </div>
          </div>
        </div>
        {this.state.showApprovalModal && (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.4)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1050,
    }}
    onClick={this.toggleApprovalModal} // Close the modal when clicking on the overlay
  >
    <div
      style={{
        background: 'white',
        borderRadius: '8px',
        padding: '20px',
        width: '300px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
      onClick={(e) => e.stopPropagation()} // Prevent the modal itself from closing when clicking inside it
    >
      <div style={{ marginBottom: '20px' }}>
        <p>Do you want to approve this restaurant?</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit(this.submitBannerForm.bind(this))}
          style={{
            backgroundColor: '#007bff',
            border: 'none',
            padding: '10px 20px',
            color: 'white',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Yes
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={this.toggleApprovalModal}
          style={{
            backgroundColor: '#6c757d',
            border: 'none',
            padding: '10px 20px',
            color: 'white',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          No
        </button>
      </div>
    </div>
  </div>
)}


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
