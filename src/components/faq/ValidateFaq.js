const ValidateFaq = values => {
  const errors = {};
  if (!values.question || values.question.trim() === '') {
    errors.question = 'Enter question';
  }
  if (!values.answer || values.answer.trim() === '') {
    errors.answer = 'Enter answer';
  }

  return errors;
}
export default ValidateFaq;