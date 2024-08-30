import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { reduxForm, Field, SubmissionError, reset } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import {toast} from 'react-toastify';
import ShopImage from './ShopImage';
import { updateShopImage, getShopImageById } from '../../actions/shops';

class ManageShopImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_submitting: false,
      shopId : props.shopId,
      itemImageUrl : null
    }
    this.getShopImage = this.getShopImage.bind(this);
  }

  componentDidMount(){
    this.props.change('shopId', this.state.shopId);
  }
  
  getShopImage(imageId){
    this.props.change('imageId', imageId);
    this.props.change('shopId', this.state.shopId);
  }

  componentWillMount(){
    getShopImageById({shopId : this.state.shopId}).then((response) => {
      console.log('response', response);
      if(response.data.data.image != null){
        this.props.initialize(response.data.data);
        this.setState({
          itemImageUrl: response.data.data.image
        });
        this.props.change('imageId', response.data.data.imageId);
        this.props.change('shopId', this.state.shopId);

      }
    });
  }

  submitMenuImage(values){
    console.log('values', values);
    return updateShopImage(values)
    .then((result) => {
      toast.success('Restaurant images uploaded Successfully.');
      this.props.reset();
      this.props.history.push('/dashboard/shoplisting');
      this.props.setMenuStatus('banner');
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }

  render() {
    const {handleSubmit, pristine, submitting, cuisineList} = this.props;
    console.log('shoop', this.state.shopId);
    return (
      <div className="container ani-ui-block">
        <form onSubmit={handleSubmit(this.submitMenuImage.bind(this))}>
          <div className="row">
            <div className="col-lg-12 col-md-12">
              
              <ShopImage getShopImage={this.getShopImage} itemImageUrl={this.state.itemImageUrl} />
              
            </div>
            <div className="col-lg-12">
            <div className="row save-button-block">
              <div className="col-sm-12 align-self-center">
                <button type="submit" disabled={submitting} className="btn green-btn">Submit details{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

ManageShopImage = reduxForm({
  form: 'ManageShopImageForm',
  destroyOnUnmount: false
})(ManageShopImage)

export default ManageShopImage;
