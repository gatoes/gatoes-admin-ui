//import {confirmAlert} from 'react-confirm-alert';
//import 'react-confirm-alert/src/react-confirm-alert.css';
export const APP_VERSION = '1.0';

// export const API_ROOT = 'https://api.gatoes.com';
// export const API_URL = 'https://api.gatoes.com';
// export const APP_DOMAIN = 'https://api.gatoes.com';
// export const BASE_URL = 'https://api.gatoes.com';
// export const BASE_URL_LIVE = 'https://api.gatoes.com';
// export const API_ROOT = 'https://api.gatoes.com';
// export const API_URL = 'https://api.gatoes.com';
// export const APP_DOMAIN = 'https://api.gatoes.com';
// export const BASE_URL = 'https://api.gatoes.com';
// export const BASE_URL_LIVE = 'https://api.gatoes.com';

export const API_ROOT = 'http://localhost:3010/api/v1';
export const API_URL = 'https://devapi.gatoes.com';
export const APP_DOMAIN = 'https://devapi.gatoes.com';
export const BASE_URL = 'https://devapi.gatoes.com';
export const BASE_URL_LIVE = 'https://devapi.gatoes.com';

export const WEBSITE_TITLE = "Online Demand Solution - Grocery";
export const REJECT_ORDER = 'Do you really want to reject this order.';
export const REJECT_ORDER_SUCCESS = 'Order has been rejected successfully!';
export const ACCEPT_ORDER = 'Do you really want to accept this order.';
export const ACCEPT_ORDER_SUCCESS = 'Order has been accepted successfully!';
export const MARK_READY = 'Do you set your order status ready.';
export const MARK_READY_SUCCESS = 'Order status has been set as ready successfully!';
export const DELETE_CONFIRMATION = "Do you really want to delete this?";
export const DELETE_SUCCESS = "Record has been deleted successfully";
export const ACTIVATE_SUCCESS = "Item has been activated successfully";
export const DEACTIVATE_SUCCESS = "Item has been deactivated successfully";
export const ACTIVATE_CONFIRMATION = "Do you want to activate this record ?";
export const ORDER_STOCKOUT_SUCCESS = "Order marked out of stock successfully.";
export const DEACTIVATE_CONFIRMATION = "Do you want to deactivate?";
export const BLOCK_CONFIRMATION = "Do you want to block this user?";
export const STATUS_UPDATE_SUCCESS = "Record status has been changed successfully.";
export const WALLET_SUCCESS = "Money has been updated to wallet successfully";

export const CANCEL_CONFIRMATION = "Do you want to cancel this order?";
export const CANCEL_SUCCESS = "Order has been cancelled successfully.";
//settings panel 
export const PREPARATION_TIME = "Prepration time";
export const PREPARATION_TIME_TEXT = "Average time to prepare any order you can set time by clicking on it.";
export const ORDER_TIME = "Order Timings";
export const ORDER_TIME_TEXT = "Set your restaurant operational time for delivery";
export const ASSIGN_ORDER_TO_DRIVER_TEXT = "Do you want to assign order to this rider";
export const ASSIGN_ORDER_TO_DRIVER_SUCCESS = "Order has been assigned to rider successfully";

export const DELIVERED_CONFIRMATION = 'Do you really want to set order delivered.';
export const DELIVERED_SUCCESS = 'Order has been set delivered successfully.';

export const RESTORE_SUCCESS = "Do you want to recover this account?";
export const RECOVER_USER_SUCCESS = "User recovered successfully.";
export const ACCEPT_REQUEST_SUCCESS = "Do you really want to accept this request ?";
export const REJECT_REQUEST_SUCCESS = "Do you really want to reject this request ?";
export const REQUEST_SUCCESS = "Request accepted successfully.";
export const REQUEST_REJECTED_SUCCESS = "Request rejected successfully.";


export const ADDONS_CATEGORY = [
  { value: 'SINGLE_WITH_REQUIRED', label: 'Single select required' },
  { value: 'SINGLE_WITH_OPTIONAL', label: 'Single select optional' },
  { value: 'MULTIPLE_WITH_REQUIRED', label: 'Multiple select required' },
  { value: 'MULTIPLE_WITH_OPTIONAL', label: 'Multiple select optional' }
];

