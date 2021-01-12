import { UsersShortInfo } from './users-short-info';
export interface UsersPage {
    items: Array<UsersShortInfo>
    page: number;
    pagesCount: number;
    search: string;
}