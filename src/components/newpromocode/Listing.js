import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NewPromoCodeSlide from './NewPromoCodeSlide';
import {getAclChecks} from '../../utilities';
import {sortableContainer, sortableElement, sortableHandle} from 'react-sortable-hoc';
import {  changeSequenceOrder, promoCodeList, promoCodeListSuccess } from '../../actions/newpromocodes';
import CouponFilter from '../users/CouponFilter';

const DragHandle = sortableHandle(() => <td><span className="sort_icon"></span></td>);


// const SortableItem = sortableElement(({slideData, index, updatePromoFullScreen}) => {
//   console.log('SortableItemindex',index);
// return(<NewPromoCodeSlide slideData={slideData} index={index} itemIndex updatePromoFullScreen={updatePromoFullScreen} component={<DragHandle />} />)});

const SortableItem = sortableElement(({ slideData, itemIndex, updatePromoFullScreen }) => {
  
  return (
    <NewPromoCodeSlide
      slideData={slideData}
      index={itemIndex} // Pass the renamed index
      updatePromoFullScreen={updatePromoFullScreen}
      component={<DragHandle />}
    />
  );
});


const SortableContainer = sortableContainer(({children}) => {
  return <tbody>{children}</tbody>;
});


class Listing extends Component {
  constructor(props){
    super(props);
    this.state = {
      promoCodeListing: props.promoCodeListing,
      status: props.status,
      lang: window.localStorage.contentlanguage ? window.localStorage.contentlanguage : 'en',
      filters: {}

    };
    this.updatePromoFullScreen = this.updatePromoFullScreen.bind(this);
    this.getFilterFields = this.getFilterFields.bind(this);

  }
 
  componentDidMount(){
    this.fetchRecords();
  }

  updatePromoFullScreen(){
    this.fetchRecords();
  }

  getFilterFields(filters){
    this.setState({filters});
    console.log(filters, "Filter")
    this.fetchRecords(filters);
  }
 

  fetchRecords(filters){

    console.log(filters, "Filters")
    promoCodeList(filters).then((response) => {
      console.log(response,"Heyresponse")
      this.props.promoCodeListSuccess(response.data.responseData.data);
    })
  }

  componentWillReceiveProps(nextProps){
    if(this.props.status != nextProps.status && nextProps.compName == 'promocodeList'){
      this.setState({
        promoCodeListing: nextProps.promoCodeListing,
        status: nextProps.status
      });
    }
  }

  onSortEnd({oldIndex, newIndex}){
    changeSequenceOrder({oldPosition: this.state.promoCodeListing[oldIndex].sequenceOrder, newPosition: this.state.promoCodeListing[newIndex].sequenceOrder, couponId: this.state.promoCodeListing[oldIndex].id}).then((response) => {
      // this.setState({
      //   promoCodeListing: response.data.responseData.data
      // });
      this.fetchRecords(this.state.filters)
    })
  }

  render() {
    const {promoCodeListing, lang} = this.state;
    console.log('promoCodeListing', promoCodeListing);
    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">

            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Promo Codes</h4>
              </div>
              <div className="col-sm-7 tr-block text-right align-self-center">
                {
                  getAclChecks('PROMOCODE_ADD') && lang == 'en'
                  ?
                  <a  className="btn green-btn" href="/dashboard/addnewpromocode"><span className="icon-ic_plus"></span>Add promocode</a>
                  :
                  null
                }
              </div>
            </div>
            <CouponFilter getFilterFields={this.getFilterFields} updatePromoFullScreen={this.updatePromoFullScreen} />


            <div className="row">
              <div className="col-sm-12">
                <div className="result-listing">
                  <div className='table-responsive'>
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Sr.no.</th>
                        <th>Created By</th>
                        <th>Discount Type</th>
                        <th>Total Used</th>
                        <th>Restaurant Name</th>
                        <th>Merchant Share</th>
                        <th>Admin Share</th>
                        <th>Discount</th>
                        <th>Rule Name</th>
                        <th>Coupon Type</th>
                        <th>Coupon Code</th>
                        <th>Who bear cost</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        {/* <th>Time</th> */}
                        <th>Status</th>
                        <th>Show on Restaurant </th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <SortableContainer onSortEnd={this.onSortEnd.bind(this)} useDragHandle>
                      {
                        promoCodeListing && promoCodeListing.length > 0 && promoCodeListing.map((obj, index) => {
                          
                          return(
                          <SortableItem key={obj.id}  index={index}     itemIndex={index} slideData = {obj}  updatePromoFullScreen={this.updatePromoFullScreen} />
                        )})
                      }
                      {promoCodeListing && promoCodeListing.length == 0 && (
                          <tr>
                          <td colSpan="12">
                          <div className='norecord_wrapper'>
                            <h4 className='text-notfound'>No record found</h4>
                          </div>
                          </td>
                      </tr>
                      ) }
                    </SortableContainer>
                  </table>
                  </div>
                </div>
              </div>
            </div>
                  
          </div>
        </div>
      </div>
    );
  }
}

const mapStatesToProps = (state, ownProps) => {

  return {
    promoCodeListing: state.NewPromoCode.promocodeList,
    status: state.NewPromoCode.status,
    compName: state.NewPromoCode.compName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    promoCodeListSuccess: (payload) => {
      dispatch(promoCodeListSuccess(payload));
    },
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(Listing);

