import React, { Component, Suspense } from 'react';
import { render } from 'react-dom';
import {getCurrencySymbol} from '../../utilities';
import moment from 'moment';
import Tooltip from '../common/Tooltip';
import {order_status, WHO_BEAR_COST, PAYMENT_TYPE, currencyFormat} from '../../constants'; 

class OrderReportingSlide extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideData: props.slideData,
      index: props.index,
      srno: props.srno
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      slideData: nextProps.slideData,
      index: nextProps.index
    });
  }

  //{currencyFormat(items.price, 'INR')}

  render() {
      const { slideData, index, srno } = this.state;
      let currency = '₹';//getCurrencySymbol();
      var deliveryCharges = slideData.deliveryCharge ? slideData.deliveryCharge : 0;
      var totalTax = slideData.totalTax ? slideData.totalTax : 0;
      var walletUsed = slideData.walletUsed ? slideData.walletUsed : 0;
      var packagingCharge = slideData.packagingCharge ? slideData.packagingCharge : 0;
      var taxes = slideData.taxes ? slideData.taxes : 0;
      var adminGrossEarning = slideData.reOrderedBy ? null : "Item total - restaurant gross earning";
      var adminNetEarning = parseFloat(parseFloat(slideData.subTotal) + parseFloat(deliveryCharges) - slideData.merchantEarning - slideData.driverCharges);
      var couponDiscount = slideData.couponDiscount ? slideData.couponDiscount : 0;
      var couponLessDiscount = slideData.couponLessDiscount ? slideData.couponLessDiscount : 0;
      var couponUsed = slideData.couponUsed ? slideData.couponUsed : '';
      var merchantDiscount = slideData.merchantDiscount ? slideData.merchantDiscount : 0;
      let gatoesServiceFeeWithoutTax = slideData && slideData.deductionStatement && slideData.deductionStatement.merchant && slideData.deductionStatement.merchant.totalChargesWithoutTax ? slideData.deductionStatement.merchant.totalChargesWithoutTax : 0 - slideData && slideData.deductionStatement && slideData.deductionStatement.merchant && slideData.deductionStatement.merchant.merchantLongDistanceFee ? slideData.deductionStatement.merchant.merchantLongDistanceFee : 0;

      let gatoesFeeIncTax = slideData.deductionStatement && slideData.deductionStatement.merchant && slideData.deductionStatement.merchant.totalWithCommissionAndTax ? parseFloat(slideData.deductionStatement.merchant.totalWithCommissionAndTax) : 0 - slideData.deductionStatement && slideData.deductionStatement.merchant && slideData.deductionStatement.merchant.merchantLongDistanceFee ? parseFloat(slideData.deductionStatement.merchant.merchantLongDistanceFee) : 0;

      let tcs = slideData && slideData.deductionStatement && slideData.deductionStatement.taxes && slideData.deductionStatement.taxes.merchantTaxes && slideData.deductionStatement.taxes.merchantTaxes.TCS && slideData.deductionStatement.taxes.merchantTaxes.TCS.amount ? slideData.deductionStatement.taxes.merchantTaxes.TCS.amount : 0;
      let tds = slideData && slideData.deductionStatement && slideData.deductionStatement.taxes && slideData.deductionStatement.taxes.merchantTaxes && slideData.deductionStatement.taxes.merchantTaxes.TDS && slideData.deductionStatement.taxes.merchantTaxes.TDS.amount ? slideData.deductionStatement.taxes.merchantTaxes.TDS.amount : 0;

      let netAmount = parseFloat(parseFloat(slideData && slideData.merchantNetEarning) - tcs - tds);

      // var netBillValueWithoutTaxes = parseFloat(parseFloat(slideData.subTotal) + parseFloat(slideData.packagingCharge) - slideData.taxes);

      console.log(slideData,"SlidOrder")
      return (
        <>
        <tr key={slideData.orderId}>
          <td>{ parseInt(parseInt(index+1) + srno)}</td>
          <td>{slideData.createdAt && moment(slideData.createdAt).local().format('llll') }</td>
          <td>{slideData.restaurantUniqueId}</td>
          <td>{slideData.shopName}</td>
          <td>{slideData.orderId}</td>
          <td>{slideData.planId}</td>
          <td>{ order_status[slideData.status]}</td>
          <td>{slideData.walletUsed ? slideData.walletUser : "N.A" }</td>
          <td>{ PAYMENT_TYPE[slideData.paymentType].label } </td>
          <td>{slideData.placedAt ? moment(slideData.placedAt).local().format('llll') : "N.A" }</td>
          <td>{slideData.markReadyAt ? moment(slideData.markReadyAt).local().format('llll') : "N.A" }</td>
          <td>{slideData.pickedAt && moment(slideData.pickedAt).local().format('llll') }</td>
                    <td>{slideData.deliveredAt ? moment(slideData.deliveredAt).local().format('llll') : "N.A" }</td>

          {/* <td>
            { 
              slideData.reOrderedBy
              ? 
              slideData.whoBearCost <= 1 ? "Reorder #" + slideData.reOrderedBy + " " +WHO_BEAR_COST[slideData.whoBearCost].label + " bearing the cost" : null  : "Normal" }</td> */}
         
          {/* <td>{slideData.isAutoAccept == true ? "Yes" : "No"}</td> */}
          {/*
          <td>{currency+slideData.subTotal.toFixed(2)}</td>
          <td>{currency+slideData.totalPrice.toFixed(2)}</td>
          <td>{currency+walletUsed.toFixed(2)}</td>
          <td>{currency+deliveryCharges.toFixed(2)}</td>
          <td>{currency+packagingCharge.toFixed(2)}</td>
          <td>{currency+taxes.toFixed(2)}</td>
          <td>{slideData.merchantGrossEarning ? currency+slideData.merchantGrossEarning.toFixed(2) : null }</td>
          <td>
            <Tooltip title="Restaurant gross earning + packaging charges + taxes">
              {slideData.merchantNetEarning ? currency+slideData.merchantNetEarning.toFixed(2) : null }
            </Tooltip>
          </td>
          <td>
            <Tooltip title={slideData.clientCharges ? slideData.clientCharges : null}>
              {currency+slideData.clientGrossEarning.toFixed(2)}
            </Tooltip>
          </td>
          <td>{currency+couponDiscount.toFixed(2)}</td>
          <td>{currency+couponLessDiscount.toFixed(2)}</td>
          <td>{couponUsed}</td>
          */}
          <td>{slideData.orderAcceptedTime}</td>
          <td>{slideData.markReadyTime}</td>
          <td>{slideData.riderDeliveryTimeInMinutes }</td>
          <td>{slideData.totalDeliveryTimeInMinutes}</td>
          <td>{slideData.userName}</td>
          <td>{slideData.riderName}</td>
          <td>{ currencyFormat(slideData.subTotal, 'INR') }</td>

          {/* <td>{slideData.conformedAt && moment(slideData.conformedAt).local().format('llll') }</td>
          <td>{slideData.deliveredAt && moment(slideData.deliveredAt).local().format('llll') }</td> */}
          
          {/* <td>{slideData.pickedAt && moment(slideData.pickedAt).local().format('llll') }</td> */}
          

          {/* <td>{slideData.cancelledBy}</td>  */}
          <td>{ currencyFormat(slideData.packagingCharge ? slideData.packagingCharge : 0, 'INR') }</td>
          <td>{slideData.Couponcode}</td>


          <td>{ currencyFormat(merchantDiscount, 'INR') }</td>
          <td>{slideData.merchantDiscountWithoutCoupon}</td> 
          <td>{ currencyFormat(slideData.totalDiscount, 'INR') }</td> 
          <td title="subTotal + packagingCharge - merchantDiscount">{ currencyFormat(slideData.netBillWithoutTax ? slideData.netBillWithoutTax : 0, 'INR') }</td>
          <td>{ currencyFormat(slideData.gstOnOrderIncludingCess ? slideData.gstOnOrderIncludingCess : 0, 'INR') }</td>
          <td>₹{slideData.deliveryCharge}</td>
          <td>{ currencyFormat(slideData.customerPayableNetBillValueAfterTaxesAndDiscount ? slideData.customerPayableNetBillValueAfterTaxesAndDiscount : 0, 'INR') }</td>
          <td>{ currencyFormat(slideData.gatoesPlatformServiceFeeChargeableOn ? slideData.gatoesPlatformServiceFeeChargeableOn : 0, 'INR') }</td> 
          <td>{slideData && slideData.gatoesPlatformServiceFeePercentage ? slideData.gatoesPlatformServiceFeePercentage + "%" : 0}</td>
          <td>{ currencyFormat(slideData.gatoesPlatformServiceFee ? slideData.gatoesPlatformServiceFee : 0, 'INR') }</td>
          <td>{slideData && slideData.merchantCapApplied ? 'Yes': 'No'}</td>
          <td>{slideData && slideData.merchantMaxCapApplied ? 'Yes': 'No'}</td>
          <td>{slideData.vendorDeliveryChargesApplicableOnOrder}</td>
          <td>{currencyFormat(slideData.discountOnVendorDeliveryCharges ? slideData.discountOnVendorDeliveryCharges : 0, 'INR')}</td>
          {/* <td>{ currencyFormat(slideData.deliveryChargesApplicableOnOrder ? slideData.deliveryChargesApplicableOnOrder : 0, 'INR') }</td> */}
          {/* <td>{currencyFormat(slideData.discountOnGatoesPlatformServiceFee ? slideData.discountOnGatoesPlatformServiceFee : 0, 'INR')}</td> */}
          <td>{slideData && slideData.lastMileDistanceInKM && slideData.lastMileDistanceInKM != 'NA' ? slideData.lastMileDistanceInKM + "KM" : 'NA'}</td>

          <td>{slideData && slideData.merchantLongDistanceApplicable ? 'Yes' : 'No'}</td>
          
          <td>{ currencyFormat(slideData.longDistanceFee ? slideData.longDistanceFee : 0, 'INR') }</td>
          {/* <td>{ currencyFormat(slideData.discountOnLongDistanceFee ? slideData.discountOnLongDistanceFee : 0, 'INR') }</td> */}
         
          <td>{ currencyFormat(slideData.collectionCharges ? slideData.collectionCharges : 0, 'INR') }</td>
          {/* <td>{ currencyFormat(slideData.accessCharges ? slideData.accessCharges : 0, 'INR') }</td> */}
          <td>{ currencyFormat(slideData.merchantCancellationCharges ? slideData.merchantCancellationCharges : 0, 'INR') }</td>
          {/* <td>{ currencyFormat(slideData.callCenterServiceFees ? slideData.callCenterServiceFees : 0, 'INR') }</td> */}
          <td>{ currencyFormat(slideData.totalGatoesServiceFeeWithoutTaxes ? slideData.totalGatoesServiceFeeWithoutTaxes : 0, 'INR') }</td>
          {/* <td>{ currencyFormat(slideData.deliveryFeeSponsoredByMerchant ? slideData.deliveryFeeSponsoredByMerchant : 0, 'INR') }</td> */}
          <td>{ currencyFormat(slideData.taxesOnGatoesFeeIncludingCess ? slideData.taxesOnGatoesFeeIncludingCess : 0, 'INR') }</td>
          <td>{ currencyFormat(slideData.totalGatoesFeeIncludingTaxes ? slideData.totalGatoesFeeIncludingTaxes : 0, 'INR') }</td>
          {/* <td>{slideData.cashPrepaymentToMerchant}</td> */}
          {/* <td>{slideData.merchantShareOfCancelledOrders}</td> */}
          <td>{slideData.gstDeductionUnder9_5}</td>
          <td>{slideData.refundForCustomerComplaints}</td>
          {/* <td>{slideData.disputedOrderRemarks}</td> */}
          <td>{slideData.totalOfOrderLevelAdjustments}</td>
          <td>{ currencyFormat(slideData.netPayableAmountBeforeTCSDeduction ? slideData.netPayableAmountBeforeTCSDeduction : 0, 'INR') }</td>
          <td>{ currencyFormat(slideData.TCS ? slideData.TCS : 0, 'INR') }</td>
          <td>{ currencyFormat(slideData.TDS ? slideData.TDS : 0, 'INR') }</td>
          <td>{ currencyFormat(slideData.NetPayableAmountAfterTCSAndTDSDeduction ? slideData.NetPayableAmountAfterTCSAndTDSDeduction : 0, 'INR') }</td>

          
          <td>{slideData.mfrAccurate}</td>
          <td>{slideData.mfrPressed}</td>
          {/* <td>{slideData.cancellationPolicyApplied}</td> */}
          {/* <td>{slideData.couponCodeSourced}</td> */}
          <td>{slideData.discountCampaignID}</td>
          {/* <td>{slideData.isReplicated}</td> */}
          {/* <td>{slideData.baseOrderID}</td> */}
          <td>{slideData.mrpItems}</td>
          {/* <td>{slideData.orderPaymentType}</td> */}
          {/* <td>{slideData.cancellationTime}</td> */}
          <td>{slideData.pickUpStatus}</td>
          {/* <td>{slideData.isSuper}</td> */}
          <td>{slideData && slideData.isOrderWithPromotion ? 'Yes' : 'No'}</td>
          <td>{slideData && slideData.promotionType ? slideData.promotionType : '-'  }</td>

           <td>{ currencyFormat(slideData && slideData.surgeChargedOnMerchant ? slideData.surgeChargedOnMerchant : 0, 'INR') }</td>
          <td>{ currencyFormat(slideData && slideData.surgeChargedOnUser ? slideData.surgeChargedOnUser : 0, 'INR') }</td>

        </tr>
        </>
      );
    }
}

export default OrderReportingSlide;