const ValidateRejectitem = values => {
  const errors = {};
  
  if (!values.reasonid || values.reasonid == 0) {
    errors.reasonid = 'Choose reason first';
  }

  if (values.reasonid == -1 && (!values.comment || values.comment == '')){
    errors.comment = 'Please enter comment';
  }  

  return errors;
}

export default ValidateRejectitem;