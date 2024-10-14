import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const RFReactSelect = ({
  clearValue,
  isClearable,
  parentCallback,
  parentDivClass,
  childClass,
  input,
  optionLabel,
  optionValue,
  options,
  multi,
  className,
  label,
  labelClass,
  placeholder,
  disabled,
  meta: { touched, error, warning },
}) => {
  const labelField = optionLabel || 'label';
  const valueField = optionValue || 'value';

  // Ensure options are valid
  const safeOptions = Array.isArray(options) ? options : [];

  // Transform the value to match the format that react-select expects
  const transformValue = (value, options, multi) => {
    if (multi) {
      if (!Array.isArray(value)) return [];
      return options.filter(option => value.includes(option[valueField]));
    } else {
      return options.find(option => option[valueField] === value) || null;
    }
  };

  const { name, value, onBlur, onChange, onFocus } = input;

  // Transform the input value
  const transformedValue = transformValue(value, safeOptions, multi);

  const multiChangeHandler = func => selectedOptions => {
    const transformedValues = selectedOptions.map(opt => opt[valueField]);
    if (parentCallback) {
      parentCallback(selectedOptions); // Pass the full selected options to parent callback
    }
    func(transformedValues);
  };

  const singleChangeHandler = func => selectedOption => {
    if (parentCallback) {
      parentCallback(selectedOption); // Pass the full selected option to parent callback
    }
    func(selectedOption ? selectedOption[valueField] : null); // Send the value or null to Redux Form
  };

  return (
    <div className={parentDivClass || 'form-group'}>
      {label && <label className={labelClass || ''}>{label}</label>}
      <div className={childClass || 'bootstrap-select'}>
        <div className="fg-line">
          <Select
            getOptionLabel={opt => opt[labelField]}
            getOptionValue={opt => opt[valueField]} // Correctly return the value of the option
            name={name}
            isDisabled={disabled}
            value={transformedValue} // Set the transformed value here
            isMulti={multi}
            options={safeOptions}
            onChange={multi
              ? multiChangeHandler(onChange)
              : singleChangeHandler(onChange)
            }
            isClearable={isClearable || false}
            onBlur={() => onBlur(value)}
            onFocus={onFocus}
            className={className}
            placeholder={placeholder || 'Search...'}
          />
        </div>
        {touched && (
          (error && <span className="error">{error}</span>) ||
          (warning && <span className="error">{warning}</span>)
        )}
      </div>
    </div>
  );
};

RFReactSelect.defaultProps = {
  multi: false,
  className: "",
};

RFReactSelect.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
  }).isRequired,
  options: PropTypes.array.isRequired,
  multi: PropTypes.bool,
  isClearable: PropTypes.bool,
  className: PropTypes.string,
  parentCallback: PropTypes.func,
  parentDivClass: PropTypes.string,
  childClass: PropTypes.string,
  label: PropTypes.string,
  labelClass: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string,
  }),
};

export default RFReactSelect;
