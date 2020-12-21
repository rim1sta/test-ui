import React, { useState } from 'react';
import { FC } from "react";
import {
    isPartnerValid,
    Partner,
    partnerValidity,
    PartnerValidity,
  } from "../../api/domain/partner";
import { PartnerScreen } from "../partner-forms/partner-screen";

import { useDispatch, useSelector } from 'react-redux';
import { partnerToCreate } from '../../store/thunks/partner';


export const PartnerCreate: FC = () => {
    const [validPartnerInfo, setValidPartnerInfo] = useState<PartnerValidity>();
    const dispatch = useDispatch();



    const create = (partner: Partner) => {
        const partnerValidition: PartnerValidity = partnerValidity(partner);
        setValidPartnerInfo(partnerValidition);
        console.log(partnerValidition);
        if (isPartnerValid(partnerValidition)) {
          dispatch(partnerToCreate(partner))        
        }
        return;
      };




    return (
        <>
        <PartnerScreen
          partnerValidation={validPartnerInfo}
          partnerUpdate={create}
        ></PartnerScreen>
        </>
    )
}