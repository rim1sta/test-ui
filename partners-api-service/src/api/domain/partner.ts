import { PartnerType } from './partner-type.enum';
import { CompanyInfo, CompanyInfoValidation, companyInfoValidation, isCompanyInfoValid } from './company-info';
import { PersonalInfo, PersonalInfoValidation, personalInfoValidation, isPersonalInfoValid } from './personal-info';
import { AddressInfo, AddressInfoValidity, validateAddressInfo, isAddressInfoValid } from './address-info';
import { ContactInfo, ContactInfoValidation, contactInfoValidation, isContactInfoValid } from './contact-info';

export interface Partner {
    id: string;
    addressInfo: AddressInfo;
    contactInfo: ContactInfo;
    personalInfo?: PersonalInfo;
    companyInfo?: CompanyInfo;
    partnerType: PartnerType;
}


export interface PartnerValidity {
    addressInfo: AddressInfoValidity
    contactInfo: ContactInfoValidation
    personalInfo?: PersonalInfoValidation
    companyInfo?: CompanyInfoValidation
}


export const partnerValidity = (partner: Partner) => {
    const result: PartnerValidity = {
        addressInfo: validateAddressInfo(partner?.addressInfo),
        contactInfo: contactInfoValidation(partner?.contactInfo),
        personalInfo: partner.partnerType === PartnerType.naturalPerson ? personalInfoValidation(partner.personalInfo!) : undefined,
        companyInfo: partner.partnerType === PartnerType.legalEntity ?  companyInfoValidation(partner.companyInfo!) : undefined,
    };
    return result;
}

export const isPartnerValid = (partner: PartnerValidity) =>  !!isAddressInfoValid(partner.addressInfo) 
&& !!isContactInfoValid(partner.contactInfo) 
&& (!!partner.personalInfo && isPersonalInfoValid(partner.personalInfo) || !!partner.companyInfo && isCompanyInfoValid(partner.companyInfo))