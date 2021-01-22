import { LoginInfo } from "../../api/domain/login-info";
import { ApiServiceImpl } from './../../api/api-service';
import { Dispatch } from "@reduxjs/toolkit";
import { loginSlice } from "../slices/login";


export const loginRequest = (login: LoginInfo) => {
    return async (dispatch: Dispatch) => {
      try {
      const res = await ApiServiceImpl.instance.login(login);
      dispatch(loginSlice.actions.setToken(res.token));
      window.location.href = "/partners";
      } catch(err) {
        if(err) {
          dispatch(loginSlice.actions.setIsError(true))
        }
      };
    };
  };

export const logout = () => {
  return(dispatch: Dispatch) => {
    dispatch(loginSlice.actions.clearToken(null))
    window.location.href = "/login";
  };
};