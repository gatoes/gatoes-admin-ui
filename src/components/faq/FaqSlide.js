import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { deleteFaq, deleteFaqSuccess } from '../../actions/users';
import Tooltip from '../common/Tooltip';
import { DELETE_CONFIRMATION, DELETE_SUCCESS } from '../../constants';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {getAclChecks} from '../../utilities';

class FaqSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      index: props.index
    };
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      slideData: nextProps.slideData,
      index: nextProps.index
    });
  }

  deleteItem(dId, index){
    confirmAlert({
      title: '',
      message: DELETE_CONFIRMATION,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteFaq({faqId: dId}).then((response) => {
              this.props.deleteFaqSuccess(index);
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

	render() {
      const { slideData, index } = this.state;
    	return (
        <tr>
          <td>{ parseInt(index+1) }</td>
          <td>
            <Tooltip title={slideData.answer}>
              {slideData.question}
            </Tooltip>
          </td>
          <td>{slideData.like}</td>
          <td>{slideData.dislike}</td>
          <td>{slideData.status ? <span className='rider-online'>Publish</span> : <span className='rider-offline'>Unpublish</span> }</td>
          
          <td>
            <div className="table-btn-block">
              <div className="table-btn-block">
                {
                  getAclChecks('FAQ_ADD_EDIT')
                  ?
                  <Link className="btn edit-btn" to={"/dashboard/editfaq/"+ slideData.id}>Edit</Link>
                  :
                  null
                }
                {
                  getAclChecks('FAQ_DELETE')
                  ?
                  <button className="btn delete-btn" onClick={() => this.deleteItem(slideData.id, index)}>Delete</button>
                  :
                  null
                }
                
              </div>
            </div>
          </td>
        </tr>
    	);
  	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFaqSuccess: (payload) => {
      dispatch(deleteFaqSuccess(payload));
    },
  };
}

export default connect(null, mapDispatchToProps)(FaqSlide);