export const PERMISSIONS = ["ZONE", "DELIVERY_REGION", "BUSINESS_ZONE", "DELIVERY_AGENT", "ORDERS", "UNASSIGNED_ORDERS", "SETTINGS", "DRIVER_REGION_GROUP", "DRIVER_SETTING", "SHOPS", "SHOP_MENU", "PROMO_CODE"];

export const RIDER_DEFAULT_LAT = 34.0644449;
export const RIDER_DEFAULT_LNG = 74.8213362;

export const SHOP_STATUS = [
  { value: '0', label: 'Inactive' },
  { value: '1', label: 'Active' },
  { value: '2', label: 'Out of service' }
];

export const SHOP_DELIVERY_TYPE = [
  { value: '0', label: 'Delivery' },
  { value: '1', label: 'Pick up' },
  { value: '2', label: 'Both' }
];

export const MERCHANT_SUPPORT = [
  { value: '0', label: 'Normal' },
  { value: '1', label: 'Priority' },
  { value: '2', label: 'Dedicated' }
];

export const REFUND_REASON = [
  { value: '0', label: 'Out of Stock' },
  { value: '1', label: 'Rest Closed' },
  { value: '2', label: 'Quality' },
  { value: '3', label: 'OTHER' }
];

export const TRANSFER_TYPE = [
  { value: '0', label: 'Wallet' },
  { value: '1', label: 'Online' }
];

export const TAG = [
  { value: '0', label: 'Pure Veg' },
  { value: '1', label: 'Women Lead' },
  { value: '2', label:'Multi Brand Kitchen'}
];

export const iswithGatoes = [
  { value: '0', label: 'Yes' },
  { value: '1', label: 'No' },
  
];

export const ACCOUNT_TYPE_OPTIONS = [
  { value: '0', label: 'SAVING' },
  { value: '1', label: 'CURRENT' },
  
];


export const STORE_TYPE = [
  { value: '0', label: 'BRICK AND MORTAR' },
  { value: '1', label: 'FOOD TRUCK' },
  { value: '2', label: 'VIRTUAL BRAND' },
  { value: '3', label: 'GHOST KITCHEN' },
  
];

export const WHO_BEAR_COST_REFUND_ORDER = [
  { value: '0', label: 'Admin' },
  { value: '1', label: 'Merchant' },
  { value: '2', label: 'No One' }
];
  
export const RIDER_WORKING_SHIFT = [
  { value: '0', label: 'First Shift' },
  { value: '1', label: 'Second Shift' }
];

export const VEG_CATEGORY = [
  { value: '0', label: 'Non-veg' },
  { value: '1', label: 'Veg' }
];

export const WALLET_ACTION = [
  { value: '0', label: 'Add Fund' },
  { value: '1', label: 'Reduce Fund' }
];

export const PAYMENT_TYPE = [
  { value: '0', label: 'Cash' },
  { value: '1', label: 'Online Payment' },
  { value: '2', label: 'Wallet' },
  { value: '3', label: 'Debit Card' },
  { value: '4', label: 'UPI'},
  { value: '5', label: 'NetBanking'},
  { value: '6', label: 'Credit Card'},
];

export const RIDER_WORK_STATUS = [
  { value: '0', label: 'New Trip' },
  { value: '1', label: 'Order Assigned' },
  { value: '2', label: 'Ready to pick' },
  { value: '3', label: 'On the way' }
];

export const RIDER_TYPE = [
  { value: '0', label: 'Food' },
  { value: '1', label: 'Grocery' },
  { value: '2', label: 'Food & Grocery' }
];

export const VENDOR_TYPE = [
  {value: 1, label: 'Food'},
  {value: 2, label: 'Grocery'}
];

export const RIDER_PAYMENT_STATUS = [
  { value: '0', label: 'Cash deposit' },
  { value: '1', label: 'Cash collection' }
];

