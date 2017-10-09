import React, { Component } from 'react';
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';


export default class Input extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <Modal isOpen={this.props.isOpen} onRequestHide={this.props.hideModal}>
                <ModalHeader>
                    <ModalClose onClick={this.props.hideModal} />
                </ModalHeader>
                <ModalBody>
                    <h4>You guessed the song:</h4>
                    <h2>{this.props.title}</h2>
                    <h6>by</h6>
                    <h2>{this.props.artist}</h2>
                </ModalBody>
            </Modal>
        )
    }
}