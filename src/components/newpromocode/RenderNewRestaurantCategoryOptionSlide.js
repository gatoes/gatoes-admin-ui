import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Field } from 'redux-form';
import renderReactSelect from '../FormFields/renderReactSelect';
import {  getshopcategoryNew, getmenulistNew } from '../../actions/shops';
import { categoryItemSuccess, categoryObjectSuccess, itemObjectSuccess, shopObjectSuccess } from '../../actions/newpromocodes';
import { withRouter } from 'react-router-dom';


class RenderNewRestaurantCategoryOptionSlide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restcategory : props.restcategory,
      conditionpromo:props.conditionpromo,
      index: props.index,
      fields: props.fields,
      shopList: [],
      restaurentCategoryList:[],
      restaurentCategoryItemList:[],
      shopId:'',
    }
    this.handleRes = this.handleRes.bind(this);
    this.handleCatItem = this.handleCatItem.bind(this)
    this.handleItem = this.handleItem.bind(this)
    console.log(this.props,"Heypros")
  }

  

  handleRes(e){
    console.log(e,"HeyShopId")
    // const shopIds = e.map(shop => shop.shopId);
   
    // this.props.shopObjectSuccess(e[0])

    // console.log(shopIds,"shopIds")
    // if(e.length == 0){
      this.setState({
        restaurentCategoryList:[],
        restaurentCategoryItemList:[]
      })
    // }else{
      getshopcategoryNew({shopId : e.shopId}).then((response) => {
        this.setState({
          restaurentCategoryList: response.data.data,
          shopId:e.shopId
        });
      })
      getmenulistNew({shopId:e.shopId}).then((response) => {
        this.setState({
          restaurentCategoryItemList:response.data.data.menu
        });
        
  
      })
    // }
   
  }

  handleCatItem(e,index){
    const categoryIds = e.map(cat => cat.id);

    // let categoryId = e.map(cat => cat.id);
    // let regionId = e.map(region => region.regionId)
    let shopId = e.map(shop => shop.shopId)
    // let zoneId = e.map(zone => zone.zoneId)

    
    // let categoryObject  = {
    //   categoryId,regionId,shopId,zoneId
    // }
    this.props.categoryObjectSuccess(e[0])
    if(e.length == 0){
      this.setState({
        restaurentCategoryItemList:[]
      })
    }else{
    getmenulistNew({shopId:shopId,categoryId:categoryIds}).then((response) => {
      this.setState({
        restaurentCategoryItemList:response.data.data.menu
      });
      

    })
  }
  }

  handleItem(e){
      this.props.itemObjectSuccess(e[0])
      }


  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log(nextProps, "nextProps1212");
  //   if (nextProps.conditionpromo !== prevState.conditionpromo) {
  //     return {
  //       conditionpromo: nextProps.conditionpromo,
  //     };
  //   }
  //   return null;
  // }
  
  // comment old code
  componentDidMount() {
    if (this.props.match.params.index) {
      console.log(this.props.match.params.index, "restcategoryProps");
  
      // Define filterCategorie and filterShopCategory variables
      let filterCategorie;
      let filterShopCategory;
      let filterItem
  
      // Call API to get menu list
      getmenulistNew().then((response) => {
        console.log(response,this.props.conditionpromo,this.state.conditionpromo, "responseMenu");
  
        if(this.props.conditionpromo && this.props.conditionpromo.length > 0 && this.props.conditionpromo[this.props.conditionpromoIndex].restcategory !== undefined){
          let restcategory = this.props.conditionpromo[this.props.conditionpromoIndex].restcategory[this.props.index];

          if (restcategory && restcategory.category) {
            let resturantsItem = restcategory.category ? restcategory.category : [];
            if (resturantsItem && resturantsItem.length > 0) {
              filterItem = response.data.data.menu.filter((item) => {
                return resturantsItem.some((list) => list == item.categoryId);
              });
            } else {
              filterItem = [];
            }
          }
      
            if (restcategory && restcategory.restaurant) {
              // let resturants = restcategory.restaurant;
              if (restcategory !== undefined) {
                filterShopCategory = response.data.data.category.filter((item) => {
                  return restcategory.restaurant == item.shopId;
                });
              } else {
                filterShopCategory = [];
              }
            }
          
          // else{
          //     filterItem = response.data.data.menu
          //   }

             console.log(filterItem,"filterItem")
  
          // Update state with menu list data
          this.setState({
            restaurentCategoryItemList: filterItem,
            restaurentCategoryList: filterShopCategory,
          });
        }
       
           // Call API to get shop category list after menu list is fetched
      //  getshopcategoryNew().then((response) => {
      //   console.log(response,this.props.conditionpromo,this.state.conditionpromo,"responseShopCategoryList")
      //   // Update state with shop category list data
      //   // this.setState({
      //   //   restaurentCategoryList: response.data.data,
      //   // });
      //   // Compute filterCategorie array
      //   // filterCategorie = this.props.conditionpromo.map((c) => {
      //   //   return c.restcategory
      //   //     .filter((cat) => cat && cat.restaurant)
      //   //     .map((cat) => cat.restaurant[0]);
      //   // });

      //   if (this.props.conditionpromo && this.props.conditionpromo.length > 0 && this.props.conditionpromo[this.props.conditionpromoIndex].restcategory !== undefined) {
      //     let restcategory = this.props.conditionpromo[this.props.conditionpromoIndex].restcategory[this.props.index];
      //     console.log(restcategory,"CategoruRestCategory")
      //     if (restcategory && restcategory.restaurant) {
      //       // let resturants = restcategory.restaurant;
      //       if (restcategory !== undefined) {
      //         filterShopCategory = response.data.data.filter((item) => {
      //           return restcategory.restaurant == item.shopId;
      //         });
      //       } else {
      //         filterShopCategory = [];
      //       }
      //     }
      //     // else{
      //     //   filterShopCategory = response.data.data
      //     // }
         
      //   }
      

      //   this.setState({
      //     restaurentCategoryList:filterShopCategory
      //   })
      //   // Log filterShopCategory and filterCategorie after they have been computed
      //   console.log(filterShopCategory, "filterShopCategory");
      //   console.log(filterCategorie, "filterCategorie");
      // });
  
       
      });
    
    }
  }


 


  render() {
    const {shopCategoryList,  restcategory, restaurentCategoryList, restaurentCategoryItemList,index, fields} = this.state;
    const {restaurentList,conditionpromoIndex,hideItemAndCategory} = this.props
    console.log("INDEXING", index,conditionpromoIndex)
    console.log(this.props.conditionpromo, "ConditionPromo12123213")
    console.log(hideItemAndCategory,"hideItemAndCategory")
    return (
      <div className="row mp-addon">
        <div className="col-sm-12 multiple-ui-addon newpromo_wrap">
          <Field
            label="Choose Restaurant"
            name={`${restcategory}.restaurant`}
            optionLabel='shopName'
            optionValue='shopId'
            options={restaurentList}
            component={renderReactSelect}
            placeholder="Choose Restaurant"
            multi={false}
            parentDivClass="form-group w-45"
            className="select-ui"
            parentCallback={ this.handleRes }
          />
          {!hideItemAndCategory && (
            <>
          <Field
            label="Choose Restaurant Category"
            name={`${restcategory}.category`}
            optionLabel='name'
            optionValue='id'
            options={restaurentCategoryList}
            component={renderReactSelect}
            placeholder="Choose Category"
            multi={true}
            className="select-ui"
            parentDivClass="form-group w-45"
            parentCallback={(e) => this.handleCatItem(e,index) }

          /> <Field
          label="Choose Restaurant Item"
          name={`${restcategory}.item`}
          optionLabel='name'
          optionValue='id'
          options={restaurentCategoryItemList}
          component={renderReactSelect}
          placeholder="Choose Item"
          multi={true}
          className="select-ui"
          parentDivClass="form-group w-45"
          parentCallback={this.handleItem}
        />
        </>
      )}

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


const mapDispatchToProps = (dispatch) => {
  return {
   itemObjectSuccess: (payload) => {
      dispatch(itemObjectSuccess(payload));
    },
    categoryObjectSuccess:(payload) => {
        dispatch(categoryObjectSuccess(payload));
      },
      categoryItemSuccess:(payload) => {
        dispatch(categoryItemSuccess(payload));
      },
      shopObjectSuccess:(payload) => {
        dispatch(shopObjectSuccess(payload))
      },
  };
}
RenderNewRestaurantCategoryOptionSlide = withRouter(RenderNewRestaurantCategoryOptionSlide);
export default connect(null, mapDispatchToProps)(RenderNewRestaurantCategoryOptionSlide);
