import LoginForm from '@patterns/molecules/forms/loginForm';
import React from 'react';

function LoginPage() {
  return (
    <>
      <div className="bg-gray-300 w-full">
        <div className="flex-col flex justify-center h-screen md:w-1/3 lg:w-1/4 mx-auto">
          <div className="bg-white mb-16 pt-4">
            <h1 className="text-center text-3xl font-heading font-semibold">
              RxCP
            </h1>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
