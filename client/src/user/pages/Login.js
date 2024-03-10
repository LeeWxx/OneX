import React, { Fragment, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import Input from '../../ui/Input';
import { useForm } from '../../hooks/form-hook';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../utill/validators';
import { useHttpClient } from '../../hooks/http-hook';

const Login = () => {
	const auth = useContext(AuthContext);
	const navigate = useNavigate();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	
    const [formState, inputHandler] = useForm(
        {
            email: {
                value: '',
                isValid: false,
            },
            password: {
                value: '',
                isValid: false,
            },
        },
        false
    );

    const authSubmitHandler = async event => {
        event.preventDefault();
       	try{
			const responseData = await sendRequest(
				`${process.env.REACT_APP_SERVER_URL}/api/users/signin`, 
				'POST',
				JSON.stringify({
            		email: formState.inputs.email.value,
            		password: formState.inputs.password.value
				}),
				{
					'Content-Type':'application/json'
				}
			);
			auth.login(responseData.user.id);
			navigate("/");
		}
		catch (err) {console.log(err);}
	
    };

    return (
        <Fragment>
            <div className="flex min-h-full max-w-screen-sm m-auto flex-1 flex-col justify-center px-6 py-48 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-fit w-auto"
                        src="/asset/logo.png"
                        alt="Logo"
                    />
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        className="space-y-6"
                        action="#"
                        method="POST"
                        onSubmit={authSubmitHandler}
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                이메일(Email)
                            </label>
                            <div className="mt-2">
                                <Input
                                    element="input"
                                    id="email"
                                    type="email"
                                    validators={[VALIDATOR_EMAIL()]}
                                    onInput={inputHandler}
                                    errorText="올바르지 않은 이메일입니다."
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    비밀번호(Password)
                                </label>
                            </div>
                            <div className="mt-2">
                                <Input
                                    element="input"
                                    id="password"
                                    type="password"
                                    validators={[VALIDATOR_MINLENGTH(8)]}
                                    onInput={inputHandler}
                                    errorText="패스워드의 길이는 최소 8자입니다."
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                disabled={!formState.isValid}
                            >
                                로그인
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        회원이 아니신가요? {' '}
                        <Link
                            to={'/auth/join'}
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            회원가입
						</Link>
                    </p>
                </div>
            </div>
        </Fragment>
    );
};

export default Login;