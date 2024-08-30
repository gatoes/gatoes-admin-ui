const ValidateCancelOrder = values => {
	console.log('ewewe', values);
  const errors = {};
  if (!values.cancelReason || values.cancelReason.trim() === '') {
    errors.cancelReason = 'Enter reason';
  }

  // if (!values.who_bear_cost) {
  //   errors.who_bear_cost = 'Choose who bear this cost';
  // }

  

  return errors;
}
export default ValidateCancelOrder;