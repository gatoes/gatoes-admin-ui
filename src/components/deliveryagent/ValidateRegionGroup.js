const ValidateRegionGroup = values => {
  const errors = {};
  if (!values.groupName || values.groupName == '') {
    errors.groupName = 'Enter group name';
  }

  return errors;
}
export default ValidateRegionGroup;