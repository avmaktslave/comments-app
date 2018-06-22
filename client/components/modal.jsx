/* global document */

import React from 'react';
import ReactDOM from 'react-dom';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.el = document.createElement('div');
  }

  componentDidMount() {
    const modalWrapper = document.getElementById('modal-wrapper');
    modalWrapper.appendChild(this.el);
  }

  componentWillUnmount() {
    const modalWrapper = document.getElementById('modal-wrapper');
    modalWrapper.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
