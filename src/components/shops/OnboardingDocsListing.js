
// import React, { Component } from 'react';
// import Modal from '../../Modal';
// import DocumentOnboardingDetails from './DocumentOnboardingDetails';

// class OnboardingDocsListing extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       uniqueId: this.props.match.params.uniqueId,
//       documents: this.getDummyDocuments(),
//       selectedDocument: null, // Track which document is selected for modal
//       showModal: false,
//     };
//   }

//   getDummyDocuments() {
//     return [
//       {
//         docs_type: 'Aadhar Card',
//         details: 'Aadhar Number: 123456789012',
//         link_to_file: 'http://example.com/aadhar_card.pdf',
//       },
//       {
//         docs_type: 'PAN Card',
//         details: 'PAN Number: ABCDE1234F',
//         link_to_file: 'http://example.com/pan_card.pdf',
//       },
//       {
//         docs_type: 'FSSAI',
//         details: 'FSSAI Number: 12345AB67890CD (Expiry Date: 2025-12-31)',
//         link_to_file: 'http://example.com/fssai_certificate.pdf',
//       },
//       {
//         docs_type: 'GST',
//         details: 'GST Number: 12ABCDE1234F1Z5',
//         link_to_file: 'http://example.com/gst_certificate.pdf',
//       },
//     ];
//   }

//   handleDocumentClick = (doc) => {
//     this.setState({
//       selectedDocument: doc,
//       showModal: true,
//     });
//   };

//   closeModal = () => {
//     this.setState({
//       selectedDocument: null,
//       showModal: false,
//     });
//   };

//   renderTable() {
//     const { documents } = this.state;

//     return (
//       <div className="docs-section">
//         <table style={{ width: '100%' }}>
//           <thead>
//             <tr>
//               <th style={{ textAlign: 'center', width: '10%' }}>SR.NO.</th>  {/* Align center and fix width */}
//               <th style={{ textAlign: 'left', width: '90%' }}>DOCUMENT TYPE</th>
//             </tr>
//           </thead>
//           <tbody>
//             {documents.length > 0 ? (
//               documents.map((doc, index) => (
//                 <tr key={index}>
//                   <td style={{ textAlign: 'center' }}>{index + 1}</td>  {/* Align serial numbers center */}
//                   <td
//                     style={{ cursor: 'pointer', color: '#007bff' }}
//                     onClick={() => this.handleDocumentClick(doc)}
//                   >
//                     {doc.docs_type}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="2">No documents found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     );
//   }

//   render() {
//     const { selectedDocument, showModal } = this.state;

//     return (
//       <div className="right-ui-block">
//         <div className="scrollspy-example">
//           <div className="rm-content">
//             <div className="row menu-top-block">
//               <div className="col-sm-12 tl-block align-self-center">
//                 <h4 className="heading">Documents for Restaurant ID: {this.state.uniqueId}</h4>
//               </div>
//             </div>

//             <div className="row">
//               <div className="col-sm-12" style={{ marginTop: '10px' }}>
//                 <div className="result-listing">{this.renderTable()}</div>
//               </div>
//             </div>

//             {showModal && (
//               <Modal
//                 id="details-modal"
//                 show={showModal}
//                 onHide={this.closeModal}
//                 header={<h4 className="modal-title">{selectedDocument.docs_type} Details</h4>}
//                 body={<DocumentOnboardingDetails doc={selectedDocument} />}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default OnboardingDocsListing;
import React, { Component } from 'react';
import Modal from '../../Modal';
import DocumentOnboardingDetails from './DocumentOnboardingDetails';
import { getShopDocuments } from '../../actions/shops';

class OnboardingDocsListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uniqueId: this.props.match.params.index,
      documentsData: [],
      selectedDocument: {}, // Track which document is selected for modal
      showModal: false,
    };
  }

  // getDummyDocuments() {
  //   return [
  //     {
  //       docs_type: 'Aadhar Card',
  //       details: 'Aadhar Number: 123456789012',
  //       link_to_file: 'http://example.com/aadhar_card.pdf',
  //     },
  //     {
  //       docs_type: 'PAN Card',
  //       details: 'PAN Number: ABCDE1234F',
  //       link_to_file: 'http://example.com/pan_card.pdf',
  //     },
  //     {
  //       docs_type: 'FSSAI',
  //       details: 'FSSAI Number: 12345AB67890CD (Expiry Date: 2025-12-31)',
  //       link_to_file: 'http://example.com/fssai_certificate.pdf',
  //     },
  //     {
  //       docs_type: 'GST',
  //       details: 'GST Number: 12ABCDE1234F1Z5',
  //       link_to_file: 'http://example.com/gst_certificate.pdf',
  //     },
  //     {
  //       docs_type: 'MENU',
  //       details: 'MENU Detail',
  //       link_to_file: 'http://example.com/gst_certificate.pdf',
  //     },
  //   ];
  // }

  componentDidMount() {
    this.fetchDocuments(this.state.uniqueId);
  }

  fetchDocuments = async (shopId) => {
    try {
      const response = await getShopDocuments({
      shopId
      });

      console.log("doc check", response.data.data.documents);
      const data = response.data.data.documents
      const extractedDocuments = [
        {
          doc_type: 'Aadhar Card',
          data: {
            number: data.aadhar_number !== null && data.aadhar_number !== undefined ? data.aadhar_number : null,
            documents: Array.isArray(data.aadhar_document) ? data.aadhar_document.map(doc => doc) : null
          }
        },
        {
          doc_type: 'PAN Card',
          data: {
            number: data.pan_number !== null && data.pan_number !== undefined ? data.pan_number : null,
            documents: Array.isArray(data.pan_document) ? data.pan_document.map(doc => doc) : null
          }
        },
        {
          doc_type: 'FSSAI',
          data: {
            number: data.fassiNumber !== null && data.fassiNumber !== undefined ? data.fassiNumber : null,
            expiry: data.fssai_expiry !== null && data.fssai_expiry !== undefined ? data.fssai_expiry : null,
            documents: Array.isArray(data.fssai_certificate) ? data.fssai_certificate.map(cert => cert) : null
          }
        },
        {
          doc_type: 'GST',
          data: {
            number: data.gstNumber !== null && data.gstNumber !== undefined ? data.gstNumber : null,
            gstCharges: data.gstCharges !== null && data.gstCharges !== undefined ? data.gstCharges : null,
            documents: Array.isArray(data.gst_document) ? data.gst_document.map(doc => doc) : null
          }
        },
        {
          doc_type: 'MENU',
          data: {
            documents: Array.isArray(data.menu_id) ? data.menu_id.map(doc => doc) : null
          }
        }
      ];
      

      this.setState({
        documentsData: extractedDocuments
      })
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  }

  handleDocumentClick = (doc) => {
    this.setState({
      selectedDocument: doc,
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      selectedDocument: null,
      showModal: false,
    });
  };

  renderTable() {
    const { documentsData, uniqueId,documentsType} = this.state;
    console.log("unique id",documentsData);


    return (
      <div className="docs-section">
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
            <th style={{ textAlign: 'left', paddingLeft: '10px' }}>SR.NO.</th>  {/* Aligned to left */}
              <th style={{ textAlign: 'left', width: '90%' }}>DOCUMENT TYPE</th>
            </tr>
          </thead>
          <tbody>
            {documentsData.length > 0 ? (
              documentsData.map((doc, index) => (
                <tr key={index}>
                  <td style={{ textAlign: 'left' }}>{index + 1}</td>  {/* Align serial numbers left */}
                  <td
                    style={{ cursor: 'pointer', color: '#007bff' }}
                    onClick={() => this.handleDocumentClick(doc)}
                  >
                    {doc.doc_type}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No documents found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    const { selectedDocument, showModal } = this.state;
    console.log("selected doc",selectedDocument)

    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            <div className="row menu-top-block">
              <div className="col-sm-12 tl-block align-self-center">
                <h4 className="heading">Documents for Restaurant ID: {this.state.uniqueId}</h4>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12" style={{ marginTop: '10px' }}>
                <div className="result-listing">{this.renderTable()}</div>
              </div>
            </div>

            {showModal && (
              <Modal
                id="details-modal"
                show={showModal}
                onHide={this.closeModal}
                header={<h4 className="modal-title">{selectedDocument.doc_type} Details</h4>}
                body={<DocumentOnboardingDetails doc={selectedDocument} />}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default OnboardingDocsListing;
