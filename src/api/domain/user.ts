
import { ContactInfo } from './contact-info';



export interface User {
    id?: string;
    contactInfo?: ContactInfo;
    login?: string;
    password?: string;
}

