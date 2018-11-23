import React, {Component}  from 'react';
import {hasClass, removeClass, addClass, on, off, whichTransitionEvent} from '../utils/dom';
import './Modal.css';

export default class Modal extends Component
{
    constructor(props) 
    {
        super(props);
        this.transitionEvent = whichTransitionEvent();
        this.modal = React.createRef();
        this.onClose = this.onClose.bind(this);
        this.onOpen = this.onOpen.bind(this);
    }

    onClose(evt)
    {
        if (hasClass(evt.target, 'modal'))
        {
            const modal = this.modal.current;
            off(modal, this.transitionEvent, this.onClose);
            addClass(evt.target, 'modal-hidden');
            removeClass(document.body, 'hide-scrollbars');
            if (this.props.onClose !== undefined) this.props.onClose();
        }
    }  

    onOpen(evt)
    {
        if (hasClass(evt.target, 'modal'))
        {
            const modal = this.modal.current;
            off(modal, this.transitionEvent, this.onOpen);
            if (this.props.onOpen !== undefined) this.props.onOpen();
        }
    }  

    close(evt) 
    {   
        if (hasClass(evt.target, 'modal') || hasClass(evt.target, 'modal-close'))
        {
            if (this.props.onClosing !== undefined) this.props.onClosing();
            const modal = this.modal.current;
            on(modal, this.transitionEvent, this.onClose);
            removeClass(modal, 'modal-active');
            removeClass(modal.getElementsByClassName('modal-content')[0], 'modal-content-active');
        }
    }      

    open() 
    {      
        if (this.props.onOpening !== undefined) this.props.onOpening();
        const modal = this.modal.current;
        on(modal, this.transitionEvent, this.onOpen);
        addClass(document.body, 'hide-scrollbars');
        removeClass(modal, 'modal-hidden');
        addClass(modal, 'modal-active'); 
        addClass(modal.getElementsByClassName('modal-content')[0], 'modal-content-active');
    }    

    render() 
    {
        return (
            <div ref={this.modal} className="modal modal-hidden" onClick={(evt) => this.close(evt)}>
                <div className="modal-content">
                    <div className="modal-header">
                        {this.props.title !== undefined ? (<span className="modal-title">{this.props.title}</span>) : null}
                        <span className="modal-close">&times;</span>
                    </div>
                    <div className="modal-body">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
};