import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { promoCodeList, promoCodeListSuccess, changePromoPosition } from '../../actions/promocodes';
import PromoCodeSlide from './PromoCodeSlide';
import {getAclChecks} from '../../utilities';
import {sortableContainer, sortableElement, sortableHandle} from 'react-sortable-hoc';
import arrayMove from 'array-move';

const DragHandle = sortableHandle(() => <td><span className="sort_icon"></span></td>);


const SortableItem = sortableElement(({slideData, index, updatePromoFullScreen}) => <PromoCodeSlide slideData={slideData} index={index} updatePromoFullScreen={updatePromoFullScreen} component={<DragHandle />} />);

const SortableContainer = sortableContainer(({children}) => {
  return <tbody>{children}</tbody>;
});


class Listing extends Component {
  constructor(props){
    super(props);
    this.state = {
      promoCodeListing: props.promoCodeListing,
      status: props.status,
      lang: window.localStorage.contentlanguage ? window.localStorage.contentlanguage : 'en'
    };
    this.updatePromoFullScreen = this.updatePromoFullScreen.bind(this);
  }
 
  componentDidMount(){
    this.fetchRecords();
  }

  updatePromoFullScreen(){
    this.fetchRecords();
  }

  fetchRecords(){
    promoCodeList().then((response) => {
      this.props.promoCodeListSuccess(response.data.data);
    })
  }

  componentWillReceiveProps(nextProps){
    if(this.props.status != nextProps.status && nextProps.compName == 'promocodelist'){
      this.setState({
        promoCodeListing: nextProps.promoCodeListing,
        status: nextProps.status
      });
    }
  }

  onSortEnd({oldIndex, newIndex}){
    changePromoPosition({oldPosition: this.state.promoCodeListing[oldIndex].position, newPosition: this.state.promoCodeListing[newIndex].position, promoId: this.state.promoCodeListing[oldIndex].id}).then((response) => {
      this.setState({
        promoCodeListing: response.data.data
      });
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
                  <a  className="btn green-btn" href="/dashboard/addpromocode"><span className="icon-ic_plus"></span>Add promocode</a>
                  :
                  null
                }
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="result-listing">
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Sr.no.</th>
                        <th>Rule Name</th>
                        <th>Coupon Type</th>
                        <th>Coupon</th>
                        <th>Who bear cost</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Show on Restaurant </th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <SortableContainer onSortEnd={this.onSortEnd.bind(this)} useDragHandle>
                      {
                        promoCodeListing && promoCodeListing.length > 0 && promoCodeListing.map((obj, index) => (
                          <SortableItem key={obj.id} slideData = {obj} index={index} updatePromoFullScreen={this.updatePromoFullScreen} />
                        ))
                      }
                    </SortableContainer>
                  </table>
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
    promoCodeListing: state.Promocode.promocode_list,
    status: state.Promocode.status,
    compName: state.Promocode.compName
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

