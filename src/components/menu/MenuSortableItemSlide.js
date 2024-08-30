import React, { Component, Suspense } from 'react';
import MenuItemSlide from './MenuItemSlide';
import {changeItemPosition} from '../../actions/menus';
import {sortableContainer, sortableElement, sortableHandle} from 'react-sortable-hoc';
import arrayMove from 'array-move';
const DragHandle = sortableHandle(() => <td><span></span></td>);
const SortableItem = sortableElement(({menuListing, shopId, items, index, catIndex, vegStatus}) => <MenuItemSlide menuListing={menuListing} shopId={shopId} items={items} index={index} catIndex={catIndex} vegStatus={vegStatus} component={<DragHandle />} />);

const SortableContainer = sortableContainer(({children}) => {
  return <table><tbody>{children}</tbody></table>;
});


class MenuSortableItemSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      menuListing: [...props.menuListing],
      shopId: props.shopId,
      catIndex: props.index,
      slideData: props.slideData,
      categoryId: props.categoryId,
      status: props.status,
      vegStatus: props.vegStatus
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      menuListing: [...nextProps.menuListing],
      slideData: nextProps.slideData
    });
  }

  onSortEnd({oldIndex, newIndex}){
    changeItemPosition({oldPosition: this.state.slideData[oldIndex].ordering, newPosition: this.state.slideData[newIndex].ordering, categoryId: this.state.categoryId, itemId: this.state.slideData[oldIndex].id}).then((response) => {
      this.setState({
        menu_list:  response.data.data.menu
      });
      this.props.updateCategoryState(response.data.data.menu);
    })
  }

	render() {
    const {menuListing, shopId, catIndex, slideData, status, vegStatus} = this.state;
    //console.log('menuListing', menuListing);
  	return (
      <SortableContainer onSortEnd={this.onSortEnd.bind(this)} useDragHandle>
        {
          slideData && slideData.length > 0 &&
        slideData.map((items, undex) => (
            <SortableItem key={items.id} items = {items} index={undex} catIndex={catIndex} menuListing={this.state.menuListing} shopId={this.state.shopId} vegStatus={this.state.vegStatus} />
          ))
        }
      </SortableContainer>
  	);
	}
}

export default MenuSortableItemSlide;