export const RIDER_APP_EVENTS = [
  { value: '0', 'label' : 'App Foreground'},
  { value: '1', 'label' : 'App Background'},
  { value: '2', 'label' : 'Network Connected'},
  { value: '3', 'label' : 'Network Disconnected'},
  { value: '4', 'label' : 'Socket Connected'},
  { value: '5', 'label' : 'Socket Disconnected'},
  { value: '6', 'label' : 'GPS Enabled'},
  { value: '7', 'label' : 'GPS Disabled'}
];

export const IS_TYPE_COUPON = [
  { value: '0', label: 'No Coupon' },
  { value: '1', label: 'Specific Coupon' },
  { value: '2', label: 'Featured Coupon' },
  { value: '3', label: 'Promo Coupon' },
  { value: '4', label: 'Super Promo' }
];
export const ACTIVE_INACTIVE_STATUS = [
  { value: '1', label: 'Active' },
  { value: '0', label: 'Inactive' }
];

export const DISCOUNT_TYPE = [
  { value: '0', label: 'Fixed discount on subtotal' },
  { value: '1', label: 'Percentage discount on subtotal' },
  { value: '2', label: 'Fixed discount on shipping' },
  { value: '3', label: 'Percentage discount on shipping' }
];

export const COUPON_CODE_FORMAT = [
  { value: '0', label: 'Alphanumeric' },
  { value: '1', label: 'Alphabet' },
  { value: '2', label: 'Numeric' }
];

export const REASSIGN_REASONS = [
  { value: '0', label: 'Vehicle Problem' },
  { value: '1', label: 'Accident, not able to rider' }
];

export const REASSIGN_ORDER_LOCATION = [
  { value: '0', label: 'From Restaurant' },
  { value: '1', label: 'From Rider Location' }
];

export const NOTIFICATION_TYPE = [
  { value: '0', label: 'Email' },
  { value: '1', label: 'Push Notification' },
  { value: '2', label: 'Message' } 
];
export const NOTIFICATION_USER = [
  { value: '0', label: 'User' },
  { value: '1', label: 'Merchant' },
  { value: '2', label: 'Rider' },
  { value: '3', label: 'Staff' }
];
export const ALERT_NOTIFICATION_TYPE = [
  { value: '1', label: 'UNASSIGN_ORDER' },
  { value: '2', label: 'MERCHANT_ADDITEM' },
  { value: '3', label: 'MERCHANT_EDITITEM' },
  { value: '4', label: 'MERCHANT_HELP' }
];

export const DRIVING_LICENSE_CLASS = ['A', 'A1', 'B', 'B1', 'B2', 'C', 'D', 'DA', 'E', 'E1', 'E2', 'F', 'G', 'H', 'I', 'M'];
export const VEHICLE_TYPE = ['Motorcycle', 'Car', 'Van', 'Lorry'];
export const BANK_LIST = ['Maybank', 'CIMB Bank', 'Public Bank Berhad', 'Hong Leong Bank', 'AmBank', 'UOB Malaysia Bank', 'Bank Rakyat', 'OCBC Bank Malaysia', 'HSBC Bank Malaysia', 'Affin Bank', 'Bank Islam Malaysia', 'Standard Chartered Bank Malaysia', 'CitiBank Malaysia', 'Bank Simpanan Nasional (BSN)', 'Bank Muamalat Malaysia Berhad', 'Alliance Bank', 'Agro Bank', 'Al-Rajhi Malaysia'];
export const RELATION_WITH = ['Father', 'Mother', 'Brother', 'Sister', 'Cousin', 'Guardian'];

