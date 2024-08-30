import React, { Component, Fragment } from 'react';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      renderElement: null
    };
  }

  render() {
    const {renderElement} = this.state;
    
    return (
      <Fragment>
        {renderElement !== null && renderElement}
        {window.setFooter(this)}
      </Fragment>
    );
  }
}