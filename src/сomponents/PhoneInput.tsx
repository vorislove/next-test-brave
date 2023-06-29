import React, { useState } from 'react';
import Input from './ui/Input';

export interface IValidation {
	valid: boolean;
	text: string;
}

interface IPhoneInputProps {
	value: string;
	onChange: (value: string) => void;
	valid: IValidation;
	onChangeValid: ({ valid, text }: IValidation) => void;
}

export function PhoneInput({ value, onChange, valid, onChangeValid }: IPhoneInputProps) {
	//обрабочик на поле ввода телефона
	const changeHandlerPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChangeValid({ ...valid, valid: true }); //убрать бордер при повторном вводе после неудачной попытки

		let input = e.target,
			inputNumbersValue = input.value.replace(/\D/g, ''), //убираю не числовые символы
			formatedInputValue = '';

		if (!inputNumbersValue) {
			return (input.value = '');
		}

		//проверяю с какого числа начинает вводится телефон и подтсавляю в зависимости от этого первый символ
		if (inputNumbersValue[0] == '9') inputNumbersValue = '7' + inputNumbersValue;
		let firstSymbols = inputNumbersValue[0] == '8' ? '8' : '+7';
		formatedInputValue = firstSymbols + ' ';

		//добавляю скобки и тире
		if (inputNumbersValue.length > 1) {
			formatedInputValue += '(' + inputNumbersValue.substring(1, 4);
		}
		if (inputNumbersValue.length >= 5) {
			formatedInputValue += ') ' + inputNumbersValue.substring(4, 7);
		}
		if (inputNumbersValue.length >= 8) {
			formatedInputValue += '-' + inputNumbersValue.substring(7, 9);
		}
		if (inputNumbersValue.length >= 10) {
			formatedInputValue += '-' + inputNumbersValue.substring(9, 11);
		}

		input.value = formatedInputValue;
		onChange(formatedInputValue);
	};

	const keyDownHadler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key == 'Backspace' && value.replace(/\D/g, '').length == 1) {
			onChange('');
		}
	};

	return (
		<>
			<Input
				type="tel"
				placeholder={valid.valid ? 'Телефон' : valid.text}
				value={value}
				onChange={changeHandlerPhone}
				maxlength={18}
				onKeyDown={keyDownHadler}
				valid={valid.valid}
			/>
		</>
	);
}
