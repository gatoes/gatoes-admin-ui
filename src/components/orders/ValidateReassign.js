const ValidateReassign = values => {
	console.log('ewewe', values);
  const errors = {};
  if (!values.reassing_reason || values.reassing_reason < 0) {
    errors.reassing_reason = 'Choose reason';
  }
  if (!values.pick_location || values.pick_location < 0) {
    errors.pick_location = 'Choose location';
  } else if(values.pick_location == 1 && values.orderStatus < 3){
    errors.pick_location = 'Invalid pick location for this order status';
  } else if(values.pick_location == 0 && values.orderStatus > 2){
    errors.pick_location = 'Invalid pick location for this order status';
  } else if (!values.rider || values.rider <= 0) {
    errors.pick_location = 'Choose rider first';
  }

  return errors;
}
export default ValidateReassign;