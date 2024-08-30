import React from 'react';

class CheckboxGroup extends React.Component {

    checkboxGroup() {
        let {label, required, options, input, meta} = this.props;

        return options.map((option, index) => {
            return (
            <div className="checkbox" key={index}>
                
                    <input type="checkbox"
                           name={`${option.title}[${option.id}]`}
                           value={option.id}
                           id={option.title + '_' + option.id}
                           checked={input.value.map(item => parseInt(item)).indexOf(option.id) !== -1}
                           onChange={(event) => {
                               const newValue = [...input.value];
                               console.log(newValue);
                               if (event.target.checked) {
                                   newValue.push(option.id);
                               } else {
                                   newValue.splice(newValue.indexOf(option.id), 1);
                               }

                               return input.onChange(newValue);
                           }}/>
                    
                <label htmlFor={option.title + '_' + option.id}>{option.title}</label>
            </div>)
        });
    }

    render() {
        return (
            <>
                {this.checkboxGroup()}
            </>
        )
    }
}


export default CheckboxGroup;