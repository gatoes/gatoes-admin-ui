import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError, reset, FieldArray } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import renderReactSelect from '../FormFields/renderReactSelect';
//import { shopListing, restaurantCategoryListing } from '../../actions/shops';
import RenderRestaurantCategoryOptionSlide from './RenderRestaurantCategoryOptionSlide';

class RenderRestaurantCategoryOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restcategory : props.restcategory
      //shopList: [],
      //shopCategoryList:[]
    }
    //this.handleShops = this.handleShops.bind(this);
  }

  // componentDidMount(){
  //   shopListing().then((response) => {
  //     this.setState({
  //       shopList : response.data.data.shop
  //     })
  //   })
  // }

  // handleShops(e){
  //   restaurantCategoryListing({shopId : e.shopId}).then((response) => {
  //     this.setState({
  //       shopCategoryList: response.data.data
  //     });
  //   })
  // }

  componentWillMount(){
    if(this.props.fields.length == 0){
      this.props.fields.push();
    }
  }

  render() {
    const { fields, meta: { touched, error, submitFailed } } = this.props;
    //const {shopList, shopCategoryList} = this.state;
    return (
      <>
        {
          fields.map((restcategory, index) => {
            return(
            <RenderRestaurantCategoryOptionSlide restcategory={restcategory} index={index} fields={fields} />
          )})
        }
        <div className="row add-more-blocks">
            <div className="col-sm-12">
              <a href="javascript:void(0);" className="btn add-text-btn ad-btn" onClick={() => fields.push({})}><span className="icon-ic_plus"></span>Add more</a>
            </div>
          </div>
      </>
    )
  }

}

const mapStatesToProps = (state, ownProps) => {
  return {
    restcategory: state.form.AddPromoCodeValue && state.form.AddPromoCodeValue.values && state.form.AddPromoCodeValue.values.restcategory
  }
}

export default connect(mapStatesToProps)(RenderRestaurantCategoryOption);