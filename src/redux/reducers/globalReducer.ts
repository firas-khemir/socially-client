import { AnyAction } from 'redux';
import { SET_UNSAVED_CHANGES } from '../types/types';

const initialState = {
  unsavedChanges: false
};

export default function globalReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case SET_UNSAVED_CHANGES:
      return { ...state, unsavedChanges: action.payload.unsavedChanges };
    default:
      return state;
  }
}
