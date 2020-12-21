import { FC, useState, useEffect } from "react";
import React from "react";
import { ApiServiceImpl } from "../../api/api-service";
import { useDispatch, useSelector } from "react-redux"
import { openPartnerForEdit } from "../../store/thunks/partner";
import {
  isPartnerValid,
  Partner,
  partnerValidity,
  PartnerValidity,
} from "../../api/domain/partner";
import { PartnerScreen } from "../partner-forms/partner-screen";
import { getEditablePartner } from "../../selectors/selectors";

export const PartnerEdit: FC<{ id: string }> = ({ id }) => {
  const dispatch = useDispatch();
  const dataPartner = useSelector(getEditablePartner);
  
  const [validPartnerInfo, setValidPartnerInfo] = useState<PartnerValidity>();

  useEffect(() => {
   dispatch(openPartnerForEdit(id))
  }, [id]);

  const update = (partner: Partner) => {
    const partnerValidition: PartnerValidity = partnerValidity(partner);
    setValidPartnerInfo(partnerValidition);
    if (isPartnerValid(partnerValidition)) {  
      ApiServiceImpl.instance.updatePartner(partner).then((res) => {
        console.log(res);
        window.location.href = "/";
      });
    }
    return;
  };

  return (
    <>
      {dataPartner && (
        <PartnerScreen
          partnerValidation={validPartnerInfo}
          partner={dataPartner}
          partnerUpdate={update}
        ></PartnerScreen>
      )}
    </>
  );
};
