import React, {Component} from 'react';
import {Field} from "redux-form";
import PropTypes from 'prop-types';

export default class CheckboxGroup2 extends Component {

  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
      //label: PropTypes.string.isRequired,
      //value: PropTypes.string.isRequired
    })).isRequired
  };

  field = ({input, meta, options, parentIndex}) => {
    console.log('parentIndex', parentIndex);
    const {name, onChange} = input;
    const {touched, error} = meta;
    const inputValue = input.value;

    const checkboxes = options.map(({title, id}, index) => {
    if(parentIndex){
      index = `${parentIndex}${index}`;
    }
    console.log('index', index);
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
        <li key={index}>
          <div className="checkbox check-primary checkbox-circle" key={`checkbox-${index}`}>
            <input id={"checkbox_"+name+index} type="checkbox" name={`${name}[${index}]`} value={id} checked={checked} onChange={handleChange} />
            <label htmlFor={"checkbox_"+name+index}>{title}</label>
          </div>
        </li>
      );
    });

    return (
      <ul>
        {checkboxes}
      </ul>
    );
  };

  render() {
    return <Field {...this.props} type="checkbox" component={this.field} />;
  }
}
