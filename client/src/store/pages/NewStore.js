import React, { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../../ui/Input';
import ImageUpload from '../../ui/ImageUpload';

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../utill/validators';
import { useForm } from '../../hooks/form-hook';
import { useHttpClient } from '../../hooks/http-hook';
import { AuthContext } from '../../context/auth-context';

import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';

const NewStore = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const imageHandleRef = useRef({});

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler] = useForm(
        {
            title: {
                value: '',
                isValid: false,
            },
            description: {
                value: '',
                isValid: false,
            },
            address: {
                value: '',
                isValid: false,
            },
            image: {
                value: '',
                isValid: false,
            },
            floor: {
                value: '',
                isValid: false,
            },

            total_floor: {
                value: '',
                isValid: false,
            },
            image: {
                value: '',
                isValid: false,
            },

            maintenance_cost: {
                value: '',
                isValid: false,
            },
            monthly_rent: {
                value: '',
                isValid: false,
            },
            key_money: {
                value: '',
                isValid: false,
            },
            deposit: {
                value: '',
                isValid: false,
            },
        },
        false
    );

    const parkingSelectList = { '주차 가능': true, '주차 불가능': false };
    const [parkingSelected, setParkingSelected] = useState("주차 가능");

    const handleParkingSelect = (e) => {
		console.log(parkingSelectList[e.target.value]);
        setParkingSelected(e.target.value);
    };

    const storeSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();

            formData.append('title', formState.inputs.title.value);
            formData.append('description', formState.inputs.description.value);
            formData.append('address', formState.inputs.address.value);		
            formData.append('image', formState.inputs.image.value);
			formData.append('floor', formState.inputs.floor.value);
			formData.append('total_floor', formState.inputs.total_floor.value);
			formData.append('parking_availability', parkingSelectList[parkingSelected]);
            formData.append('key_money', parseInt(formState.inputs.key_money.value));
            formData.append('monthly_rent', parseInt(formState.inputs.monthly_rent.value));
            formData.append('deposit', parseInt(formState.inputs.deposit.value));
            formData.append('maintenance_cost', parseInt(formState.inputs.maintenance_cost.value));
            formData.append('creator', auth.userId);

            await sendRequest(`${process.env.REACT_APP_SERVER_URL}/api/stores`, 'POST', formData);
			
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form onSubmit={storeSubmitHandler}>
            <div className="space-y-12 sm:space-y-16 max-w-screen-sm m-auto py-4">
                <h1 className="text-xl font-semibold leading-7 text-gray-900 text-center my-4">
                    매물 등록
                </h1>
                <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900 px-2">
                        매물 정보
                    </h2>

                    <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label className="block text-base font-medium leading-6 text-gray-900 sm:pt-1.5 px-2">
                                상호명
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <Input
                                    id="title"
                                    element="input"
                                    type="text"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    errorText="상호명을 입력해주세요."
                                    onInput={inputHandler}
                                />
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label className="block text-base font-medium leading-6 text-gray-900 sm:pt-1.5 px-2">
                                주소
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <Input
                                    id="address"
                                    element="input"
                                    type="text"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    errorText="주소를 입력해주세요."
                                    onInput={inputHandler}
                                />
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label className="block text-base font-medium leading-6 text-gray-900 sm:pt-1.5 px-2">
                                상세 설명
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <Input
                                    id="description"
                                    element="textarea"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    errorText="상세 설명을 최소 20자 이상 입력해주세요."
                                    onInput={inputHandler}
                                />
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label className="block text-base font-medium leading-6 text-gray-900 sm:pt-1.5 px-2">
                                가게 사진
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <div className="flex max-w-2xl justify-center rounded-lg border border-dashed border-gray-900/25 h-60">
                                    <div className="text-center w-full">
                                        <div className="flex h-full w-full text-sm leading-6 text-gray-600">
                                            <ImageUpload
                                                id="image"
                                                onInput={inputHandler}
                                                ref={imageHandleRef}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        type="button"
                                        onClick={imageHandleRef.current.pickImageHandler}
                                    >
                                        이미지 첨부
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:py-6 sm:divide-solid sm:divide-x sm:divide-gray-900/10">
                        <div className="sm:grid sm:grid-cols-3">
                            <label className="block text-base font-medium leading-6 text-gray-900 sm:pt-1.5 px-2">
                                층수
                            </label>

                            <div className="mt-2 sm:col-span-2 sm:mt-0 ">
                                <div className="sm:grid sm:grid-cols-4 text-center">
                                    <Input
                                        id="floor"
                                        element="input"
                                        type="text"
                                        validators={[VALIDATOR_REQUIRE()]}
                                        errorText="현재층을 입력해주세요."
                                        onInput={inputHandler}
                                    />
                                    <label>층 /</label>
                                    <Input
                                        id="total_floor"
                                        element="input"
                                        type="text"
                                        validators={[VALIDATOR_REQUIRE()]}
                                        errorText="전체층을 입력해주세요."
                                        onInput={inputHandler}
                                    />
                                    <label>층</label>
                                </div>
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3">
                            <label className="block text-base font-medium leading-6 text-gray-900 sm:pt-1.5 px-2">
                                주차
                            </label>

                            <div className="mt-2 sm:col-span-2 sm:mt-0 ">
                                <select
                                    id="country"
                                    name="country"
									onChange={handleParkingSelect} 
									value={parkingSelected}
                                    autoComplete="country-name"
                                    className="sm:col-span-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    {Object.keys(parkingSelectList).map((item) => {
                                        return (
                                            <option value={item} key={item}>
                                                {item}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900 px-2">
                        금액 정보
                    </h2>

                    <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label className="block text-base font-medium leading-6 text-gray-900 sm:pt-1.5 px-2">
                                권리금
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <Input
                                    id="key_money"
                                    element="input"
                                    type="text"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    errorText="권리금을 입력해주세요."
                                    onInput={inputHandler}
                                />
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label className="block text-base font-medium leading-6 text-gray-900 sm:pt-1.5 px-2">
                                월세
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <Input
                                    id="monthly_rent"
                                    element="input"
                                    type="text"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    errorText="월세 입력해주세요."
                                    onInput={inputHandler}
                                />
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label className="block text-base font-medium leading-6 text-gray-900 sm:pt-1.5 px-2">
                                보증금
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <Input
                                    id="deposit"
                                    element="input"
                                    type="text"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    errorText="보증금을 입력해주세요."
                                    onInput={inputHandler}
                                />
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label className="block text-base font-medium leading-6 text-gray-900 sm:pt-1.5 px-2">
                                관리비
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <Input
                                    id="maintenance_cost"
                                    element="input"
                                    type="text"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    errorText="관리비를 입력해주세요."
                                    onInput={inputHandler}
                                />
                            </div>
                        </div>
                    </div>
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
                            제출
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default NewStore;