import React, { Component } from 'react';
import { reduxForm} from 'redux-form';
import PromotionInfo from './PromotionInfo';
import { createPromotionUsingMicroservice, promotionByIdUsingMicroservice, updatePromotionUsingMicroservice } from '../../actions/newpromotion';
import { toast } from 'react-toastify';

class AddNewPromotionSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_submitting: false,
      status: props.status,
      isAction: true,
      initialDate:null,
    }
    this.updateDateInfo = this.updateDateInfo.bind(this);
    this.isActionUpdate = this.isActionUpdate.bind(this);
    this.submitMenuForm = this.submitMenuForm.bind(this);
  }

  componentDidMount(){
    if (this.props.match.params.index) {
      promotionByIdUsingMicroservice({ promotionId: this.props.match.params.index }).then((response) => {
        console.log(response, "responsePromotionId");
          this.setState({
            initialDate: response.data.responseData.metaData,
          });
          this.props.initialize(response.data.responseData.metaData);
        }
      );
    }
  }

  updateDateInfo(datename, date){
    this.props.change(datename, date); 
  }

  isActionUpdate(type){
    this.setState({
      isAction: type === 4 ? false : true
    })
  }

  submitMenuForm(values) {
    let formData = {}
    console.log(values, "valuesPromotionNew");
    formData["metaData"] = { ...values };

    formData = {
      ...values,
      zones: [
        {
          zoneId: values.zone,
          isApplicableToAllRegions: values.region && values.region.length > 0 ? false : true,
        },
      ],
      regions: values.region
        ? values.region.map((regionId) => ({
            regionId: regionId,
            zoneId: values.zone,
            isApplicableToAllShops: !values.region ? true : false,
          }))
        : [
          { 
            isApplicableToAllShops: !values.region ? true : false,
          }
        ],
      startDate: values.start_date,
      isApplicableToAllRegions: values.region && values.region.length > 0 ? false : true,
      isApplicableToAllShops: !values.region ? true : false,
      endDate: values.end_date,
      isApplicableToAll: !values.zone ? true : values.isApplicableToAll ? true : false,
      isActive: true,
    };

    delete formData.zone;
    delete formData.start_date;
    delete formData.end_date;
    delete formData.region;
    formData.metaData = { ...values };

    if(this.props.match.params.index){
      delete formData.zones;
      delete formData.regions;
    }
    console.log(formData, "formDataPromotion");

    if (this.props.match.params.index) {
      formData["id"] = parseInt(this.props.match.params.index);
    }

    if (this.props.match.params.index) {
      return updatePromotionUsingMicroservice(formData)
        .then((result) => {
          toast.success('Promo code updated successfully.');
          this.props.reset();
          this.props.history.push('/dashboard/promotionsetting');
        })
        .catch((error) => {
          // Handle error
        });
    } else {
      return createPromotionUsingMicroservice(formData)
        .then((result) => {
          toast.success('Promotion added successfully.');
          this.props.reset();
          this.props.history.push('/dashboard/promotionsetting');
        })
        .catch((error) => {
          // Handle error
        });
    }
  }

  render() {
    const {handleSubmit, pristine, submitting} = this.props;
    console.log(this.state.initialDate,"initialDate")
    return (
      <div className="container ani-ui-block">
        <div className="row menu-top-block">
          <div className="col-sm-12 tl-block align-self-center">
            <h4 className="heading">{this.props.match.params.index ? "Edit New Promotion Setting" : "Add New Promotion Setting"}</h4>
          </div>
        </div>
        <form onSubmit={handleSubmit(this.submitMenuForm)}>
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="add-left-block">
                <PromotionInfo 
                  updateDateInfo={this.updateDateInfo} 
                  isActionUpdate={this.isActionUpdate} 
                  initialDate={this.state.initialDate}
                  editSettingId={this.props.match.params.index}
                />
                <div className="row save-button-block">
                  <div className="col-sm-12 align-self-center">
                    <button type="submit" disabled={submitting} className="btn green-btn">
                      Submit details {submitting && <i className="fa fa-spinner fa-spin"></i>}
                    </button>
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

AddNewPromotionSetting = reduxForm({
  form: 'AddNewPromotionSettingValue',
  destroyOnUnmount: false,
  enableReinitialize: false,
  keepDirtyOnReinitialize: false,
})(AddNewPromotionSetting)

export default AddNewPromotionSetting;
