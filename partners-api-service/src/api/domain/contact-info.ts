export interface ContactInfo {
    phone: string;
    email: string;
}

export type ContactInfoValidation = {[key in keyof ContactInfo]?: boolean};

export const contactInfoValidation = (contactInfo: ContactInfo) => {
const result: ContactInfoValidation = {};
if(!!contactInfo.email){
    result.email = true;
}
if(!!contactInfo.phone){
    result.phone = true;
}
return result
}

export const isContactInfoValid = (info: ContactInfoValidation) => !!info.email && !!info.phone;