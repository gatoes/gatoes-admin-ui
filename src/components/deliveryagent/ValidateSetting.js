const ValidateSetting = values => {
  const errors = {};

  if (!values.fixedOvertime || values.fixedOvertime < 0 || isNaN(values.fixedOvertime)) {
    errors.fixedOvertime = 'Enter fixed over time';
  }
  if (!values.overtimePerHour || values.overtimePerHour < 0 || isNaN(values.overtimePerHour)) {
    errors.overtimePerHour = 'Enter overtime per hour';
  }
  if (!values.fixedMinimumOrders || values.fixedMinimumOrders < 0 || isNaN(values.fixedMinimumOrders)) {
    errors.fixedMinimumOrders = 'Enter fixed minimum order';
  }
  if (!values.requiredAcceptanceRate || values.requiredAcceptanceRate < 0 || isNaN(values.requiredAcceptanceRate)) {
    errors.requiredAcceptanceRate = 'Enter required acceptance rate for incentive';
  }
  if (!values.fixedIncentivePerOrder || values.fixedIncentivePerOrder < 0 || isNaN(values.fixedIncentivePerOrder)) {
    errors.fixedIncentivePerOrder = 'Enter fixed incentive per order';
  }
  if (!values.incentiveDeduction || values.incentiveDeduction < 0 || isNaN(values.incentiveDeduction)) {
    errors.incentiveDeduction = 'Enter incentive deduction if condition not matched';
  }

  if (!values.firstShiftSalary || values.firstShiftSalary < 0 || isNaN(values.firstShiftSalary)) {
    errors.firstShiftSalary = 'Enter first shift salary amount';
  }
  if (!values.secondShiftSalary || values.secondShiftSalary < 0 || isNaN(values.secondShiftSalary)) {
    errors.secondShiftSalary = 'Enter second shift salary amount';
  }
  if (!values.firstShiftStartTime) {
    errors.firstShiftStartTime = 'Enter start time of first shift';
  }
  if (!values.firstShiftEndTime) {
    errors.firstShiftEndTime = 'Enter end time of first shift';
  }
  if (!values.secondShiftStartTime) {
    errors.secondShiftStartTime = 'Enter start time of second shift';
  }
  if (!values.secondShiftEndTime) {
    errors.secondShiftEndTime = 'Enter end time of second shift';
  }


  

  return errors;
}
export default ValidateSetting;