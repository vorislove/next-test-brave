import React, { useState } from 'react';
import Input from './ui/Input';
import { IValidation } from './PhoneInput';

interface ISumInputProps {
	value: string;
	onChange: (value: string) => void;
	valid: IValidation;
	onChangeValid: ({ valid, text }: IValidation) => void;
}

export function SumInput({ value, onChange, valid, onChangeValid }: ISumInputProps) {
	//валидация суммы в диапазоне от 1 до 1000
	const changeHandlerSum = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target;

		if (Number(input.value) >= 1 || Number(input.value) <= 1000) {
			onChangeValid({ ...valid, valid: true });
			onChange(input.value);
		}
		if (Number(input.value) == 0 || Number(input.value) > 1000 || Number(input.value) < 0) {
			onChangeValid({ ...valid, valid: false });
			onChange(input.value);
		}
	};

	return (
		<>
			<Input
				type="number"
				placeholder={valid.valid ? 'Сумма' : valid.text}
				value={value}
				onChange={changeHandlerSum}
				valid={valid.valid}
			/>
		</>
	);
}
