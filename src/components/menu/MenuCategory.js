import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import MenuCategorySlide from './MenuCategorySlide';
import Modal from '../../Modal';
import AddMenuCategory from './AddMenuCategory';
import AddCategoryFooter from './AddCategoryFooter';
import { submit } from 'redux-form';
import {menuListing, menuListingSuccess, updateMenuCategoryOrder} from '../../actions/menus';
import {sortableContainer, sortableElement, sortableHandle} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import {getAclChecks} from '../../utilities';

const DragHandle = sortableHandle(() => <span></span>);

const SortableItem = sortableElement(({shopId, slideData, index, reloadMenuListing}) => <MenuCategorySlide shopId={shopId} slideData={slideData} index={index} reloadMenuListing={reloadMenuListing} component={<DragHandle />} />);

const SortableContainer = sortableContainer(({children}) => {
  return <ul>{children}</ul>;
});

class MenuCategory extends Component {
  constructor(props){
    super(props);
    this.state = {
      menuListing: props.menuListing,
      shopId: props.shopId,
      status: props.status,
      lang: window.localStorage.contentlanguage ? window.localStorage.contentlanguage : 'en'
    };
    this.deleteCategoryFromMenuListing = this.deleteCategoryFromMenuListing.bind(this);
    this.reloadMenuListing = this.reloadMenuListing.bind(this);
  }

  componentWillReceiveProps(nextProps){
      this.setState({
        menuListing: nextProps.menuListing,
        shopId: nextProps.shopId
      });
  }

  addMenuCategory(e){
    const {shopId} = this.state;
    console.log('1111', this.state.shopId);
    window.getFooter().setState({
      renderElement: <Modal 
              id="add-new-category"
              show={true}
              onHide={this.hide}
              header={<h4 className="modal-title">Add New Category</h4>}
              body={<AddMenuCategory shopId={this.state.shopId} />}
              footer={<AddCategoryFooter reloadMenuListing={this.reloadMenuListing} />} 
            />
    });
  }

  reloadMenuListing(){
    menuListing({shopId : this.state.shopId}).then((response) => {
      this.props.menuListingSuccess(response.data.data.menu);
      this.setState({
        menuListing: response.data.data.menu
      });
    })
    this.hide();
  }

  deleteCategoryFromMenuListing(index){
    const {menuListing} = this.state;
    menuListing.splice(index, 1);
    this.setState({
      menuListing
    });
  }

  hide(){
    window.$$('body').removeClass('modal-open');
    window.$$('body').find('.modal-backdrop').removeClass('modal-backdrop');
    window.getFooter().setState({
        renderElement: null
    });
  }

  onSortEnd({oldIndex, newIndex}){
    // this.setState({
    //   menuListing: arrayMove(this.state.menuListing, oldIndex, newIndex),
    // });

    updateMenuCategoryOrder({oldPosition: this.state.menuListing[oldIndex].position, newPosition: this.state.menuListing[newIndex].position, categoryId: this.state.menuListing[oldIndex].id, shopId: this.state.shopId}).then((response) => {
      this.setState({
        menuListing: response.data.data.menu
      });
      this.props.updateCategoryState(response.data.data.menu);
    })
    
    
  }

	render() {
    const {shopId, lang} = this.state;
    //console.log('11', shopId);
  	return (
    	<div className="sidebar-ui-block">
        
      	<div className="sidebar-heading">
        		<h4>Categories</h4>
            {
              getAclChecks('SHOP_MENU_ADD_EDIT') && lang == 'en'
              ?
        		  <a href="javscript:void(0);" className="add-text-btn" onClick={this.addMenuCategory.bind(this)}>ADD NEW<i className="material-icons">add_circle_outline</i></a>
              :
              null
            }
      	</div>
        {
          this.state.menuListing && this.state.menuListing.length > 0
          ?
        	<div id="" className="menulist-ui list-group">
              <SortableContainer onSortEnd={this.onSortEnd.bind(this)} useDragHandle>
                {
                  this.state.menuListing && this.state.menuListing.length > 0 &&
                  this.state.menuListing.map((obj, index) => (
                    <SortableItem key={obj.id} slideData = {obj} index={index} reloadMenuListing={this.deleteCategoryFromMenuListing} shopId={shopId} />
                  ))
                }
              </SortableContainer>
        	</div>
          :
          <div className="no-menu-block">
            <div className="no-categories-inner-ui">
              <figure><img src="/assets/images/img_category_empty.svg" alt=""/></figure>
              <figcaption>
                <h5>No Menu Categories</h5>
                <p>Create your first menu category</p>
                <a href="javascript: void(0)" className="btn" onClick={this.addMenuCategory.bind(this)}>ADD NEW</a>
              </figcaption>
            </div>
          </div> 
        }
    	</div>
  	);
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    menuListingSuccess: (payload) => {
      dispatch(menuListingSuccess(payload));
    },

  };
}

export default connect(null, mapDispatchToProps)(MenuCategory);