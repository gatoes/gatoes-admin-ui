import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError, reset, FieldArray, formValueSelector } from 'redux-form';
import renderField from '../FormFields/renderField';
import renderRadio from '../FormFields/renderRadio';

class RenderRecommendedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
      mainItemId: props.mainItemId
    };
  }

  componentWillMount(){
    const {items} = this.state;
    //console.log('9999', this.props.fields.length);
    //if(this.props.fields.length === 0){
      this.props.fields.push(0);
    //}
  }

  render() {
    const { fields, meta: { touched, error, submitFailed },  items, index, mainItemId} = this.props;
    return (
      <>
        {
          fields.map((itemName, indx) => {
            console.log(index, 'ssss', items);
            return (
              indx == index
              ?
              <>

              {
                this.state.items.map(i => 
                  (
                    <tr key={i.id}>
                      <td>
                        <label className="custom-radio">
                          <Field 
                            type="radio" 
                            value={`${i.id +'_'+ mainItemId }`}
                            id={"recommended"+i.id + index}
                            name={`${itemName}`}
                            component={renderRadio}
                            
                          />
                          <span></span>{i.itemName}
                        </label>
                      </td>
                      <td>{i.currencySymbol + i.price}</td>
                    </tr>
                  )
                )
              }
              </>
              :
              null
            )
          })
        }
      </>
    )
  }
}

export default RenderRecommendedItem;