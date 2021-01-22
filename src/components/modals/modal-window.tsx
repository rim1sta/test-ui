import React from "react";
import { FC } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export interface ModalWindowProps {
  text: string;
  onClose(answer: boolean): void;
}

export const ModalWindow: FC<ModalWindowProps> = ({ text, onClose }) => {

  
  return (
    <Modal centered onHide={() => onClose(false)} show={true}>
      <Modal.Header>
        <Modal.Title>Предупреждение</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{text}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => onClose(false)}>
          Нет
        </Button>
        <Button variant="primary" onClick={() => onClose(true)}>
          Да
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
