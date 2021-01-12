import { FC, useState, useEffect } from "react";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  openPartnerForEdit,
  partnerToUpdate,
} from "../../store/thunks/partner";
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
    dispatch(openPartnerForEdit(id));
  }, [dispatch, id]);

  const update = (partner: Partner) => {
    const partnerValidition: PartnerValidity = partnerValidity(partner);
    setValidPartnerInfo(partnerValidition);
    if (isPartnerValid(partnerValidition)) {
      dispatch(partnerToUpdate(partner));
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
