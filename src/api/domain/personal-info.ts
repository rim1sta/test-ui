import { Gender } from './gender.enum';

export interface PersonalInfo {
   gender: Gender;
   lastName: string;
   firstName: string;
   middleName: string;
   birthDate: string;
}



export type PersonalInfoValidation = {[key in keyof PersonalInfo]?: boolean};


export const personalInfoValidation = (personalInfo: PersonalInfo) => {
const result: PersonalInfoValidation = {};

if(!!personalInfo?.birthDate){
   result.birthDate = true;
}
if(!!personalInfo?.firstName){
   result.firstName = true;
}
if(!!personalInfo?.gender){
   result.gender = true;
}
if(!!personalInfo?.lastName){
   result.lastName = true;
}
if(!!personalInfo?.middleName){
   result.middleName = true;
}
return result;
}



export const isPersonalInfoValid = (info: PersonalInfoValidation) => !!info.middleName && !!info.lastName && !!info.gender && !!info.firstName && !!info.birthDate;