export const RIDER_AUTO_ACCEPT = ['OFF', 'ON'];
export const day_options = ['', 'Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday', 'Sunday-Thursday', 'Friday-Saturday', 'Everyday'];
export const order_status = ['New', 'Preparing', 'Marked Ready','On the way','Delivered','Canceled by user','Canceled by shop','Canceled by admin', 'Out of stock', 'Scheduled', 'Refund', 'Payment Failed'];
export const time_options = {'0':'12 am', '30':'00:30 am', '60':'01:00 am', '90':'01:30 am', '120':'02:00 am', '150':'02:30 am', '180':'03:00 am', '210':'03:30 am', '240':'04:00 am', '270':'04:30 am', '300':'05:00 am', '330':'05:30 am', '360':'06:00 am', '390':'06:30 am', '420':'07:00 am', '450':'07:30 am', '480':'08:00 am', '510':'08:30 am', '540':'09:00 am', '570':'09:30 am', '600':'10:00 am', '630':'10:30 am', '660':'11:00 am', '690':'11:30 am', '720':'12:00 pm', '750':'12:30 pm', '780':'01:00 pm', '810':'01:30 pm', '840':'02:00 pm', '870':'02:30 pm', '900':'03:00 pm', '930':'03:30 pm', '960':'04:00 pm', '990':'04:30 pm', '1020':'05:00 pm', '1050':'05:30 pm', '1080':'06:00 pm', '1110':'06:30 pm', '1140':'07:00 pm', '1170':'07:30 pm', '1200':'08:00 pm', '1230':'08:30 pm', '1260':'09:00 pm', '1290':'09:30 pm', '1320':'10:00 pm', '1350':'10:30 pm', '1380':'11:00 pm', '1410':'11:30 pm', '1439':'11:59 pm'};

export const DISTANCE_UNIT = [
    { value: '0', label: 'KM' },
    { value: '1', label: 'Miles' }
  ];
export const VEG_VISIBILITY_STATUS = [
    { value: '1', label: 'Show' },
    { value: '0', label: 'Hide' }
  ];

export const SHOP_TYPE = [
    { value: '0', label: 'Halal' },
    { value: '1', label: 'Non Halal' },
    { value: '2', label: 'Fast Food' },
    { value: '3', label: 'Pork Free' }
  ];

export const RIDER_DOCS = [
    { value: '0', label: 'Road Tax' },
    { value: '1', label: 'Driving License' },
    { value: '2', label: 'Insurance' },
  ];

export const SHOP_DOCS = [
    { value: '0', label: 'Document 1' },
    { value: '1', label: 'Document 2' },
    { value: '2', label: 'Document 3' },
  ];

export const REORDER_REASON = [
    { value: '0', label: 'Rider damaged food' },
    { value: '1', label: 'User complain wrong order' }
  ];

export const REORDER_TYPE = [
    { value: '0', label: 'Full Order' },
    { value: '1', label: 'Partial Order' }
  ];

export const REORDER_TYPE_FULL = [
    { value: '0', label: 'Full Order' }
  ];

export const WHO_BEAR_COST = [
    { value: '0', label: 'Admin' },
    { value: '1', label: 'Merchant' }
  ];

export const WHO_BEAR_COST_CANCEL_ORDER = [
    { value: '0', label: 'Admin' },
    { value: '1', label: 'Merchant' },
    { value: '2', label: 'User' },
    { value: '3', label: 'No One' },
  ];

export const IS_WITH_RIDER_OPTION = [
    { value: '1', label: 'With Gatoes Rider' },
    { value: '0', label: 'Without Gatoes Rider' }
  ];

export const ALLOW_DELIVER_STATUS = [
    { value: '0', label: 'No' },
    { value: '1', label: 'Yes' }
  ];

export const TRIP_STATUS = ['', 'Have orders', 'Waiting Order', 'Delivery order', 'Available'];

export const RIDER_ONLINE_STATUS = ['Offline', 'Online'];
export const RIDER_CURRENT_STATUS = ['Travel with order', 'Free'];

