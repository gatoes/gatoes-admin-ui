// import React, { Component, Suspense } from 'react';
// import { toast } from 'react-toastify';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import AddRiderDocs from './AddRiderDocs';
// import DocsSlide from './DocsSlide';
// import Modal from '../../Modal';
// import { riderDocsListing, riderDocsListingSuccess } from '../../actions/deliveryagent';


// class DocsListing extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       riderDocsList: props.riderDocsList,
//       status: props.status,
//       driver_id: this.props.match.params.index
//     }
//     this.updateDocs = this.updateDocs.bind(this);
//   }
 
//   componentDidMount(){
//     this.fetchRecords();
//   }

//   fetchRecords(){
//     riderDocsListing({driver_id : this.state.driver_id}).then((response) => {
//       this.props.riderDocsListingSuccess(response.data.data);
//     })
//   }

//   componentWillReceiveProps(nextProps){
//     if(this.props.status != nextProps.status && nextProps.compName == 'riderdocs'){
//       this.setState({
//         riderDocsList: nextProps.riderDocsList,
//         status: nextProps.status
//       });
//     }
//   }

//   addRiderDocsPanel(e){
//     window.getFooter().setState({
//       renderElement: <Modal 
//               id="business-detail-modal"
//               show={true}
//               onHide={this.hide}
//               header={<h4 className="modal-title">Rider Documents</h4>}
//               body={<AddRiderDocs updateDocs={this.updateDocs} driver_id={this.state.driver_id} />}
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
//     const { riderDocsList} = this.state;

//     return (
//       <div className="right-ui-block">
//         <div className="scrollspy-example">
//           <div className="rm-content">
            
