const ValidateAppSetting = values => {
  const errors = {};
  if (!values.show_avg_cost || values.show_avg_cost < 0) {
    errors.show_avg_cost = 'Choose you want to show or hide avg cost per person';
  }

  return errors;
}
export default ValidateAppSetting;