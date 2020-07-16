import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextInput from '@patterns/atoms/TextInput';
import { useAuthContext } from '@/context/auth';
import { useHistory } from 'react-router';
import axios from 'axios';

interface IFormValues {
  email: string;
  password: number;
}

interface ErrorResponse {
  property: string;
  constraints: object;
}

function LoginForm() {
  const history = useHistory();
  const { register, errors, handleSubmit } = useForm<IFormValues>();
  const [serverErrors, setServerErrors] = useState<ErrorResponse[]>([]);
  const authDetails = useAuthContext();

  const onSubmit = (data: IFormValues) => {
    axios
      .post('/api/auth/login', data)
      .then((res) => {
        console.log(res.data);
        if (res.data.accessToken) {
          authDetails.setAuthToken(res.data.accessToken);
          history.push('/admin');
        } else {
          setServerErrors([
            {
              property: 'server',
              constraints: { err: 'Something went wrong!' },
            },
          ]);
        }
      })
      .catch((err) => {
        if (err.response.status === 429) {
          setServerErrors([
            { property: '429', constraints: { err: err.response.data } },
          ]);
        } else {
          if (err.response.data.message) {
            setServerErrors([
              { property: '400', constraints: { err: err.response.data.message } },
            ]);
          } else {
            setServerErrors(err.response.data);
          }
        }
      });
  };

  const serverErrorsHtml = (serverErrors: ErrorResponse[]) => (
    <ul>
      {serverErrors.length >= 1 &&
        serverErrors.map((item) => {
          return (
            <li className="list-disc text-sm" key={item.property}>
              {Object.values(item.constraints)}
            </li>
          );
        })}
    </ul>
  );

  return (
    <>
      <div className="px-8">
        {serverErrors.length >= 1 && (
          <div className="bg-red-200 py-2 pl-8 pr-2">
            {serverErrorsHtml(serverErrors)}
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="px-8 pt-3 pb-8">
        <div className="mb-4">
          <label>
            <TextInput
              placeholder="Email"
              name="email"
              register={register}
              required
            />
            <span className="text-sm">
              {errors.email && 'Email is required'}
            </span>
          </label>
        </div>
        <div className="mb-4">
          <label>
            <TextInput
              type="password"
              placeholder="Password"
              name="password"
              register={register}
              required
            />
            <span className="text-sm">
              {errors.password && 'Password is required'}
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="bg-primary px-4 py-2 text-white w-full cursor-pointer"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default LoginForm;
