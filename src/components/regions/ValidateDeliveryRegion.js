const ValidateDeliveryRegion = values => {
  const errors = {};
  if (!values.name || values.name.trim() === '') {
    errors.name = 'Enter name';
  }

  if (!values.region_shop_radius || values.region_shop_radius == '' || values.region_shop_radius < 5) {
    errors.region_shop_radius = 'Enter valid Radius (min 5)';
  }
  
  return errors;
}
export default ValidateDeliveryRegion;