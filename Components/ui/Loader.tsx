import { FC } from 'react';
import { Icon } from './Icon';
import styled, { keyframes } from 'styled-components';

interface ILoader {
	message?: string;
}

export const Loader: FC<ILoader> = ({ message = '' }) => {
	return (
		<Wrapper>
			{message ? <span className="message">{message}</span> : null}
			<div className="loader">
				<Icon name="loader" />
			</div>
		</Wrapper>
	);
};

const rotateAnimation = keyframes`
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    `;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 6px;
	padding: 5px 0;

	& > .loader {
		animation: ${rotateAnimation} 1s linear infinite;
	}

	& > .message {
		font-weight: bold;
		font-size: 0.9rem;
	}
`;
