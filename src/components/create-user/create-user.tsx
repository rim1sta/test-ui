import React, { FC } from "react";
import { CreateUserForm } from "./create-user-form";
import { useDispatch, useSelector } from "react-redux";
import { getLoginValue } from "../../selectors/selectors";
import { loginUniqueCheck, createNewUser } from "../../store/thunks/user";
import { User } from "../../api/domain/user";

export const CreateUser: FC = () => {
  const dispatch = useDispatch();

  const loginValue = useSelector(getLoginValue);

  const updateLoginValue = (login: string) => {
    console.log("login", login);
    dispatch(loginUniqueCheck(login));
  };

  const create = (user: User) => {
    dispatch(createNewUser(user));
  };

  return (
    <>
      <CreateUserForm
        userCreate={create}
        loginValue={loginValue}
        loginChange={updateLoginValue}
      />
    </>
  );
};
