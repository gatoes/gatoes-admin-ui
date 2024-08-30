import React, { Component, Suspense } from 'react';
import {currencyFormat, DELETE_CONFIRMATION, DELETE_SUCCESS, ACTIVATE_SUCCESS, ACTIVATE_CONFIRMATION, DEACTIVATE_SUCCESS} from '../../constants';
import { Link } from 'react-router-dom';
import moment from 'moment';
import DieteryStatus from '../common/DieteryStatus';
import {getDieteryStatus} from '../../utilities';
import { connect } from 'react-redux';
import MenuSortableItemSlide from './MenuSortableItemSlide';
import {deleteMenuMultipleItems} from '../../actions/menus';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify';
import {getAclChecks} from '../../utilities';

class MenuCategoryItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      menuListing: [...props.menuListing],
      shopId: props.shopId,
      status: props.status
    };

    this.filterData = {
        veg: [],
        name: ''
    };

    
    this.filterItemType = this.filterItemType.bind(this);
    this.filterItemsByName = this.filterItemsByName.bind(this);
    this.deleteAllItem = this.deleteAllItem.bind(this);
    //this.filterResults = this.filterResults.bind(this);
  }

  componentWillReceiveProps(nextProps){
    console.log('nextProps', nextProps);
    this.setState({
      menuListing: [...nextProps.menuListing]
    });
  }

  filterItemsByName(e){
    const {value} = e.target;
    if(value.length > 2 || !value.length){
      this.filterData.name = value;
      this.filterResults();
    }
  }

  filterItemType(e){
    const {value, checked} = e.target;
    
    if(checked){
      this.filterData.veg.push(value);
    }else{
      this.filterData.veg.splice(this.filterData.veg.indexOf(value), 1);
    }

    this.filterResults()
  }

  filterResults(){
    const type = this.filterData.veg;
    const itemName = this.filterData.name.toLowerCase();
    let result = [...this.props.menuListing];
    if(type.length == 1){
      result = result.map(item => {
        const r = {...item};
        if(type.indexOf("1") < 0){
          r.vegItem = [];
        }else{
          r.nonVegItem = [];
        }

        return r;
      });
    }

    if(itemName !== null && itemName != ''){
      result = result.map(item => {
        const r = {...item};
        r.nonVegItem = r.nonVegItem.filter(i => {
          if(i.itemName.toLowerCase().indexOf(itemName) >= 0)
            return true;

          return false
        });

        r.vegItem = r.vegItem.filter(i => {
          if(i.itemName.toLowerCase().indexOf(itemName) >= 0)
            return true;

          return false
        });

        return r;
      });
    }

    this.setState({
      menuListing: result
    });
      
  }

  onSortEnd({oldIndex, newIndex}){
    //console.log(oldIndex,'***', newIndex);
    
  }

  deleteAllItem(catId, shopId){
    confirmAlert({
      title: '',
      message: DELETE_CONFIRMATION,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteMenuMultipleItems({catId: catId, shopId: shopId}).then((response) => {
              toast.success(DELETE_SUCCESS, {
                position: toast.POSITION.TOP_RIGHT
              });
              window.location.reload();
            });
          }
        },
        {
          label: 'No'
        }
      ]
    })
  }

	render() {
    const visibleStat = getDieteryStatus();
    const {menuListing} = this.state;
    console.log('menuListing', menuListing);
    if(typeof menuListing === 'undefined' || menuListing === null || menuListing.length == 0)
      return null;

    	return (
        <>
        <div className="row search-block">
          <div className="col-lg-8 col-md-7">
            <div className="search-ui">
              <input type="search" placeholder="Search Menu Items..." name="name" onChange={this.filterItemsByName} />
              <button className="searchbtn-ui"><i className="material-icons">search</i></button>
            </div>
          </div>
          {
            visibleStat && (visibleStat == 1)
            ?
            <div className="col-lg-4 col-md-5">
              <ul className="cs-check-box">
                <li>
                  <div className="os-check-box">
                    <input type="checkbox" name="veg" id="veg" defaultValue="1" onChange={this.filterItemType} />
                    <label htmlFor="veg">Veg</label>
                  </div>
                </li>
                <li>
                  <div className="os-check-box">
                    <input type="checkbox" name="veg" id="nveg" defaultValue="0" onChange={this.filterItemType} />
                    <label htmlFor="nveg">Non-Veg</label>
                  </div>
                </li>
                
              </ul>
            </div>
            :
            null
          }
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="pl-ui-block">
              {
                this.state.menuListing && this.state.menuListing.length > 0
                ?
                this.state.menuListing.map((obj, index) => (
                  <>
                	{
                    obj.vegItem.length > 0 || obj.nonVegItem.length > 0
                    ?
                    <div className="r-items-block" id={"list-item-"+index} key={obj.id}>
                      <label className="item-heading">
                        {obj.category_name}
                        {
                          getAclChecks('SHOP_MENU_DELETE')
                          ?
                          <small><a href="javascript:void(0)" onClick={() => this.deleteAllItem(obj.id, this.state.shopId)}>Delete `{obj.category_name}` items</a></small>
                          :
                          null
                        }
                        
                      </label>
                      
                      <div className="list-block">
                        { 
                          obj.vegItem && obj.vegItem.length > 0 
                          && 
                          <div className="v-item-block">
                            {
                              visibleStat && (visibleStat == 1)
                              ?
                              <h3>Veg</h3>
                              :
                              null
                            }
                            <MenuSortableItemSlide index={index} slideData={obj.vegItem} menuListing={this.state.menuListing} shopId={this.state.shopId} categoryId={obj.id} updateCategoryState={this.props.updateCategoryState} vegStatus="true" />
                          </div>
                        }

                        { 
                          obj.nonVegItem && obj.nonVegItem.length > 0 && 
                          <div className="v-item-block">
                            {
                              visibleStat && (visibleStat == 1)
                              ?
                              <h3>Non Veg</h3>
                              :
                              null
                            }
                            <MenuSortableItemSlide index={index} slideData={obj.nonVegItem} menuListing={this.state.menuListing} shopId={this.state.shopId} categoryId={obj.id} updateCategoryState={this.props.updateCategoryState} vegStatus="false" />
                          </div>
                        }

                      </div>
                    </div>
                    :
                    ''
                  }
                  </>
                ))
                :
                <div className="r-items-block">
                  <div className="empty-screen-ui">
                    <figure><img src="/assets/images/img_empty_menu.svg" alt=""/></figure>
                    <figcaption>
                      <h5>No Items found</h5>
                      <p>There’s no items in the menu available at this moment. Add new menu Item from web panel.</p>
                    </figcaption>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
        </>
    	);
  	}
}

export default MenuCategoryItem;