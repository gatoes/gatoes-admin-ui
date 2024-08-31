// import React, { Component, Suspense } from 'react';
// import { toast } from 'react-toastify';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import AddShopDocs from './AddShopDocs';
// import DocsSlide from './DocsSlide';
// import Modal from '../../Modal';
// import { shopDocsListing, shopDocsListingSuccess } from '../../actions/shops';


// class DocsListing extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       shopDocsList: props.shopDocsList,
//       status: props.status,
//       shop_id: this.props.match.params.index
//     }
//     this.updateDocs = this.updateDocs.bind(this);
//   }
 
//   componentDidMount(){
//     this.fetchRecords();
//   }

//   fetchRecords(){
//     shopDocsListing({shop_id : this.state.shop_id}).then((response) => {
//       this.props.shopDocsListingSuccess(response.data.data);
//     })
//   }

//   componentWillReceiveProps(nextProps){
//     if(this.props.status != nextProps.status && nextProps.compName == 'shopdocs'){
//       this.setState({
//         shopDocsList: nextProps.shopDocsList,
//         status: nextProps.status
//       });
//     }
//   }

//   addShopDocsPanel(e){
//     window.getFooter().setState({
//       renderElement: <Modal 
//               id="business-detail-modal"
//               show={true}
//               onHide={this.hide}
//               header={<h4 className="modal-title">Restaurant Documents</h4>}
//               body={<AddShopDocs updateDocs={this.updateDocs} shop_id={this.state.shop_id} />}
//             />
//     });
//   }

//   updateDocs(result){
//     window.$$('body').removeClass('modal-open');
//     window.$$('body').find('.modal-backdrop').removeClass('modal-backdrop');
//     this.hide();
//   }

//   hide(){
//     window.getFooter().setState({
//         renderElement: null
//     });
//   }

//   render() {
//     const { shopDocsList} = this.state;

//     return (
//       <div className="right-ui-block">
//         <div className="scrollspy-example">
//           <div className="rm-content">
            
//             <div className="row menu-top-block">
//               <div className="col-sm-5 tl-block align-self-center">
//                 <h4 className="heading">Restaurant Documents</h4>
//               </div>
//               <div className="col-sm-7 tr-block text-right align-self-center">
//                 <a href="javascript:void(0);" onClick={this.addShopDocsPanel.bind(this)}><button className="btn green-btn"><i className="material-icons">add_circle_outline</i>ADD NEW</button></a>
//               </div>
//             </div>

