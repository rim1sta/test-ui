import { LoginInfo } from './login-info';

import { ContactInfo } from './contact-info';



export interface User {
    id?: string;
    contactInfo?: ContactInfo;
    login?: string;
    password?: string;
    loginInfo?: LoginInfo;
}

