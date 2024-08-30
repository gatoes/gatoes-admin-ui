const ValidatePromoCode = values => {
  const errors = {};
  console.log('aaaa', values);
  if (!values.rule_name || values.rule_name.trim() === '') {
    errors.rule_name = 'Enter rule name first';
  }
  if (!values.rule_description || values.rule_description.trim() === '') {
    errors.rule_description = 'Enter rule description first';
  }
  if (!values.coupon || values.coupon < '') {
    errors.coupon = 'Choose coupon type first';
  } 
  if (!values.status || values.status < '') {
    errors.status = 'Choose status first';
  }

  if (!values.discount || values.discount.trim() === '') {
    errors.discount = 'Enter discount';
  }
  if (!values.discount_type || values.discount_type < '') {
    errors.discount_type = 'Choose discount type first';
  } 

  if (values.start_time && values.end_time && (parseInt(values.start_time) > parseInt(values.end_time))) {
    errors.start_time = 'Start time can not be greater than end time';
  }

  if (!values.max_discount || values.max_discount <= 0) {
    errors.max_discount = 'Enter max discount';
  } else if (!values.minimum_subtotal || values.minimum_subtotal <= 0) {
    errors.minimum_subtotal = 'Enter minimum subtotal';
  }
  
  if (!values.coupon_quantity || values.coupon_quantity <= 0) {
    errors.coupon_quantity = 'Enter coupon quantity';
  }
  
   if (!values.uses_per_customer || values.uses_per_customer === '') {
    errors.uses_per_customer = 'Enter uses per customer';
  }
   if (!values.uses_per_coupon || values.uses_per_coupon === '') {
    errors.uses_per_coupon = 'Enter uses per coupon';
  }

  // if ((values.coupon== 3)) {
  //   errors.priority = 'Please upload coupon image';
  // } 

  if ((values.coupon== 3) && !values.image) {
    errors.promocodeImage = 'Please upload coupon image';
  } 

  

  return errors;
}

export default ValidatePromoCode;