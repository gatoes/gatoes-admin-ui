import {load} from './utilities';
import React from 'react';
import { Redirect } from 'react-router-dom';

export const ROUTES = {
  ROOT: { 
  	path: '/',
  	exact: true,
  	render: () => <Redirect to="/login" />
  },
  DASHBOARD: { 
  	path: '/dashboard',
    component: load('Dashboard'),
    acl: 'DASHBOARD'
  },
  DASHBOARDANALYTICS: { 
    path: '/dashboard',
    exact: true,
    component: load('dashboard/Dashboard'),
    acl: 'DASHBOARD'
  },
  MANAGEREGIONS: { 
    path: '/dashboard/regionlisting',
    exact: true,
    component: load('regions/Listing'),
    acl: 'ZONE_VIEW_ONLY'
  },
  ADDNEWREGIONS: { 
    path: '/dashboard/addnewregion',
    exact: true,
    component: load('regions/AddRegion'),
    acl: 'ZONE_ADD_EDIT'
  },
  EDITNEWREGIONS: { 
    path: '/dashboard/editnewregion/:index',
    exact: true,
    component: load('regions/EditRegion'),
    acl: 'ZONE_ADD_EDIT'
  },
  MANAGEDELIVERYREGION: { 
    path: '/dashboard/managedeliveryregion/:index',
    exact: true,
    component: load('regions/DeliveryRegion'),
    acl: 'DELIVERY_REGION_VIEW_ONLY'
  },
  MANAGEBUSINESSZONE: { 
    path: '/dashboard/managebusinesszone/:index',
    exact: true,
    component: load('regions/BusinessZone'),
    acl: 'BUSINESS_ZONE_VIEW_ONLY'
  },
  MANAGESHOPS: { 
    path: '/dashboard/shoplisting',
    exact: true,
    component: load('shops/Listing'),
    acl: 'SHOPS_VIEW_ONLY'
  },
  ADDNEWSHOP: { 
    path: '/dashboard/addnewshop',
    exact: true,
    component: load('shops/AddShop'),
    acl: 'SHOPS_ADD_EDIT'
  },
  EDITSHOP: { 
    path: '/dashboard/editshop/:index',
    exact: true,
    component: load('shops/EditShop'),
    acl: 'SHOPS_ADD_EDIT'
  },
  SHOPITEMCSV: { 
    path: '/dashboard/uploaditemcsv/:index',
    exact: true,
    component: load('shops/UploadItemCsv'),
    acl: 'SHOPS_ADD_EDIT'
  },
  MANAGEDELIVERYAGENT: { 
    path: '/dashboard/deliveryagentlisting',
    exact: true,
    component: load('deliveryagent/Listing'),
    acl: 'RIDERS_VIEW_ONLY'
  },
  ADDNEWDELIVERYAGENT: { 
    path: '/dashboard/addnewdeliveryagent',
    exact: true,
    component: load('deliveryagent/AddDeliveryAgent'),
    acl: 'RIDERS_ADD_EDIT'
  },
  EDITDELIVERYAGENT: { 
    path: '/dashboard/editdeliveryagent/:index',
    exact: true,
    component: load('deliveryagent/EditDeliveryAgent'),
    acl: 'RIDERS_ADD_EDIT'
  },
  RIDERGEOMAPLOCATION: { 
    path: '/dashboard/ridergeomaplocation',
    exact: true,
    component: load('deliveryagent/RiderGeomapLocation'),
    acl: 'RIDERS_VIEW_ONLY'
  },
  ORDERSLISTING: { 
    path: '/dashboard/orders',
    exact: true,
    component: load('orders/Listing'),
    acl: 'ORDERS_LISTING'
  },
  UNASSIGNEDORDERSLISTING: { 
    path: '/dashboard/unassignedorders',
    exact: true,
    component: load('orders/UnassignedOrdersListing'),
    acl: 'UNASSIGNED_ORDERS_VIEW_ONLY'
  },
  SETTING: { 
    path: '/dashboard/settings',
    exact: true,
    component: load('setting/Settings'),
    acl: 'GENERAL_SETTING'
  },
  USERAPPSETTING: { 
    path: '/dashboard/appsetting',
    exact: true,
    component: load('setting/UserAppSettings'),
    acl: 'GENERAL_SETTING'
  },
  REFERFRIENDSETTING: { 
    path: '/dashboard/refertofriendsetting',
    exact: true,
    component: load('setting/ReferToFriend'),
    acl: 'REFER_FRIEND_SETTING'
  },

  MENU: { 
    path: '/dashboard/menu/:shopid',
    exact: true,
    component: load('menu/Menu'),
    acl: 'SHOP_MENU_VIEW_ONLY'
  },
  ADDMENUITEM: { 
      path: '/dashboard/addmenuitem/:shopid',
      exact: true,
      component: load('menu/AddMenuItem'),
    acl: 'SHOP_MENU_ADD_EDIT'
  },
  EDITMENUITEM: { 
      path: '/dashboard/editmenuitem/:shopid/:index',
      exact: true,
      component: load('menu/EditMenuItem'),
    acl: 'SHOP_MENU_ADD_EDIT'
  },
  REQUESTEDMENUITEMS: { 
      path: '/dashboard/requestedmenuitems',
      exact: true,
      component: load('menu/RequestedMenuItems'),
    acl: 'REQUESTED_MENU_ITEM'
  },
  DRIVERSETTING: { 
    path: '/dashboard/driversettings',
    exact: true,
    component: load('deliveryagent/Settings'),
    acl: 'RIDER_SETTING'
  },
  DELIVERYSETTING: { 
    path: '/dashboard/deliverysettings',
    exact: true,
    component: load('setting/DeliverySetting'),
    acl: 'DELIVERY_CHARGES_SETTING'
  },
  ADDDELIVERYSETTING: { 
    path: '/dashboard/adddeliverysettings',
    exact: true,
    component: load('setting/AddDeliverySetting'),
    acl: 'DELIVERY_CHARGES_SETTING'
  },
  EDITDELIVERYSETTING: { 
      path: '/dashboard/editdeliverysettings/:index',
      exact: true,
      component: load('setting/EditDeliverySetting'),
    acl: 'DELIVERY_CHARGES_SETTING'
  },
  OUTOFSTOCKORDERS: { 
      path: '/dashboard/outofstockorders',
      exact: true,
      component: load('orders/OutOfStockOrders'),
    acl: 'OUT_OF_STOCK_ORDERS'
  },
  OUTOFSTOCKORDERBYID: { 
      path: '/dashboard/outofstockorderbyid/:orderId',
      exact: true,
      component: load('orders/OutOfStockOrderById'),
    acl: 'OUT_OF_STOCK_ORDERS'
  },
  PROMOCODE: {
    path:'/dashboard/promocodes',
    exact: true,
    component: load('promocode/Listing'),
    acl: 'PROMOCODE_VIEW_ONLY'
  },
  ADDPROMOCODE: {
    path:'/dashboard/addpromocode',
    exact: true,
    component: load('promocode/AddPromoCode'),
    acl: 'PROMOCODE_ADD'
  },
  EDITPROMOCODE: {
    path:'/dashboard/editpromocode/:index',
    exact: true,
    component: load('promocode/EditPromoCode'),
    acl: 'PROMOCODE_ADD'
  },
  PROMOCODEDETAIL: {
    path:'/dashboard/promodetail/:index',
    exact: true,
    component: load('promocode/Detail'),
    acl: 'PROMOCODE_VIEW_ONLY'
  },
  COUPONLISTBYRULEID: {
    path:'/dashboard/getcouponlistbyruleid/:index',
    exact: true,
    component: load('promocode/CouponList'),
    acl: 'PROMOCODE_VIEW_ONLY'
  },
  RIDERDOCSLISTING: { 
    path: '/dashboard/riderdocuments/:index',
    exact: true,
    component: load('deliveryagent/DocsListing'),
    acl: 'RIDERS_DOCUMENTS'
  },
  SHOPDOCSLISTING: { 
    path: '/dashboard/shopdocuments/:index',
    exact: true,
    component: load('shops/DocsListing'),
    acl: 'SHOPS_DOCUMENTS'
  },
  SHOPDOCSLISTINGAADHAR: { 
    path: '/dashboard/shopdocuments/:index/1',
    exact: true,
    component: load('shops/DocsListing'),
    acl: 'SHOPS_DOCUMENTS_AADHAR'
  },
  
  DRIVERREGIONGROUP: { 
    path: '/dashboard/driverregiongroups',
    exact: true,
    component: load('deliveryagent/DriverRegionGroupListing'),
    acl: 'RIDER_REGION_GROUP_VIEW_ONLY'
  },
  ADDDRIVERREGIONGROUP: { 
    path: '/dashboard/adddriverregiongroup',
    exact: true,
    component: load('deliveryagent/AddDriverRegionGroup'),
    acl: 'RIDER_REGION_GROUP_ADD_EDIT'
  },
  EDITDRIVERREGIONGROUP: { 
    path: '/dashboard/editdriverregiongroup/:index',
    exact: true,
    component: load('deliveryagent/EditDriverRegionGroup'),
    acl: 'RIDER_REGION_GROUP_ADD_EDIT'
  },
  MANAGEROLES: { 
    path: '/dashboard/manageroles',
    exact: true,
    component: load('users/ManageRoles'),
    acl: 'ROLES_VIEW_ONLY'
  },
  ADDROLES: { 
    path: '/dashboard/addrole',
    exact: true,
    component: load('users/AddRole'),
    acl: 'ROLES_ADD_EDIT'
  },
  EDITROLES: { 
    path: '/dashboard/editrole/:index',
    exact: true,
    component: load('users/EditRole'),
    acl: 'ROLES_ADD_EDIT'
  },
  MANAGESTAFF: { 
    path: '/dashboard/managestaff',
    exact: true,
    component: load('users/ManageStaff'),
    acl: 'STAFF_VIEW_ONLY'
  },
  ADDSTAFF: { 
    path: '/dashboard/addstaff',
    exact: true,
    component: load('users/AddStaff'),
    acl: 'STAFF_ADD_EDIT'
  },
  EDITSTAFF: { 
    path: '/dashboard/editstaff/:index',
    exact: true,
    component: load('users/EditStaff'),
    acl: 'STAFF_ADD_EDIT'
  },
  RIDERREPORTING: { 
    path: '/dashboard/riderreporting',
    exact: true,
    component: load('reporting/RidersReporting'),
    acl: 'RIDER_REPORTING'
  },
  RIDERCASHREPORTING: { 
    path: '/dashboard/ridercashreporting',
    exact: true,
    component: load('reporting/RiderCashReporting'),
    acl: 'RIDER_REPORTING'
  },
  MERCHANTREPORTING: { 
    path: '/dashboard/merchantreporting',
    exact: true,
    component: load('reporting/MerchantsReporting'),
    acl: 'MERCHANT_REPORTING'
  },
  MERCHANTFINANCEREPORTING: { 
    path: '/dashboard/merchantfinancereporting',
    exact: true,
    component: load('reporting/MerchantsFinanceReporting'),
    acl: 'MERCHANT_REPORTING'
  },
  BESTSELLINGITEMREPORTING: { 
    path: '/dashboard/bestsellingitemsreporting',
    exact: true,
    component: load('reporting/BestSellingItemsReporting'),
    acl: 'MERCHANT_REPORTING'
  },
  CUSTOMERREPORTING: { 
    path: '/dashboard/customerreporting',
    exact: true,
    component: load('reporting/CustomerReporting'),
    acl: 'CUSTOMER_REPORTING'
  },
  ORDERREPORTING: { 
    path: '/dashboard/orderreporting',
    exact: true,
    component: load('reporting/OrderReporting'),
    acl: 'ORDER_REPORTING'
  },
  ORDERHOURLYREPORTING: { 
    path: '/dashboard/orderhourlyreporting',
    exact: true,
    component: load('reporting/OrderHourlyReporting'),
    acl: 'HOURLY_ORDER_REPORTING'
  },
  MANAGECOMMUNICATIONMEDIUM: { 
    path: '/dashboard/managecommunicationmedium',
    exact: true,
    component: load('communication/ManageCommunicationMedium'),
    acl: 'BROADCAST_MESSAGE_VIEW_ONLY' 
  },
  ADDCOMMUNICATIONMEDIUM: { 
    path: '/dashboard/addcommunicationmedium',
    exact: true,
    component: load('communication/AddCommunicationMedium'),
    acl: 'BROADCAST_MESSAGE_ADD_EDIT' 
  },
  EDITCOMMUNICATIONMEDIUM: { 
    path: '/dashboard/editcommunicationmedium/:index',
    exact: true,
    component: load('communication/EditCommunicationMedium'),
    acl: 'BROADCAST_MESSAGE_ADD_EDIT' 
  },
  MANAGESHOPCATEGORY: { 
    path: '/dashboard/manageshopcategory',
    exact: true,
    component: load('shops/ManageShopCategory'),
    acl: 'SHOP_CATEGORY_VIEW_ONLY' 
  },
  ADDSHOPCATEGORY: { 
    path: '/dashboard/addshopcategory',
    exact: true,
    component: load('shops/AddShopCategory'),
    acl: 'SHOP_CATEGORY_ADD_EDIT' 
  },
  EDITSHOPCATEGORY: { 
    path: '/dashboard/editshopcategory/:index',
    exact: true,
    component: load('shops/EditShopCategory'),
    acl: 'SHOP_CATEGORY_ADD_EDIT' 
  },
  LOGSREPORTING: { 
    path: '/dashboard/logs',
    exact: true,
    component: load('reporting/Logs')
  },
  LOGOUT: { 
    path: '/logout',
    component: load('Logout')
  },
  LOGIN: { 
  	path: '/login',
  	exact: true,
    component: load('Login')
  },
  PAYMENTSUCCESS: { 
    path: '/paymentsuccess/:index',
    exact: true,
    component: load('PaymentSuccess'),
  },
  PAYMENTFAILURE: { 
    path: '/paymentfailure/:index',
    exact: true,
    component: load('PaymentFailure'),
  },
  MANAGEFAQ: { 
    path: '/dashboard/managefaq',
    exact: true,
    component: load('faq/ManageFaq'),
    acl: 'FAQ_VIEW_ONLY'
  },
  ADDFAQ: { 
    path: '/dashboard/addfaq',
    exact: true,
    component: load('faq/AddFaq'),
    acl: 'FAQ_ADD_EDIT'
  },
  EDITFAQ: { 
    path: '/dashboard/editfaq/:index',
    exact: true,
    component: load('faq/EditFaq'),
    acl: 'FAQ_ADD_EDIT'
  },
  APPVERSION: { 
    path: '/dashboard/appversion',
    exact: true,
    component: load('setting/AppVersion'),
    acl: 'APP_VERSION_SETTING'
  },
  CUSTOMERS: { 
    path: '/dashboard/customers',
    exact: true,
    component: load('users/Customers'),
    acl: 'CUSTOMER_VIEW_ONLY'
  },
  MANAGECUISINES: { 
    path: '/dashboard/managecuisines',
    exact: true,
    component: load('menu/Cuisines'),
    acl: 'SHOPS_ADD_EDIT'
  },
  MANAGEGALLERY: { 
    path: '/dashboard/managegallery',
    exact: true,
    component: load('shops/ManageGallery'),
    acl: 'SHOPS_ADD_EDIT' 
  },
  ADDGALLERY: { 
    path: '/dashboard/addgallery',
    exact: true,
    component: load('shops/AddGallery'),
    acl: 'SHOPS_ADD_EDIT' 
  },
  EDITGALLERY: { 
    path: '/dashboard/editgallery/:index',
    exact: true,
    component: load('shops/EditGallery'),
    acl: 'SHOPS_ADD_EDIT' 
  },
  MANAGERESTAURANTBANNER: { 
    path: '/dashboard/managerestaurantbanner',
    exact: true,
    component: load('shops/ManageRestaurantBanner'),
    acl: 'SHOPS_ADD_EDIT' 
  },
  ADDRESTAURANTBANNER: { 
    path: '/dashboard/addrestaurantbanner',
    exact: true,
    component: load('shops/AddRestaurantBanner'),
    acl: 'SHOPS_ADD_EDIT' 
  },
  EDITRESTAURANTBANNER: { 
    path: '/dashboard/editrestaurantbanner/:index',
    exact: true,
    component: load('shops/EditRestaurantBanner'),
    acl: 'SHOPS_ADD_EDIT' 
  },
  MANAGESUPERMERCHANT: { 
    path: '/dashboard/managesupermerchant',
    exact: true,
    component: load('shops/ManageSuperMerchant'),
    acl: 'SHOPS_ADD_EDIT' 
  },
  ADDSUPERMERCHANT: { 
    path: '/dashboard/addsupermerchant',
    exact: true,
    component: load('shops/AddSuperMerchant'),
    acl: 'SHOPS_ADD_EDIT' 
  },
  EDITSUPERMERCHANT: { 
    path: '/dashboard/editsupermerchant/:index',
    exact: true,
    component: load('shops/EditSuperMerchant'),
    acl: 'SHOPS_ADD_EDIT' 
  },
  WALLETREPORTING: { 
    path: '/dashboard/walletreporting',
    exact: true,
    component: load('reporting/WalletReporting'),
    acl: 'CUSTOMER_REPORTING'
  },
  PARTNERWITHUS: { 
    path: '/dashboard/partnerwithus',
    exact: true,
    component: load('reporting/PartnerWithUs'),
    acl: 'MERCHANT_REPORTING'
  },
  MANAGETESTIMONIAL: { 
    path: '/dashboard/managetestimonial',
    exact: true,
    component: load('shops/ManageTestimonial'),
    acl: 'SHOPS_ADD_EDIT' 
  },
  ADDTESTIMONIAL: { 
    path: '/dashboard/addtestimonial',
    exact: true,
    component: load('shops/AddTestimonial'),
    acl: 'SHOPS_ADD_EDIT' 
  },
  EDITTESTIMONIAL: { 
    path: '/dashboard/edittestimonial/:index',
    exact: true,
    component: load('shops/EditTestimonial'),
    acl: 'SHOPS_ADD_EDIT' 
  },
  RIDEWITHUS: { 
    path: '/dashboard/ridewithus',
    exact: true,
    component: load('reporting/RideWithUs'),
    acl: 'RIDER_REPORTING'
  },
  REFUNDREPORTING: { 
    path: '/dashboard/refundreporting',
    exact: true,
    component: load('reporting/RefundReporting'),
    acl: 'CUSTOMER_REPORTING'
  },
  ADMINPASSWORD: { 
    path: '/dashboard/manageadminpassword',
    exact: true,
    component: load('common/ManageAdminPassword'),
    acl: 'DASHBOARD'
  },
  PAYOUTREQUESTS: { 
    path: '/dashboard/payoutrequests',
    exact: true,
    component: load('reporting/PayoutRequest'),
    acl: 'MERCHANT_REPORTING'
  },
  MANAGEPLAN: { 
    path: '/dashboard/manageplan',
    exact: true,
    component: load('plans/ManagePlan'),
    acl: 'PLAN_LISTING' 
  },
  ADDPLAN: { 
    path: '/dashboard/addplan',
    exact: true,
    component: load('plans/AddPlan'),
    acl: 'PLAN_ADD_EDIT' 
  },
  EDITPLAN: { 
    path: '/dashboard/editplan/:index',
    exact: true,
    component: load('plans/EditPlan'),
    acl: 'PLAN_ADD_EDIT' 
  },
  MANAGETAXES: { 
    path: '/dashboard/managetaxes',
    exact: true,
    component: load('tax/ManageTaxes'),
    acl: 'TAX_LISTING' 
  },
  ADDTAXES: { 
    path: '/dashboard/add-taxes',
    exact: true,
    component: load('tax/AddTaxes'),
    acl: 'TAX_ADD_EDIT' 
  },
  EDITTAXES: { 
    path: '/dashboard/edit-taxes/:index',
    exact: true,
    component: load('tax/EditTaxes'),
    acl: 'TAX_ADD_EDIT' 
  },


  MANAGEUSERSTATUS: { 
    path: '/dashboard/managestatus',
    exact: true,
    component: load('users/ManageStatus'),
    acl: 'CUSTOMER_VIEW_ONLY'
  },
  NOTFOUND: { 
    component: load('Sidebar')
  },
  ADDNEWPROMOCODE: {
    path:'/dashboard/addnewpromocode',
    exact: true,
    component: load('newpromocode/AddNewPromoCode'),
    acl: 'PROMOCODE_ADD'
  },
  NEWPROMOCODE: {
    path:'/dashboard/newpromocodes',
    exact: true,
    component: load('newpromocode/Listing'),
    acl: 'PROMOCODE_VIEW_ONLY'
  },
  NEWPROMOCODEDETAIL: {
    path:'/dashboard/newpromodetail/:index',
    exact: true,
    component: load('newpromocode/Detail'),
    acl: 'PROMOCODE_VIEW_ONLY'
  },
  EDITNEWPROMOCODE: {
    path:'/dashboard/editnewpromocode/:index',
    exact: true,
    component: load('newpromocode/AddNewPromoCode'),
    acl: 'PROMOCODE_ADD'
  },
  COUPONSREQUEST:{
    path: '/dashboard/couponrequests',
    exact: true,
    component: load('users/CouponRequest'),
    acl: 'CUSTOMER_VIEW_ONLY'
  },
  MANAGEPROMOTION:{
    path: '/dashboard/promotionsetting',
    exact: true,
    component: load('newpromotion/Listing'),
    acl: 'CUSTOMER_VIEW_ONLY'
  },
  ADDNEWPROMOTIONSETTING: {
    path:'/dashboard/addpromotionsetting',
    exact: true,
    component: load('newpromotion/AddNewPromotionSetting'),
  },
  EDITNEWPROMOTIONSETTING: {
    path:'/dashboard/editpromotionsetting/:index',
    exact: true,
    component: load('newpromotion/AddNewPromotionSetting'),
  },
  ADDPROMOTIONCATEGORY: {
    path:'/dashboard/promotioncategory/add',
    exact: true,
    component: load('newpromotion/AddPromotionCategory'),
  },
  EDITPROMOTIONCATEGORY: {
    path:'/dashboard/promotioncategory/edit/:index',
    exact: true,
    component: load('newpromotion/AddPromotionCategory'),
  },
  PROMOTIONSETTING: {
    path:'/dashboard/promotioncategory',
    exact: true,
    component: load('newpromotion/PromotionCatListing'),
  },
  ENROLLMENTLISTING: {
    path:'/dashboard/enrollmentrequest',
    exact: true,
    component: load('newpromotion/EnrollmentRequest'),
  },
  DEALSREQUESTLISTING:{
    path:'/dashboard/dealrequests',
    exact: true,
    component: load('users/CouponRequest'),
  },
  BROADCASTINGREQUEST:{
    path:'/dashboard/broadcastrequests',
    exact: true,
    component: load('users/CouponRequest'),
  },
  DEALSCREATE:{
    path:'/dashboard/deals',
    exact: true,
    component: load('deals/Listing'),
  },
  DEALSADD: {
    path:'/dashboard/deals/add/:index',
    exact: true,
    component: load('deals/DealType'),
  },
  DEALSVIEW: {
    path:'/dashboard/deals/view/:index',
    exact: true,
    component: load('deals/DealsListing'),
  },
 CREATEADSPROMOTION:{
    path:'/dashboard/promotion/ads/add',
    exact: true,
    component: load('promotion/AddAdsPromotion'),
  },
  PROMOTIONREPORTING: { 
    path: '/dashboard/promotionreporting',
    exact: true,
    component: load('newpromocode/PromotionReporting'),
  },
 
};

