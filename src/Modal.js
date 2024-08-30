import React, { Component } from 'react';

export default class Modal extends Component {

    componentDidMount(){
        const {show, id, onHide} = this.props;

        if(typeof show !== 'undefined' && show === true){
            window.$$('#' + id).modal('show');

            // Remove modal from dom as it hides
            if(typeof onHide !== 'undefined'){
                window.$$('#' + id).on('hidden.bs.modal', (e) => {
                    this.props.onHide();
                });
            }   
        }
    }

    render() {
        const {header, footer, footerClass, body, bodyWrapperClass, id} = this.props;

        return (
          <div className="modal fade" id={id}>
            <div className="modal-dialog modal-dialog-centered modal-dialog-zoom">
                <div className="modal-content">
                    {
                        typeof header !== 'undefined'
                        &&
                        <div className="modal-header">
                            {header}
                            {/*<button type="button" className="close" data-dismiss="modal">&times;</button>*/}
                        </div>
                    }
                    <div className={typeof bodyWrapperClass !== 'undefined' ? bodyWrapperClass : undefined}>
                    <div className="modal-body">
                        <div className="modal-inner-block">
                            {body}
                        </div>
                    </div>
                    {
                        typeof footer !== 'undefined'
                        &&
                        <div className={`modal-footer ${typeof footerClass !== 'undefined' ? footerClass : undefined}`}>
                            {footer}
                        </div>
                    }
                    </div>
                </div>
            </div>
        </div>
        );
    }
}