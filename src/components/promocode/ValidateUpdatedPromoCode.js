const ValidateUpdatedPromoCode = values => {
  const errors = {};
  console.log('aaaa', values);
  if (!values.rule_name || values.rule_name.trim() === '') {
    errors.rule_name = 'Enter rule name first';
  }
  if (!values.rule_description || values.rule_description.trim() === '') {
    errors.rule_description = 'Enter rule description first';
  }
   return errors;
}

export default ValidateUpdatedPromoCode;