import React, { Component } from 'react';
import Creatable from 'react-select/lib/Creatable';
import { Field } from 'redux-form';

class CustomCreatableSelect extends Component {
  handleChange = (newValue) => {
    const { input: { onChange } } = this.props;
    onChange(newValue);
  };

  handleInputChange = (inputValue) => {
    // Allow only numeric values and restrict length to 10
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    if (numericValue.length <= 10) {
      return numericValue;
    }
    return numericValue.slice(0, 10); // Restrict to 10 characters
  };

  handleBlur = () => {
    // Ensure redux-form receives the current value on blur
    const { input: { value, onBlur } } = this.props;
    onBlur(value);
  };

  render() {
    const { input, label, classNamePrefix, meta: { touched, error }, ...custom } = this.props;

    return (
      <div className={`select-dropdown dropdown_createable`}>
        {label && (
          <label htmlFor={input.name} className="form-label">
            {label}
          </label>
        )}

        <Creatable
          {...input}
          {...custom}
          className='w-100'
          classNamePrefix={classNamePrefix}
          onChange={this.handleChange}
          onInputChange={this.handleInputChange}
          onBlur={this.handleBlur}
          value={input.value}
          isMulti={true}
        />
        {touched && error && <div className="error">{error}</div>}
      </div>
    );
  }
}

const renderCustomCreatableSelect = (props) => {
  return <Field {...props} component={CustomCreatableSelect} />;
};

export default renderCustomCreatableSelect;