//             <div className="row menu-top-block">
//               <div className="col-sm-5 tl-block align-self-center">
//                 <h4 className="heading">Rider Documents</h4>
//               </div>
//               <div className="col-sm-7 tr-block text-right align-self-center">
//                 <a href="javascript:void(0);" onClick={this.addRiderDocsPanel.bind(this)}><button className="btn green-btn"><i className="material-icons">add_circle_outline</i>ADD NEW</button></a>
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
//                     {riderDocsList && riderDocsList.length > 0 ? (
//                       riderDocsList.map((obj, index) => (
//                         <DocsSlide
//                           slideData={{ ...obj }}
//                           index={index}
//                           key={obj.id || index} // Fallback to index if obj.id is undefined
//                         />
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="4">No documents available.</td>
//                       </tr>
//                     )}
//                   </tbody>

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
//     riderDocsList: [...state.DeliveryAgent.rider_docs],
//     status: state.DeliveryAgent.status,
//     compName: state.DeliveryAgent.compName
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     riderDocsListingSuccess: (payload) => {
//       dispatch(riderDocsListingSuccess(payload));
//     },
//   };
// }

// export default connect(mapStatesToProps, mapDispatchToProps)(DocsListing);


// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import AddRiderDocs from './AddRiderDocs';
// import DocsSlide from './DocsSlide';
// import Modal from '../../Modal';
// import { riderDocsListing, riderDocsListingSuccess } from '../../actions/deliveryagent';

// class DocsListing extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       riderDocsList: props.riderDocsList,
//       status: props.status,
//       driver_id: this.props.match.params.index,
//     };
//     this.updateDocs = this.updateDocs.bind(this);
//   }

//   componentDidMount() {
//     this.fetchRecords();
//   }

//   fetchRecords() {
//     riderDocsListing({ driver_id: this.state.driver_id }).then((response) => {
//       this.props.riderDocsListingSuccess(response.data.data);
//     });
//   }

//   componentWillReceiveProps(nextProps) {
//     if (this.props.status !== nextProps.status && nextProps.compName === 'riderdocs') {
//       this.setState({
//         riderDocsList: nextProps.riderDocsList,
//         status: nextProps.status,
//       });
//     }
//   }

//   addRiderDocsPanel(e) {
//     window.getFooter().setState({
//       renderElement: (
//         <Modal
//           id="business-detail-modal"
//           show={true}
//           onHide={this.hide}
//           header={<h4 className="modal-title">Rider Documents</h4>}
//           body={<AddRiderDocs updateDocs={this.updateDocs} driver_id={this.state.driver_id} />}
//         />
//       ),
//     });
//   }

//   updateDocs(result) {
//     window.$$('body').removeClass('modal-open');
//     window.$$('body').find('.modal-backdrop').removeClass('modal-backdrop');
//     this.hide();
//   }

//   hide() {
//     window.getFooter().setState({
//       renderElement: null,
//     });
//   }

//   render() {
//     const { riderDocsList } = this.state;

//     return (
//       <div className="right-ui-block">
//         <div className="scrollspy-example">
//           <div className="rm-content">
//             <div className="row menu-top-block">
//               <div className="col-sm-5 tl-block align-self-center">
//                 <h4 className="heading">Rider Documents</h4>
//               </div>
//               <div className="col-sm-7 tr-block text-right align-self-center">
//                 <button className="btn green-btn" onClick={this.addRiderDocsPanel.bind(this)}>
//                   <i className="material-icons">add_circle_outline</i>ADD NEW
//                 </button>
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
//                       {riderDocsList && riderDocsList.length > 0 ? (
//                         riderDocsList.map((obj, index) => (
//                           obj ? (
//                             <DocsSlide
//                               slideData={{ ...obj }}
//                               index={index}
//                               key={obj.id ? `rider-doc-${obj.id}` : `rider-doc-fallback-${index}`} // Unique key
//                             />
//                           ) : null
//                         ))
//                       ) : (
//                         <tr>
//                           <td colSpan="4">No documents available.</td>
//                         </tr>
//                       )}
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

// const mapStatesToProps = (state) => {
//   return {
//     riderDocsList: [...state.DeliveryAgent.rider_docs],
//     status: state.DeliveryAgent.status,
//     compName: state.DeliveryAgent.compName,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     riderDocsListingSuccess: (payload) => {
//       dispatch(riderDocsListingSuccess(payload));
//     },
//   };
// };

// export default connect(mapStatesToProps, mapDispatchToProps)(DocsListing);


import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddRiderDocs from './AddRiderDocs';
import DocsSlide from './DocsSlide';
import Modal from '../../Modal';
import { riderDocsListing, riderDocsListingSuccess } from '../../actions/deliveryagent';

class DocsListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      riderDocsList: props.riderDocsList,
      status: props.status,
      driver_id: this.props.match.params.index,
      showModal: false,  // Add state to manage modal visibility
    };
    this.updateDocs = this.updateDocs.bind(this);
    this.hide = this.hide.bind(this);
    this.addRiderDocsPanel = this.addRiderDocsPanel.bind(this);
  }

  componentDidMount() {
    this.fetchRecords();
  }

  fetchRecords() {
    riderDocsListing({ driver_id: this.state.driver_id }).then((response) => {
      this.props.riderDocsListingSuccess(response.data.data);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.status !== nextProps.status && nextProps.compName === 'riderdocs') {
      this.setState({
        riderDocsList: nextProps.riderDocsList,
        status: nextProps.status,
      });
    }
  }

  addRiderDocsPanel(e) {
    this.setState({ showModal: true });
  }

  updateDocs(newDoc) {
    this.setState((prevState) => ({
      riderDocsList: [...prevState.riderDocsList, newDoc], // Add new doc to state
      showModal: false,  // Close the modal
    }));
  }

  hide() {
    this.setState({ showModal: false });
  }

  render() {
    const { riderDocsList, showModal } = this.state;

    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Rider Documents</h4>
              </div>
              <div className="col-sm-7 tr-block text-right align-self-center">
                <button className="btn green-btn" onClick={this.addRiderDocsPanel}>
                  <i className="material-icons">add_circle_outline</i>ADD NEW
                </button>
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
                      {riderDocsList && riderDocsList.length > 0 ? (
                        riderDocsList.map((obj, index) => (
                          obj ? (
                            <DocsSlide
                              slideData={{ ...obj }}
                              index={index}
                              key={obj.id ? `rider-doc-${obj.id}` : `rider-doc-fallback-${index}`} // Unique key
                            />
                          ) : null
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4">No documents available.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {showModal && (
              <Modal
                id="business-detail-modal"
                show={true}
                onHide={this.hide}
                header={<h4 className="modal-title">Rider Documents</h4>}
                body={<AddRiderDocs updateDocs={this.updateDocs} driver_id={this.state.driver_id} />}
              />
            )}

          </div>
        </div>
      </div>
    );
  }
}

const mapStatesToProps = (state) => {
  return {
    riderDocsList: [...state.DeliveryAgent.rider_docs],
    status: state.DeliveryAgent.status,
    compName: state.DeliveryAgent.compName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    riderDocsListingSuccess: (payload) => {
      dispatch(riderDocsListingSuccess(payload));
    },
  };
};

export default connect(mapStatesToProps, mapDispatchToProps)(DocsListing);
