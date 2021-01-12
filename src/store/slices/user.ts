import {
  SliceCaseReducers,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { UsersPage } from "./../../api/domain/users-page";
import { UsersShortInfo } from "./../../api/domain/users-short-info";
import { User } from "../../api/domain/user";

export interface UserState {
  pageData?: UsersPage;
  pageIndex: number;
  searchValue?: string;
  userToRemove?: UsersShortInfo | null;
  updatedUser?: User;
  editableUser?: User;
  editedPassword?: string;
  createdLogin?: string;
  checkedLogin?: boolean;
  createdUser?: User;
}

export const userSlice = createSlice<UserState, SliceCaseReducers<UserState>>({
  name: "user",
  initialState: {
    pageIndex: 0,
    searchValue: "",
    userToRemove: null,
  },
  reducers: {
    setPageData(state: UserState, action: PayloadAction<UsersPage>): UserState {
      const pageData: UsersPage = action.payload;
      const newState: UserState = { ...state, pageData };
      return newState;
    },
    setPageIndex(state: UserState, action: PayloadAction<number>): UserState {
      const pageIndex: number = action.payload;
      const newState: UserState = { ...state, pageIndex };
      return newState;
    },
    setSearchValue(state: UserState, action: PayloadAction<string>): UserState {
      const searchValue: string = action.payload;
      const newState: UserState = { ...state, searchValue };
      return newState;
    },
    setUserToRemove(
      state: UserState,
      action: PayloadAction<UsersShortInfo | null>
    ): UserState {
      const userToRemove: UsersShortInfo | null = action.payload;
      const newState: UserState = { ...state, userToRemove };
      return newState;
    },
    updateUser(state: UserState, action: PayloadAction<User>): UserState {
      const updatedUser: User = action.payload;
      const newState: UserState = { ...state, updatedUser };
      return newState;
    },
    clearEditableUser(
      state: UserState,
      action: PayloadAction<unknown>
    ): UserState {
      const { pageIndex, pageData } = state;
      return { pageIndex, pageData };
    },
    setEditableUser(state: UserState, action: PayloadAction<User>): UserState {
      const editableUser: User = action.payload;
      const newState: UserState = { ...state, editableUser };
      return newState;
    },
    updatePassword(state: UserState, action: PayloadAction<string>): UserState {
      const editedPassword: string = action.payload;
      const newState: UserState = { ...state, editedPassword };
      return newState;
    },
    createLogin(state: UserState, action: PayloadAction<string>): UserState {
      const createdLogin: string = action.payload;
      const newState: UserState = { ...state, createdLogin };
      return newState;
    },
    setLoginRes(state: UserState, action: PayloadAction<boolean>): UserState {
      const checkedLogin: boolean = action.payload;
      const newState: UserState = { ...state, checkedLogin };
      return newState;
    },
    createUser(state: UserState, action: PayloadAction<User>): UserState {
      const createdUser: User = action.payload;
      const newState: UserState = { ...state, createdUser };
      return newState;
    },
  },
});
