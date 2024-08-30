const ValidateTaxes = values => {
  const errors = {};
  if (!values.taxName || values.taxName.trim() === '') {
    errors.taxName = 'Enter name of tax first';
  }

  if (!values.taxAmount || values.taxAmount == 0 || isNaN(values.taxAmount)) {
    errors.taxAmount = 'Enter valid amount of tax first';
  }

  if (!values.taxType || values.taxType < 1) {
    errors.taxType = 'Choose type of tax first';
  } 

  if (!values.taxCategory || values.taxCategory < 1) {
    errors.taxCategory = 'Choose type of tax category';
  }
  

  return errors;
}

export default ValidateTaxes;