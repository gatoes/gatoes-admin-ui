import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { toast } from 'react-toastify';
import ShopImage from './ShopImage'; // Reuse the ShopImage component for uploading
import { deactivateShop, getShopLogoById, updateShopLogo } from '../../actions/shops';

class ManageShopLogo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopId : props.shopId,
      shopLogoUrl: null, // Store the preview of the uploaded logo
      isApprovalRequired: this.props.isApprovalRequired || false
    };
    this.handleLogoUpload = this.handleLogoUpload.bind(this);
  }

  // Handle the file upload and preview
  handleLogoUpload(imageId) {
    this.props.change('imageId', imageId);
    this.props.change('shopId', this.state.shopId);
  }

  submitLogoImage(values) {
    // console.log('uploading LOGO check', values);
    // // This would be where you handle form submission, but for now, we'll just show a success message.
    // toast.success('Restaurant logo uploaded successfully.');
    // this.props.reset();
    // this.props.history.push('/dashboard/shoplisting');
    // this.props.setMenuStatus('banner');
    console.log('uploading Logo check', values);
    return updateShopLogo(values)
    .then((result) => {
      toast.success('Restaurant Logo uploaded Successfully.');
      this.props.reset();
      deactivateShop({shopStatus: 1, shopId: this.state.shopId}).then((response) => {
        // this.setState({
        //   slideData: {...this.state.slideData, shopStatus: 1}
        // })
        //this.props.deactivateShopSuccess(shopId, 1);
        toast.success("Restaurant Approved", {
          position: toast.POSITION.TOP_RIGHT
        });   
        // this.props.fetchRecords(1, {status: 3}); // This should be passed from the parent
      });
      this.props.history.push('/dashboard/onboarding');
      // this.props.setMenuStatus('banner');
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }

  componentDidMount(){
    this.props.change('shopId', this.state.shopId);
  }
  
  componentWillMount(){
    getShopLogoById({shopId : this.state.shopId}).then((response) => {
      console.log('response', response);
      if(response.data.data.image != null){
        this.props.initialize(response.data.data);
        this.setState({
          shopLogoUrl: response.data.data.image
        });
        this.props.change('imageId', response.data.data.imageId);
        this.props.change('shopId', this.state.shopId);
      }
    });
  }


  render() {
    const { handleSubmit, submitting,isApprovalRequired } = this.props;
    console.log("props check",this.props)
    const { shopLogoUrl } = this.state;

    return (
      <div className="container ani-ui-block">
        <form onSubmit={handleSubmit(this.submitLogoImage.bind(this))}>
          <div className="row">
            <div className="col-lg-12 col-md-12">
              {/* Display the uploaded image preview */}
              {/* {shopLogoUrl && (
                <div className="logo-preview">
                  <img src={shopLogoUrl} alt="Restaurant Logo" style={{ maxWidth: '200px', marginBottom: '20px' }} />
                </div>
              )} */}
              {/* Use the ShopImage component to simulate the file upload */}
              <ShopImage getShopImage={this.handleLogoUpload} itemImageUrl={shopLogoUrl}  imageType="SHOP_LOGO"/>
            </div>
            <div className="col-lg-12">
              <div className="row save-button-block">
                <div className="col-sm-12 align-self-center">
                {
                isApprovalRequired ? <button type="submit" className="btn green-btn" onClick={this.toggleApprovalModal}>
                Approve and Submit {submitting && <i className="fa fa-spinner fa-spin"></i>}
              </button> :
          <button type="submit" disabled={submitting} className="btn green-btn">Submit details{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
              }
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

ManageShopLogo = reduxForm({
  form: 'ManageShopLogoForm',
  destroyOnUnmount: false
})(ManageShopLogo);

export default ManageShopLogo;
