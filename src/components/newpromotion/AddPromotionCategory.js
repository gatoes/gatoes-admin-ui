import React, { Component } from 'react';
import { reduxForm} from 'redux-form';
import PromotionInfo from './PromotionInfo';
import { createPromotionCategoryUsingMicroservice, createPromotionUsingMicroservice, getPromotionCategoryByIdUsingMicroservice, promotionByIdUsingMicroservice, updatePromotionCategoryUsingMicroservice, updatePromotionUsingMicroservice } from '../../actions/newpromotion';
import { toast } from 'react-toastify';
import PromotionCatInfo from './PromotionCatInfo';

class AddPromotionCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_submitting: false,
      status: props.status,
      isAction: true,
      initialDate:null,

    }
    // console.log(this.props.match.params.index,"this.props.match.params.index")
    this.isActionUpdate = this.isActionUpdate.bind(this);
   
    this.submitMenuForm = this.submitMenuForm.bind(this);
    


  }

  componentDidMount(){
    if (this.props.match.params.index) {
      getPromotionCategoryByIdUsingMicroservice({ categoryId: this.props.match.params.index }).then((response) => {
        console.log(response, "responseCategoryId");
         
          this.props.initialize(response.data.category.metaData);
        }
      );
    }
  }

 
  isActionUpdate(type){
    this.setState({
      isAction: type == 4 ? false : true
    })
  }

 

  submitMenuForm(values) {
    let formData = {}
    console.log(values, "valuesPromotionNew");
    formData["metaData"] = { ...values };

     formData = {
      ...values,
     
      isActive: true,
    };

   

    formData.metaData = { ...values };

    console.log(formData, "formDataPromotionCategory");
    // return
    if (this.props.match.params.index) {
      formData["id"] = parseInt(this.props.match.params.index);
    }

    if (this.props.match.params.index) {
      return updatePromotionCategoryUsingMicroservice(formData)
        .then((result) => {
          toast.success('Promotion category updated successfully.');
          this.props.reset();
          this.props.history.push('/dashboard/promotioncategory/');
        })
        .catch((error) => {
          // Handle error
        });
    } else {
      return createPromotionCategoryUsingMicroservice(formData)
        .then((result) => {
          toast.success('Promotion category added successfully.');
          this.props.reset();
          this.props.history.push('/dashboard/promotioncategory/');
        })
        .catch((error) => {
          // Handle error
        });
    }
  }

 

  render() {
    const {handleSubmit, pristine, submitting,} = this.props;
    return (
      <div className="container ani-ui-block">
        <div className="row menu-top-block">
          <div className="col-sm-12 tl-block align-self-center">
            <h4 className="heading">{this.props.match.params.index ? "Edit Promotion Category" : "Add Promotion Category"}</h4>
          </div>
        </div>
        <form onSubmit={handleSubmit(this.submitMenuForm.bind(this))}>
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="add-left-block">
                <PromotionCatInfo updateDateInfo={this.updateDateInfo} isActionUpdate={this.isActionUpdate} 
                editCatId={this.props.match.params.index}
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

AddPromotionCategory = reduxForm({
  form: 'AddNewPromotionValue',
  destroyOnUnmount: false,
  enableReinitialize: false,
  keepDirtyOnReinitialize: false,
})(AddPromotionCategory)

export default AddPromotionCategory;

