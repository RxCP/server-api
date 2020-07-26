import Logo from '@common/components/Logo';
import LoginForm from '@core/patterns/molecules/forms/Login';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function LoginPage() {
  const history = useHistory();
  const [isExitForm, setIsExitForm] = useState(false);
  const [exitPage, setExitPage] = useState(false);

  function onSuccess() {
    setIsExitForm(true);

    setTimeout(() => {
      setExitPage(true);
    }, 1000);

    setTimeout(() => {
      history.push('/admin');
    }, 1500);
  }

  return (
    <>
      <div
        className={`bg-gray-300 w-full animate__animated ${
          exitPage ? 'animate__fadeOut' : ''
        }`}
      >
        <div className="flex-col flex justify-center h-screen md:w-1/3 lg:w-1/4 mx-auto">
          <div
            className={`bg-white mb-16 pt-4 animate__animated  animate__fadeInDown ${
              isExitForm ? 'animate__fadeOutUp' : ''
            }`}
          >
            <Logo />
            <LoginForm onSuccess={onSuccess} />
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
