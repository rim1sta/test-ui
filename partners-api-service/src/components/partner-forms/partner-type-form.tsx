import React from "react";
import { FC, useState, ChangeEvent } from "react";
import Form from "react-bootstrap/Form";
import { PartnerType } from "../../api/domain/partner-type.enum";

export interface PartnerTypeFormProps {
  partnerType: PartnerType;
}

export const PartnerTypeForm: FC<PartnerTypeFormProps> = ({ partnerType }) => {
  const [partnerTypeState, setPartnerTypeState] = useState<PartnerType>(
    partnerType
  );

  const onPartnerTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const partnerType = event.target.value as PartnerType;
    setPartnerTypeState(partnerType);
    console.log(partnerType);
  };

  return (
    <>
      <Form>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <h2>Тип партнерства</h2>
          <Form.Control
            as="select"
            value={partnerTypeState}
            onChange={onPartnerTypeChange}
          >
            <option value={PartnerType.legalEntity}>Юридическое лицо</option>
            <option value={PartnerType.naturalPerson}>Физическое лицо</option>
          </Form.Control>
        </Form.Group>
      </Form>
    </>
  );
};
