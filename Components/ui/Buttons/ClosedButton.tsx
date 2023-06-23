import { FC, useState } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

interface IButton {
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonClosed: FC<IButton> = ({ onClick }) => {
	return <ClosedBtn onClick={onClick}>&times;</ClosedBtn>;
};

const ClosedBtn = styled.button`
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	top: 0;
	left: 96%;
	transform: translateY(-50%);
	box-shadow: 0.2rem 0.2rem 0 #212121;
	border: 3px solid #212121;
	background: white;
	border-radius: 6px;
	width: 30px;
	height: 30px;
	font-size: 1.5rem;
	cursor: pointer;
	transition: all 0.2s cubic-bezier(0, 0, 0.5, 0.15);

	&:hover {
		transform: scale(1.1) translateY(-50%);
		transition: transform 0.2s cubic-bezier(0, 0, 0.5, 0.15);
	}
`;

export default ButtonClosed;
