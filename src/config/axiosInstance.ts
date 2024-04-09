// import axios from 'axios';
// import { LogoutAction, RefreshTokenAction } from '../redux/actions/authAction';
// import { store } from '../redux/store';
// import { globalEnv } from './baseConfig';
// import { Authorization } from './constants';
// export default function axiosInstance() {
//   const authState: any = store.getState().auth;
//   const AUTHORIZATION = Authorization;

//   const headers: any = {};

//   if (authState.ACCESS_TOKEN != null) {
//     headers.Authorization = AUTHORIZATION + authState.ACCESS_TOKEN;
//   }

//   const axiosInstance = axios.create({
//     baseURL: globalEnv.BASE_URL,
//     headers
//   });

//   // Add a request interceptor
//   axiosInstance.interceptors.request.use(
//     (config: any) => {
//       config.headers['Authorization'] = AUTHORIZATION + authState.ACCESS_TOKEN;

//       return config;
//     },
//     (error) => {
//       Promise.reject(error);
//     }
//   );

//   axiosInstance.interceptors.response.use(
//     (response) => {
//       console.log('this is in response', response.data);
//       return response;
//     },
//     (error) => {
//       const originalRequest = error.config;
//       console.log('error in interceptor', error);
//       console.log('error.response in interceptor', error.response.data);

//       if (error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         const refreshToken = authState.REFRESH_TOKEN;
//         console.log('axios refresh-access-token start');
//         const params = new URLSearchParams();
//         params.append('refreshToken', refreshToken);

//         return axios
//           .post(globalEnv.BASE_URL + '/user/refresh-access-token/', {
//             refreshToken: refreshToken
//           })
//           .then((res) => {
//             if (res.status === 201) {
//               //  store the access and the refresh

//               store.dispatch(RefreshTokenAction(res.data));
//               console.log('refresh-access-token response', res.data);

//               originalRequest.headers['Authorization'] = AUTHORIZATION + res.data.accessToken;
//               return axios(originalRequest);
//             } else {
//               console.log('refresh-access-token  ', res.data);
//               console.log('user logout refrech token expired');
//               console.log('dispatch LogoutAction refresh-access-token response != 201');
//               store.dispatch(LogoutAction());
//               return;
//             }
//           })
//           .catch((err) => {
//             console.log('error in refresh ', err);
//             console.log('user logout refrech token expired');
//             console.log('dispatch LogoutAction refresh-access-token error');
//             console.log(
//               'User Logout',
//               'LogoutAction refresh-access-token error **axiosInstance.js line 82 ** USER :' +
//                 JSON.stringify(authState.user) +
//                 ' ***Error :' +
//                 JSON.stringify(err),
//               authState.user.username,
//               authState.user.email
//             );
//             store.dispatch(LogoutAction());
//             return;
//           });
//       }
//       return Promise.reject(error);
//     }
//   );
//   return axiosInstance;
// }
