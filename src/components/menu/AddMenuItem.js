import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reduxForm, Field, SubmissionError, reset, FieldArray, formValueSelector } from 'redux-form';
import renderFieldLabelTransition from '../FormFields/renderFieldLabelTransition';
import renderField from '../FormFields/renderField';
import renderSelect from '../FormFields/renderSelect';
import renderRadio from '../FormFields/renderRadio';
import CheckboxGroup from '../../CheckboxGroup';
import renderTextarea from '../FormFields/renderTextarea';
//import Select from 'react-select';
import {ADDONS_CATEGORY, VEG_CATEGORY} from '../../constants';
//import RenderVariants from './RenderVariants';
import RenderSemiAddons from './RenderSemiAddons';
import RenderAddons from './RenderAddons';
import MenuItemImage from './MenuItemImage';
import { addMenuItems, addMenuItemsSuccess, menuCategory, menuCategorySuccess } from '../../actions/menus';
import {toast} from 'react-toastify';
import renderReactSelect from '../FormFields/renderReactSelect';
import validate from './validateMenu';
import ShowSingleVariant from './ShowSingleVariant';
import ShowMultipleVariant from './ShowMultipleVariant';
import {getDieteryStatus} from '../../utilities';

class AddMenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_submitting: false,
      menuCategory: props.menuCategory,
      shopId: props.match.params.shopid,
      status: props.status,
      selectAddonCategory: null,
      selectMenuCategory: null,
      showmultipleVariant: '',
      showsingleVariant:'active',
      finalPrice: 0,
      itemPricing: 0,
      packagePricing: 0,
      offerPricing:0,
      isAddon: false
    }
    this.handleAllChecked = this.handleAllChecked.bind(this);
    this.handleAddon = this.handleAddon.bind(this);
    this.getItemImage = this.getItemImage.bind(this);
  }

  componentDidMount(){
    menuCategory({shopId: this.state.shopId}).then((response) => {
      this.props.menuCategorySuccess(response.data.data.categories);
    });
    this.props.change('isVeg', null);
    this.props.change('multipleVariant', '0');
    this.props.change('shopId', this.state.shopId);
  }

  getItemImage(imageId){
    this.props.change('itemImage', imageId);
  }

  handleAllChecked (e) {
    const chkval = e.target.value;
    if(chkval == 1){
      this.setState({
        showmultipleVariant : 'active',
        showsingleVariant: ''
      });
    } else {
      this.setState({
        showsingleVariant: 'active',
        showmultipleVariant : ''
      });
    }
  }

  handleAddon(e){
    this.setState({
      isAddon: !this.state.isAddon
    });
  }

  submitMenuForm(values){
    return addMenuItems(values)
    .then((result) => {
      toast.success('Menu added Successfully.');
      this.props.reset();
      this.props.history.push('/dashboard/menu/' + this.state.shopId);
    }).catch(error => {
      //throw new SubmissionError(error.response.data.error);
    })
  }

  render() {
    const {handleSubmit, pristine, submitting, menuCategory, fullPrice} = this.props;
    const visibleStat = getDieteryStatus();
    console.log('cat', menuCategory);
    return (
      <div className="container ani-ui-block">
        <div className="row menu-top-block">
          <div className="col-sm-12 tl-block align-self-center">
            <h4 className="heading">Add New Item</h4>
          </div>
        </div>
        <form onSubmit={handleSubmit(this.submitMenuForm.bind(this))}>
          <div className="row">
            

            <div className="col-lg-12 col-md-12">
              <div className="add-left-block">
                <div className="fields-ui-block">
                  <div className="basic-details">
                    <div className="heading">
                      <h4>Basic Details</h4>
                    </div>
                    <div className="form-block">
                      <div className="row row1">
                        <div className="col-lg-12">
                          <Field
                            name="itemName"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="Item Name"
                            placeholder="Eg. Paneer Makhani"
                            notes="Max. 100 characters"
                            parentDivClass="w-52"
                          />
                          
                        </div>
                      </div>

                      <div className="row selectbox-block">
                        <div className="col-lg-12">
                          <Field
                            label="Item Category"
                            name='categoryId'
                            optionLabel='name'
                            optionValue='id'
                            options={menuCategory}
                            component={renderReactSelect}
                            placeholder="Select item category"
                            multi={false}
                            parentDivClass="form-group w-52"
                          />
                          <div className="form-group ri-block">
                            <label></label>
                            <ul className="cs-check-box">
                              <li>
                                <div className="os-check-box">
                                  <Field
                                    name="isrecommended"
                                    id="recommended-item"
                                    component="input"
                                    type="checkbox"
                                  />
                                  <label for="recommended-item">Recommended Item</label>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-12">

                          {
                            visibleStat && (visibleStat == 1)
                            ?
                            <div className="form-group">
                              <label className="b-label">Item Type</label>
                              <ul className="cs-check-box item-types">
                                <li>
                                  <div className="os-check-box">
                                    <Field 
                                      type="radio" 
                                      value="1"
                                      name="isVeg"
                                      id="veg" 
                                      label="<span class='v-icon'></span>Veg" 
                                      component={renderRadio}
                                    />
                                  </div>
                                </li>
                                <li>
                                  <div className="os-check-box">
                                    <Field 
                                      type="radio" 
                                      value='0'
                                      name="isVeg"
                                      id="non-veg" 
                                      label="<span class='nv-icon'></span>Non-Veg" 
                                      component={renderRadio}
                                    />
                                  </div>
                                </li>
                                <li>
                                  <div className="os-check-box">
                                    <Field 
                                      type="radio" 
                                      value="2"
                                      name="isVeg"
                                      id="egg" 
                                      label="<span class='nv-icon'></span>Egg" 
                                      component={renderRadio}
                                    />
                                  </div>
                                </li>
                              </ul>
                            </div>
                            :
                            null
                          }
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-12">
                          <Field
                            name="itemDescription"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="Item Description"
                            placeholder=""
                            notes="(Max. 250 Characters)"
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-12">
                          <Field
                            name="tags"
                            component={renderField}
                            type="text"
                            className="form-control"
                            label="Tags"
                            placeholder="Tags"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="price-ui-block">
                    <div className="heading">
                      <h4>Pricing</h4>
                    </div>
                    <div className="form-block">
                      

                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group item-type-ui">
                            <label>Item Type</label>
                            <ul className="cs-check-box">
                              <li>
                                <div className="os-check-box">
                                  <Field 
                                    type="radio" 
                                    value="0"
                                    name="multipleVariant"
                                    id="s-varient" 
                                    label="Single varient" 
                                    component={renderRadio}
                                    onChange={ this.handleAllChecked }
                                  />
                                </div>
                              </li>
                              <li>
                                <div className="os-check-box">
                                  <Field 
                                    type="radio" 
                                    value="1"
                                    name="multipleVariant"
                                    id="d-item" 
                                    label="Multiple varient" 
                                    component={renderRadio}
                                    onChange={ this.handleAllChecked }
                                  />
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {
                        this.state.showsingleVariant && this.state.showsingleVariant == 'active'
                        ?
                        <ShowSingleVariant fullPrice={this.props.fullPrice}/>
                        :
                        <ShowMultipleVariant formProps = {this.props} />
                      }

                      
                      
                    </div>
                  </div>
                </div>


                <div className="fields-addon-block">
                  <div className="form-group">
                    <label></label>
                    <ul className="cs-check-box">
                      <li>
                        <div className="os-check-box">
                          <Field
                            name="isAddon"
                            id="item-addon"
                            component="input"
                            type="checkbox"
                            onClick={ this.handleAddon }
                          />
                          <label for="item-addon">Do you want to addon for this item ?</label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                {
                  this.state.isAddon === true
                  ?
                  <div className="fields-ui-block addon-full-block">
                    <FieldArray name="fulladdons" component={RenderAddons} />
                  </div>
                  :
                  ''
                }
                <div className="col-lg-12 col-md-12 order-lg-2 no-padding">
              <MenuItemImage getItemImage={this.getItemImage} />
            </div>
                
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

AddMenuItem = reduxForm({
  form: 'AddMenuItemValue',
  destroyOnUnmount: false,
  validate
})(AddMenuItem)


const selector = formValueSelector('AddMenuItemValue')
AddMenuItem = connect(
  state => {
    const { itemPrice, packaging_charges } = selector(state, 'itemPrice', 'packaging_charges');
    var item_price = itemPrice?itemPrice:0;
    var packagingCharges = packaging_charges?packaging_charges:0;
    var fullPrice = parseFloat(item_price) + parseFloat(packagingCharges);
    return {
      fullPrice: fullPrice
    }
  }
)(AddMenuItem)



const mapStatesToProps = (state, ownProps) => {
  const states = {
    menuCategory: [...state.Menu.menu_category],
    status: state.Menu.status
  };
  return states;
}

const mapDispatchToProps = (dispatch) => {
  return {
    menuCategorySuccess: (payload) => {
      dispatch(menuCategorySuccess(payload));
    },

  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(AddMenuItem);
