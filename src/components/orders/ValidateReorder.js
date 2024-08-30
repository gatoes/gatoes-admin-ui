const ValidateReorder = values => {
	console.log('ewewe', values);
  const errors = {};
  if (!values.reorder_reason || values.reorder_reason < 0) {
    errors.reorder_reason = 'Choose reason';
  }
  if (!values.reorder_type || values.reorder_type < 0) {
    errors.reorder_type = 'Choose type';
  } else if(values.reorder_type == 1 && (!values.items || values.items.length < 1)){
    errors.reorder_type = 'Please choose at least one item';
  }
  if (!values.who_bear_cost || values.who_bear_cost < 0) {
    errors.who_bear_cost = 'Choose who bear the reorder cost';
  }

  // if (!values.items || values.items.length < 1) {
  //   errors.reorder_type = 'Please choose at least one item';
  // }

  return errors;
}
export default ValidateReorder;