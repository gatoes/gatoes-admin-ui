const ValidateRefund = values => {
  const errors = {};
  if (!values.reorder_reason || values.reorder_reason < 0) {
    errors.reorder_reason = 'Choose reason';
  }
  if (!values.transfer_type || values.transfer_type < 0) {
    errors.transfer_type = 'Choose transfer type';
  }
  if (!values.refund_amount || values.refund_amount < 0 || isNaN(values.refund_amount)) {
    errors.refund_amount = 'Enter valid refund amount';
  } else if(values.refund_amount > values.itemTotal){
    errors.refund_amount = 'Refund amount should not more than order total';
  } 


  if (!values.refund_reason || values.refund_reason < 0) {
    errors.refund_reason = 'Choose reason';
  } else if (values.refund_reason == 3 && (!values.other_reason || values.other_reason.trim() === '')) {
    errors.other_reason = 'Enter other reason';
  }

  if (!values.who_bear_cost || values.who_bear_cost < 0) {
    errors.who_bear_cost = 'Choose who bear the reorder cost';
  }

  // if (!values.items || values.items.length < 1) {
  //   errors.reorder_type = 'Please choose at least one item';
  // }

  return errors;
}
export default ValidateRefund;