import { UsersShortInfo } from './../../api/domain/users-short-info';
import { userSlice } from './../slices/user';
import { ApiServiceImpl } from './../../api/api-service';
import { Dispatch } from "@reduxjs/toolkit";
import { User } from '../../api/domain/user';



export const updateUserPage = (pageIndex: number, searchValue?:string) => {
    return async (dispatch: Dispatch) => {
        const res = await ApiServiceImpl.instance.getUsers(pageIndex, 5, searchValue)
        dispatch(userSlice.actions.setPageData(res))
    };
};

export const updateCurrentPage = (pageIndex: number, pagesCount: number) => {
    return (dispatch: Dispatch) => {
      let newPageIndex: number;
  
      if (pageIndex >= pagesCount) {
        newPageIndex = pageIndex - 1;
      } else if (pageIndex < 0) {
        newPageIndex = pageIndex + 1;
      } else {
        newPageIndex = pageIndex;
      }
      dispatch(userSlice.actions.setPageIndex(newPageIndex));
    };
  };

  export const updateSearchValue = (searchValue?: string) => {
      return (dispatch: Dispatch) => {
          dispatch(userSlice.actions.setSearchValue(searchValue))
      };
  };
  
  export const userToDelete = (usersShortInfo: UsersShortInfo | null) => {
      return (dispatch: Dispatch) => {
          dispatch(userSlice.actions.setUserToRemove(usersShortInfo))
      };
  };

  export const userToUpdate = (user: User) => {
      return async (dispatch: Dispatch) => {
          const res = await ApiServiceImpl.instance.updateUser(user);
          console.log(res)
          window.location.href = "/users";
          dispatch(userSlice.actions.clearEditableUser(null));
      };
  };

  export const openUserForEdit = (id: string) => {
      return async (dispatch: Dispatch) => {
          const res = await ApiServiceImpl.instance.getUser(id);
dispatch(userSlice.actions.setEditableUser(res));
      };
  };

  export const passwordToEdit = (password: string, id?: string) => {
      return async (dispatch: Dispatch) => {
          const  res = await ApiServiceImpl.instance.updateUserPassword(password, id);
          window.location.href = "/users";
          console.log( res);
      };
  };

  export const loginUniqueCheck = (login: string) => {
      return async (dispatch: Dispatch) => {
          const res = await ApiServiceImpl.instance.loginCheck(login);
          dispatch(userSlice.actions.setLoginRes(res));
          console.log( "result", res);
      };
  };
 
  export const createNewUser = (user?: User) => {
      return async (dispatch: Dispatch) => {
          const res = await ApiServiceImpl.instance.createUser(user);
          window.location.href = "/users";
          console.log(res)
      }
  }