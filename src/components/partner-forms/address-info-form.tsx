import React, { ChangeEvent } from "react";
import { FC } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {
  AddressInfo,
  AddressInfoValidity,
} from "../../api/domain/address-info";
import { useState } from "react";

export interface AddressInfoFormProps {
  addressInfo?: AddressInfo;
  onAddressInfoChange(value: AddressInfo): void;
  validationInfo?: AddressInfoValidity;
}

export const AddressInfoForm: FC<AddressInfoFormProps> = ({
  addressInfo,
  onAddressInfoChange,
  validationInfo,
}) => {
  const [city, setCity] = useState(addressInfo?.city || "");
  const [street, setStreet] = useState(addressInfo?.street || "");
  const [houseNumber, setHouseNumber] = useState(
    addressInfo?.houseNumber || ""
  );
  const [idx, setIdx] = useState(addressInfo?.idx || "");

  const getCurrentAddressInfo = (): AddressInfo => ({
    city,
    street,
    houseNumber,
    idx,
  });

  const onCityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const city = event.target.value;
    setCity(city);
    const ai = { ...getCurrentAddressInfo(), ...{ city } };
    onAddressInfoChange(ai);
  };
  const onStreetChange = (event: ChangeEvent<HTMLInputElement>) => {
    const street = event.target.value;
    setStreet(street);
    const ai = { ...getCurrentAddressInfo(), ...{ street } };
    onAddressInfoChange(ai);
  };
  const onHouseNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const houseNumber = event.target.value;
    setHouseNumber(houseNumber);
    const ai = { ...getCurrentAddressInfo(), ...{ houseNumber } };
    onAddressInfoChange(ai);
  };
  const onIdxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const idx = event.target.value;
    setIdx(idx);
    const ai = { ...getCurrentAddressInfo(), ...{ idx } };
    onAddressInfoChange(ai);
  };

  return (
    <>
      <h2>Адрес</h2>
      <Form>
        <Form.Group as={Row} controlId="validationCustom01">
          <Form.Label column sm="2">
            Город
          </Form.Label>
          <Col sm="10">
            <Form.Control
              isInvalid={!!validationInfo ? !validationInfo.city : false}
              type="text"
              value={city}
              placeholder="Город"
              required
              className="t_address-city"
              onChange={onCityChange}
            />
            <Form.Control.Feedback type="invalid">
              Укажите корректный город.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPlaintextStreet">
          <Form.Label column sm="2">
            Улица
          </Form.Label>
          <Col sm="10">
            <Form.Control
              isInvalid={!!validationInfo ? !validationInfo.street : false}
              onChange={onStreetChange}
              value={street}
              type="text"
              required
              className="t_address-street"
              placeholder="Улица"
            />
            <Form.Control.Feedback type="invalid">
              Укажите корректную улицу.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPlaintextHouseNumber">
          <Form.Label column sm="2">
            Номер дома
          </Form.Label>
          <Col sm="10">
            <Form.Control
              onChange={onHouseNumberChange}
              value={houseNumber}
              isInvalid={!!validationInfo ? !validationInfo.houseNumber : false}
              type="string"
              className="t_address-houseNumber"
              placeholder="Номер дома"
              required
            />
            <Form.Control.Feedback type="invalid">
              Укажите корректный номер дома.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPlaintextIdx">
          <Form.Label column sm="2">
            Индекс
          </Form.Label>
          <Col sm="10">
            <Form.Control
              onChange={onIdxChange}
              type="string"
              isInvalid={!!validationInfo ? !validationInfo.idx : false}
              placeholder="Индекс"
              required
              className="t_address-idx"
              value={idx}
            />
            <Form.Control.Feedback type="invalid">
              Укажите корректный индекс.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};
