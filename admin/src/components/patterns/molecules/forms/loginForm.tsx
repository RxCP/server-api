import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import TextInput from '@patterns/atoms/TextInput';
import { useAuthContext } from '@/context/auth'
import axios from 'axios'

interface IFormValues {
  email: string;
  password: number;
}

interface ErrorResponse {
  property: string
  constraints: object
}

function LoginForm () {
  const { register, errors, handleSubmit } = useForm<IFormValues>();
  const [serverErrors, setServerErrors] = useState<ErrorResponse[]>([])
  const authDetails = useAuthContext();
  
  const onSubmit = (data: IFormValues) => {
    axios.post('/api/auth/login', data)
      .then((res) => {
        console.log(res.data)
        authDetails.setAuthToken(res.data.accessToken)
        window.location.href = '/admin'
      })
      .catch(err => setServerErrors(err.response.data))
  };

  const serverErrorsHtml = (serverErrors: ErrorResponse[]) => (
    <ul>
      {serverErrors && serverErrors.map(item => {
        return <li className="list-disc" key={item.property}>{ Object.values(item.constraints) }</li>
      })}
    </ul>
  )

  return (
    <>
    <div className="px-8">
        {serverErrors.length >= 1 && <div className="bg-red-200 py-2 pl-8 pr-2">{ serverErrorsHtml(serverErrors) }</div>}
    </div>
    <form onSubmit={handleSubmit(onSubmit)}
      className="px-8 pt-6 pb-8">
      <div className="mb-4">
        <label>
          <TextInput placeholder="Email" name="email" register={register} required />
          {errors.email && "Email is required"}
        </label>
      </div>
      <div className="mb-4">
        <label>
          <TextInput type="password" placeholder="Password" name="password" register={register} required />
        </label>
      </div>
      <button type="submit" className="bg-primary px-4 py-2 text-white w-full cursor-pointer">Submit</button>
    </form>
    </>
  );
}

export default LoginForm;
