import { FC } from 'react';
import styled from 'styled-components';

interface BtnProps {
	bg?: string;
}

interface IButton {
	children: React.ReactNode;
	bg?: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<IButton> = ({ children, bg, onClick }) => {
	return (
		<ButtonStyled onClick={onClick} bg={bg}>
			{children}
		</ButtonStyled>
	);
};

const ButtonStyled = styled.button<BtnProps>`
	color: currentColor;
	padding: 0.5rem 1rem;
	background: ${({ bg = '#fab700' }) => bg};
	border: none;
	border-radius: 4px;
	font-weight: 700;
	cursor: pointer;
	width: 100%;
	height: 50px;
	font-size: 14px;
`;

export const BtnGroup = styled.div`
	margin-top: calc(0.5rem * 2.5);
	gap: 1rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

export default Button;
