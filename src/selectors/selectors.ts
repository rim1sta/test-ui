import { UserState } from './../store/slices/user';
import { PartnerState } from './../store/slices/partner';
import { createSelector, Store } from "@reduxjs/toolkit";

export const getPartnerState = (store: Store) => (store as any).partnerSlice as PartnerState;
export const getUserState = (store: Store) => (store as any).userSlice as UserState;



export const getCurrentPage = createSelector(getPartnerState, state => state.pageIndex);
export const getPageData = createSelector(getPartnerState, state => state.pageData); 
export const getEditablePartner = createSelector(getPartnerState, state => state.editablePartner);
export const getPartnerToRemove = createSelector(getPartnerState, state => state.partnerToRemove);
export const getPartnerToUpdate = createSelector(getPartnerState, state => state.updatedPartner);
export const getSearchValue = createSelector(getPartnerState, state => state.searchValue);
export const getUserPageData = createSelector(getUserState, state => state.pageData);
export const getUserCurrentPage = createSelector(getUserState, state => state.pageIndex);
export const getUserSearchValue = createSelector(getUserState, state => state.searchValue);
export const getUserToDelete = createSelector(getUserState, state => state.userToRemove);
export const getUserToUpdate = createSelector(getUserState, state => state.updatedUser);
export const getEditableUser = createSelector(getUserState, state => state.editableUser);
export const getLoginValue = createSelector(getUserState, state => state.createdLogin);
export const getLoginValid = createSelector(getUserState, state => state.checkedLogin);