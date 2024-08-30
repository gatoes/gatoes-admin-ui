import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import renderReactSelect from '../FormFields/renderReactSelect';
import { activateCurativeFavouriteForShop, couponActionUsingMicroservice, promotionBannerListingUsingMicroservice, promotionListingByZoneRegionUsingMicroservice, updateEnrollmentStatusUsingMicroservice } from "../../actions/newpromocodes";
import { toast } from "react-toastify";
import MenuItemImage from "../menu/MenuItemImage";

class AcceptEnrollmentRequest extends Component {
    constructor(props) {
      super(props);
      this.state = {
        promotionType: []
      };
      console.log(this.props, "HelloZONEPROPER");
   this.submitMenuForm = this.submitMenuForm.bind(this);
   this.getItemImage = this.getItemImage.bind(this);

    }
  
    getItemImage(imageId){
      this.props.change('image', imageId);
    }

    componentDidMount() {
      const { zoneId, regionId, } = this.props.requestInfo;
  
      promotionBannerListingUsingMicroservice({ zone:zoneId, region:regionId,couponType:4, isActive:true }).then((response) => {
        console.log(response.data.responseData, "promotionEnrollmentListingUsingMicroservice");
        this.setState({
          promotionType: response.data.responseData.data
        });
      });
    }

    submitMenuForm(values) {
      const {startDate,endDate,shopId} = this.props.requestInfo
      console.log(values,"valuesSubmit")

      if(this.props.requestInfo.promotionCategoryId == 1){
        couponActionUsingMicroservice({startDate,endDate,couponId:values.promotionCategoryType, shopId, stage:"enrollment", action:1,couponType:4 }).then((response) => {
          this.props.isUpdate()
              this.props.onHide()
              toast.success("Request Accepted Successfully", {
                  position: toast.POSITION.TOP_RIGHT
                });
                updateEnrollmentStatusUsingMicroservice({id:this.props.requestInfo.id, status:1}).then((response) => {  
                  setTimeout(window.location.reload(),1000)
                });
          });
          
      }else{
        activateCurativeFavouriteForShop({startDate,endDate, image:values.image, shopId, }).then((response) => {  
          this.props.isUpdate()
          this.props.onHide()
          toast.success("Request Accepted Successfully", {
              position: toast.POSITION.TOP_RIGHT
            });
            updateEnrollmentStatusUsingMicroservice({id:this.props.requestInfo.id, status:1}).then((response) => {  
              setTimeout(window.location.reload(),1000)
            });
      });
     
      }
           
         
         
     
    
    }
  render() {
    const {handleSubmit, pristine, submitting,itemObject,categoryObject} = this.props;
    const { promotionType } = this.state;
    console.log(promotionType,"promotionType")
    return (
      <div className="modal-body">
        <div className="popup-content-block">
        <form onSubmit={handleSubmit(this.submitMenuForm.bind(this))}>

          <div className="form-block">
         { this.props.requestInfo.promotionCategoryId == 1 && (
            <div className="row">
              <div className="col-lg-12 selectbox-block">
                <Field
                  label="Promotions"
                  name="promotionCategoryType"
                  optionLabel="label"
                  optionValue="value"
                  options={promotionType.map((item) => ({
                    label: item.title,
                    value: item.id
                  }))}
                  component={renderReactSelect}
                  placeholder="Choose promotion"
                  multi={false}
                  parentDivClass="form-group w-100"
                />
              </div>
              
            </div>
          )}
          </div>
         { (this.props.requestInfo.promotionCategoryId == 2 || this.props.requestInfo.promotionCategoryId == 3) && (
          <div className="row">
              <div className='col'>
                <div className='promoImage_wrap'>
              <MenuItemImage getItemImage={this.getItemImage}/>
              </div>
              </div>
              </div>
            )}
          <div className="row save-button-block">
                  <div className="col-sm-12 align-self-center">
                    <button type="submit" disabled={submitting} className="btn green-btn">Accept{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
                    
                  </div>
                </div>
            </form>

        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'acceptEnrollmentRequestForm'
})(AcceptEnrollmentRequest);
