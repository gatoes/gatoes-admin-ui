// import React, { Component, Suspense } from 'react';
// import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { connect } from 'react-redux';
// import EditShopDocs from './EditShopDocs';
// import Modal from '../../Modal';
// import { getShopDocsById, deleteShopDocument, deleteShopDocumentSuccess } from '../../actions/shops';
// import Tooltip from '../common/Tooltip';
// import {SHOP_DOCS, DELETE_CONFIRMATION, DELETE_SUCCESS} from '../../constants';
// import moment from 'moment';
// import { confirmAlert } from 'react-confirm-alert';
// import 'react-confirm-alert/src/react-confirm-alert.css';

// class DocsSlide extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       slideData: props.slideData,
//       index: props.index
//     };
//     this.editShopDocsPanel = this.editShopDocsPanel.bind(this);
//   }

//   editShopDocsPanel(itemIndex){
//     const {slideData} = this.state;
//     getShopDocsById({'documentId' : slideData.id}).then((response) => {
//         window.getFooter().setState({
//           renderElement: <Modal 
//                   id="business-detail-modal"
//                   show={true}
//                   onHide={this.hide}
//                   header={<h4 className="modal-title">Edit Delivery Region</h4>}
//                   body={<EditShopDocs docsDetail={response.data.data} updateDocsSlide={this.updateDocsSlide.bind(this)} itemIndex={itemIndex} />} 
//                 />
//         });
//     })
//   }

//   componentWillReceiveProps(nextProps){
//     this.setState({
//       slideData: nextProps.slideData
//     });
//   }

//   updateDocsSlide(result){
//     console.log('result', result);
//     window.$$('body').removeClass('modal-open');
//     window.$$('body').find('.modal-backdrop').removeClass('modal-backdrop');
//     window.getFooter().setState({
//         renderElement: null
//     });
//   }

//   hide(){
//     window.getFooter().setState({
//         renderElement: null
//     });
//   }

//   deleteDocs(itemId, index){
//     confirmAlert({
//       title: '',
//       message: DELETE_CONFIRMATION,
//       buttons: [
//         {
//           label: 'Yes',
//           onClick: () => {
//             deleteShopDocument({documentId: itemId}).then((response) => {
//               this.props.deleteShopDocumentSuccess(index)
//               toast.success(DELETE_SUCCESS, {
//                 position: toast.POSITION.TOP_RIGHT
//               });
//             });
//           }
//         },
//         {
//           label: 'No'
//         }
//       ]
//     })
//   }

// 	render() {
//       const { slideData, index } = this.state;
//     	return (
//         <tr>
//           <td>{ parseInt(index+1) }</td>
//           <td>{slideData.docs_type}</td>
//           <td>{moment(slideData.expiry_date).format('ll')}</td>
//           <td>
//             <div className="table-btn-block">
//               <Tooltip title="Edit">
//                   <a href="javascript:void(0);" onClick={() => this.editShopDocsPanel(index)}><button className="btn edit-btn"><i className="material-icons">edit</i></button></a>
                
