import { FC, useState, useEffect } from "react";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { getEditableUser } from "../../selectors/selectors";
import { openUserForEdit, userToUpdate } from "../../store/thunks/user";
import { User } from "../../api/domain/user";
import { UserFormScreen } from "../user-forms/user-form-screen";
import {
  ContactInfoValidation,
  contactInfoValidation,
  isContactInfoValid,
} from "../../api/domain/contact-info";

export const UserEdit: FC<{ id: string }> = ({ id }) => {
  const dispatch = useDispatch();
  const dataUser = useSelector(getEditableUser);

  const [validUserInfo, setValidUserInfo] = useState<ContactInfoValidation>();

  useEffect(() => {
    dispatch(openUserForEdit(id));
  }, []);

  const update = (user: User) => {
    const userValidation: ContactInfoValidation = contactInfoValidation(
      user.contactInfo
    );
    setValidUserInfo(userValidation);
    if (isContactInfoValid(userValidation)) {
      dispatch(userToUpdate(user));
    }
    return;
  };

  return (
    <>
      {dataUser && (
        <UserFormScreen
          user={dataUser}
          userToUpdate={update}
          userValidation={validUserInfo}
        />
      )}
    </>
  );
};
