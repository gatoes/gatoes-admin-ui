const ValidatePromotType = values => {
  const errors = {};
  if (!values.name || values.name.trim() === '') {
    errors.name = 'Enter name first';
  }
  if (!values.code || values.code.trim() === '') {
    errors.code = 'Enter code first';
  }
  if (!values.basePrice || values.basePrice.trim() === '') {
    errors.basePrice = 'Enter base price first';
  }
  if (!values.perClickCharges || values.perClickCharges.trim() === '') {
    errors.perClickCharges = 'Enter per click charges first';
  }
  // if (!values.perDayCharges || values.perDayCharges.trim() === '') {
  //   errors.perDayCharges = 'Enter per day charges first';
  // }
  if (!values.minimumDays || values.minimumDays.trim() === '') {
    errors.minimumDays = 'Enter minimum days first';
  }
  if (!values.scheduleHours || values.scheduleHours.trim() === '') {
    errors.scheduleHours = 'Enter minimum schedule hours first';
  }
  if (!values.limit || values.limit.trim() === '') {
    errors.limit = 'Enter limit first';
  }
  
  
   if (!values.zone || values.zone < '') {
    errors.zone = 'Choose zone first';
  } 
  if (!values.promotionType || values.promotionType < '') {
    errors.promotionType = 'Choose promotion type first';
  } 
  // if (!values.basePrice || values.coupon < '') {
  //   errors.coupon = 'Choose coupon type first';
  // } 
  // if (!values.status || values.status < '') {
  //   errors.status = 'Choose status first';
  // }

  // if (!values.discount || values.discount.trim() === '') {
  //   errors.discount_common_error = 'Please select discount';
  // }

  // if (!values.minimum_subtotal || values.minimum_subtotal.trim() === '') {
  //   errors.minSubtotal_common_error = 'Please select minimum subtotal';
  // }

  // if (!values.max_discount || values.max_discount.trim() === '') {
  //   errors.maxSubtotal_common_error = 'Please select max discount';
  // }
  // if (!values.discount_type || values.discount_type < '') {
  //   errors.discount_type = 'Choose discount type first';
  // } 
 

  return errors;
}

export default ValidatePromotType;