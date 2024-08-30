import React, { Component, Suspense } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AddShopDocs from './AddShopDocs';
import DocsSlide from './DocsSlide';
import Modal from '../../Modal';
import { shopDocsListing, shopDocsListingSuccess } from '../../actions/shops';


class DocsListing extends Component {
  constructor(props){
    super(props);
    this.state = {
      shopDocsList: props.shopDocsList,
      status: props.status,
      shop_id: this.props.match.params.index
    }
    this.updateDocs = this.updateDocs.bind(this);
  }
 
  componentDidMount(){
    this.fetchRecords();
  }

  fetchRecords(){
    shopDocsListing({shop_id : this.state.shop_id}).then((response) => {
      this.props.shopDocsListingSuccess(response.data.data);
    })
  }

  componentWillReceiveProps(nextProps){
    if(this.props.status != nextProps.status && nextProps.compName == 'shopdocs'){
      this.setState({
        shopDocsList: nextProps.shopDocsList,
        status: nextProps.status
      });
    }
  }

  addShopDocsPanel(e){
    window.getFooter().setState({
      renderElement: <Modal 
              id="business-detail-modal"
              show={true}
              onHide={this.hide}
              header={<h4 className="modal-title">Restaurant Documents</h4>}
              body={<AddShopDocs updateDocs={this.updateDocs} shop_id={this.state.shop_id} />}
            />
    });
  }

  updateDocs(result){
    window.$$('body').removeClass('modal-open');
    window.$$('body').find('.modal-backdrop').removeClass('modal-backdrop');
    this.hide();
  }

  hide(){
    window.getFooter().setState({
        renderElement: null
    });
  }

  render() {
    const { shopDocsList} = this.state;

    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            
            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Restaurant Documents</h4>
              </div>
              <div className="col-sm-7 tr-block text-right align-self-center">
                <a href="javascript:void(0);" onClick={this.addShopDocsPanel.bind(this)}><button className="btn green-btn"><i className="material-icons">add_circle_outline</i>ADD NEW</button></a>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="result-listing">
                  <table>
                    <thead>
                      <tr>
                        <th>Sr.no.</th>
                        <th>Name</th>
                        <th>Expiry Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        shopDocsList && shopDocsList.length > 0 && shopDocsList.map((obj, index) => (
                          <DocsSlide slideData={{...obj}} index={index} key={obj.id} />
                        ))
                      }
                    </tbody>
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
    shopDocsList: [...state.Shop.shop_docs],
    status: state.Shop.status,
    compName: state.Shop.compName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    shopDocsListingSuccess: (payload) => {
      dispatch(shopDocsListingSuccess(payload));
    },
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(DocsListing);