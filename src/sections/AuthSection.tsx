// 'use client'
// import React from 'react';
// import { useAuth } from '@/utils/hooks/useAuth';
// import AuthForm from '@/components/auth/AuthForm';
// import RegistrationForm from '@/components/auth/RegistrationForm';
//
// export const AuthSection = () => {
//     const {
//         email,
//         setEmail,
//         password,
//         setPassword,
//         confirmPassword,
//         setConfirmPassword,
//         username,
//         setUsername,
//         error,
//         isLogin,
//         switchToRegistration,
//         switchToLogin,
//         handleLogin,
//         handleRegistration,
//     } = useAuth();
//
//     return (
//         <>
//             {isLogin ? (
//                 <AuthForm
//                     email={email}
//                     setEmail={setEmail}
//                     password={password}
//                     setPassword={setPassword}
//                     error={error}
//                     handleLogin={handleLogin}
//                     switchToRegistration={switchToRegistration}
//                 />
//             ) : (
//                 <RegistrationForm
//                     email={email}
//                     setEmail={setEmail}
//                     password={password}
//                     setPassword={setPassword}
//                     confirmPassword={confirmPassword}
//                     setConfirmPassword={setConfirmPassword}
//                     username={username}
//                     setUsername={setUsername}
//                     error={error}
//                     handleRegistration={handleRegistration}
//                     switchToLogin={switchToLogin}
//                 />
//             )}
//         </>
//     );
// };
