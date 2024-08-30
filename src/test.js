import React, { Component, Suspense } from 'react';
import {currencyFormat, DELETE_CONFIRMATION, DELETE_SUCCESS, ACTIVATE_SUCCESS, ACTIVATE_CONFIRMATION, DEACTIVATE_SUCCESS} from '../../constants';
// import { confirmAlert } from 'react-confirm-alert';
// import 'react-confirm-alert/src/react-confirm-alert.css';
// import { toast } from 'react-toastify';
// import {deleteMenuItem, deleteMenuItemSuccess } from '../../actions/menus';
 import { Link } from 'react-router-dom';
// import ChangeItemStatusForm from './ChangeItemStatusForm';
// import Modal from '../../Modal';
// import {statusItemAvailability} from '../../actions/menus';
import moment from 'moment';
import DieteryStatus from '../common/DieteryStatus';
import {getDieteryStatus} from '../../utilities';
import { connect } from 'react-redux';
import MenuItemSlide from './MenuItemSlide';
import {sortableContainer, sortableElement, sortableHandle} from 'react-sortable-hoc';
import arrayMove from 'array-move';
const DragHandle = sortableHandle(() => <td><span></span></td>);


const SortableItem = sortableElement(({menuListing, shopId, items, index, undex}) => <MenuItemSlide menuListing={menuListing} shopId={shopId} items={items} index={index} undex={undex} component={<DragHandle />} />);

const SortableContainer = sortableContainer(({children}) => {
  return <table><tbody>{children}</tbody></table>;
});


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
    //this.filterResults = this.filterResults.bind(this);
  }

  componentWillReceiveProps(nextProps){
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

    //console.log('result', [...this.props.menuListing], result, type);

    this.setState({
      menuListing: result
    });
      
  }

  onSortEnd({oldIndex, newIndex}){
    console.log(oldIndex,'***', newIndex);
    
  }

    render() {
    const visibleStat = getDieteryStatus();
    const {menuListing} = this.state;
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
                      <label className="item-heading">{obj.category_name}</label>
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
                            
                                <SortableContainer onSortEnd={this.onSortEnd.bind(this)} useDragHandle>
                                  {
                                    obj.vegItem && obj.vegItem.length > 0 &&
                                  obj.vegItem.map((items, undex) => (
                                      <SortableItem key={items.id} items = {items} index={undex} undex={undex} menuListing={this.state.menuListing} shopId={this.state.shopId} />
                                    ))
                                  }
                                </SortableContainer>
                             
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
                            <table>
                              <tbody>
                                {
                                  obj.nonVegItem && obj.nonVegItem.length > 0 &&
                                  obj.nonVegItem.map((items, undex) => (
                                      <tr key={items.id}>
                                        <td>
                                          <div className="item-name">
                                            <DieteryStatus is_veg='0' />
                                            <p>{items.itemName}</p>
                                            <span className="price">{currencyFormat(items.price, 'INR')}</span>
                                          </div>
                                        </td>
                                        <td>
                                          {
                                            items.availability
                                            ?
                                            <div className="stock-field on-btn" onClick={() => this.changeItemStatus(items.id, undex, index, false)}>
                                              <label className="switch" >
                                                <div className="switch-slider"></div>
                                                   In Stock
                                              </label>
                                            </div>
                                            :
                                            <div className="stock-field off-btn" onClick={() => this.activateItemStatus(items.id, undex, index, false)}>
                                              <label className="switch" >
                                                <div className="switch-slider"></div>
                                                  <span>Next Available {moment(items.nextAvailableOn).format('ll')}</span>
                                              </label>
                                            </div>
                                          }
                                        </td>
                                        <td>
                                          <div className="table-btn-block">
                                            <Link  className="btn edit-btn" to={"/dashboard/editmenuitem/"+ this.state.shopId+'/'+ items.id}>EDIT</Link>
                                            <button className="btn delete-btn" onClick={() => this.deleteItem(items.id, undex, index, false)}>DELETE</button>
                                          </div>
                                        </td>
                                      </tr>
                                  ))
                                }
                              </tbody>
                            </table>
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