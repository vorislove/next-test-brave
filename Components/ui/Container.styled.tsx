import styled, { css } from 'styled-components';
import { device } from './breakpoints';

interface ITheme {
	breakpoints: {
		mobile: string;
		tablet: string;
		desktop: string;
	};
}

const theme: ITheme = {
	breakpoints: {
		mobile: '768px',
		tablet: '1024px',
		desktop: '1200px'
	}
};

export const Container = styled.div<{
	width?: string;
	height?: string;
	margin?: string;
	position?: string;
	top?: string;
	left?: string;
	display?: string;
}>`
	width: ${({ width = '100%' }) => width};
	height: ${({ height = '100%' }) => height};
	display: ${({ display = 'flex' }) => display};
	flex-direction: column;
	align-items: start;
	margin: 20px auto 0 auto;
	min-width: 300px;
	padding: 3rem;
	gap: 1.5rem;
	position: ${({ position }) => position};

	@media ${device.mobile} {
		/* flex-direction: row; */
		max-width: 768px;
		padding: 1.5rem;
	}
	@media ${device.tablet} {
		max-width: 1024px;
	}
	@media ${device.desktop} {
		max-width: 1200px;
	}
`;

interface IWrapper {
	mrgn?: string;
	width?: string;
	height?: string;
	maxHeight?: string;
	position?: string;
	display?: string;
	trnstn?: string;
}

export const Wrapper = styled.div<IWrapper>`
	position: ${({ position }) => position};
	border-radius: 6px;
	display: ${({ display = 'flex' }) => display};
	flex-direction: column;
	padding: 15px;
	background: #fff;
	width: ${({ width = '100%' }) => width};
	height: ${({ height }) => height};
	max-height: ${({ maxHeight }) => maxHeight};
	min-height: 50px;
	box-shadow: 0.7rem 0.7rem 0 var(--color-shadow, currentColor);
	border: 3px solid #212121;
	margin: ${({ mrgn }) => mrgn};
	transition: ${({ trnstn }) => trnstn};

	&.alert-enter {
		height: 0;
		opacity: 0;
	}
	&.alert-enter-active {
		height: 100%;
		opacity: 1;
		transition: height opacity 300ms;
	}
	&.alert-exit {
		height: 100%;
	}
	&.alert-exit-active {
		height: 0;
		transform: translateY(100px) scale(0.8);
		transition: all 300ms;
	}
`;

export const StyledSpan = styled.div<{ fs?: string }>`
	width: 50px;
	height: 50px;
	text-align: center;
	display: flex;
	justify-content: center;
	font-size: ${(props) => props.fs};
	font-weight: 700;
`;
