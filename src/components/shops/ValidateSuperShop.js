const ValidateSuperShop = values => {
  const errors = {};
  
  if (!values.name || values.name.trim() === '') {
    errors.name = 'Enter owner name';
  }
  if (!values.email || values.email.trim() === '') {
    errors.email = 'Enter email';
  } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
    
  } else {
    errors.email = 'Enter valid email';
  }
  if (!values.contactNumber || values.contactNumber.trim() === '') {
    errors.contactNumber = 'Enter contact number';
  }
  
  if (!values.shops || values.shops.length < 1) {
    errors.shops = 'Select at least one restaurant';
  }


  return errors;
}
export default ValidateSuperShop;