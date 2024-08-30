import React, { Component } from 'react';
import { connect } from 'react-redux';
import {updateOutOfStockItemsAltQty} from '../../actions/orders';
// import { reduxForm, Field, SubmissionError, reset, FieldArray, formValueSelector } from 'redux-form';
// import renderRadio from '../FormFields/renderRadio';
// import RenderRecommendedItem from './RenderRecommendedItem';

class RecommendedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.items,
      mainItemId: props.mainItemId,
      qty: 1,
      isChecked: false
    };
  }

  updateQuantity(e){
    const {value} = e.target;
    const {item, mainItemId, isChecked} = this.state;
    this.setState({
      qty: value
    });
    if(isChecked)
      this.props.updateOutOfStockItemsAltQty(mainItemId, item.id, value);
  }

  addRemoveAltItem(e){
    const {checked} = e.target;
    let {qty, mainItemId, item} = this.state;
    if(!checked){
      qty = 0;
    }

    this.setState({
      isChecked: checked
    });

    this.props.updateOutOfStockItemsAltQty(mainItemId, item.id, qty);
  }

  render() {
    const { item, mainItemId, qty, isChecked} = this.state;
    var timestamp = new Date().getUTCMilliseconds();
    return (
      <li>
        <div className="item-info">
          <label>
            <input checked={isChecked} type="checkbox" defaultValue={item.id} onChange={this.addRemoveAltItem.bind(this)} /><span className="check-ui"></span>
            {item.itemName} . {item.price}
          </label>
          <input type="number" name="quantity" placeholder="quantity" value={qty} onChange={this.updateQuantity.bind(this)} />
        </div>
      </li>
    )
  }
}

export default connect(null, {updateOutOfStockItemsAltQty})(RecommendedItem);