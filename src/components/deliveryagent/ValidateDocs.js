const ValidateDocs = values => {
  const errors = {};
  if (!values.expiry_date || values.expiry_date == '') {
    errors.expiry_date = 'Enter expiry date';
  }
  if (!values.docs_type || values.docs_type.trim() === '') {
    errors.docs_type = 'Enter document name';
  }

  return errors;
}
export default ValidateDocs;