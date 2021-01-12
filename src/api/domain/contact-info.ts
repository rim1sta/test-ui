const regExpEmail: RegExp = /[(a-z)0-9_-]+([a-z0-9])?@[a-z0-9-]+\.[a-z]{2,}(\.[a-z]{2,})?/;
const regExpPhone: RegExp = /(8|\+7)((\(\d{3}\)\s?\d{3}-\d{2}-\d{2})|(\s\d{3}-\d{3}-\d{2}-\d{2})|(\d{10}))/; 




export interface ContactInfo {
    phone: string;
    email: string;
}

export type ContactInfoValidation = {[key in keyof ContactInfo]?: boolean};

export const contactInfoValidation = (contactInfo?: ContactInfo) => {

const result: ContactInfoValidation = {};
if(!!contactInfo?.email && regExpEmail.test(contactInfo?.email)){
    result.email = true ;
}
if(!!contactInfo?.phone && regExpPhone.test(contactInfo?.phone))    {
    result.phone = true;
}
return result;
}

export const isContactInfoValid = (info: ContactInfoValidation) => !!info.email && !!info.phone;