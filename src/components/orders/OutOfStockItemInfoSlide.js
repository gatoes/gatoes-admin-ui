import React, { Component, Suspense } from 'react';
import { render } from 'react-dom';
import { reduxForm, Field, reset, FieldArray, formValueSelector } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
//import renderReactSelect from '../FormFields/renderReactSelect';
import { connect } from 'react-redux';
import RecommendedItem from './RecommendedItem';
import {cancelOutOfStockItem} from '../../actions/orders';

class OutOfStockItemInfoSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      index: props.index,
      recommended: props.recommended,
      showPanel: 1
    };
    this.cancelItem = this.cancelItem.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      slideData: nextProps.slideData,
      recommended: nextProps.recommended,
      index: nextProps.index
    });
  }

  cancelItem(e, index, mainId){
    e.preventDefault();
    const {recommended, slideData} = this.state;
    //recommended.splice(index, 1, "0_"+mainId);
    //var formval = recommended.values.recommended_item;
    //console.log('recommended', recommended);
    this.props.cancelOutOfStockItem(slideData.id);
    this.setState({
      showPanel: 0
    });
  }

  hide(){
    window.getFooter().setState({
        renderElement: null
    });
  }

	render() {
      const { slideData, index, showPanel } = this.state;
      console.log('slideData121212', slideData);
      return (
        <>
        {
          showPanel == 1
          ?
          <table className="out-stock-table">
            <thead>
              <tr>
                <th colSpan="3">Items out of stock</th>
              </tr>
            </thead>
            <tbody>
              <tr className="red-bg">
                <td>{slideData.itemName}</td>
                <td>{slideData.currencySymbol + slideData.price}*{slideData.quantity} = {slideData.currencySymbol + slideData.cartPrice}</td>
                <td><button className="cancel-item-btn" onClick={(e) => this.cancelItem(e, index, slideData.id)}>Cancel item </button> </td>
              </tr>
              <tr>
                <td colSpan="3" className="alternative-block">
                <table className="similar-listing-table">
                  <thead>
                    <tr>
                      <th colSpan="2">Similar alternatives</th>
                    </tr>
                  </thead>

                  <tbody>
                    <div>
                    <ul>
                    {
                      slideData && slideData.recommend && slideData.recommend.length > 0 && slideData.recommend.map((obj, index) => (
                        <RecommendedItem items={obj} index={index} mainItemId={slideData.id} key={obj.id} />
                      ))
                    }
                    </ul>
                    </div>
                  </tbody>
                  
                </table>
                </td>
              </tr>
            </tbody>
          </table>
          :
          null
        }
        </>
    	);
  	}
}


const mapStateToProps = (state, ownProps) => {
  const states = {
    recommended: state.form.OutOfStockItemInfoForm && state.form.OutOfStockItemInfoForm.values && state.form.OutOfStockItemInfoForm.values.recommended_item
  };
  return states;
}

export default connect(mapStateToProps, {cancelOutOfStockItem})(OutOfStockItemInfoSlide);