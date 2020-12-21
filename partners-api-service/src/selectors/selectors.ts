import { PartnerState } from './../store/slices/partner';
import { createSelector, Store } from "@reduxjs/toolkit";

export const getPartnerState = (store: Store) => (store as any).partnerSlice as PartnerState;

export const getCurrentPage = createSelector(getPartnerState, state => state.pageIndex);
export const getPageData = createSelector(getPartnerState, state => state.pageData); 
export const getEditablePartner = createSelector(getPartnerState, state => state.editablePartner);
export const getPartnerToRemove = createSelector(getPartnerState, state => state.partnerToRemove);

