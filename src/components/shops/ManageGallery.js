import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGallery, getGallerySuccess } from '../../actions/shops';
import ManageGallerySlide from './ManageGallerySlide';
import {getAclChecks} from '../../utilities';

class ManageGallery extends Component {
  constructor(props){
    super(props);
    this.state = {
      galleryListing: props.galleryListing,
      status: props.status,
      lang: window.localStorage.contentlanguage ? window.localStorage.contentlanguage : 'en'
    };
  }

  componentDidMount(){
    this.fetchRecords();
  }

  fetchRecords(){
    getGallery().then((response) => {
      this.props.getGallerySuccess(response.data.data);
    })
  }

  componentWillReceiveProps(nextProps){
    if(this.props.status != nextProps.status && nextProps.compName == 'gallerylist'){
      this.setState({
        galleryListing: nextProps.galleryListing,
        status: nextProps.status
      });
    }
  }

  render() {
    const {galleryListing, lang} = this.state;
    
    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            
            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Gallery</h4>
              </div>
              <div className="col-sm-7 tr-block text-right align-self-center">
                {
                  lang == 'en'
                  ?
                  <Link className="btn green-btn" to="/dashboard/addgallery"><span className="icon-ic_plus"></span>Add New</Link>
                  :
                  null
                }
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="result-listing">
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Sr.no.</th>
                        <th>Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        galleryListing && galleryListing.length > 0 && galleryListing.map((obj, index) => (
                          <ManageGallerySlide slideData={obj} index={index} key={obj.id} />
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
      </div>
    );
  }
}

const mapStatesToProps = (state, ownProps) => {
  return {
    galleryListing: state.Shop.gallery_list,
    status: state.Shop.status,
    compName: state.Shop.compName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGallerySuccess: (payload) => {
      dispatch(getGallerySuccess(payload));
    },
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(ManageGallery);

