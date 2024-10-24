import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify';
import {getAclChecks} from '../../utilities';
import ShowRestaurantDetail from './ShowRestaurantDetail'
import Modal from '../../Modal';
import moment from 'moment';
import { deactivateShop } from '../../actions/shops';
import { ACTIVATE_SUCCESS } from '../../constants';

class OnboardingSlide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideData: props.slideData,
      index: props.index,
      srno: props.srno,
      showRestaurantDetail: false, // For controlling the modal
    };
  }

  // Function to handle deletion with confirmation modal
  deleteItem(itemId, index) {
    confirmAlert({
      title: '',
      message: "Are you sure you want to delete this entry?",
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            // Perform deletion (replace this with actual API call)
            console.log('Deleting item with ID:', itemId);
            toast.success('Entry has been deleted successfully.');
            // Optionally, reload or remove the entry from the list
            this.props.deleteSuccess(index); // This should be passed from the parent
          },
        },
        {
          label: 'No',
        },
      ],
    });
  }


  approveItem(itemId, index) {
    confirmAlert({
      title: '',
      message: "Do you want to approve this restaurant?",
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deactivateShop({shopStatus: 1, shopId: itemId}).then((response) => {
              // this.setState({
              //   slideData: {...this.state.slideData, shopStatus: 1}
              // })
              //this.props.deactivateShopSuccess(shopId, 1);
              toast.success("Restaurant Approved", {
                position: toast.POSITION.TOP_RIGHT
              });   
              this.props.fetchRecords(1, {status: 3}); // This should be passed from the parent
            });
            // Perform approval action (replace this with actual API call)
            console.log('Approving restaurant with ID:', itemId);
            // Optionally, you can update the restaurant's status to "Approved" in the parent state
          },
        },
        {
          label: 'No',
        },
      ],
    });
  }

  showRestaurantDetail = () => {
    this.setState({ showRestaurantDetail: true });
  };

  hideRestaurantDetail = () => {
    this.setState({ showRestaurantDetail: false });
  };

  componentWillReceiveProps(nextProps){
    this.setState({
      slideData: nextProps.slideData
    });
  }

  render() {
    const { slideData, index, srno,showRestaurantDetail } = this.state;
    console.log("slide data status",slideData)

    return (
        <>
      <tr>
        <td>{srno}</td>
        <td>{slideData.unique_id}</td>
        <td>
        <a href="javascript:void(0)" onClick={this.showRestaurantDetail} style={{ cursor: 'pointer', color: '#007bff' }}>
              {slideData.shopName}
            </a>
          </td>
        <td>{slideData.name}</td>
        <td>{slideData.email}</td>
        <td>{slideData.contactNumber}</td>
        <td>{slideData.zone}</td>
        <td>{slideData.activation_date ? moment(slideData.activation_date).format('ll') : null}</td>
        <td>{slideData.createdAt ? moment(slideData.createdAt).format('ll') : null}</td>
        {/* <td>{slideData.status}</td> */}
        {/* <td>
            <button className="btn btn-primary table-btn-block" onClick={() => this.showRestaurantDetail}>View</button>
        </td> */}
     <td>
  {
    getAclChecks('SHOPS_ADD_EDIT')
    ?
    <Link to={{
      pathname: "/dashboard/editshop/" + slideData.shopId,
      state: { isApprovalRequired: slideData.shopStatus === 3 } // Pass the status as a prop
    }}>
      <button className="btn btn-primary table-btn-block" style={{ backgroundColor: '#007bff', color: 'white', textAlign: 'center', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        View
      </button>
    </Link>
    :
    null
  }
</td>


        <td>
          <div className="more-btn-ui table-btn-block">
            <button className="btn more-btn" data-toggle="dropdown" aria-expanded="false">More</button>
            <ul className="dropdown-menu">
              {/* Show Documents option */}
              {
                    getAclChecks('ONBOARDING_DOCUMENTS')
                    ?
                    <li><Link to={"/dashboard/onboardingdocuments/" + slideData.shopId}>Documents</Link></li>
                    :
                    null
            }
            

              {/* Delete option */}
              <li>
                <a href="javascript:void(0)">
                  Delete
                </a>
              </li>

             {/* Approve option */}
              <li>
              <a href="javascript:void(0)" onClick={() => this.approveItem(slideData.shopId, index)}>
                Approve
              </a>
            </li>
            </ul>
          </div>
        </td>
      </tr>
      {showRestaurantDetail && (
          <Modal
          id="restaurant-detail-modal"
          show={showRestaurantDetail}
          onHide={this.hideRestaurantDetail}
          header={<h4 className="modal-title">{slideData.restaurantName} Details</h4>}
          body={<ShowRestaurantDetail restaurantData={slideData} />}
          style={{ maxWidth: '800px', width: '100%' }}  // Inline style for modal width
          dialogStyle={{ width: '100%' }}                // Ensure the dialog width is full
        >
          <div style={{ padding: '20px', whiteSpace: 'nowrap' }}>
            <ShowRestaurantDetail restaurantData={slideData} />
          </div>
        </Modal>
        
        )}
      </>
    );
  }
}

export default OnboardingSlide;
