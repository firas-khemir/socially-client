import { SET_UNSAVED_CHANGES } from '../types/types';

export const SetUnsavedChangesAction = (payload: any) => {
  return async (dispatch: any) => {
    dispatch({
      type: SET_UNSAVED_CHANGES,
      payload: payload
    });
  };
};