export function disableInvalidOptions(selection){
  let options = OPENING_CLOSING_DAY;
  if(selection.length <= 1){
    return options;
  }
  selection.map((value) => {
    switch(value.category_label){
      case '1':
      case '2':
      case '3':
      case '4':
      case '7':
        options = options.map((option) => {
          if(option.value == '10' || option.value == '8' || option.value == value.category_label){
            return {...option, isDisabled: true};
          }

          return option;
        });
        break;

      case '6':
      case '5':
        options = options.map((option) => {
          if(option.value == '10' || option.value == '9' || option.value == value.category_label){
            return {...option, isDisabled: true};
          }

          return option;
        });
        break;

      case '10':
        options = options.map((option) => {
          return {...option, isDisabled: true};
        });
        break;

      case '9':
        options = options.map((option) => {
          if(option.value == '10' || option.value == '6' || option.value == '5' || option.value == value.category_label){
            return {...option, isDisabled: true};
          }

          return option;
        });
        break;

      case '8':
        options = options.map((option) => {
          if(option.value != '9' && option.value != '6' && option.value != '5'){
            return {...option, isDisabled: true};
          }

          return option;
        });
        break;
    }
  });
  //console.log('options', selection);
  return options;
}

export function disableDaysInvalidOptions(selection){
  let options = OPENING_CLOSING_DAY;
  if(selection.length <= 1){
    return options;
  }
  selection.map((value) => {
    switch(value.category_label){
      case '1':
      case '2':
      case '3':
      case '4':
      case '7':
        options = options.map((option) => {
          if(option.value == '10' || option.value == '8'){
            return {...option, isDisabled: true};
          }

          return option;
        });
        break;

      case '6':
      case '5':
        options = options.map((option) => {
          if(option.value == '10' || option.value == '9'){
            return {...option, isDisabled: true};
          }

          return option;
        });
        break;

      case '10':
        options = options.map((option) => {
          if(option.value == '9' || option.value == '8' || option.value == '7' || option.value == '6' || option.value == '7' || option.value == '5' || option.value == '4' || option.value == '3' || option.value == '2' || option.value == '1'){
            return {...option, isDisabled: true};
          }
          return option;
        });
        break;

      case '9':
        options = options.map((option) => {
          if(option.value == '10' || option.value == '6' || option.value == '5'){
            return {...option, isDisabled: true};
          }

          return option;
        });
        break;

      case '8':
        options = options.map((option) => {
          if(option.value != '9' && option.value != '6' && option.value != '5' && option.value != '8'){
            return {...option, isDisabled: true};
          }

          return option;
        });
        break;
    }
  });
  //console.log('options', selection);
  return options;
}

export const OPENING_CLOSING_DAY = [
  { value: '10', label: 'Everyday' },
  { value: '8', label: 'Sunday-Thursday' },
  { value: '9', label: 'Friday-Saturday' },
  { value: '1', label: 'Monday' },
  { value: '2', label: 'Tuesday' },
  { value: '3', label: 'Wednesday' },
  { value: '4', label: 'Thursday' },
  { value: '5', label: 'Friday' },
  { value: '6', label: 'Saturday' },
  { value: '7', label: 'Sunday' }
];

export const OPENING_CLOSING_ONLY_DAY = [
  { value: '1', label: 'Monday' },
  { value: '2', label: 'Tuesday' },
  { value: '3', label: 'Wednesday' },
  { value: '4', label: 'Thursday' },
  { value: '5', label: 'Friday' },
  { value: '6', label: 'Saturday' },
  { value: '7', label: 'Sunday' }
];

