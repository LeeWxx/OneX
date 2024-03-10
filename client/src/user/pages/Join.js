import React, { useState, useContext } from 'react';

import { useNavigate, Link } from 'react-router-dom';
import Input from '../../ui/Input';
import { AuthContext } from '../../context/auth-context';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../utill/validators';
import { useForm } from '../../hooks/form-hook';
import { useHttpClient } from '../../hooks/http-hook';

import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';

const Join = () => {
	const auth = useContext(AuthContext);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const navigate = useNavigate();
	
    const [formState, inputHandler] = useForm(
        {
            name: {
                value: '',
                isValid: false,
            },
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
				`${process.env.REACT_APP_SERVER_URL}/api/users/signup`, 
				'POST',
				JSON.stringify({
					name: formState.inputs.name.value,
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
        <form onSubmit={authSubmitHandler}>
            <div className="space-y-12 sm:space-y-16 max-w-screen-sm m-auto py-4">
                <h1 className="text-xl font-semibold leading-7 text-gray-900 text-center my-4">
                    회원 가입
                </h1>
                <div>
                    <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label className="block text-base font-medium leading-6 text-gray-900 sm:pt-1.5 px-2">
                                이름
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <Input
                                    id="name"
                                    element="input"
                                    type="text"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    errorText="이름을 입력해주세요."
                                    onInput={inputHandler}
                                />
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label className="block text-base font-medium leading-6 text-gray-900 sm:pt-1.5 px-2">
                            	이메일
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <Input
                                    id="email"
                                    element="input"
                                    type="text"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    errorText="이메일을 입력해주세요."
                                    onInput={inputHandler}
                                />
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label className="block text-base font-medium leading-6 text-gray-900 sm:pt-1.5 px-2">
                                비밀번호
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <Input
                                    id="password"
                                    element="input"
                                    type="password"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    errorText="비밀번호를 입력해주세요."
                                    onInput={inputHandler}
                                />
                            </div>
                        </div>

                    </div>
                </div>

                <div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="button"
                            className="text-sm font-semibold leading-6 text-gray-900"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
							disabled={!formState.isValid}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            회원가입
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Join;