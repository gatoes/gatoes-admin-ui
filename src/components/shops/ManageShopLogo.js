import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { toast } from 'react-toastify';
import ShopImage from './ShopImage'; // Reuse the ShopImage component for uploading

class ManageShopLogo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemLogoUrl: null // Store the preview of the uploaded logo
    };
    this.handleLogoUpload = this.handleLogoUpload.bind(this);
  }

  // Handle the file upload and preview
  handleLogoUpload(imageId, imageUrl) {
    this.setState({
      itemLogoUrl: imageUrl
    });
  }

  submitLogoImage(values) {
    // This would be where you handle form submission, but for now, we'll just show a success message.
    toast.success('Restaurant logo uploaded successfully.');
    this.props.reset();
    this.props.history.push('/dashboard/shoplisting');
    this.props.setMenuStatus('banner');
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    const { itemLogoUrl } = this.state;

    return (
      <div className="container ani-ui-block">
        <form onSubmit={handleSubmit(this.submitLogoImage.bind(this))}>
          <div className="row">
            <div className="col-lg-12 col-md-12">
              {/* Display the uploaded image preview */}
              {itemLogoUrl && (
                <div className="logo-preview">
                  <img src={itemLogoUrl} alt="Restaurant Logo" style={{ maxWidth: '200px', marginBottom: '20px' }} />
                </div>
              )}
              {/* Use the ShopImage component to simulate the file upload */}
              <ShopImage getShopImage={this.handleLogoUpload} />
            </div>
            <div className="col-lg-12">
              <div className="row save-button-block">
                <div className="col-sm-12 align-self-center">
                  <button type="submit" disabled={submitting} className="btn green-btn">
                    Submit details{submitting && <i className="fa fa-spinner fa-spin"></i>}
                  </button>
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