export const OPENING_TIME = [
  { value: '0', label: '00:00' },
  { value: '30', label: '00:30' },
  { value: '60', label: '01:00' },
  { value: '90', label: '01:30' },
  { value: '120', label: '02:00' },
  { value: '150', label: '02:30' },
  { value: '180', label: '03:00' },
  { value: '210', label: '03:30' },
  { value: '240', label: '04:00' },
  { value: '270', label: '04:30' },
  { value: '300', label: '05:00' },
  { value: '330', label: '05:30' },
  { value: '360', label: '06:00' },
  { value: '390', label: '06:30' },
  { value: '420', label: '07:00' },
  { value: '450', label: '07:30' },
  { value: '480', label: '08:00' },
  { value: '510', label: '08:30' },
  { value: '540', label: '09:00' },
  { value: '570', label: '09:30' },
  { value: '600', label: '10:00' },
  { value: '630', label: '10:30' },
  { value: '660', label: '11:00' },
  { value: '690', label: '11:30' },
  { value: '720', label: '12:00' },
  { value: '750', label: '12:30' },
  { value: '780', label: '13:00' },
  { value: '810', label: '13:30' },
  { value: '840', label: '14:00' },
  { value: '870', label: '14:30' },
  { value: '900', label: '15:00' },
  { value: '930', label: '15:30' },
  { value: '960', label: '16:00' },
  { value: '990', label: '16:30' },
  { value: '1020', label: '17:00' },
  { value: '1050', label: '17:30' },
  { value: '1080', label: '18:00' },
  { value: '1110', label: '18:30' },
  { value: '1140', label: '19:00' },
  { value: '1170', label: '19:30' },
  { value: '1200', label: '20:00' },
  { value: '1230', label: '20:30' },
  { value: '1260', label: '21:00' },
  { value: '1290', label: '21:30' },
  { value: '1320', label: '22:00' },
  { value: '1350', label: '22:30' },
  { value: '1380', label: '23:00' },
  { value: '1410', label: '23:30' },
  { value: '1439', label: '23:59' }
];

export const OPENING_CLOSING_TIME = [
  { value: '30', label: '00:29' },
  { value: '60', label: '00:59' },
  { value: '90', label: '01:29' },
  { value: '120', label: '01:59' },
  { value: '150', label: '02:29' },
  { value: '180', label: '02:59' },
  { value: '210', label: '03:29' },
  { value: '240', label: '03:59' },
  { value: '270', label: '04:29' },
  { value: '300', label: '04:59' },
  { value: '330', label: '05:29' },
  { value: '360', label: '05:59' },
  { value: '390', label: '06:29' },
  { value: '420', label: '06:59' },
  { value: '450', label: '07:29' },
  { value: '480', label: '07:59' },
  { value: '510', label: '08:29' },
  { value: '540', label: '08:59' },
  { value: '570', label: '09:29' },
  { value: '600', label: '09:59' },
  { value: '630', label: '10:29' },
  { value: '660', label: '10:59' },
  { value: '690', label: '11:29' },
  { value: '720', label: '11:59' },
  { value: '750', label: '12:29' },
  { value: '780', label: '12:59' },
  { value: '810', label: '13:29' },
  { value: '840', label: '13:59' },
  { value: '870', label: '14:29' },
  { value: '900', label: '14:59' },
  { value: '930', label: '15:29' },
  { value: '960', label: '15:59' },
  { value: '990', label: '16:29' },
  { value: '1020', label: '16:59' },
  { value: '1050', label: '17:29' },
  { value: '1080', label: '17:59' },
  { value: '1110', label: '18:29' },
  { value: '1140', label: '18:59' },
  { value: '1170', label: '19:29' },
  { value: '1200', label: '19:59' },
  { value: '1230', label: '20:29' },
  { value: '1260', label: '20:59' },
  { value: '1290', label: '21:29' },
  { value: '1320', label: '21:59' },
  { value: '1350', label: '22:29' },
  { value: '1380', label: '22:59' },
  { value: '1410', label: '23:29' },
  { value: '1439', label: '23:59' }
];

export function clearSession(){
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('persist:root');
  window.location = '/';
}


export function verifyAndUpdateAppVersion(){
  // Display App Version
  const version = localStorage.getItem("APP_VERSION");
  if(version === null || version != APP_VERSION){
    localStorage.setItem("APP_VERSION", APP_VERSION);
    clearSession();
  }
}



export function validateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return (true)
  }
  return (false)
}

export function stripHtmlTags(str, length) {
  if ((str === null) || (str === '')) {
    return false;
  } else {
    str = str.toString();
    str = str.replace(/<[^>]*>/g, '')
    if (length && length > 0 && str.length > length) {
      str = str.substr(0, length);
      str = str + "...";
    }
  }
  return str;
}

export function FromatValidationErrors(errors, error_keys) {
  Object.keys(errors).map(function(key) {
    error_keys[key] = errors[key][0];
    return key;
  });
  return error_keys;
}

