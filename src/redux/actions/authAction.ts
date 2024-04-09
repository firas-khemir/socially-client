import { LOGIN_SUCCESS, LOGOUT } from '../types/types';

export const LoginAuthAction = (response: any) => {
  return (dispatch: any) => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response
    });
  };
};

export const LogoutAction = () => {
  return (dispatch: any) => {
    dispatch({ type: LOGOUT });
  };
};
