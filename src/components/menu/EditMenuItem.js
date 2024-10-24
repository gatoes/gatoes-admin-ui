import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import { addMenuItems, addMenuItemsSuccess, menuItemDetailById, menuItemDetailByIdSuccess, menuCategory, menuCategorySuccess } from '../../actions/menus';
import {toast} from 'react-toastify';
import renderReactSelect from '../FormFields/renderReactSelect';
import validate from './validateMenu';
import ShowSingleVariant from './ShowSingleVariant';
import ShowMultipleVariant from './ShowMultipleVariant';
import {getDieteryStatus, differentiateAddons, differentiateVariant} from '../../utilities';

class EditMenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_submitting: false,
      menuCategory: props.menuCategory,
      shopId: props.match.params.shopid,
      menuItemDetailById: props.menuItemDetailById,
      status: props.status,
      selectAddonCategory: null,
      selectMenuCategory: null,
      showmultipleVariant: '',
      showsingleVariant:'active',
      finalPrice: 0,
      itemPricing: 0,
      packagePricing: 0,
      itemDec: {}
    }
    this.handleAllChecked = this.handleAllChecked.bind(this);
    this.getItemImage = this.getItemImage.bind(this);
    this.handleAddon = this.handleAddon.bind(this);
  }

  componentDidMount(){
    menuCategory({shopId: this.state.shopId}).then((response) => {
      this.props.menuCategorySuccess(response.data.data.categories);
    });
  }

  componentWillMount(){
    this.props.change('isVeg', null);
    this.props.change('multipleVariant', '0');
    
    menuItemDetailById({itemId : this.props.match.params.index, shopId: this.state.shopId}).then((response) => {
      this.props.initialize(response.data.data);
      this.props.change('shopId', this.state.shopId);
      //console.log('7777',response.data.data);
      this.setState({
        itemImagePath: response.data.data.imagePath,
        isAddon: response.data.data.isAddon == 1 ? true : false,
        itemDec: response.data.data
      });
    });

  }

  getItemImage(imageId){
    this.props.change('itemImage', imageId);
  }

  handleAddon(e){
    this.setState({
      isAddon: !this.state.isAddon
    });
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

  submitMenuForm(values){
    const {itemDec} = this.state;
    let differ = differentiateAddons(itemDec, values);
    let differVariant = differentiateVariant(itemDec, values);
    values = {...values, deletedAddons: differ.addOnDiff, deleteCustomization: differ.custDiff, deletedVariant: differVariant};
    //console.log('values', values);
    return addMenuItems({...values,role:"admin"})
    .then((result) => {
      toast.success('Menu updated Successfully.');
      this.props.reset();
      this.props.history.push('/dashboard/menu/' + this.state.shopId);
    }).catch(error => {
      throw new SubmissionError(error.response.data.error);
    })
  }

  render() {
    const {multipleVariant, handleSubmit, pristine, submitting, menuCategory, fullPrice, itemImagePath} = this.props;
    const visibleStat = getDieteryStatus();
    return (
      <div className="container ani-ui-block">
        <div className="row menu-top-block">
          <div className="col-sm-12 tl-block align-self-center">
            <h4 className="heading">Edit Item</h4>
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
                                  <label for="recommended-item">Recommended Item<span>12 items left</span></label>
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
                                  />
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {
                        multipleVariant == '1'
                        ?
                        <ShowMultipleVariant />
                        :
                        <ShowSingleVariant fullPrice={this.props.fullPrice}/>
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

                <div className="col-lg-12 col-md-12 order-lg-2">
                  <MenuItemImage getItemImage={this.getItemImage} itemImageUrl={this.state.itemImagePath} />
                </div>

                <div className="row save-button-block">
                  <div className="col-sm-12 align-self-center">
                    <button type="submit" disabled={submitting} className="btn green-btn"><i className="material-icons">check_circle</i>SUBMIT DETAILS{submitting && <i className="fa fa-spinner fa-spin"></i>}</button>
                    
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

EditMenuItem = reduxForm({
  form: 'AddMenuItemValue',
  destroyOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(EditMenuItem)


const selector = formValueSelector('AddMenuItemValue')
EditMenuItem = connect(
  state => {
    const { itemPrice, packaging_charges } = selector(state, 'itemPrice', 'packaging_charges');
    var item_price = itemPrice?itemPrice:0;
    var packagingCharges = packaging_charges?packaging_charges:0;
    var fullPrice = parseFloat(item_price) + parseFloat(packagingCharges);
    return {
      fullPrice: fullPrice
    }
  }
)(EditMenuItem)



const mapStatesToProps = (state, ownProps) => {
  const states = {
    menuCategory: [...state.Menu.menu_category],
    status: state.Menu.status,
    multipleVariant: typeof state.form.AddMenuItemValue !== 'undefined' && typeof state.form.AddMenuItemValue.values !== 'undefined' ? state.form.AddMenuItemValue.values.multipleVariant : null
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


export default connect(mapStatesToProps, mapDispatchToProps)(EditMenuItem);
