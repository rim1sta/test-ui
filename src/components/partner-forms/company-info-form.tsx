import React, { ChangeEvent } from "react";
import { FC, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {
  CompanyInfo,
  CompanyInfoValidation,
} from "../../api/domain/company-info";

export interface CompanyInfoFormProps {
  companyInfo?: CompanyInfo;
  onCompanyInfoChange(value: CompanyInfo): void;
  validationInfo?: CompanyInfoValidation;
}

export const CompanyInfoForm: FC<CompanyInfoFormProps> = ({
  companyInfo,
  onCompanyInfoChange,
  validationInfo,
}) => {
  const [name, setName] = useState(companyInfo?.name || "");
  const [foundationYear, setFoundationYear] = useState(
    companyInfo?.foundationYear || 0
  );
  const [numEmployees, setNumEmployees] = useState(
    companyInfo?.numEmployees || 0
  );

  const getCurrentCompanyInfo = (): CompanyInfo => ({
    name,
    foundationYear,
    numEmployees,
  });

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setName(name);
    const ci = { ...getCurrentCompanyInfo(), ...{ name } };
    onCompanyInfoChange(ci);
  };

  const onFoundationYear = (event: ChangeEvent<HTMLInputElement>) => {
    let foundationYear = parseInt(event.target.value);
    foundationYear = isNaN(foundationYear) ? 0 : foundationYear;
    setFoundationYear(foundationYear);
    const ci = { ...getCurrentCompanyInfo(), ...{ foundationYear } };
    onCompanyInfoChange(ci);
  };

  const onNumEmpoyeesChange = (event: ChangeEvent<HTMLInputElement>) => {
    let numEmployees = parseInt(event.target.value);
    numEmployees = isNaN(numEmployees) ? 0 : numEmployees;
    setNumEmployees(numEmployees);
    const ci = { ...getCurrentCompanyInfo(), ...{ numEmployees } };
    onCompanyInfoChange(ci);
  };

  return (
    <>
      <h2>Информация о компании</h2>
      <Form>
        <Form.Group as={Row} controlId="formPlaintextCompanyName">
          <Form.Label column sm="2">
            Название компании
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              onChange={onNameChange}
              value={name}
              placeholder="Название компании"
              isInvalid={!!validationInfo ? !validationInfo.name : false}
              required
            />
            <Form.Control.Feedback type="invalid">
              Укажите корректное название компании.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPlaintextFoundationYear">
          <Form.Label column sm="2">
            Год основания
          </Form.Label>
          <Col sm="10">
            <Form.Control
              onChange={onFoundationYear}
              value={foundationYear}
              isInvalid={
                !!validationInfo ? validationInfo.foundationYear : false
              }
              placeholder="Год основания"
              type="text"
              required
            />
            <Form.Control.Feedback type="invalid">
              Укажите корректный год основания.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPlaintextNumEmployees">
          <Form.Label column sm="2">
            Количество сотрудников
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="number"
              isInvalid={
                !!validationInfo ? !validationInfo.numEmployees : false
              }
              onChange={onNumEmpoyeesChange}
              placeholder="Количество сотрудников"
              value={numEmployees}
              required
            />
            <Form.Control.Feedback type="invalid">
              Укажите корректное число сотрудников.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};
