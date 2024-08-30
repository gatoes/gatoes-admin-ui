import React from 'react';

export default class Tooltip extends React.Component {
  constructor(props){
    super(props);
    this.bindSlider = this.bindSlider.bind(this);
  }

  componentDidMount(){
    window.addEventListener('load', this.bindSlider);

    if(document.readyState === "complete" || document.readyState === "interactive"){
      this.bindSlider();
    }
  }

  bindSlider(){
    window.$$(this.refs.tooltip).tooltip();
  }

  render() {
    return (
      <span ref="tooltip" title={this.props.title}>
        {this.props.children}
      </span>
    );
  }
} 