const ValidateShop = values => {
  const errors = {};
  if (!values.shopName || values.shopName.trim() === '') {
    errors.shopName = 'Enter restaurant name';
  }
  
  if (!values.avgCost || values.avgCost < 0) {
    errors.avgCost = 'Enter average cost';
  }
  // if (!values.shopDistanceView || values.shopDistanceView < 1) {
  //   errors.shopDistanceView = 'Enter service radius';
  // }
  if (!values.avgPreparationTime || values.avgPreparationTime < 0) {
    errors.avgPreparationTime = 'Enter average preparation name';
  }
  if (!values.address || values.address.trim() === '') {
    errors.address = 'Enter address';
  }
  if (!values.region || values.region < 1) {
    errors.region = 'Enter zone';
  }

  if (!values.rider_requirement || values.rider_requirement < 0) {
    errors.rider_requirement = 'Choose rider requirement';
  }

  if (!values.pickupType || values.pickupType < 0) {
    errors.pickupType = 'Choose order delivery type';
  }

  
  if (!values.regionId || values.regionId < 1) {
    errors.regionId = 'Enter delivery region';
  }
  if (!values.business_name || values.business_name.trim() === '') {
    errors.business_name = 'Enter business name';
  }

  if (!values.account_number || values.account_number.trim() === '') {
    errors.account_number = 'Enter account number';
  }
  if (!values.bank_id || values.bank_id < 1) {
    errors.bank_id = 'Choose bank';
  }
  if (!values.account_holder_name || values.account_holder_name.trim() === '') {
    errors.account_holder_name = 'Enter account holder name';
  }

  if (!values.mapaddress_chk || values.mapaddress_chk.trim() === '') {
    errors.mapaddress_chk = 'Enter map address';
  }

  if (!values.name || values.name.trim() === '') {
    errors.name = 'Enter owner name';
  }
  if (!values.email || values.email.trim() === '') {
    errors.email = 'Enter email';
  } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
    
  } else {
    errors.email = 'Enter valid email';
  }

  if (!values.notifyEmail || values.notifyEmail.trim() === '') {
    errors.notifyEmail = 'Enter notify email';
  } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.notifyEmail)) {
    
  } else {
    errors.notifyEmail = 'Enter valid notify email';
  }

  if (!values.contactNumber || values.contactNumber.trim() === '') {
    errors.contactNumber = 'Enter contact number';
  }
  if (!values.accountManager || values.accountManager.trim() === '') {
    errors.accountManager = 'Enter account manager name';
  }

  if (!values.mapAddress || values.mapAddress.trim() === '') {
    errors.mapAddress = 'Enter map address';
  } else if(!values.longitude || values.longitude == ''){
  	errors.mapAddress = 'Please enter map address correctly.';
  }

  if (!values.merchant_charges || values.merchant_charges < 0) {
    errors.merchant_charges = 'Enter commission for cash order payment';
  }

  if (!values.merchant_charges_online || values.merchant_charges_online < 0) {
    errors.merchant_charges_online = 'Enter commission for online order payment';
  }

  if (!values.gstNumber || values.gstNumber.trim() == '') {
    errors.gstNumber = 'Enter gst number';
  }
  
  

  return errors;
}
export default ValidateShop;