import React, { Component, Suspense } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AddCuisines from './AddCuisines';
import Modal from '../../Modal';
import { cuisineListing, cuisineListingSuccess } from '../../actions/shops';
import CuisinesSlide from './CuisinesSlide';
//import {getAclChecks} from '../../utilities';

class Cuisines extends Component {
  constructor(props){
    super(props);
    this.state = {
      cuisneList: props.cuisneList,
      status: props.status,
      lang: window.localStorage.contentlanguage
    }
    this.updateCuisines = this.updateCuisines.bind(this);
  }
 
  componentDidMount(){
    console.log('8888status', this.state.status);
    this.fetchRecords();
  }

  fetchRecords(){
    cuisineListing().then((response) => {
      this.props.cuisineListingSuccess(response.data.data);
    })
  }

  componentWillReceiveProps(nextProps){
    if(this.props.status != nextProps.status && nextProps.compName == 'cuisinelist'){
      this.setState({
        cuisneList: nextProps.cuisneList,
        status: nextProps.status
      });
    }
  }

  /*shouldComponentUpdate(nextProps, nextState){
    if(this.state.status == nextProps.status && nextProps.compName == 'cuisinelist'){
      return false;
    }

    return true;
  }*/

  addCuisinesPanel(e){
    window.getFooter().setState({
      renderElement: <Modal 
              id="business-detail-modal"
              show={true}
              onHide={this.hide}
              header={<h4 className="modal-title">Cuisines</h4>}
              body={<AddCuisines updateCuisines={this.updateCuisines} />}
            />
    });
  }

  updateCuisines(result){
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
    const {cuisneList, status, lang} = this.state;
    return (
      <div className="right-ui-block">
        <div className="scrollspy-example">
          <div className="rm-content">
            
            <div className="row menu-top-block">
              <div className="col-sm-5 tl-block align-self-center">
                <h4 className="heading">Cuisines</h4>
              </div>
              <div className="col-sm-7 tr-block text-right align-self-center">
                {
                  lang == 'en'
                  ?
                  <a href="javascript:void(0);" onClick={this.addCuisinesPanel.bind(this)}><button className="btn green-btn"><i className="material-icons">add_circle_outline</i>Add Cuisines</button></a>
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
                        <th>Sr.no.</th>
                        <th>Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        cuisneList && cuisneList.length > 0 && cuisneList.map((obj, index) => (
                          <CuisinesSlide slideData={obj} index={index} key={`${obj.id}-${obj.cuisinesName}`} />
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
    cuisneList: [...state.Shop.cuisine_list],
    status: state.Shop.status,
    compName: state.Shop.compName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cuisineListingSuccess: (payload) => {
      dispatch(cuisineListingSuccess(payload));
    },
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(Cuisines);