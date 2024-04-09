// import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

// type AuthContextType = {
//   user: FirebaseAuthTypes.User | null | undefined;
//   idToken: string | null;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// type AuthProviderProps = {
//   children: ReactNode;
// };

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
//   const [idToken, setIdToken] = useState<string | null>(null);

//   useEffect(() => {
//     const unsubscribe = auth().onAuthStateChanged((authUser) => {
//       setUser(authUser);

//       if (authUser) {
//         authUser.getIdToken().then((token) => {
//           setIdToken(token);
//         });
//       } else {
//         setIdToken(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const value: AuthContextType = {
//     user,
//     idToken
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
