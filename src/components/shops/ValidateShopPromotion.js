const ValidateShopCategory = values => {
  const errors = {};
  if (!values.name || values.name.trim() === '') {
    errors.name = 'Enter name first';
  } else if(!values.image) {
    errors.catimage = 'Please upload image first';
  } 

  if(!values.restaurants || values.restaurants.length < 1){
  	errors.restaurants = 'Please choose atleast one restaurant';
  }

  return errors;
}

export default ValidateShopCategory;