const ValidateDealForm = values => {
  const errors = {};
  console.log('aaaaDealForm', values);
  if (!values.name || values.name.trim() === '') {
    errors.name = 'Enter title first';
  }
  if (!values.description || values.description.trim() === '') {
    errors.description = 'Enter description first';
  }
  if (!values.min_subtotal || values.min_subtotal.trim() === '') {
    errors.minimum_subtotal_error = 'Please Select Minimum Subtotal';
  }
  
  if (!values.type || values.type < '') {
    errors.type = 'Choose discount type first';
  } 
  if(!values.start_time && !values.end_time){
    errors.start_time = "Please select start time"
    errors.end_time = "Please select end time"
  }
  
  if (values.start_time && values.end_time && (parseInt(values.start_time) > parseInt(values.end_time))) {
    errors.start_time = 'Start time can not be greater than end time';
  }

  
   if (!values.uses_per_customer || values.uses_per_customer === '') {
    errors.uses_per_customer = 'Enter uses per customer';
  }
   if (!values.uses_per_coupon || values.uses_per_coupon === '') {
    errors.uses_per_coupon = 'Enter uses per coupon';
  }
  if(!values.user_type || values.user_type < ''){
    errors.user_type = "Please select user type";
  }
  if(parseInt(values.offer_type) == 0 && values.deal_type == 6 && !values.min_subtotal){
    errors.min_subtotal = "Enter minimum subtotal"
  }
    if(!values.free_item){
       errors.free_item = "Please select free item"
    }
    if(!values.free_item_quantity){
      errors.free_item_quantity = "Enter free quantity"
    }
  if(parseInt(values.offer_type) == 0 && values.deal_type == 7 && !values.flatPrice ){
    errors.flatPrice = "Enter flat rate price"
  }
  
  if(parseInt(values.offer_type) == 1) {
// Validation for dealsOn
// if (values.dealsOn && values.dealsOn.length) {
//   errors.dealsOn = values.dealsOn.map((deal, index) => {
//     const dealErrors = {};
//     if (!deal.buy_category || !deal.buy_category.length) {
//       dealErrors.buy_category = 'Choose buy category';
//     }
//     if (!deal.buy_item || !deal.buy_item.length) {
//       dealErrors.item = 'Choose buy item';
//     }
//     if (!deal.buy_item_quantity) {
//       dealErrors.buy_item_quantity = 'Enter item quantity';
//     }
//     if (!deal.free_category || !deal.free_category.length) {
//       dealErrors.free_category = 'Choose free category';
//     }
//     if (!deal.free_item || !deal.free_item.length) {
//       dealErrors.free_item = 'Choose free item';
//     }
//     if (!deal.free_item_quantity) {
//       dealErrors.free_item_quantity = 'Enter free item quantity';
//     }
//     return dealErrors;
//   });
// }

// if (Array.isArray(values.dealOn,index)) {
//   errors[index].buy_category = 'Please select buy category'
//   // errors.global = ""
// }
if (Array.isArray(values.dealOn)) {
  errors.dealOn = [];

  values.dealOn.forEach((deal, index) => {
    const dealErrors = {};

    if ((!deal || (!deal.category || deal.category.length === 0)) && (!deal || (!deal.item || deal.item.length === 0))) {
      dealErrors.category = 'Please select buy category';
    }
    // if (!deal || !deal.item || deal.item.length === 0) {
    //   dealErrors.item = 'Please select buy item';
    // }
    if (!deal || !deal.item_quantity || deal.item_quantity <= 0) {
      dealErrors.item_quantity = 'Enter a valid item quantity';
    }
    if (!deal || !deal.free_category || deal.free_category.length === 0) {
      dealErrors.free_category = 'Please select free category';
    }
    // if (!deal || !deal.free_item || deal.free_item.length === 0) {
    //   dealErrors.free_item = 'Please select free item';
    // }
    if (!deal || !deal.free_item_quantity || deal.free_item_quantity <= 0) {
      dealErrors.free_item_quantity = 'Enter a valid free item quantity';
    }

    errors.dealOn[index] = dealErrors;
  });
}
  }
 




  return errors;
}

export default ValidateDealForm;