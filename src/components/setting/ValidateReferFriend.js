const ValidateReferFriend = values => {
  const errors = {};

  if (!values.referring_user || values.referring_user < 0 || isNaN(values.referring_user)) {
    errors.referring_user = 'Enter valid cashback for reffering user';
  }
  if (!values.referred_user || values.referred_user < 0 || isNaN(values.referred_user)) {
    errors.referred_user = 'Enter valid cashback for reffered user';
  }
  if (!values.max_order_discount || values.max_order_discount < 0 || isNaN(values.max_order_discount)) {
    errors.max_order_discount = 'Enter max discount amount';
  }



  return errors;
}
export default ValidateReferFriend;