export function jsUcfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function _dispatch(nextState, rerender = false, compName = null) {
  rerender = rerender
    ? new Date().getTime()
    : nextState.status;
  return {
    ...nextState,
    status: rerender,
    compName
  }
}


export function currencyFormat(amount, currency, showCurrencySymbol = true, floatValue = true){

  if(isNaN(amount)){
    return amount;
  } else {

    amount = floatValue ? parseFloat(amount).toFixed(2) : parseInt(amount);

    if(typeof JSON.parse(localStorage.getItem('auth')).user.currencySymbol !== 'undefined' && JSON.parse(localStorage.getItem('auth')).user.currencySymbol !== null){
      currency = JSON.parse(localStorage.getItem('auth')).user.currencySymbol;
    } else {
      currency = '₹';
    }
    
    return `${currency}${amount}`;
  }
}

export function notifyLink(type, subjectId=0){
  var newlink = '';
  if(type == 1){
    newlink = '/dashboard/unassignedorders';
  } else if(type == 2 || type == 3){
    newlink = '/dashboard/requestedmenuitems';
  } else if(type == 4){
    newlink = '/dashboard/shoplisting';
  } else if(type == 5){
    newlink = '/dashboard/riderdocuments/' + subjectId;
  } else if(type == 6){
    newlink = '/dashboard/shopdocuments/' + subjectId;
  } else if(type == 7){
    newlink = '/dashboard/deliveryagentlisting';
  } else if(type == 8){
    newlink = '/dashboard/outofstockorders';
  }
  return newlink;
}

export const PAYOUT_REQUEST_STATUS = [
  { value: 1, label: 'Pending' },
  { value: 2, label: 'Accepted' },
  { value: 3, label: 'Cancelled' }
];

export const HANDLE_PAYOUT_REQUEST_STATUS = [
  { value: 2, label: 'Accepted' },
  { value: 3, label: 'Cancelled' }
];

export const PACKAGING_CHARGES_PAID_BY = [
  { value: '0', label: 'User' },
  { value: '1', label: 'Merchant' }
];

export const TAX_TYPE = [
  { value: 1, label: 'Percentage' },
  { value: 2, label: 'Fixed' }
];


export const ROLE_ID = {
  SERVICE_PROVIDER: 1,
  USER: 2,
  MERCHANT: 3,
  DRIVER: 4,
  GUEST: 5,
  VENDOR: 6
}


export const BEAR_TYPE = [
{value:1,label:"Subtotal"},
{value:2,label:"Delivery"}
]
export const USER_TYPE = [
  {value:1 , label:"All Users"},
  {value:2 , label:"New User"},
  {value:3 , label:"Lost User"},
  {value:4 , label:"Repeat User"},
  {value:5 , label:"Specific User"},
]
export const COUPONS_STATUS = {
  PENDING:0,
  CREATED:1,
  ACTIVE:2,
  DEACTIVE:3,
  EXPIRED:4,
  REJECTED:5
}
export const COUPONS_ACTION = {
  ACCEPT:1,
  DISMISS:2,
  APPROVED_BY_ADMIN:3,
  REJECTED_BY_ADMIN:4,
}

export const couponStatus = [
  {id:0,value:0, label:"Pending"},
  {id:1,value:1, label:"Accepted"},
  {id:5,value:5, label:"Rejected"},
 

]
export const newPromoCouponStatus = [
  {id:2,value:2, label:"Active"},
  {id:3,value:3, label:"Deactive"},
]
export const USERS_CONSTANTS_TYPE = {
  ALL_USER:1,
NEW_USER:2,
LOST_USER:3,
REPEAT_USER:4,
SPECIFIC_USER:5
}
export const MINIMUM_SUBTOTAL = [
  { value: 1, label: 'No minimum subtotal' },
  { value: 99, label: '99' },
  { value: 149, label: '149' },
  { value: 199, label: '199' },
  { value: 249, label: '249' },
  { value: 299, label: '299' },
  { value: 499, label: '499' },
];

export const requestType = [
  {id:1,value:1, label:"All"},
  {id:2,value:2, label:"Deals"},
  {id:3,value:3, label:"BroadCast"},
]