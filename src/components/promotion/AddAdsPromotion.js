import React, { Component } from 'react';
import { reduxForm} from 'redux-form';
import {  enrollPromotionThroughAdminUsingMicroservice, promotionByIdUsingMicroservice } from '../../actions/newpromotion';
import { toast } from 'react-toastify';
import PromotionForm from './PromotionForm';

class AddAdsPromotion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_submitting: false,
      status: props.status,
      isAction: true,
      initialDate:null,
      promotionDetails: {}, 

    }
    // console.log(this.props.match.params.index,"this.props.match.params.index")
    this.updateDateInfo = this.updateDateInfo.bind(this);
    this.isActionUpdate = this.isActionUpdate.bind(this);
    this.updatePromotionDetails = this.updatePromotionDetails.bind(this);
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
  updatePromotionDetails(details) {
    this.setState({ promotionDetails: details });
  }
 
  updateDateInfo(datename, date){
    this.props.change(datename, date); 
  }

  isActionUpdate(type){
    this.setState({
      isAction: type == 4 ? false : true
    })
  }

 

  submitMenuForm(values) {
    console.log(values,"values")
    const { promotionDetails } = this.state;

    const formValues = {
      startDate: values.start_date,
      endDate: values.end_date,
      promotionCategoryId: 3,
      budget: parseInt(values.budget),
      status: 1,
      shopId:values.shopId,
      promotionId: promotionDetails.getPromotionId ? promotionDetails.getPromotionId : null,
      basePrice: promotionDetails.basePrice,
      perClickCharges: promotionDetails.perClickCharges,
      minimumDays: promotionDetails.minimumDays,
      merchantId:promotionDetails.merchantId
    };

    // console.log(formValues,"formValuesAdd")
    enrollPromotionThroughAdminUsingMicroservice(formValues).then((result) => {
      toast.success('Promotion added successfully.');
       
      this.props.reset();
      this.setState({
        startDate:null,
        endDate:null
      })
      this.props.history.push('/dashboard/enrollmentrequest') 
    }).catch(error => {
      // Handle error
    });
    
    console.log(formValues,"valuesPromoType")
  }
 

  render() {
    const {handleSubmit, pristine, submitting,} = this.props;
    console.log(this.state.initialDate,"initialDate")
    return (
      <div className="container ani-ui-block">
        <div className="row menu-top-block">
          <div className="col-sm-12 tl-block align-self-center">
            <h4 className="heading">{this.props.match.params.index ? "Edit Ads Promotion" : "Add Ads Promotion"}</h4>
          </div>
        </div>
        <form onSubmit={handleSubmit(this.submitMenuForm.bind(this))}>
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="add-left-block">
                <PromotionForm updateDateInfo={this.updateDateInfo} isActionUpdate={this.isActionUpdate} 
                initialDate={this.state.initialDate}
                updatePromotionDetails={this.updatePromotionDetails} 
                />
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

AddAdsPromotion = reduxForm({
  form: 'AddPromotionValue',
  destroyOnUnmount: false,
  enableReinitialize: false,
  keepDirtyOnReinitialize: false,
})(AddAdsPromotion)

export default AddAdsPromotion;

