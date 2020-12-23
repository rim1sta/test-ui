import React, { useState, ChangeEvent } from "react";
import { FC } from "react";
import { AddressInfoForm } from "./address-info-form";
import { CompanyInfoForm } from "./company-info-form";
import { ContactInfoForm } from "./contact-info-form";
import { PersonalInfoForm } from "./personal-info-form";
import { PartnerType } from "../../api/domain/partner-type.enum";
import { Partner } from "../../api/domain/partner";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import {
  CompanyInfo,
  PersonalInfo,
  ContactInfo,
  AddressInfo,
} from "../../api/domain";
import { PartnerValidity } from "../../api/domain/partner";






export interface PartnerProps {
  partner?: Partner;
  partnerUpdate(partner: Partial<Partner>): void;
  partnerValidation?: PartnerValidity;
}

export const PartnerScreen: FC<PartnerProps> = ({
  partner,
  partnerUpdate,
  partnerValidation,
}) => {
  const initialPartnerTypeValue: PartnerType  = partner?.partnerType || PartnerType.naturalPerson;

  const [changedPartner, setChangedPartner] = useState<Partial<Partner>>(
    partner || {partnerType: initialPartnerTypeValue}
  );
  const [partnerTypeState, setPartnerTypeState] = useState<PartnerType>(initialPartnerTypeValue);

  const onPartnerTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const partnerType = event.target.value as PartnerType;
    setChangedPartner({...changedPartner, ...{partnerType}})
    setPartnerTypeState(partnerType);
  };

  const handleUpdate = () => {
    console.log(changedPartner)
    partnerUpdate(changedPartner);
  };
  
  const handleCompanyInfoChange = (companyInfo: CompanyInfo) => {
    setChangedPartner({ ...changedPartner, ...{ companyInfo } });
  };

  const handlePersonalInfoChange = (personalInfo: PersonalInfo) => {
    setChangedPartner({ ...changedPartner, ...{ personalInfo } });
  };

  const handleContactInfoChange = (contactInfo: ContactInfo) => {
    setChangedPartner({ ...changedPartner, ...{ contactInfo } });
  };

  const handleAddressInfoChange = (addressInfo: AddressInfo) => {
    setChangedPartner({ ...changedPartner, ...{ addressInfo } });
  };




  return (
    <>
      <Container className="form__container">
        <Form>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <h2>Тип партнерства</h2>
            <Form.Control
              as="select"
              value={partnerTypeState}
              onChange={onPartnerTypeChange}
              disabled={!!partner}
            >
              <option value={PartnerType.legalEntity}>Юридическое лицо</option>
              <option value={PartnerType.naturalPerson}>Физическое лицо</option>
            </Form.Control>
          </Form.Group>
        </Form>
        {partnerTypeState === PartnerType.legalEntity && (
          <CompanyInfoForm
            companyInfo={partner?.companyInfo}
            validationInfo={partnerValidation?.companyInfo}
            onCompanyInfoChange={handleCompanyInfoChange}
          />
        )}
        {partnerTypeState === PartnerType.naturalPerson && (
          <PersonalInfoForm
            validationInfo={partnerValidation?.personalInfo}
            personalInfo={partner?.personalInfo}
            onPersonalInfoChange={handlePersonalInfoChange}
          />
        )}
        
        <ContactInfoForm
          validationInfo={partnerValidation?.contactInfo}
          contactInfo={partner?.contactInfo}
          onContactInfoChange={handleContactInfoChange}
        />
        <AddressInfoForm
          validationInfo={partnerValidation?.addressInfo}
          addressInfo={partner?.addressInfo}
          onAddressInfoChange={handleAddressInfoChange}
        />
        <div className="pull-right">
          <Link to={"/"}>
            {" "}
            <Button variant="secondary" className="cancel__button">
              Отмена
            </Button>
          </Link>
          <Button
            variant="primary"
            className="update__button"
            onClick={handleUpdate}
            type="submit"
          >
            Сохранить
          </Button>
        </div>
      </Container>
    </>
  );
};
