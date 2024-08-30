import React, {Component} from 'react';
import {Field} from "redux-form";
import PropTypes from 'prop-types';

export default class CheckboxGroup extends Component {

  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
      //label: PropTypes.string.isRequired,
      //value: PropTypes.string.isRequired
    })).isRequired
  };

  field = ({input, meta, options}) => {

    const {name, onChange} = input;
    const {touched, error} = meta;
    const inputValue = input.value;

    const checkboxes = options.map(({name, id}, index) => {
      const handleChange = (event) => {
        const arr = [...inputValue];
        if (event.target.checked) {
          arr.push(id);
        }
        else {
          arr.splice(arr.indexOf(id), 1);
        }
        return onChange(arr);
      };
      const checked = inputValue.includes(id);
      return (
        <div className="checkbox check-primary" style={{marginTop: (index==0?-5+"px":'')}} key={`checkbox-${index}`}>
          <input id={"checkbox_"+name+index} type="checkbox" name={`${name}[${index}]`} value={id} checked={checked} onChange={handleChange} />
          <label htmlFor={"checkbox_"+name+index}>{name}</label>
        </div>
      );
    });

    return (
      <div>
        <div>{checkboxes}</div>
        {touched && error && <p className="error">{error}</p>}
      </div>
    );
  };

  render() {
    return <Field {...this.props} type="checkbox" component={this.field} />;
  }
}