//             <div className="row">
//               <div className="col-sm-12">
//                 <div className="result-listing">
//                   <table>
//                     <thead>
//                       <tr>
//                         <th>Sr.no.</th>
//                         <th>Name</th>
//                         <th>Expiry Date</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {
//                         shopDocsList && shopDocsList.length > 0 && shopDocsList.map((obj, index) => (
//                           <DocsSlide slideData={{...obj}} index={index} key={obj.id} />
//                         ))
//                       }
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
                  
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
// const mapStatesToProps = (state, ownProps) => {
//   return {
//     shopDocsList: [...state.Shop.shop_docs],
//     status: state.Shop.status,
//     compName: state.Shop.compName
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     shopDocsListingSuccess: (payload) => {
//       dispatch(shopDocsListingSuccess(payload));
//     },
//   };
// }

// export default connect(mapStatesToProps, mapDispatchToProps)(DocsListing);




import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddShopDocs from './AddShopDocs';
import DocsSlide from './DocsSlide';
import Modal from '../../Modal';
import { shopDocsListing, shopDocsListingSuccess } from '../../actions/shops';

class DocsListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopDocsList: this.getDummyData(),
      status: props.status,
      shop_id: this.props.match.params.index,
    };
    this.updateDocs = this.updateDocs.bind(this);
    this.hide = this.hide.bind(this);
  }

  getDummyData() {
    return [
      {
        id: 1,
        docs_type: 'Aadhar Card',
        aadhar_number: '123456789012',
        link_to_file: 'http://example.com/aadhar_card.pdf',
      },
      {
        id: 2,
        docs_type: 'PAN Card',
        pan_number: 'ABCDE1234F',
        link_to_file: 'http://example.com/pan_card.pdf',
      },
      {
        id: 3,
        docs_type: 'FSSAI',
        fssai_number: '12345AB67890CD',
        expiry_date: '2025-12-31',
        link_to_file: 'http://example.com/fssai_certificate.pdf',
      },
      {
        id: 4,
        docs_type: 'GST',
        gst_number: '12ABCDE1234F1Z5',
        tax_bracket: 'GST-18%',
        link_to_file: 'http://example.com/gst_certificate.pdf',
      },
      {
        id: 5,
        docs_type: 'Upload Menu',
        links_to_menu: 'http://example.com/menu.pdf',
      }
    ];
  }

  componentDidMount() {
    this.fetchRecords();
  }

  fetchRecords() {
    shopDocsListing({ shop_id: this.state.shop_id }).then((response) => {
      console.log("Backend Response:", response.data.data);
      this.props.shopDocsListingSuccess(response.data.data);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.status !== nextProps.status && nextProps.compName === 'shopdocs') {
      this.setState({
        shopDocsList: nextProps.shopDocsList,
        status: nextProps.status,
      });
    }
  }

  addShopDocsPanel(e) {
    window.getFooter().setState({
      renderElement: (
        <Modal
          id="business-detail-modal"
          show={true}
          onHide={this.hide}
          header={<h4 className="modal-title">Restaurant Documents</h4>}
          body={<AddShopDocs updateDocs={this.updateDocs} shop_id={this.state.shop_id} />}
        />
      ),
    });
  }

  updateDocs(result) {
    window.$$('body').removeClass('modal-open');
    window.$$('body').find('.modal-backdrop').removeClass('modal-backdrop');
    this.hide();
  }

  hide() {
    window.getFooter().setState({
      renderElement: null,
    });
  }

  renderTable(heading, docsList, includeExpiryDate = false) {
    return (
      <div className="docs-section">
        <h5 style={{ marginTop: '30px' }}>{heading}</h5>
        <table>
          <thead>
            <tr>
              <th>Sr.no.</th>
              <th>Name</th>
              {includeExpiryDate && <th>Expiry Date</th>}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {docsList.length > 0 ? (
              docsList.map((obj, index) => (
                <DocsSlide slideData={{ ...obj }} index={index} key={obj.id} />
              ))
            ) : (
              <tr>
                <td colSpan={includeExpiryDate ? 4 : 3}>No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    const { shopDocsList } = this.state;

    // Categorize documents
    const aadharDocs = shopDocsList.filter((doc) => doc.docs_type === 'Aadhar Card');
    const panDocs = shopDocsList.filter((doc) => doc.docs_type === 'PAN Card');
    const fssaiDocs = shopDocsList.filter((doc) => doc.docs_type === 'FSSAI');
    const gstDocs = shopDocsList.filter((doc) => doc.docs_type === 'GST');
    const uploadMenuDocs = shopDocsList.filter((doc) => doc.docs_type === 'Upload Menu');

    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Restaurant Documents</h4>
              </div>
              <div className="col-sm-7 tr-block text-right align-self-center">
                <button className="btn green-btn" onClick={this.addShopDocsPanel.bind(this)}>
                  <i className="material-icons">add_circle_outline</i>ADD NEW
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12" style={{ marginTop: '10px' }}>
                <div className="result-listing">
                  {this.renderTable('Aadhar Card', aadharDocs)}
                  {this.renderTable('PAN Card', panDocs)}
                  {this.renderTable('FSSAI', fssaiDocs, true)}
                  {this.renderTable('GST', gstDocs)}
                  {this.renderTable('Upload Menu', uploadMenuDocs)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    shopDocsList: [...state.Shop.shop_docs],
    status: state.Shop.status,
    compName: state.Shop.compName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    shopDocsListingSuccess: (payload) => {
      dispatch(shopDocsListingSuccess(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocsListing);
