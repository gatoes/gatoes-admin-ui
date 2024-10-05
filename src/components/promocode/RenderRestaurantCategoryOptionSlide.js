import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError, reset, FieldArray } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import renderReactSelect from '../FormFields/renderReactSelect';
import { shopListing, restaurantCategoryListing } from '../../actions/shops';

class RenderRestaurantCategoryOptionSlide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restcategory : props.restcategory,
      index: props.index,
      fields: props.fields,
      shopList: [],
      shopCategoryList:[]
    }
    this.handleShops = this.handleShops.bind(this);
  }

  componentDidMount(){
    shopListing().then((response) => {
      this.setState({
        shopList : response.data.data.shop
      })
    })
  }

  handleShops(e){
    restaurantCategoryListing({shopId : e.shopId}).then((response) => {
      console.log("here for the category",response)
      this.setState({
        shopCategoryList: response.data.data.categories
      });
    })
  }

  // componentWillMount(){
  //   if(this.props.fields.length == 0){
  //     this.props.fields.push();
  //   }
  // }

  render() {
    const {shopList, shopCategoryList, restcategory, index, fields} = this.state;
    return (
      <div className="row mp-addon">
        <div className="col-sm-12 multiple-ui-addon">
          <Field
            label="Choose Restaurant"
            name={`${restcategory}.restaurant`}
            optionLabel='shopName'
            optionValue='shopId'
            options={shopList}
            component={renderReactSelect}
            placeholder="Choose Restaurant"
            multi={false}
            parentDivClass="form-group w-45"
            className="select-ui"
            parentCallback={ this.handleShops }
          />
          <Field
            label="Choose Restaurant Category"
            name={`${restcategory}.category`}
            optionLabel='name'
            optionValue='id'
            options={shopCategoryList}
            component={renderReactSelect}
            placeholder="Choose Category"
            multi={true}
            className="select-ui"
            parentDivClass="form-group w-45"
          />

          <div className="form-group v-action">
            <div className="delete-varient">
                <a href="javscript:void(0);" onClick={() => fields.remove(index)}><i className="material-icons">clear</i></a>
            </div>
          </div>
          
        </div>
      </div>
    )
  }

}

export default RenderRestaurantCategoryOptionSlide;