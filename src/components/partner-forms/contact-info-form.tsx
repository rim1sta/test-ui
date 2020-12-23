import React, { useState, ChangeEvent } from "react";
import { FC } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {
  ContactInfo,
  ContactInfoValidation,
} from "../../api/domain/contact-info";

export interface ContactInfoProps {
  contactInfo?: ContactInfo;
  onContactInfoChange(value: ContactInfo): void;
  validationInfo?: ContactInfoValidation;
}

export const ContactInfoForm: FC<ContactInfoProps> = ({
  contactInfo,
  onContactInfoChange,
  validationInfo,
}) => {
  const [email, setEmail] = useState(contactInfo?.email || "");
  const [phone, setPhone] = useState(contactInfo?.phone || "");

  const getCurrentContactInfo = (): ContactInfo => ({
    email,
    phone,
  });

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setEmail(email);
    const ci = { ...getCurrentContactInfo(), ...{ email } };
    onContactInfoChange(ci);
  };
  const onPhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const phone = event.target.value;
    setPhone(phone);
    const ci = { ...getCurrentContactInfo(), ...{ phone } };
    onContactInfoChange(ci);
  };

  return (
    <>
      <h2>Контакты</h2>
      <Form>
        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Электронная почта
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="email"
              placeholder="Электронная почта"
              value={email}   
              onChange={onEmailChange}
              isInvalid={!!validationInfo ? !validationInfo.email : false} 
              required
            />
            <Form.Control.Feedback type="invalid">
              Укажите корректную эллектронную почту.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalPhone">
          <Form.Label column sm={2}>
            Телефон
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="phone"
              placeholder="Телефон"
              value={phone}
              isInvalid={!!validationInfo ? !validationInfo.phone : false}
              onChange={onPhoneChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Укажите корректный номер телефона.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};
