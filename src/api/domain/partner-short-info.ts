import { PartnerType } from "./partner-type.enum";

export interface PartnerShortInfo {
    id: string;
    displayName: string;
    partnerType: PartnerType;
    city: string;
    address: string; 
    email: string; 
}