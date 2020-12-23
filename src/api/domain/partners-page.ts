import { PartnerShortInfo } from './partner-short-info';
export interface PartnersPage {
    items: Array<PartnerShortInfo>;
    total: number;
    pagesCount: number; 
}