import React from 'react';
import { useForm } from "react-hook-form";
import TextInput from '@patterns/atoms/TextInput';
import axios from 'axios'

interface IFormValues {
  email: string;
  password: number;
}

function LoginForm () {
  const { register, errors, handleSubmit } = useForm<IFormValues>();
  
  const onSubmit = (data: IFormValues) => {
    axios.post('/api/auth/login', data)
      .then((res) => {
        console.log(res)
      })
  };

  return (
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
          <TextInput placeholder="Password" name="password" register={register} required />
        </label>
      </div>
      <button type="submit" className="bg-primary px-4 py-2 text-white w-full cursor-pointer">Submit</button>
    </form>
  );
}

export default LoginForm;
