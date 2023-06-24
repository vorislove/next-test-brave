import styled, { css, keyframes } from 'styled-components';
import { device } from './breakpoints';

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
	/* gap: 1.5rem; */
	position: ${({ position }) => position};

	@media ${device.mobile} {
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

const fadeIn = keyframes`
from {
  opacity: 0;
  height: 0;
  margin: 0;
  padding: 0;
}
to {
  opacity: 1;
}`;

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
	box-shadow: 0.7rem 0.7rem 0 var(--color-shadow, currentColor);
	border: 3px solid #212121;
	margin: ${({ mrgn }) => mrgn};

	&.alert-enter {
		height: 0;
		padding: 0;
	}
	&.alert-enter-active {
		height: 200px;
		transition: all 300ms;
		padding: 15px;
	}
	&.alert-exit {
		height: 200px;
		padding: 15px;
	}
	&.alert-exit-active {
		padding: 0;
		height: 0;
		margin: 0;
		transform: translateY(80px) scale(0.8);
		transition: all 300ms;
	}

	&.alert-tablet-enter {
		width: 0;
	}

	&.alert-tablet-enter-active {
		width: 100%;
		transition: width 300ms;
	}
	&.alert-tablet-exit {
		width: 100%;
	}
	&.alert-tablet-exit-active {
		width: 0;
		transition: width 300ms;
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
