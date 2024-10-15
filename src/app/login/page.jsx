
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const Login = dynamic(() => import('../../components/auth/Login'), { suspense: true });


const LoginPage = () => {
    return (
        <>
           <Suspense fallback={<div>Loading...</div>}>
                 <Login />
      </Suspense>
        </>
    )
}

export default LoginPage



