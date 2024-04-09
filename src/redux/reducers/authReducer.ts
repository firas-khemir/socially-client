import { LOGIN_SUCCESS, LOGOUT } from '../types/types';

const initialState = {
  email: '',
  id: '',
  phone: '',
  photo: '',
  uid: '',
  username: '',
  loading: false,
  error: null,
  newUser: true
};

export default function authReducer(state = initialState, action: any = {}) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        email: action.payload.email,
        id: action.payload.id,
        phone: action.payload.phone,
        photo: action.payload.photo,
        uid: action.payload.uid,
        username: action.payload.username,
        loading: false,
        error: null,
        firstTimeUser: false,
        datefirstTimeUserLogin: new Date()
      };
    case LOGOUT:
      return {
        loading: false,
        error: null
      };
    default:
      return state;
  }
}
