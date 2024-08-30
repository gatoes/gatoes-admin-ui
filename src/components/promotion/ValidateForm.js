const ValidationForm = values => {
  const errors = {};
  
  
  
   if (!values.shopId || values.shopId < '') {
    errors.shopId = 'Choose restaurent first';
  } 
  

  return errors;
}

export default ValidationForm;