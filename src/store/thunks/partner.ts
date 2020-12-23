import { partnerSlice } from './../slices/partner';
import { PartnerShortInfo } from './../../api/domain/partner-short-info';
import { Partner } from './../../api/domain/partner';
import { ApiServiceImpl } from './../../api/api-service';
import { Dispatch } from "@reduxjs/toolkit";




export const updatePage = (pageIndex: number) => {
    return async (dispatch: Dispatch) => {
        const res = await ApiServiceImpl.instance.getPartners(pageIndex, 5)
            dispatch(partnerSlice.actions.setPageData(res))
            const newPageIndex: number = pageIndex >= res.pagesCount ? pageIndex - 1 : pageIndex;
              dispatch(partnerSlice.actions.setPageIndex(newPageIndex));        
    }
};

export const openPartnerForEdit = (id: string) => {
    return async (dispatch: Dispatch) => {
        const res = await ApiServiceImpl.instance.getPartner(id)
            dispatch(partnerSlice.actions.setEditablePartner(res));
    }
};

export const partnerToDelete = (partnerShortInfo: PartnerShortInfo | null) => {
    return  (dispatch: Dispatch) => {
       dispatch(partnerSlice.actions.setPartnerToRemove(partnerShortInfo));
    }
};


export const partnerToUpdate = (partner: Partner) => {
    return async (dispatch: Dispatch) => {
        const res = await ApiServiceImpl.instance.updatePartner(partner);
        console.log(res);
        window.location.href = "/";
        dispatch(partnerSlice.actions.clearEditablePartner(null));
    }
};

export const partnerToCreate = (partner: Partner) => {
    return async (dispatch: Dispatch) => {
        const res = await ApiServiceImpl.instance.createPartner(partner);
        console.log(res);
        window.location.href = "/";
    }
};



