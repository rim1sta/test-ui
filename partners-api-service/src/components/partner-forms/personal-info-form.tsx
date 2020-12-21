import React, { useState, ChangeEvent } from "react";
import { FC } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {
  PersonalInfo,
  PersonalInfoValidation,
} from "../../api/domain/personal-info";
import { Gender } from "../../api/domain";

export interface PersonalInfoFormProps {
  personalInfo?: PersonalInfo;
  onPersonalInfoChange(value: PersonalInfo): void;
  validationInfo?: PersonalInfoValidation;
}

export const PersonalInfoForm: FC<PersonalInfoFormProps> = ({
  personalInfo,
  onPersonalInfoChange,
  validationInfo,
}) => {
  const [lastName, setLastName] = useState(personalInfo?.lastName || "");
  const [firstName, setFirstName] = useState(personalInfo?.firstName || '');
  const [middleName, setMiddleName] = useState(personalInfo?.middleName || "");
  const [birthDate, setBirthDate] = useState(personalInfo?.birthDate || "");
  const [gender, setGender] = useState(personalInfo?.gender || Gender.male);

  const getCurrentPersonalInfo = (): PersonalInfo => ({
    lastName,
    firstName,
    middleName,
    birthDate,
    gender,
  });

  const onLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const lastName = event.target.value;
    setLastName(lastName);
    const pi = { ...getCurrentPersonalInfo(), ...{ lastName } };
    onPersonalInfoChange(pi);
  };

  const onFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const firstName = event.target.value;
    setFirstName(firstName);
    const pi = { ...getCurrentPersonalInfo(), ...{ firstName } };
    onPersonalInfoChange(pi);
  };
  const onMiddleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const middleName = event.target.value;
    setMiddleName(middleName);
    const pi = { ...getCurrentPersonalInfo(), ...{ middleName } };
    onPersonalInfoChange(pi);
  };
  const onBirthNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const birthDate = event.target.value;
    setBirthDate(birthDate);
    const pi = { ...getCurrentPersonalInfo(), ...{ birthDate } };
    onPersonalInfoChange(pi);
  };
  const onGenderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const gender = event.target.value as Gender;
    setGender(gender);
    const pi = { ...getCurrentPersonalInfo(), ...{ gender } };
    onPersonalInfoChange(pi);
  };

  return (
    <>
      <h2>Персональная информация</h2>
      <Form>
        <Form.Group as={Row} controlId="formPlaintextLastName">
          <Form.Label column sm="2">
            Фамилия
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Фамилия"
              onChange={onLastNameChange}
              value={lastName}
              isInvalid={!!validationInfo ? !validationInfo.lastName : false}
              required
            />
            <Form.Control.Feedback type="invalid">
              Укажите корректную фамилию.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPlaintextFirstName">
          <Form.Label column sm="2">
            Имя
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Имя"
              onChange={onFirstNameChange}
              value={firstName}
              isInvalid={!!validationInfo ? !validationInfo.firstName : false}
              required
            />
            <Form.Control.Feedback type="invalid">
              Укажите корректное имя.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPlaintextMiddleName">
          <Form.Label column sm="2">
            Отчество
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Отчество"
              onChange={onMiddleNameChange}
              value={middleName}
              isInvalid={!!validationInfo ? !validationInfo.middleName : false}
              required
            />
            <Form.Control.Feedback type="invalid">
              Укажите корректное отчетсво.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPlaintextBirthDate">
          <Form.Label column sm="2">
            Дата рождения
          </Form.Label>
          <Col sm="10">
            <Form.Control
              onChange={onBirthNameChange}
              placeholder="Дата рождения"
              type="text"
              value={birthDate}
              isInvalid={!!validationInfo ? !validationInfo.birthDate : false}
              required
            />
            <Form.Control.Feedback type="invalid">
              Укажите корректную дату рождения.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group controlId="formPlaintextGender" as={Row}>
          <Form.Label column sm="2">
            Пол
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="select"
              isInvalid={!!validationInfo ? !validationInfo.gender : false}
              value={gender}
              onChange={onGenderChange}
            >
              <option value={Gender.male}>мужской</option>
              <option value={Gender.female}>женский</option>
            </Form.Control>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};
