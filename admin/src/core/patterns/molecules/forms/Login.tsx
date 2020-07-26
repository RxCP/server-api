import axios from 'axios';
import React, { useReducer, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../../../context/auth';
import TextInput from '../../atoms/TextInput';
import Button from '../button/Button';

interface IFormValues {
  email: string;
  password: number;
}

interface ClassValidatorError {
  property: string;
  constraints: object;
}

interface LoginState {
  loading: boolean;
  isExitForm: boolean;
  serverErrors: [];
}

function loginReducers(
  state: LoginState,
  action: { type: string; data?: any },
) {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        loading: true,
      };
    case 'loaded':
      return {
        ...state,
        loading: false,
      };
    case 'error':
      if (typeof action.data === 'object' && action.data.length >= 1) {
        return {
          ...state,
          serverErrors: action.data,
        };
      }

      return {
        ...state,
        serverErrors: [
          {
            property: 'all',
            constraints: {
              err: action.data.message
                ? action.data.message
                : action.data.toString(),
            },
          },
        ],
      };
    default:
      throw new Error();
  }
}

interface LoginFormProps {
  onSuccess: () => void;
}

function LoginForm({ onSuccess }: LoginFormProps) {
  const { register, errors, handleSubmit } = useForm<IFormValues>();
  const [shakeOnError, setShakeOnError] = useState(false);
  const authDetails = useAuthContext();
  const loginState: LoginState = {
    loading: false,
    isExitForm: false,
    serverErrors: [],
  };
  const [state, dispatch] = useReducer(loginReducers, loginState);

  const onSubmit = async (data: IFormValues) => {
    dispatch({ type: 'loading' });

    try {
      const accessToken = await axios
        .post('/api/auth/login', data)
        .then((res) => res.data.accessToken);
      if (accessToken) {
        authDetails.setAuthToken(accessToken);
        onSuccess();
      }
    } catch (error) {
      shake();
      dispatch({ type: 'error', data: error.response.data || error.response });
      dispatch({ type: 'loaded' });
    }
  };

  const Errors = (serverErrors: ClassValidatorError[]) => (
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

  function shake() {
    setShakeOnError(true);

    setTimeout(() => {
      setShakeOnError(false);
    }, 1000);
  }

  return (
    <>
      <div className="px-8">
        {state.serverErrors.length >= 1 && (
          <div className="bg-red-200 py-2 pl-8 pr-2">
            {Errors(state.serverErrors)}
          </div>
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`px-8 pt-3 pb-8 animate__animated ${
          shakeOnError ? 'animate__shakeX animate__fast' : ''
        }`}
      >
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
        <Button
          type="submit"
          text={state.loading ? 'Loading...' : 'Sign In'}
          full
          isloading={state.loading}
          disabled={state.loading}
        />
      </form>
    </>
  );
}

export default LoginForm;
