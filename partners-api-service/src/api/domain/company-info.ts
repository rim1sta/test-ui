
export interface CompanyInfo {
    name: string;
    foundationYear: number;
    numEmployees: number;
}


export type CompanyInfoValidation = {[key in keyof CompanyInfo]?: boolean};


export const companyInfoValidation = (companyInfo: CompanyInfo) => {
const result: CompanyInfoValidation = {}
if(!!companyInfo.foundationYear){
    result.foundationYear = true;
}
if(!!companyInfo.name){
    result.name = true;
}
if(!!companyInfo.numEmployees){
    result.numEmployees = true;
    }
    return result
}
export const isCompanyInfoValid = (info: CompanyInfoValidation) => !!info.name && !!info.numEmployees && !!info.foundationYear;