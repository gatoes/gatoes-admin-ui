import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reduxForm, Field, SubmissionError, reset } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import renderReactSelect from '../FormFields/renderReactSelect';
import {toast} from 'react-toastify';
import validate from './ValidateShopPromotion';
import ShopCategoryImage from './ShopCategoryImage';
import { addShopsBanner, getShopListing, getShopsBannerById } from '../../actions/shops';

class EditRestaurantBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemImageUrl: null,
      shops: []
    }
    this.getImage = this.getImage.bind(this);
  }

  getImage(imageId){
    this.props.change('image', imageId);
  }

  componentDidMount(){
    getShopListing({'is_all': true}).then((response) => {
      this.setState({
        shops: response.data.data
      })
    });
  }

  componentWillMount(){
    getShopsBannerById({id : this.props.match.params.index}).then((response) => {
      this.props.initialize(response.data.data);
      this.setState({
        itemImageUrl: response.data.data && response.data.data.imageUrl && response.data.data.imageUrl.thumbnail ? response.data.data.imageUrl.thumbnail : null
      });
      this.props.change('image', response.data.data.image);
    });
  }

  submitMenuForm(values){
    console.log('values', values);
    return addShopsBanner(values)
    .then((result) => {
      toast.success('Banner added Successfully.');
      this.props.reset();
      this.props.history.push('/dashboard/managerestaurantbanner');
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }


  render() {
    const {handleSubmit, pristine, submitting} = this.props;
    const {shops, itemImageUrl} = this.state;

    return (
      <div className="container ani-ui-block shop-manager">
        <div className="row menu-top-block">
          <div className="col-sm-12 tl-block align-self-center">
            <h4 className="heading">Edit Restaurant Promotion Banner</h4>
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
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12 selectbox-block multi-region-selection">
                            <Field
                              label="Choose Restaurant"
                              name='restaurants'
                              optionLabel='shopName'
                              optionValue='id'
                              options={shops}
                              component={renderReactSelect}
                              placeholder="Select Restaurants"
                              multi={true}
                              className="select-ui"
                              parentDivClass="form-group w-100"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-lg-12 col-md-12 order-lg-2">
                      <ShopCategoryImage getImage={this.getImage} itemImageUrl={itemImageUrl} />
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
                      <button type="submit" disabled={submitting} className="btn green-btn">Save{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
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

EditRestaurantBanner = reduxForm({
  form: 'EditRestaurantBannerValue',
  destroyOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(EditRestaurantBanner)

export default EditRestaurantBanner;
