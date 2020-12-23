import { PartnerShortInfo } from './../../api/domain/partner-short-info';
import { Partner } from './../../api/domain/partner';
import { PartnersPage } from '../../api/domain/partners-page';
import { createSlice, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";



export interface PartnerState {
pageData?: PartnersPage;
pageIndex: number;
editablePartner?: Partner;
partnerToRemove?: PartnerShortInfo | null;
createdPartner?:Partner;
updatedPartner?: Partner; 
}



 export const partnerSlice = createSlice<PartnerState, SliceCaseReducers<PartnerState>>({
    name: 'partner', 
    initialState: {
        pageIndex: 0,
        partnerToRemove: null,
    }, 
    reducers: {
        setPageIndex(state: PartnerState, action: PayloadAction<number>): PartnerState {
            const pageIndex: number = action.payload;
            const newState: PartnerState = {...state, pageIndex};
            return newState;
        },
        setPageData(state: PartnerState, action: PayloadAction<PartnersPage>): PartnerState {
           const pageData: PartnersPage = action.payload;
           const newState: PartnerState = {...state, pageData};
           return newState;
        }, 
        setEditablePartner(state: PartnerState, action: PayloadAction<Partner>): PartnerState {
            const editablePartner: Partner = action.payload;
            const newState: PartnerState = {...state, editablePartner};
            return newState;
        },
        setPartnerToRemove(state: PartnerState, action: PayloadAction<PartnerShortInfo | null>): PartnerState {
            const partnerToRemove: PartnerShortInfo | null = action.payload;
            const newState: PartnerState = {...state, partnerToRemove};
            return newState;
        }, 
        clearEditablePartner(state: PartnerState, action: PayloadAction<unknown>): PartnerState {
            const {pageIndex, pageData} = state;
            return {pageIndex, pageData}; 
        }, 
        createPartner(state: PartnerState, action: PayloadAction<Partner>): PartnerState {
            const createdPartner: Partner = action.payload;
            const newState: PartnerState = {...state, createdPartner};
            return newState;
        }, 
        updatePartner(state: PartnerState, action: PayloadAction<Partner>):PartnerState { 
            const updatedPartner: Partner = action.payload;
            const newState: PartnerState = {...state, updatedPartner};
            return newState;
        }
        
    }
       
}); 