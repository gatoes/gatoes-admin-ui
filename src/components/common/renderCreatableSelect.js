import React, { Component } from 'react';
import Creatable from 'react-select/lib/Creatable';

class RenderCreatableSelect extends Component {
  handleInputChange = (inputValue) => {
    // Allow only numeric values and restrict length to 10
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    if (numericValue.length <= 10) {
      return numericValue;
    }
    return numericValue.slice(0, 10); // Restrict to 10 characters
  };

  render() {
    const {
      input,
      label,
      meta: { touched, error },
      ...custom
    } = this.props;

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
          isMulti={true}
          onChange={(value) => input.onChange(value)}
          onBlur={() => input.onBlur(input.value)}
          onInputChange={this.handleInputChange}
        />
        {touched && error && <span className="error">{error}</span>}
      </div>
    );
  }
}

export default RenderCreatableSelect;
