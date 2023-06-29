import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { device } from './breakpoints';

interface IInput {
	type: string;
	placeholder: string;
	value: string | number;
	className?: string;
	maxlength?: number;
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	valid?: boolean;
	firstChild?: boolean;
}

const Input: FC<IInput> = ({
	type,
	placeholder,
	value,
	className,
	onChange,
	maxlength,
	onKeyDown,
	valid = true,
	firstChild = true
}) => {
	return (
		<Wrapper firstChild={firstChild}>
			<StyledInput valid={valid}>
				<input
					type={type}
					value={value}
					className="field"
					onChange={onChange}
					placeholder=" "
					maxLength={maxlength}
					onKeyDown={onKeyDown}
					id={placeholder}
				/>
				<label htmlFor={placeholder} data-title={placeholder} title={placeholder}></label>
			</StyledInput>
		</Wrapper>
	);
};

const Wrapper = styled.div<{ firstChild?: boolean }>`
	:first-child {
		margin: ${({ firstChild }) => (firstChild ? '40px 0 0 0' : '0')};
	}

	margin: 20px 0 0 0;
`;

const StyledInput = styled.div<{ valid?: boolean }>`
	position: relative;

	input {
		box-sizing: border-box;
		display: block;
		width: 100%;
		border: 3px solid ${({ valid }) => (valid ? 'currentColor' : 'red')};
		padding: calc(0.5rem * 1.5) 0.5rem;
		color: currentColor;
		background: transparent;
		border-radius: 6px;
		padding-left: 10px;
		outline: none;

		&:focus,
		&:not(:placeholder-shown) {
			& + label::before {
				content: attr(title);
				transform: translate(0.25rem, -65%) scale(0.8);
				color: ${({ valid }) => (valid ? '#fab700' : 'red')};
			}
		}
	}

	label::before {
		content: attr(title);
		position: absolute;
		left: 0;
		top: 0;
		padding: calc(0.5rem * 0.75) calc(0.5rem * 0.5);
		margin: calc(0.5rem * 0.75 + 3px) calc(0.5rem * 0.5 + 10px);
		white-space: nowrap;
		transform: translate(0, 0);
		transform-origin: 0 0;
		background: white;
		transition: transform 120ms ease-in;
		font-weight: bold;
		color: ${({ valid }) => (valid ? 'currentColor' : 'red')};
		cursor: text;

		@media ${device.mobile} {
			font-size: 12px;
		}
	}
`;

export default Input;
