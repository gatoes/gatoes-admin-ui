import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import EditCuisines from './EditCuisines';
import Modal from '../../Modal';
import { getCuisinesById, deleteCuisines, deleteCuisinesSuccess } from '../../actions/shops';
import Tooltip from '../common/Tooltip';
import {DELETE_CONFIRMATION, DELETE_SUCCESS} from '../../constants';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
//import {getAclChecks} from '../../utilities';

class CuisinesSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      index: props.index,
      isPopular: false  // State for the checkbox
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.editCuisinesPanel = this.editCuisinesPanel.bind(this);
    
  }

  deleteItem(itemId, index){
    confirmAlert({
      title: '',
      message: DELETE_CONFIRMATION,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteCuisines({id: itemId}).then((response) => {
              this.props.deleteCuisinesSuccess(index);
              toast.success(DELETE_SUCCESS, {
                position: toast.POSITION.TOP_RIGHT
              });
            });
          }
        },
        {
          label: 'No'
        }
      ]
    })
  }

  editCuisinesPanel(itemIndex){
    const {slideData} = this.state;
    getCuisinesById({'id' : slideData.id}).then((response) => {
        window.getFooter().setState({
          renderElement: <Modal 
                  id="business-detail-modal"
                  show={true}
                  onHide={this.hide}
                  header={<h4 className="modal-title">Edit Cuisines</h4>}
                  body={<EditCuisines detail={response.data.data} updateCuisineSlide={this.updateCuisineSlide.bind(this)} itemIndex={itemIndex} />} 
                />
        });
    })
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      slideData: nextProps.slideData,
      index: nextProps.index
    });

  }

  handleCheckboxChange() {
    this.setState(prevState => ({
      isPopular: !prevState.isPopular
    }));
  }


  updateCuisineSlide(result){
    window.$$('body').removeClass('modal-open');
    window.$$('body').find('.modal-backdrop').removeClass('modal-backdrop');
    window.getFooter().setState({
        renderElement: null
    });
  }

  hide(){
    window.getFooter().setState({
        renderElement: null
    });
  }

	render() {
      const { slideData, index ,isPopular} = this.state;
    	return (
        <tr>
          <td>{ parseInt(index+1) }</td>
          <td>{slideData.cuisinesName}</td>
          <td>
            <div className="table-btn-block">
              <Tooltip title="Edit">
                <a href="javascript:void(0);"  onClick={() => this.editCuisinesPanel(index)}><button className="btn edit-btn"><i className="material-icons">edit</i></button></a>
              </Tooltip>
              <Tooltip title="Delete">
                <button className="btn delete-btn" onClick={() => this.deleteItem(slideData.id, index)}><i className="material-icons">delete</i></button>
              </Tooltip>
            </div>
          </td>
         

        </tr>
    	);
  	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCuisinesSuccess: (payload) => {
      dispatch(deleteCuisinesSuccess(payload));
    },

  };
}

const mapStateToProps = (state, ownProps) => {
  return {...ownProps};
}

export default connect(mapStateToProps, mapDispatchToProps)(CuisinesSlide);