import { PartnerShortInfo } from './partner-short-info';
import { Partner } from './partner'
export interface PartnersPage {
    items: Array<PartnerShortInfo>;
    total: number;
    pagesCount: number; 
    search: Partner;
}