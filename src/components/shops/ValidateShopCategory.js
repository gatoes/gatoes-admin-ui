const ValidateShopCategory = values => {
  const errors = {};
  if (!values.name || values.name.trim() === '') {
    errors.name = 'Enter name first';
  } else if(!values.image) {
    errors.catimage = 'Please upload image first';
  } 

  return errors;
}

export default ValidateShopCategory;