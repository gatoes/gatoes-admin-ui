import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'


const RFReactSelect = ({clearValue, isClearable, parentCallback, parentDivClass, childClass, input , optionLabel, optionValue, options, multi, className, label, labelClass, placeholder,disabled, meta: {initial, touched, error, invalid, warning } }) => {
  if(parentCallback){
    const parentCallbackFunc = parentCallback;
  }else{
    const parentCallbackFunc = '';
  }
  if(optionLabel){
    var labelField = optionLabel;
  }else{
    var labelField = 'label';
  }
  if(optionValue){
    var valueField = optionValue;
  }else{
    var valueField = 'value';
  }
  /**
   * For single select, Redux Form keeps the value as a string, while React Select
   * wants the value in the form { value: "grape", label: "Grape" }
   *
   * * For multi select, Redux Form keeps the value as array of strings, while React Select
   * wants the array of values in the form [{ value: "grape", label: "Grape" }]
   */
   if(optionLabel){
     var labelField = optionLabel;
   }else{
     var labelField = 'label';
   }
   if(optionValue){
     var valueField = optionValue;
   }else{
     var valueField = 'value';
   }
   const safeOptions = Array.isArray(options) ? options : [];

  const transformValue = (value, options, multi) => {
    // if (multi && typeof value === 'string') return []
    if (multi && !Array.isArray(value)) return [];


    const filteredOptions = options.filter(option => {
      return multi
        ? value.indexOf(option[valueField]) !== -1
        : option[valueField] === value
    });

    return multi ? filteredOptions : filteredOptions[0]
  }
  const { name, value, onBlur, onChange, onFocus } = input;
  // const transformedValue = !value ? null : transformValue(value, options, multi);

  const transformedValue = !value ? null : transformValue(value, safeOptions, multi);



  /**
   * onBlur from Redux Form Field has to be called explicity.
   */
  // const multiChangeHandler = (func) => {
  //   return function handleMultiHandler(values) {
  //     func(values.map(value => value[valueField]));
  //   };
  // }

  // if multiselect is true
  const multiChangeHandler = (func) => {
    return function handleMultiHandler(values) {
      const transformedValues = values.map(value => value[valueField]);
      if (parentCallback) {
        parentCallback(values);
      }
      func(transformedValues);
    };
  };

  const singleChangeHandler = (func) => {
    return function handleSingleChange(value) {

      if(parentCallback){
        parentCallback(value);
      }
      func(value ? value[valueField] : '')
    };
  }

  return (

    <div className = { parentDivClass?parentDivClass:'form-group'}>
      {label && label != "" && <label className={labelClass?labelClass:""}>{label?label:''}</label>}
      <div className={childClass?childClass:'bootstrap-select'}>
        <div className="fg-line">
          <Select
            getOptionLabel={opt => opt[labelField]}
            getOptionValue={opt => opt[valueField]}
            name={name}
            isDisabled={disabled}
            value={transformedValue}
            isMulti={multi}
            options={options}
            onChange={multi
              ? multiChangeHandler(onChange)
              : singleChangeHandler(onChange)
            }
            isClearable={isClearable?isClearable:false}
            onBlur={() => onBlur(value)}
            onFocus={onFocus}
            className={className}
            placeholder={placeholder?placeholder:'Search...'}
          />
        </div>
        {touched && ((error && <span className="error">{error}</span>) || (warning && <span className="error">{warning}</span>))}
      </div>
    </div>
  )
}

RFReactSelect.defaultProps = {
  multi: false,
  className: ""
}

RFReactSelect.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    //value: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
  }).isRequired,
  options: PropTypes.array.isRequired,
  multi: PropTypes.bool,
  isClearable: PropTypes.bool,
  className: PropTypes.string
}

export default RFReactSelect