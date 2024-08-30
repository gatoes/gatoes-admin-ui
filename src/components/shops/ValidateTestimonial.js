const ValidateTestimonial = values => {
  const errors = {};
  if (!values.shopName || values.shopName.trim() === '') {
    errors.shopName = 'Enter restaurant name';
  }
  if (!values.ownerName || values.ownerName.trim() === '') {
    errors.ownerName = 'Enter owner name';
  }

  if (!values.feedback || values.feedback.trim() === '') {
    errors.feedback = 'Enter feedback';
  }

  return errors;
}
export default ValidateTestimonial;