//               </Tooltip>
//               <Tooltip title="Delete">
//                   <button className="btn delete-btn" onClick={() => this.deleteDocs(slideData.id, index)}><i className="material-icons">delete</i></button>
//                 </Tooltip>
//               </div>
//           </td>
//         </tr>
//     	);
//   	}
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     deleteShopDocumentSuccess: (payload) => {
//       dispatch(deleteShopDocumentSuccess(payload));
//     }

//   };
// }

// const mapStatesToProps = (state, ownProps) => {
//   return {
//     ...ownProps
//   };
// }

// export default connect(mapStatesToProps, mapDispatchToProps)(DocsSlide);




import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import EditShopDocs from './EditShopDocs';
import Modal from '../../Modal';
import Tooltip from '../common/Tooltip';
import moment from 'moment';
import { getShopDocsById, deleteShopDocument, deleteShopDocumentSuccess } from '../../actions/shops';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import DocumentDetails from './DocumentDetails'; // Import the DocumentDetails component

class DocsSlide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideData: props.slideData,
      index: props.index,
      showDetails: false, // Track whether to show document details
      showModal: false,  // Track whether to show the modal for editing
    };
    this.editShopDocsPanel = this.editShopDocsPanel.bind(this);
    this.toggleDetails = this.toggleDetails.bind(this); // Bind the toggleDetails function
    this.toggleModal = this.toggleModal.bind(this); // Bind the toggleModal function
  }

  editShopDocsPanel() {
    this.setState({ showModal: true });
  }

  toggleDetails() {
    this.setState((prevState) => ({
      showDetails: !prevState.showDetails,
    }));
  }

  toggleModal() {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
    }));
  }

  deleteDocs(itemId, index) {
    confirmAlert({
      title: '',
      message: 'Are you sure you want to delete this document?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteShopDocument({ documentId: itemId }).then((response) => {
              this.props.deleteShopDocumentSuccess(index);
              toast.success('Document deleted successfully!', {
                position: toast.POSITION.TOP_RIGHT,
              });
            });
          },
        },
        {
          label: 'No',
        },
      ],
    });
  }

  renderColumns() {
    const { slideData } = this.state;

    switch (slideData.docs_type) {
      case 'Aadhar Card':
        return (
          <>
            <td onClick={this.toggleDetails} style={{ cursor: 'pointer', color: '#007bff' }}>{slideData.docs_type}</td>
          </>
        );

      case 'PAN Card':
        return (
          <>
            <td onClick={this.toggleDetails} style={{ cursor: 'pointer', color: '#007bff' }}>{slideData.docs_type}</td>
          </>
        );

      case 'GST':
        return (
          <>
            <td onClick={this.toggleDetails} style={{ cursor: 'pointer', color: '#007bff' }}>{slideData.docs_type}</td>
          </>
        );

      case 'FSSAI':
        return (
          <>
            <td onClick={this.toggleDetails} style={{ cursor: 'pointer', color: '#007bff' }}>{slideData.docs_type}</td>
            <td>{moment(slideData.expiry_date).format('ll')}</td>
          </>
        );

      case 'Upload Menu':
        return (
          <>
            <td onClick={this.toggleDetails} style={{ cursor: 'pointer', color: '#007bff' }}>{slideData.docs_type}</td>
          </>
        );

      default:
        return (
          <>
            <td>{slideData.docs_type}</td>
          </>
        );
    }
  }

  render() {
    const { slideData, index, showDetails, showModal } = this.state;

    return (
      <>
        <tr>
          <td>{index + 1}</td>
          {this.renderColumns()}
          <td>
            <div className="table-btn-block">
              <Tooltip title="Edit">
                <button className="btn edit-btn" onClick={this.editShopDocsPanel}>
                  <i className="material-icons">edit</i>
                </button>
              </Tooltip>
              <Tooltip title="Delete">
                <button className="btn delete-btn" onClick={() => this.deleteDocs(slideData.id, index)}>
                  <i className="material-icons">delete</i>
                </button>
              </Tooltip>
            </div>
          </td>
        </tr>
        {showDetails && (
          <tr>
            <td colSpan="4">
              <DocumentDetails
                docType={slideData.docs_type}
                docName={slideData.docs_type}
                link={slideData.link_to_file || slideData.links_to_menu}
                images={slideData.files || []}
                expiryDate={slideData.expiry_date ? moment(slideData.expiry_date).format('LL') : ''}
              />
            </td>
          </tr>
        )}
        {showModal && (
          <Modal
            id="edit-doc-modal"
            show={true}
            onHide={this.toggleModal}
            header={<h4 className="modal-title">Edit {slideData.docs_type} Document</h4>}
            body={<EditShopDocs docsDetail={slideData} />}
          />
        )}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteShopDocumentSuccess: (payload) => {
      dispatch(deleteShopDocumentSuccess(payload));
    },
  };
};

export default connect(null, mapDispatchToProps)(DocsSlide);
