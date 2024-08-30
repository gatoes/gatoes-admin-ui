import React, { Component, Suspense } from 'react';
import { render } from 'react-dom';
import {getCurrencySymbol} from '../../utilities';
import { downloadMerchantReporting } from '../../actions/shops';
import { toast } from 'react-toastify';
import DepositCashShop from '../shops/DepositCashShop';
import Modal from '../../Modal';
import {getAclChecks} from '../../utilities';
import ShopTransactionDetail from '../shops/ShopTransactionDetail';

class PromotionReportingSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      index: props.index,
      srno: props.srno
    };
    this.downloadRecords = this.downloadRecords.bind(this);
    this.collectCash = this.collectCash.bind(this);
    this.removePanel = this.removePanel.bind(this);
  }

  collectCash(shopId, index){
    window.getFooter().setState({
      renderElement: <Modal 
              id="add-new-category"
              show={true}
              onHide={this.hide}
              header={<h4 className="modal-title">Collect Cash</h4>}
              body={<DepositCashShop shopId={shopId} index={index} removePanel={this.removePanel}  />}
            />
    });
  }

  showTransaction(shopId, index){
    window.getFooter().setState({
      renderElement: <Modal 
              id="business-detail-modal"
              show={true}
              onHide={this.hide}
              header={<h4 className="modal-title">Transactions</h4>}
              body={<ShopTransactionDetail shopId={shopId} index={index}  />}
            />
    });
  }

  removePanel(){
    window.$$('body').removeClass('modal-open');
    window.$$('body').find('.modal-backdrop').removeClass('modal-backdrop');
    this.hide();
    this.props.reload();
  }

  hide(){
    
    window.getFooter().setState({
        renderElement: null
    });
    
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      slideData: nextProps.slideData,
      status: nextProps.status,
      index: nextProps.index
    });
  }

  downloadRecords(status, type){
    const {slideData, startDate, endDate} = this.state;
    downloadMerchantReporting({shopId : slideData.shopId, startDate: this.props.startDate, endDate: this.props.endDate, sendEmail: status, type: type}).then((response) => {
      if(status){
        toast.success(response.data, {
          position: toast.POSITION.TOP_RIGHT
        });
      } else {
        window.open(response.data, "_blank");
      }
      // console.log('response', response);
      // var fileDownload = require('js-file-download');
      // fileDownload(response.data, 'report.pdf');
    })
  }

	render() {
      const { slideData, index, srno } = this.state;
      let currency = getCurrencySymbol();
      return (
        <>
        <tr key={slideData.shopId}>
          <td>{ parseInt(parseInt(index+1) + srno)}</td>
          <td>{ slideData.shopId}</td>
          <td>{slideData.shopName}</td>
          <td>
           {slideData.bannerClickCount
           }
          </td>
          <td>{currency}{slideData.bannerClickCharges}</td>
          <td>{currency}{slideData.bannerBasePrice}</td>
          <td>
           {slideData.adsClickCount
           }
          </td>
          <td>{currency}{slideData.adsClickCharges}</td>
          <td>{currency}{slideData.adsBasePrice}</td>
          <td>
           {slideData.curativeClickCount
           }
          </td>
          <td>{currency}{slideData.curativeClickCharges}</td>
          <td>{currency}{slideData.curativeBasePrice}</td>

          <td>
           {slideData.totalClickCount
           }
          </td>
          <td>{currency}{slideData.totalClickCharges}</td>
          <td>{currency}{slideData.totalBasePrice}</td>
          <td>{currency}{slideData.totalMerchantPayable}</td>
          {/* <td><a href="javascript:void(0)" className="add-money" onClick={() => this.showTransaction(slideData.shopId, index)}>View Transactions</a></td> */}
        </tr>
        </>
    	);
  	}
}

export default PromotionReportingSlide;